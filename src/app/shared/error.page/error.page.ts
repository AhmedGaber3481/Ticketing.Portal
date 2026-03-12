import { Component, OnInit } from '@angular/core';
import { ErrorCardComponent, ErrorCardModel } from '../error.card/error.card';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error.page',
  imports: [ErrorCardComponent],
  templateUrl: './error.page.html',
  styleUrl: './error.page.scss',
})
export class ErrorPage implements OnInit {

  error!: ErrorCardModel; 
  errors: ErrorCardModel[] = [
    {
      code: '500',
      title: 'Server Error',
      message: 'Something went wrong',
      actionText: 'Try Again',
    },
    {
      code: '401',
      title: 'Unauthorized',
      message: 'You are not authorized to access this resource',
      actionText: 'Login',
    },
    {
      code: '404',
      title: 'Not Found',
      message: 'The requested page could not be found',
      actionText: 'Go to Home',
    },
    {
      code: '400',
      title: 'Bad request',
      message: 'Invalid request',
      actionText: 'Go to Home',
    }
  ];
  
  constructor(private route: ActivatedRoute){
  }

  ngOnInit(){
    const errorCode = this.route.snapshot.paramMap.get("errorCode") || "404";
    this.error = this.errors.filter(x => x.code == errorCode)[0];
  }

  onAction(event: any){
    console.log("event", event);
  }
}
