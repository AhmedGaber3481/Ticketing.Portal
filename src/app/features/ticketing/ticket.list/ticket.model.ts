import { Injectable } from "@angular/core";

@Injectable()
export class TicketListModel{
  dataSource: any[] = [];
  totalRows: number = 0;
  countPages: number = 0;
}