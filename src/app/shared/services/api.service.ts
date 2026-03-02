import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TranslationService } from './translation.service';
import { environment } from '../../../environments/environments';

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

  get<T>(endpoint: string, params?: HttpParams, baseUrl?: string): Observable<T> {
    const url = `${baseUrl ?? this.baseUrl}${endpoint}`;
    const options = {
      headers: this.getHeaders(),
      params: params,
      withCredentials: true
    };

    return this.http.get<T>(url, options);
  }

  post<T>(endpoint: string, body: any, params?: HttpParams, baseUrl?: string): Observable<T> {
    const url = `${baseUrl ?? this.baseUrl}${endpoint}`;
    const options = {
      headers: this.getHeaders(),
      params: params,
      withCredentials: true
    };

    return this.http.post<T>(url, body, options);
  }
}
