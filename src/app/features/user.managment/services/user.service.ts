import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiResponse } from '../../../shared/models/api.response';
import { UserListResult } from '../models/user.list.model';
import { environment } from "../../../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apiService: ApiService) {}

  getUsers(request: any): Observable<ApiResponse<UserListResult>> {
    let params = new HttpParams()
      .set('PageNumber', request.pageIndex || 1)
      .set('PageSize', request.pageSize || 10)
      .set('SortBy', request.sortColumn || 'UserName')
      .set('SortDirection', request.sortDirection || 'asc');

    return this.apiService.get('/api/Users/GetUsers', params, environment.BaseAuthApiURL);
  }
}
