---
title: "How to create a secure VPS in any provider?"
pubDate: 2024-12-30T13:09:49Z
author: "Hederson Boechat"
draft: false
description: Step-by-step guide to secure and prepare your server with SSH, firewalls, and Cloudflare Tunnels for safe application hosting.
metaDescription: Learn how to set up a secure and reliable server with this step-by-step guide. From creating a non-root user to configuring SSH, setting up a firewall, and integrating Cloudflare Tunnels, this article covers the essential steps to prepare your server for hosting applications safely.
image:
  url: "/images/how-to-secure-a-server-2.jpg"
  alt: "The full Astro logo."
tags: ["vps", "server", "infrastructure"]
---

Nowadays, with the rise in popularity of cloud providers, we see fewer articles and less encouragement to run servers on smaller providers.
While I understand the importance of serverless technologies, many beginners skip an essential step: learning how to configure at least the basics of a server.

This article will cover the fundamental setup needed to create a secure and reliable server, ready for your application.

## Update the server

First of all you will need a server (seriously?). You can choose any provider you want. For this example, I installed the **Ubuntu 24.04**,
with a SSH key. We will use the SSH key to login into the machine instead of the user and plain text password.

After logging in, the first thing we will do is update the OS and install the basic softwares to help us protect the server.

```shell
#Update the system
apt update && apt upgrade -y

# Install the softwares
apt install ufw fail2ban curl wget

```

## Non-root user

Now let's create a non-root user. This is security best practice because:

- Avoiding root login reduces risk
- Actions requiring root need explicit sudo, creating an audit trail
- Regular tasks run without root privileges
- If the account is compromised, attacker still needs sudo password

I'm using **admin** as the username just for this tutorial, but I highly recommend choosing a less guessable username,
If you use a different username, remember to update all commands with your username.

```shell
# Create non-root user
adduser admin
usermod -aG sudo admin
```

It will ask for the password. Use any password you want; it will required to enter into sudo mode. After that, we need to add a SSH key for the admin.

```shell
# Create SSH directory for admin
mkdir -p /home/admin/.ssh

# Create authorized_keys file (replace with your public key)
echo "YOUR-PUBLIC-KEY-HERE" > /home/admin/.ssh/authorized_keys

# Set correct permissions
chown -R admin:admin /home/admin/.ssh
chmod 700 /home/admin/.ssh
chmod 600 /home/admin/.ssh/authorized_keys
```

Before continuing this tutorial, test if you can log into the server using the user with the SSH key we configured.

```shell
ssh -p 22 -i ~/.ssh/you_ssh_private admin@your-server-ip
```

If you aren't able to connect into the server using the **"admin"** user, just check all the steps again.

## SSH custom settings

Now, let's disable login with root user, change the SSH port and disable authentication with password.

Open the file **sshd_config** using nano

```shell
nano /etc/ssh/sshd_config
```

Set these values on that file

```shell
PermitRootLogin no
PasswordAuthentication no
Port 2222  # Custom port
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
```

> I'm using port _*2222*_, but feel free to choose any available port—remember, the less guessable, the better.

After adding these values and save the file, we can restart the SSH service

```shell
systemctl restart ssh
```

## Firewall

Now it’s firewall time. UFW (Uncomplicated Firewall) makes everything simple and straightforward. With just a few command lines, we can easily secure the machine.
The commands are self-explanatory: we’ll essentially deny all incoming traffic, allow all outgoing traffic, and add an exception for incoming traffic on port 2222.

```shell
ufw default deny incoming
ufw default allow outgoing
ufw allow 2222/tcp  # New SSH port
ufw enable
```

As an additional layer of security, we’ll also install [fail2ban](https://github.com/fail2ban/fail2ban). According to their GitHub description, it’s software that **_ban hosts that cause multiple authentication errors._** It’s also straightforward to set up—just run these commands:

```shell
cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
systemctl enable fail2ban
systemctl start fail2ban
```

## Cloudflare tunnels

You may notice that we've closed all server's ports except the SSH. You might be wondering, _"How the hell the people will reach my website?"_, This is where Cloudflare Tunnels come into play to handle incoming traffic.

For obvious reasons, you’ll need a Cloudflare account.

```shell
# Install cloudflared
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
dpkg -i cloudflared.deb

# Login to Cloudflare
cloudflared tunnel login

# Create tunnel
cloudflared tunnel create main-tunnel
```

When you create the tunnel, the output will look something like this:

```shell
Created tunnel main-tunnel with id: 6ff42ae2-765d-4aaa-8417-ee5d7494444c
```

Save the tunnel ID, as you will need it to create a CNAME record to redirect traffic to the newly created tunnel.

### Creating the Tunnel Configuration

First, create the folder and configuration file for the tunnel:

```shell
mkdir -p ~/.cloudflared
nano ~/.cloudflared/config.yml
```

Replace `<TUNNEL_ID>` with the tunnel ID you saved earlier:

```yml
tunnel: <TUNNEL_ID>
credentials-file: /root/.cloudflared/<TUNNEL_ID>.json

ingress:
  - hostname: app.yourdomain.com
    service: http://localhost:8080
  - service: http_status:404
```

### Understanding the Configuration

1. The line `service: http://localhost:8080` specifies where traffic will be directed. In this case, it points to an application running on port `8080` on your server.

   - If your application is running on a different port, simply replace `8080` with the correct port number.

2. This configuration works as follows:
   - Any traffic coming to `app.yourdomain.com` will be forwarded to your application running on the specified port.
   - If no matching service is found, the request will return a `404 Not Found` status.

This setup ensures that only traffic intended for your application is handled, while all other requests are rejected.

### Installing and Starting the Cloudflared Service

Once the configuration file is created, install the `cloudflared` service and start it:

```shell
cloudflared service install
systemctl start cloudflared
```

### Creating the CNAME Record

To complete the setup, you need to create a `CNAME` record on the domain you will use for the application. The record should look like this:

```
Type       | Name | Content
CNAME      | app  | <TUNNEL_ID>.cfargotunnel.com
```

Replace `<TUNNEL_ID>` with your actual tunnel ID.

## Testing

To check if the tunnel is working, you can create a simple Python server running on port `8080`.  
If you already have an application running on the server, you can use that instead and skip this step.

### Step 1: Install Python

Run the following command to update your package list and install Python:

```shell
sudo apt update && sudo apt install python3 -y
```

### Step 2: Create a Simple HTML Page

Create a test directory and a basic HTML file:

```shell
cd /var/www
sudo mkdir test-service
cd test-service
echo "Cloudflare Tunnel Test Service" > index.html
```

### Step 3: Start the Python HTTP Server

Launch a simple Python HTTP server on port 8080:

```shell
python3 -m http.server 8080
```

Step 4: Test in Your Browser
Open your browser and visit app.yourdomain.com. If everything is configured correctly, you should see the message:

_Cloudflare Tunnel Test Service_

### Troubleshooting Notes

- If you don’t see the page, your DNS provider may need more time to propagate the `CNAME` record.
- If the issue persists after the DNS propagation period, review the setup steps to ensure everything is configured correctly.

## Server Set Up? Time to Create!

By following these steps, you’ve built a secure and reliable server—great job! Whether you’re just starting or leveling up your skills, this is a big win. Now that your server is ready, it’s time to focus on what really matters: bringing your ideas to life. Go build something awesome!
