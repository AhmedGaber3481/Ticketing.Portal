import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { GridComponent } from '../../../shared/grid/grid.component';
import { HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../shared/services/translate.pipe';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { LookupService, LOOKUP_TYPES, LookupItem } from '../../../shared/services/lookup.service';
import { ApiResponse } from '../../../shared/models/api.response';
import { AuthService } from '../../user.managment/services/auth.service';
import { TranslationService } from '../../../shared/services/translation.service';
import { forkJoin } from 'rxjs';
import { LoaderComponent } from '../../../shared/loader.component/loader.component';

@Component({
  selector: 'app-ticket.list',
  imports: [CommonModule, GridComponent, TranslatePipe, ReactiveFormsModule, LoaderComponent],
  templateUrl: './ticket.list.html'
  //styleUrl: './ticket.list.scss'
})
export class TicketList implements OnInit {
  pageSize: number = 10;
  dataSource = signal<any[]>([]);
  totalRows = signal(0);
  countPages = signal(0);
  sortKey?: string;
  sortDirection?: 'asc'|'desc';
  isLoading = true;

  // Filter form
  filterForm: FormGroup = new FormGroup({
    ticketType: new FormControl(''),
    ticketStatus: new FormControl(''),
    ticketPriority: new FormControl(''),
    ticketCategory: new FormControl(''),
    search: new FormControl('')
  });

  // Lookup data
  ticketTypes: LookupItem[] = [];
  ticketStatuses: LookupItem[] = [];
  ticketPriorities: LookupItem[] = [];
  ticketCategories: LookupItem[] = [];

   constructor(private apiService: ApiService
    ,private router: Router
    ,private lookupService: LookupService
    ,private authService:  AuthService
    ,private translationService: TranslationService) {
      console.log('TicketList component initialized');
  }

  ngOnInit(){
    console.log("user in ticketing list", this.authService.userSubject.value);
    this.loadLookups();
  }

  loadLookups() {
    forkJoin({
      ticketTypes: this.lookupService.get<LookupItem[]>(LOOKUP_TYPES.TicketType),
      ticketStatuses: this.lookupService.get<LookupItem[]>(LOOKUP_TYPES.TicketStatus),
      ticketPriorities: this.lookupService.get<LookupItem[]>(LOOKUP_TYPES.TicketPriority),
      ticketCategories: this.lookupService.get<LookupItem[]>(LOOKUP_TYPES.TicketCategory)
    }).subscribe({
      next: (response: any) => {
          console.log('Ticket lookups loaded:', response);
          this.ticketTypes = response.ticketTypes.data;
          this.ticketStatuses = response.ticketStatuses.data;
          this.ticketPriorities = response.ticketPriorities.data;
          this.ticketCategories = response.ticketCategories.data;

          this.loadTickets(1);
      },
      error: (error: any) => {
        console.error('Error loading ticket lookups:', error);
      }
    });

    /*this.lookupService.get<LookupItem[]>(LOOKUP_TYPES.TicketType).subscribe({
      next: (response: any) => {
         console.log('Ticket types loaded:', response.data);
         this.ticketTypes = response.data;
      },
      error: (error: any) => {
        console.error('Error loading ticket types:', error);
      }

    });
    this.lookupService.get<LookupItem[]>(LOOKUP_TYPES.TicketStatus).subscribe({
      next: (response: any) => {
          this.ticketStatuses = response.data;
      },
      error: (error: any) => {
        console.error('Error loading ticket statuses:', error);
      }
    });
    this.lookupService.get<LookupItem[]>(LOOKUP_TYPES.TicketPriority).subscribe({
      next: (response: any) => {
          this.ticketPriorities = response.data;
      },
      error: (error: any) => {
        console.error('Error loading ticket priorities:', error);
      }
    });
    this.lookupService.get<LookupItem[]>(LOOKUP_TYPES.TicketCategory).subscribe({
      next: (response: any) => {
          this.ticketCategories = response.data;
      },
      error: (error: any) => {
        console.error('Error loading ticket categories:', error);
      }
    });*/
  }

  loadTickets(pageIndex: number) {
   var params = new HttpParams()
  .set('PageNumber', pageIndex)
  .set('PageSize', this.pageSize)
  .set('SortBy', this.sortKey || '')
  .set('SortDirection', this.sortDirection || '')
  .set('TicketType', this.filterForm.value.ticketType || '')
  .set('TicketStatus', this.filterForm.value.ticketStatus || '')
  .set('TicketPriority', this.filterForm.value.ticketPriority || '')
  .set('TicketCategory', this.filterForm.value.ticketCategory || '')
  .set('SearchValue', this.filterForm.value.search || '');

   //console.log("Loading tickets for page:", pageIndex, "with page size:", this.pageSize);
   this.isLoading = true;
   this.apiService.get('/api/Ticketing/GetTickets', params)
    .subscribe({
      next: (response: any) => {
        console.log('Tickets loaded:', response.data.items);
        this.dataSource.set(response.data.items);
        
        this.totalRows.set(response.data.totalCount);
        this.countPages.set(Math.ceil(response.data.totalCount / this.pageSize));
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading tickets:', error);
        this.totalRows.set(0);
        this.countPages.set(0);
        this.isLoading = false;
      }
    });
  }

  getSortSymbol(key: string): string {
    if(this.sortKey !== key) return '⇅';
    return this.sortDirection === 'asc' ? '▲' : '▼';
  }
  
  applyFilter() {
    this.loadTickets(1);
  }

  onSort(key: string) {
    if(this.sortKey === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }
    this.loadTickets(1);
  }
  newTicket(){
    const lang = this.translationService.language();
    this.router.navigate(["/", lang, "newticket"]);
  }

  onEdit(ticketId: any){
    const lang = this.translationService.language();
    this.router.navigate(["/", lang, "ticket", ticketId]);
  }
  onDelete(ticketId: any){
    
  }

  //  getStatusBadgeClass(status: 'New' | 'Pending' | 'Closed'): string {
  //     const styles = {
  //       New: 'bg-green-100 text-green-800 border-green-200',
  //       Pending: 'bg-orange-100 text-orange-800 border-orange-200',
  //       Closed: 'bg-gray-100 text-gray-800 border-gray-200',
  //     };
  //     return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`;
  //   }
  
  //   getPriorityBadgeClass(priority: string): string {
  //     const styles = {
  //       High: 'bg-red-100 text-red-800 border-red-200',
  //       Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  //       Low: 'bg-blue-100 text-blue-800 border-blue-200',
  //     };
  //     return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[priority]}`;
  //   }
}
