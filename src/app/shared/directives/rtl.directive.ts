import { Directive, inject, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appRtl]',
  standalone: true
})
export class RtlDirective implements OnInit, OnDestroy {
  private translationService = inject(TranslationService);
  private elementRef = inject(ElementRef);
  private subscription?: Subscription;

  ngOnInit() {
    this.applyDirection();
    
    // Note: Since signals are used, we'll use effect instead of subscription
    // For now, just apply direction on init
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private applyDirection() {
    const directionSignal = this.translationService.direction;
    const direction = directionSignal();
    const element = this.elementRef.nativeElement as HTMLElement;
    
    if (direction === 'rtl') {
      element.style.direction = 'rtl';
      element.style.textAlign = 'right';
    } else {
      element.style.direction = 'ltr';
      element.style.textAlign = 'left';
    }
  }
}
