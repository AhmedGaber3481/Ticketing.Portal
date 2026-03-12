import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

type LoaderSize = 'small' | 'medium' | 'large';
type LoaderVariant = 'primary' | 'secondary' | 'white';


@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  @Input() size: LoaderSize = 'medium';
  @Input() variant: LoaderVariant = 'primary';
  @Input() text?: string;
  @Input() className = '';

  readonly sizeClasses: Record<LoaderSize, string> = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  };

  readonly borderWidthClasses: Record<LoaderSize, string> = {
    small: 'border-2',
    medium: 'border-[3px]',
    large: 'border-4'
  };

  readonly variantClasses: Record<LoaderVariant, string> = {
    primary: 'border-[#E0E0E0] border-t-[#007BFF]',
    secondary: 'border-[#E0E0E0] border-t-gray-600',
    white: 'border-white/30 border-t-white'
  };
}