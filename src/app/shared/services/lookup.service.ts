import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api.response";

export const LOOKUP_TYPES = {
  TicketType: 'TicketType',
  TicketCategory: 'TicketCategory',
  TicketSubCategory: 'TicketSubCategory',
  TicketPriority: 'TicketPriority',
  TicketStatus: 'TicketStatus'
};

export interface LookupItem {
  code: string;
  name: string;
  langId: any // Allow additional properties
}

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  private lookupUrl ="/Ticketing/api/Lookup/GetLookup";
  constructor(private apiService: ApiService) {}

  get<T>(lookupType: string, params?: HttpParams): Observable<ApiResponse<T>> {
    var httpParams = params ? params : new HttpParams();
    httpParams = httpParams.set('lookupType', lookupType);
    return this.apiService.get<ApiResponse<T>>(this.lookupUrl, httpParams);
  }
}