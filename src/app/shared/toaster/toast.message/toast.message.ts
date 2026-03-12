import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Toast } from '../toaster.model';

@Component({
  selector: 'app-toast-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./toast.message.html"
})
export class ToastMessageComponent implements OnInit, OnDestroy {
  @Input({ required: true }) toast!: Toast;
  @Output() close = new EventEmitter<number>();

  isVisible = false;
  isExiting = false;

  private autoDismissTimer: any;

  get styles() {
    switch (this.toast.type) {
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          titleColor: 'text-green-900',
          iconChar: '✓',
        };
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          titleColor: 'text-red-900',
          iconChar: '!',
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          iconBg: 'bg-yellow-100',
          iconColor: 'text-yellow-600',
          titleColor: 'text-yellow-900',
          iconChar: '⚠',
        };
      case 'info':
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          titleColor: 'text-blue-900',
          iconChar: 'i',
        };
    }
  }

  ngOnInit(): void {
    // Slide-in animation
    setTimeout(() => {
      this.isVisible = true;
    }, 10);

    // Auto-dismiss after 5 seconds
    this.autoDismissTimer = setTimeout(() => {
      this.handleClose();
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.autoDismissTimer) {
      clearTimeout(this.autoDismissTimer);
    }
  }

  handleClose(): void {
    if (this.isExiting) {
      return;
    }
    this.isExiting = true;
    setTimeout(() => {
      this.close.emit(this.toast.id);
    }, 300);
  }
}


