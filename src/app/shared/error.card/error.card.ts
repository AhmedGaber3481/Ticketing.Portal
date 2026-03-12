import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ErrorCardModel {
  code: string;
  title: string;
  message: string;
  actionText: string;
}

@Component({
  selector: 'app-error-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error.card.html'
})
export class ErrorCardComponent {
  @Input({ required: true }) error!: ErrorCardModel;
  @Output() action = new EventEmitter<string>();

  onActionClick(): void {
    this.action.emit(this.error.code);
  }
}