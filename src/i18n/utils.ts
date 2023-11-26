import { ui, defaultLang, showDefaultLang  } from './ui';
import { getCollection } from 'astro:content';



export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function useTranslatedPath(lang: keyof typeof ui) {
    return function translatePath(path: string, l: string = lang) {
        return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`
    }
}

export async function getPostFromLang(lang: string, quantity? : number){
    let blogEntries = await getCollection('blog');   
    blogEntries = blogEntries.filter((entry) => entry.slug.startsWith(`${lang}/`));
    
    if(quantity === undefined)
      return blogEntries;

    return blogEntries.sort((a, b) => {
      return new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
    }).slice(0, quantity);
}