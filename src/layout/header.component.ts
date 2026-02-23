import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageSwitcher } from '../app/shared/language-switcher/language-switcher';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LanguageSwitcher],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMenuCollapsed = true;

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }
}
