import { Injectable } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";

// Merkezi bir SEO servisi oluşturun
@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  setMetaTags(config: {
    title: string;
    description: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
  }) {
    this.title.setTitle(config.title);
    
    this.meta.updateTag({ name: 'description', content: config.description });
    
    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    // Open Graph
    if (config.ogTitle) {
      this.meta.updateTag({ property: 'og:title', content: config.ogTitle });
    }
    
    if (config.ogDescription) {
      this.meta.updateTag({ property: 'og:description', content: config.ogDescription });
    }
    
    if (config.ogImage) {
      this.meta.updateTag({ property: 'og:image', content: config.ogImage });
    }
  }
}