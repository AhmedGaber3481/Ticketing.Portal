import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface PasswordStrength {
  label: string;
  color: string;
  width: string;
}

export interface PasswordChecks {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
}

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user.registration.html',
  styleUrls: ['./user.registration.scss'],
  imports:[CommonModule, ReactiveFormsModule]
})
export class UserRegistrationFormComponent implements OnInit, OnDestroy {
  registrationForm!: FormGroup;
  submitted = false;
  showPassword = false;
  passwordStrength: PasswordStrength = { label: '', color: '', width: '0%' };
  passwordChecks: PasswordChecks = {
    length: false,
    uppercase: false,
    lowercase: false,
    number: false
  };

  private destroy$ = new Subject<void>();

  countryCodes = [
    { code: '+1', country: 'US' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'IN' },
    { code: '+61', country: 'AU' },
    { code: '+81', country: 'JP' },
    { code: '+86', country: 'CN' },
    { code: '+49', country: 'DE' },
    { code: '+33', country: 'FR' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.setupPasswordListener();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, this.emailValidator()]],
      password: ['', [Validators.required, this.passwordValidator()]],
      fullName: ['', [Validators.required]],
      countryCode: ['+1', [Validators.required]],
      phoneNumber: ['', [Validators.required]]
    });
  }

  private setupPasswordListener(): void {
    const passwordControl = this.registrationForm.get('password');
    if (passwordControl) {
      passwordControl.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(value => {
          this.updatePasswordStrength(value || '');
          this.updatePasswordChecks(value || '');
        });
    }
  }

  private emailValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(control.value) ? null : { invalidEmail: true };
    };
  }

  private passwordValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const checks = this.validatePassword(control.value);
      const isValid = Object.values(checks).every(Boolean);
      return isValid ? null : { weakPassword: true };
    };
  }

  private validatePassword(password: string): PasswordChecks {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password)
    };
  }

  private updatePasswordStrength(password: string): void {
    const checks = this.validatePassword(password);
    const score = Object.values(checks).filter(Boolean).length;
    
    if (score === 0) {
      this.passwordStrength = { label: '', color: '', width: '0%' };
    } else if (score === 1) {
      this.passwordStrength = { label: 'Weak', color: 'danger', width: '25%' };
    } else if (score === 2) {
      this.passwordStrength = { label: 'Fair', color: 'warning', width: '50%' };
    } else if (score === 3) {
      this.passwordStrength = { label: 'Good', color: 'info', width: '75%' };
    } else {
      this.passwordStrength = { label: 'Strong', color: 'success', width: '100%' };
    }
  }

  private updatePasswordChecks(password: string): void {
    this.passwordChecks = this.validatePassword(password);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      this.markFormAsTouched();
      return;
    }

    this.submitted = true;
    console.log('Registration submitted:', this.registrationForm.value);
    
    // Reset form after 2 seconds
    setTimeout(() => {
      this.submitted = false;
      this.registrationForm.reset({
        countryCode: '+1'
      });
    }, 2000);
  }

  private markFormAsTouched(): void {
    Object.keys(this.registrationForm.controls).forEach(key => {
      const control = this.registrationForm.get(key);
      control?.markAsTouched();
    });
  }

  // Helper methods for template
  get username() { return this.registrationForm.get('username'); }
  get email() { return this.registrationForm.get('email'); }
  get password() { return this.registrationForm.get('password'); }
  get fullName() { return this.registrationForm.get('fullName'); }
  get phoneNumber() { return this.registrationForm.get('phoneNumber'); }
  get countryCode() { return this.registrationForm.get('countryCode'); }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registrationForm.get(fieldName);
    return field ? field.invalid && (field.touched || field.dirty) : false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.registrationForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) {
      return `${this.getFieldLabel(fieldName)} is required`;
    }
    
    if (field.errors['invalidEmail']) {
      return 'Please enter a valid email address';
    }
    
    if (field.errors['weakPassword']) {
      return 'Password does not meet all requirements';
    }

    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      username: 'Username',
      email: 'Email',
      password: 'Password',
      fullName: 'Full Name',
      phoneNumber: 'Phone Number',
      countryCode: 'Country Code'
    };
    return labels[fieldName] || fieldName;
  }

  isEmailValid(): boolean {
    const emailControl = this.email;
    return emailControl ? emailControl.valid && emailControl.value : false;
  }
}
