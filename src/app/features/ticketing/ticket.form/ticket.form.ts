import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface TicketOption {
  value: string;
  label: string;
}

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
  ticketTypes: TicketOption[] = [
    { value: 'bug', label: 'Bug Report' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'support', label: 'Support' },
    { value: 'question', label: 'Question' }
  ];

  ticketCategories: TicketOption[] = [
    { value: 'technical', label: 'Technical' },
    { value: 'billing', label: 'Billing' },
    { value: 'account', label: 'Account' },
    { value: 'general', label: 'General' }
  ];

  ticketPriorities: TicketOption[] = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
  ];

  ticketStatuses: TicketOption[] = [
    { value: 'open', label: 'Open' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'on-hold', label: 'On Hold' },
    { value: 'closed', label: 'Closed' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.ticketForm = this.fb.group({
      title: ['', [Validators.required]],
      type: ['', [Validators.required]],
      category: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      status: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.ticketForm.invalid) {
      this.markFormAsTouched();
      return;
    }

    this.submitted = true;
    console.log('Form submitted:', this.ticketForm.value);
    
    // Reset form after 2 seconds
    setTimeout(() => {
      this.submitted = false;
      this.ticketForm.reset();
    }, 2000);
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
  get title() { return this.ticketForm.get('title'); }
  get type() { return this.ticketForm.get('type'); }
  get category() { return this.ticketForm.get('category'); }
  get priority() { return this.ticketForm.get('priority'); }
  get status() { return this.ticketForm.get('status'); }
  get description() { return this.ticketForm.get('description'); }

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
    const labels: { [key: string]: string } = {
      title: 'Title',
      type: 'Ticket Type',
      category: 'Ticket Category',
      priority: 'Ticket Priority',
      status: 'Ticket Status',
      description: 'Description'
    };
    return labels[fieldName] || fieldName;
  }
}
