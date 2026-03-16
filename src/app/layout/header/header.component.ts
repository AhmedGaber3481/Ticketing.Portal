import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslationService } from '../../shared/services/translation.service';
import { LanguageSwitcher } from '../../shared/language-switcher/language-switcher';
import { AuthService } from '../../features/user.managment/services/auth.service';
import { TranslatePipe } from '../../shared/services/translate.pipe';
import { Observable, Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LanguageSwitcher, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit,OnDestroy {
  isMenuCollapsed = true;
  userFullName ="";
  userId="";
  private destroy$ = new Subject<void>();
  isNavCollapsed = signal(true);

  constructor(public translationService: TranslationService 
  ,public authService:  AuthService
  ,private route: Router){
     
  }
  ngOnInit(): void {
    this.authService.userObserver.pipe(takeUntil(this.destroy$)).subscribe({
      next:(res: any)=>{
        if(res){
          console.log(res);
          this.userFullName = res.userFullName;
          this.userId = res.userId;
        }
      },
      error:(err)=>{
        console.log(err);
      }
     });
  }
  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  get currentLang(){
    return this.translationService.language();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  SignOut(){
    this.authService.SignOut().pipe(take(1)).subscribe({
      next:(res: any)=>{
        var lang = this.translationService.language();
        this.route.navigate([lang, 'login']);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
  
  handleNavCollapse(): void {
    this.isNavCollapsed.set(!this.isNavCollapsed());
  }
}

