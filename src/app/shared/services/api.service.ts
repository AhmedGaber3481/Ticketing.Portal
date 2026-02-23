import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TranslationService } from './translation.service';
import { environment } from '../../../environments/environments';

// export interface ApiResponse<T> {
//   data: T;
//   message: string;
//   success: boolean;
// }

// export interface ApiError {
//   message: string;
//   status: number;
//   error: any;
// }

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.BaseAPiUrl;

  constructor(private http: HttpClient, private translationService: TranslationService) {}

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Language': this.translationService.getCurrentCulture()
    });
    
    return headers;
  }

  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const options = {
      headers: this.getHeaders(),
      params: params
    };

    return this.http.get<T>(url, options);
  }

  // post<T>(endpoint: string, body: any, params?: HttpParams): Observable<ApiResponse<T>> {
  //   const url = `${this.baseUrl}${endpoint}`;
  //   const options = {
  //     headers: this.getHeaders(),
  //     params: params
  //   };

  //   return this.http.post<ApiResponse<T>>(url, body, options).pipe(
  //     catchError(this.handleError)
  //   );
  // }
}
