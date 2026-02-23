import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { TranslatePipe } from '../../../shared/services/translate.pipe';
//import { TranslatePipe } from '../../../shared/translate.pipe';

export interface LoginRequest {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private router = inject(Router);
  //private cdr = inject(ChangeDetectorRef);

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';
    //this.cdr.markForCheck();

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    //this.cdr.markForCheck();

    const loginData: LoginRequest = {
      username: this.f['username'].value,
      password: this.f['password'].value,
      rememberMe: this.f['rememberMe'].value
    };

  //   this.apiService.post<LoginResponse>('/auth/login', loginData).subscribe({
  //     next: (response: any) => {
  //       if (response.success) {
  //         localStorage.setItem('auth_token', response.data.token);
  //         localStorage.setItem('user', JSON.stringify(response.data.user));
  //         this.router.navigate(['/']);
  //       } else {
  //         this.error = response.message;
  //       }
  //       this.loading = false;
  //       //this.cdr.markForCheck();
  //     },
  //     error: (error : any) => {
  //       this.error = error.message;
  //       this.loading = false;
  //       //this.cdr.markForCheck();
  //     }
  //   });
  }
}
