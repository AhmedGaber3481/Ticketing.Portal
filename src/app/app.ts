import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { HeaderComponent, FooterComponent } from '../layout';
import { TranslationService } from './shared/services/translation.service';
import { FooterComponent, HeaderComponent } from '../layout';
import { AuthService } from './features/user.managment/services/auth.service';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portal');
  userId ="";
  
  translationService = inject(TranslationService);
  //authService = inject(AuthService);
  
  // ngOnInit(): void {
  //   this.authService.userObserver.subscribe({
  //     next:(res: any)=>{
  //       this.userId = res?.userId;
  //     },
  //     error:(err)=>{
  //       console.log(err);
  //     }
  //    });
  // }
  //private destroy$ = new Subject<void>();

  // ngOnInit() {
  //   this.authService.userObserver
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe({
  //     next:(res: any)=>{
  //         console.log(res, "logged user in App");
  //         this.userId = res?.userId;
  //     },
  //     error:(err)=>{
  //       console.log(err);
  //     }});
  // }

  // ngOnDestroy() {
  //   this.destroy$.next();
  //   this.destroy$.complete();
  // }
}
