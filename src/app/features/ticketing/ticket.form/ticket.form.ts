import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LOOKUP_TYPES, LookupItem, LookupService } from '../../../shared/services/lookup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationService } from '../../../shared/services/translation.service';
import { right } from '@popperjs/core';
import { TicketingService } from '../services/ticket.service';
import { ApiResponse } from '../../../shared/models/api.response';
import { AuthService } from '../../user.managment/services/auth.service';

@Component({
  selector: 'app-ticket-creation-form',
  templateUrl: './ticket.form.html',
  styleUrls: ['./ticket.form.scss'],
  imports:[ReactiveFormsModule, CommonModule]
})
export class TicketForm implements OnInit, OnDestroy {
  ticketForm!: FormGroup;
  submitted = false;

  private destroy$ = new Subject<void>();

  // Form options
  // Lookup data
  ticketTypes: LookupItem[] = [];
  ticketStatuses: LookupItem[] = [];
  ticketPriorities: LookupItem[] = [];
  ticketCategories: LookupItem[] = [];
  TicketId =0;
  File: any;
  Attachments: any[] = [];

  constructor(private fb: FormBuilder
  ,private lookupService: LookupService
  ,private router: Router
  ,private route: ActivatedRoute
  ,private translationService: TranslationService
  ,private ticketingService: TicketingService
  ,private authService: AuthService) {}

  labels: { [key: string]: string } = {
    Title: 'Title',
    Type: 'Ticket Type',
    Category: 'Ticket Category',
    Priority: 'Ticket Priority',
    Status: 'Ticket Status',
    Description: 'Description'
  };

  ngOnInit(): void {
    const ticketId =this.route.snapshot.queryParamMap.get("TicketId");
    if(ticketId){
      this.TicketId = parseInt(ticketId);
    }
    var user = this.authService.getCurrentUser();
    console.log("Current user", user);

    this.initializeForm();
    this.loadLookups();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.ticketForm = this.fb.group({
      Title: ['', [Validators.required]],
      Type: ['', [Validators.required]],
      Category: ['', [Validators.required]],
      Priority: ['', [Validators.required]],
      Status: ['', [Validators.required]],
      Description: ['', [Validators.required]]
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
          alert("success");
          this.submitted = false;
          this.ticketForm.reset();
          this.router.navigate(['/', lang, "tickets"])
        }
        else{
          alert("error while submitting the ticket");
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
  }

  private markFormAsTouched(): void {
    Object.keys(this.ticketForm.controls).forEach(key => {
      const control = this.ticketForm.get(key);
      control?.markAsTouched();
    });
  }

  // Helper methods for template
  // get title() { return this.ticketForm.get('title'); }
  // get type() { return this.ticketForm.get('type'); }
  // get category() { return this.ticketForm.get('category'); }
  // get priority() { return this.ticketForm.get('priority'); }
  // get status() { return this.ticketForm.get('status'); }
  // get description() { return this.ticketForm.get('description'); }

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
    this.lookupService.get<LookupItem[]>(LOOKUP_TYPES.TicketType).subscribe({
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
    });
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
    return formData;
  }
  onFileChange(event: any, index: number) {
    this.Attachments[index].File = event.target.files[0];
  }

  addAttachment() {
    this.Attachments.push({});
  }
}
