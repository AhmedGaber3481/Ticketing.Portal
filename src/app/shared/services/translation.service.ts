import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT, isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLang = signal('en');
  private translations: Record<string, string> = {};
  private currentDirection = signal<'ltr' | 'rtl'>('ltr');
  private languages = [
    { code: 'en', nativeName: 'English', culture: 'en-US' },
    { code: 'ar', nativeName: 'Arabic', culture: 'ar-EG' }
  ];

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object) {
    var langs = this.document?.location?.pathname?.split('/').filter(segment => segment.length > 0) || [];
    console.log(langs);
    var lang;
    if (langs.length > 0) {
      lang = langs[0];
    } else {
      lang = 'en';
    }
    console.log(lang, "current lang");
    this.setLanguage(lang);

    if (!isPlatformServer(this.platformId)) {
      this.loadTranslations(lang);
      this.applyDirection(lang);
    }
  }

  get language() {
    return this.currentLang.asReadonly();
  }
  getCurrentCulture(){
    const currentLang = this.language();
    const langInfo = this.languages.find(lang => lang.code === currentLang);
    return langInfo ? langInfo.culture : 'en-US';
  }

  get direction() {
    return this.currentDirection.asReadonly();
  }

  setLanguage(lang: string) {
    this.currentLang.set(lang);
    if (!isPlatformServer(this.platformId)) {
      this.loadTranslations(lang);
      this.applyDirection(lang);
    }
  }

  private applyDirection(lang: string) {
    const isRTL = lang === 'ar';
    const direction = isRTL ? 'rtl' : 'ltr';
    this.currentDirection.set(direction);
    
    // Apply direction to document
    if (this.document?.documentElement) {
      this.document.documentElement.dir = direction;
      this.document.documentElement.lang = lang;
    }
    
    // Add/remove RTL class to body
    if (this.document?.body) {
      if (isRTL) {
        this.document.body.classList.add('rtl');
        this.document.body.classList.remove('ltr');
      } else {
        this.document.body.classList.add('ltr');
        this.document.body.classList.remove('rtl');
      }
    }
  }

  private loadTranslations(lang: string) {
    this.http
      .get<Record<string, string>>(`assets/i18n/${lang}.json`)
      .subscribe(data => {
        this.translations = data;
      });
  }

  translate(key: string, params?: Record<string, string>): string {
    let text = this.translations[key] || key;

    if (params) {
      Object.keys(params).forEach(param => {
        text = text.replace(`{${param}}`, params[param]);
      });
    }

    return text;
  }
  getAvailableLanguages() {
    return this.languages;
  }
}
