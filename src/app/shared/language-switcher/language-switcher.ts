import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../services/translation.service';
import { TranslatePipe } from '../services/translate.pipe';


@Component({
  selector: 'app-language-switcher',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss',
})
export class LanguageSwitcher {
  private translationService = inject(TranslationService);
  currentLanguage = 'en';

  constructor() {
    // Get the current language value from the signal
    const langSignal = this.translationService.language;
    this.currentLanguage = langSignal();
  }

  getAvailableLanguages() {
    return this.translationService.getAvailableLanguages();
  }

  getCurrentLanguageNativeName(): string {
    const languages = this.translationService.getAvailableLanguages();
    const current = languages.find(lang => lang.code === this.currentLanguage);
    return current?.nativeName || '';
  }

  changeLanguage(lang: any): void {
    console.log(lang, "selected lang");
    
    // Apply direction change immediately
    this.translationService.setLanguage(lang);
    
    // Navigate to new language path
    const currentPath = window.location.href;
    const pathParts = currentPath.split('/');
    const newPath = pathParts.map(part => part === this.currentLanguage ? lang : part).join('/');
    console.log(newPath, "new path");
    window.location.href = newPath;
  }
}
