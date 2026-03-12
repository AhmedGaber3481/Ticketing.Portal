import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LOOKUP_TYPES, LookupItem, LookupService } from '../../../shared/services/lookup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationService } from '../../../shared/services/translation.service';
import { TicketingService } from '../services/ticket.service';
import { ApiResponse } from '../../../shared/models/api.response';
//import { AuthService } from '../../user.managment/services/auth.service';
import { TicketAttachment, TicketModel } from '../models/ticket.model';
import { TranslatePipe } from '../../../shared/services/translate.pipe';
import { environment } from '../../../../environments/environments';
import { ToasterService } from '../../../shared/toaster/toaster.service';

@Component({
  selector: 'app-ticket-creation-form',
  templateUrl: './ticket.form.html',
  styleUrls: ['./ticket.form.scss'],
  imports:[ReactiveFormsModule, CommonModule, TranslatePipe]
})
export class TicketForm implements OnInit, OnDestroy {
  ticketForm!: FormGroup;
  submitted = false;

  private destroy$ = new Subject<void>();

  ticketTypes: LookupItem[] = [];
  ticketStatuses: LookupItem[] = [];
  ticketPriorities: LookupItem[] = [];
  ticketCategories: LookupItem[] = [];
  TicketId = 0;
  File: any;
  Attachments: any[] = [];
  attachments: TicketAttachment[] = [];

  constructor(private fb: FormBuilder
  ,private lookupService: LookupService
  ,private router: Router
  ,private route: ActivatedRoute
  ,private translationService: TranslationService
  ,private ticketingService: TicketingService
  //,private authService: AuthService
  ,private toasterService: ToasterService) {}

  labels: { [key: string]: string } = {
    Title: 'Title',
    Type: 'Ticket Type',
    Category: 'Ticket Category',
    Priority: 'Ticket Priority',
    Status: 'Ticket Status',
    Description: 'Description',
    CreatedAt: 'CreatedAt'
  };

