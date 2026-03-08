import { Injectable } from "@angular/core";
import { ApiService } from "../../../shared/services/api.service";
import { ApiResponse } from "../../../shared/models/api.response";
import { Observable } from "rxjs";
import { TicketModel } from "../models/ticket.model";

@Injectable({
  providedIn: 'root'
})

export class TicketingService{

    constructor(private apiService: ApiService) {
    }

    SaveTicket(ticket: FormData) : Observable<ApiResponse<boolean>>{
        return this.apiService.postForm<ApiResponse<boolean>>("/api/Ticketing/SaveTicket", ticket);
    }
    GetTicket(ticketId: number){
        return this.apiService.get<ApiResponse<TicketModel>>(`/api/Ticketing/GetTicket/${ticketId}`);
    }
}