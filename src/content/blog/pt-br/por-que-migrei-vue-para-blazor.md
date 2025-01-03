---
title: "Por que migrei de Vue para Blazor"
pubDate: 2024-02-20T13:23:49Z
author: "Hederson Boechat"
draft: true
metaDescription: Alguns dos motivos pelo qual eu migrei do VueJS para Blazor no frontend
image:
  url: "/images/tools-barn-images-unsplash.jpg"
  alt: "The full Astro logo."
tags: ["saas", "programação", "blazor", "dotnet"]
---

Quando eu fui começar a escrever o código do [Inova Notas](http://inovanotas.com.br) eu tive várias dúvidas e a principal era qual tecnologia usar. Ao invés de utilizar o que estava na moda eu decidi optei por usar o que eu já domino, isso ia me fazer ganhar uma velocidade absurda. Porem eu decidi por separar o backend do frontend o que é bem comum hoje em dia.

## Não é sobre a melhor tecnologia

Percebo que isso me fez perder velocidade, pois hoje temos alguns frameworks/libs que permitem ter uma estrutura fullstack como o NextJs, NuxtJs, Blazor e etc. Minha ideia era utilizar esse conceito, porém com o Blazor que é o correspondente de frontend para o mundo dotnet, entretanto quando eu fiz a POC inicial eu tive alguns problemas que me desanimaram um pouco dele e optei por utilizar Vue 3 como frontend e segui fazendo as telas iniciais.

Contudo após a versão nova do Blazor que foi lançada junto com o dotnet 8 trouxe varias melhorias e eu resolvi estudar novamente o Blazor e percebi que eu estava tentando utilizar ele de forma errada no passado, apesar de ser muito parecido com alguns frameworks frontend javascript ele tem sua maneira de fazer algumas coisas e até mesmo de se "componentizar".

Ainda não iniciei a migração do [Inova Notas](http://inovanotas.com.br) para o Blazor, porém eu tenho um micro SaaS de gestão que está desenvolvimento utilizando o Blazor e até agora o resultado foi satisfatório a maioria dos problemas que tive foram causados pela minha própria visão sobre o framework.

E como eu tinha suspeitado utilizar uma stack que faça back e frontend em um mono repositório me trouxe ganhos absurdos. O processo de criar uma tela era bem tedioso, hoje com tudo unificado passou a ser uma tarefa trivial.

## Velocidade

Nesse mundo de micro SaaS o que você precisa é principalmente velocidade, digo isso depois de perder muito tempo com coisas que não são relacionadas com o produto em si. Contudo isso foi bom para eu aprender a criar o template inicial dos próximos micro SaaS que eu for fazer. O meu conselho é sempre que for iniciar alguma ideia nova o ideal é utilizar o caminho mais rápido para validar a ideia, por tanto não tenha vergonha de copiar o código de seus outros produtos. Quando perceber um padrão do que é copiado de um projeto para outro crie então um boilerplate ou então use algum boilerplate de SaaS que tenha pouco atrito com sua maneira de desenvolver softwares.
