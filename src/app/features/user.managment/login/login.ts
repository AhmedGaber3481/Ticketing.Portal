import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '../../../shared/services/translate.pipe';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ApiResponse } from '../../../shared/models/api.response';
import { LoginResult } from '../models/user.login.model';
import { Router, RouterModule } from '@angular/router';
import { TranslationService } from '../../../shared/services/translation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  styleUrls: ['./login.scss']
})
export class LoginFormComponent {
  form: FormGroup;
  showPassword = false;
  errorMessages :string[] =[];

  constructor(private fb: FormBuilder 
  , private authService: AuthService
  , private route: Router
  , public translationService: TranslationService)
  {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false],
    });
  }

  // ngAfterViewInit(){
  //   if(this.authService.IsAuthenticated()){
  //     console.log("logged in");
  //     var lang = this.translationService.language();
  //     this.route.navigate(['/',lang, 'tickets']);
  //   }
  // }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  submit(): void {
    if (this.form.invalid) {
      // mark all controls to show validation messages
      this.form.markAllAsTouched();
      return;
    }
    this.errorMessages =[];
    var lang = this.translationService.language();
    console.log("current lang" , lang);
    this.authService.SignIn({UserName: this.form.value.username, Password: this.form.value.password}).subscribe({
      next: (response: ApiResponse<LoginResult>) => {
        if(response.data?.loginSuccess){
          alert("login success");
          this.route.navigate(['/',lang, 'tickets']);
        }
        else{
          alert("Invalid username or password.");
        }
      },
      error: (error: any) => {
        //console.log(error?.error?.notifications);
        if(error.error && error.error.notifications){
           this.errorMessages = error.error.notifications;
        }
      }
    })
  }
}