import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { BadgeModule } from 'primeng/badge';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, ToolbarModule, CardModule, ButtonModule, TableModule, ProgressBarModule, BadgeModule, DialogModule, InputTextModule, InputNumberModule, DropdownModule, InputTextareaModule, ReactiveFormsModule, ToastModule],
  providers: [MessageService]
})
export class AdminDashboardComponent implements OnInit {

  // Dialog visibility flags
  addPropertyVisible = false;
  createListingVisible = false;
  manageUsersVisible = false;
  reportsVisible = false;

  // Form groups
  propertyForm!: FormGroup;
  listingForm!: FormGroup;
  usersForm!: FormGroup;

  // Data for dropdowns
  propertyTypes = [
    { label: 'Apartment', value: 'apartment' },
    { label: 'House', value: 'house' },
    { label: 'Villa', value: 'villa' },
    { label: 'Commercial', value: 'commercial' }
  ];

  cities = [
    { label: 'Mumbai', value: 'mumbai' },
    { label: 'Pune', value: 'pune' },
    { label: 'Delhi', value: 'delhi' },
    { label: 'Bengaluru', value: 'bengaluru' },
    { label: 'Hyderabad', value: 'hyderabad' }
  ];

  stats = [
    { label: 'Total Users', value: 1284, icon: 'pi pi-users', change: '+4.2%' },
    { label: 'Properties', value: 342, icon: 'pi pi-home', change: '+1.1%' },
    { label: 'Active Listings', value: 214, icon: 'pi pi-check-circle', change: '+2.8%' },
    { label: 'Monthly Revenue', value: 25430, icon: 'pi pi-wallet', change: '+6.5%' }
  ];

  recentProperties = [
    { id: 1, title: 'Cozy 2BHK in Downtown', city: 'Mumbai', price: '12Cr', status: 'Available' },
    { id: 2, title: 'Luxury Villa near Lake', city: 'Pune', price: '85L', status: 'Rented' },
    { id: 3, title: 'Studio Apartment', city: 'Delhi', price: '9Cr', status: 'Available' },
    { id: 4, title: 'Family Home with Garden', city: 'Bengaluru', price: '45L', status: 'Maintenance' }
  ];

  allUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Agent', joinDate: '2023-11-20' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Admin', joinDate: '2023-06-10' }
  ];

  constructor(private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    this.initializeForms();
  }

  initializeForms() {
    // Add Property Form
    this.propertyForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      city: ['', [Validators.required]],
      propertyType: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      bedrooms: ['', [Validators.required, Validators.min(1)]],
      bathrooms: ['', [Validators.required, Validators.min(1)]],
      area: ['', [Validators.required, Validators.min(1)]]
    });

    // Listing Form
    this.listingForm = this.fb.group({
      propertyId: ['', [Validators.required]],
      listingTitle: ['', [Validators.required]],
      description: ['', [Validators.required]],
      duration: ['', [Validators.required]]
    });

    // Users Management Form
    this.usersForm = this.fb.group({
      userId: ['', [Validators.required]],
      action: ['', [Validators.required]]
    });
  }

  // Add Property Methods
  openAddPropertyDialog() {
    this.addPropertyVisible = true;
    this.propertyForm.reset();
  }

  submitAddProperty() {
    if (this.propertyForm.valid) {
      console.log('Property Data:', this.propertyForm.value);
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Property added successfully!'});
      this.addPropertyVisible = false;
      this.propertyForm.reset();
    } else {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please fill all required fields'});
    }
  }

  // Create Listing Methods
  openCreateListingDialog() {
    this.createListingVisible = true;
    this.listingForm.reset();
  }

  submitCreateListing() {
    if (this.listingForm.valid) {
      console.log('Listing Data:', this.listingForm.value);
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Listing created successfully!'});
      this.createListingVisible = false;
      this.listingForm.reset();
    } else {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please fill all required fields'});
    }
  }

  // Manage Users Methods
  openManageUsersDialog() {
    this.manageUsersVisible = true;
    this.usersForm.reset();
  }

  submitManageUsers() {
    if (this.usersForm.valid) {
      console.log('User Action:', this.usersForm.value);
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'User updated successfully!'});
      this.manageUsersVisible = false;
      this.usersForm.reset();
    } else {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please fill all required fields'});
    }
  }

  // Reports Methods
  openReportsDialog() {
    this.reportsVisible = true;
  }

  downloadReport(type: string) {
    this.messageService.add({severity: 'info', summary: 'Generating Report', detail: `${type} report is being generated...`});
    console.log('Downloading report:', type);
  }

  statusSeverity(status: string) {
    switch (status) {
      case 'Available': return 'success';
      case 'Rented': return 'info';
      case 'Maintenance': return 'warning';
      default: return 'secondary';
    }
  }

}