  ngOnInit(): void {
    // var user = this.authService.getCurrentUser();
    // console.log("Current user", user);

    this.initializeForm();
    this.loadLookups();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getTicket(){
    this.ticketingService.GetTicket(this.TicketId)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
        next: (res: ApiResponse<TicketModel>)=>{
        console.log(res, "Ticket data");
        if(res.data){
          this.ticketForm.controls["Title"].setValue(res.data.title);
          this.ticketForm.controls["Type"].setValue(res.data.type);
          this.ticketForm.controls["Category"].setValue(res.data.category);
          this.ticketForm.controls["Status"].setValue(res.data.status);
          this.ticketForm.controls["Priority"].setValue(res.data.priority);
          this.ticketForm.controls["Description"].setValue(res.data.description);
          this.attachments = res.data.attachments;
        }
        else{
          //alert("error while get ticket");
        }
      },
      error: (errors: any)=>{
        console.log(errors);
        //alert("error while get ticket");
      }});
  }

  private initializeForm(): void {
    this.ticketForm = this.fb.group({
      Title: ['', [Validators.required]],
      Type: ['', [Validators.required]],
      Category: ['', [Validators.required]],
      Priority: ['', [Validators.required]],
      Status: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      CreatedAt: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.ticketForm.invalid) {
      this.markFormAsTouched();
      return;
    }

    this.submitted = true;
    console.log('Form submitted:', this.ticketForm.value);

    let formData:  FormData = this.getFormData();
    console.log("Form", formData)
    const lang = this.translationService.language();
    this.ticketingService.SaveTicket(formData).subscribe({
      next: (res: ApiResponse<boolean>)=>{
        if(res.data){
          this.submitted = false;
          this.ticketForm.reset();
          this.toasterService.addToast('success', "Ticket Saved Successfully","Save Success");
          this.router.navigate(['/', lang, "tickets"]);
        }
        else{
          this.toasterService.addToast('error', "error","error while submitting the ticket");
          //alert("error while submitting the ticket");
        }
      },
      error: (errors: any)=>{
        console.log(errors);
        alert("error while submitting the ticket");
      }
    });
  }

  onCancel(): void {
    this.ticketForm.reset();
    this.submitted = false;
    const lang = this.translationService.language();
    this.router.navigate(["/", lang, "tickets"]);
  }

  private markFormAsTouched(): void {
    Object.keys(this.ticketForm.controls).forEach(key => {
      const control = this.ticketForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.ticketForm.get(fieldName);
    return field ? field.invalid && (field.touched || field.dirty) : false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.ticketForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) {
      return `${this.getFieldLabel(fieldName)} is required`;
    }

    return '';
  }

  private getFieldLabel(fieldName: string): string {
    return this.labels[fieldName] || fieldName;
  }

  loadLookups() {
    // this.lookupService.get<LookupItem[]>(LOOKUP_TYPES.TicketType).subscribe({
    //   next: (response: any) => {
    //       console.log('Ticket types loaded:', response.data);
    //       this.ticketTypes = response.data;
    //   },
    //   error: (error: any) => {
    //     console.error('Error loading ticket types:', error);
    //   }

    // });
    // this.lookupService.get<LookupItem[]>(LOOKUP_TYPES.TicketStatus).subscribe({
    //   next: (response: any) => {
    //       this.ticketStatuses = response.data;
    //   },
    //   error: (error: any) => {
    //     console.error('Error loading ticket statuses:', error);
    //   }
    // });
    // this.lookupService.get<LookupItem[]>(LOOKUP_TYPES.TicketPriority).subscribe({
    //   next: (response: any) => {
    //       this.ticketPriorities = response.data;
    //   },
    //   error: (error: any) => {
    //     console.error('Error loading ticket priorities:', error);
    //   }
    // });
    // this.lookupService.get<LookupItem[]>(LOOKUP_TYPES.TicketCategory).subscribe({
    //   next: (response: any) => {
    //       this.ticketCategories = response.data;
    //   },
    //   error: (error: any) => {
    //     console.error('Error loading ticket categories:', error);
    //   }
    // });
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
            this.getTicketData();
        },
        error: (error: any) => {
          console.error('Error loading ticket lookups:', error);
        }
      });
  }
  getTicketData(){
    const ticketId =this.route.snapshot.paramMap.get("TicketId");
    console.log("TicketId", ticketId)
    if(ticketId){
      this.TicketId = parseInt(ticketId);
      this.getTicket();
    }
  }

  getFormData(){
    let formData: FormData = new FormData();
    formData.append('Id', this.TicketId.toString());

    for(var key in this.ticketForm.value){
      if(key !== 'File') {  // Exclude the File field from being appended here
        formData.append(key, this.ticketForm.value[key]);
      }
    }
    for(let i = 0; i < this.Attachments.length; i++){
      if(this.Attachments[i].File) {
        formData.append('Files', this.Attachments[i].File);
      }
    }
    if(this.attachments && this.attachments.length > 0){
      for(let i = 0; i < this.attachments.length; i++){
        if(this.attachments[i].attachmentId > 0)
          formData.append('AttachmentSerials', this.attachments[i].attachmentId.toString());
      }
    }
    return formData;
  }
  onFileChange(event: any, index: number) {
    this.Attachments[index].File = event.target.files[0];
  }

  addAttachment() {
    this.Attachments.push({});
  }
  canAddAttachment(){
    return this.Attachments.length  == 0 || !!this.Attachments[this.Attachments.length -1].File;
  }

  deleteSavedAttachment(attachmentId: number){
    if(attachmentId > 0){
      var index = this.attachments.findIndex(x=> x.attachmentId == attachmentId);
      if(index >=0){
        this.attachments.splice(index, 1);
      }
    }
  }
  deleteAttachment(index: number){
    if(index >=0){
      this.Attachments.splice(index, 1);
    }
  }

  getAttachmentURL(URL: string){
    return URL ? `${environment.AttachmentBaseUrl}${URL}` : "";
  }
}
