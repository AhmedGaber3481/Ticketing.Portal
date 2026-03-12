import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslationService } from './shared/services/translation.service';
import { FooterComponent, HeaderComponent } from './layout';
import { ToastNotificationComponent } from './shared/toaster/toast.notification/toast.notification';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ToastNotificationComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portal');
  userId ="";
  
  translationService = inject(TranslationService);
}
