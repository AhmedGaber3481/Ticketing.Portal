import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../../shared/loader.component/loader.component';
import { PagingComponent } from '../../../shared/grid/grid.paging.component';
import { UserService } from '../services/user.service';
import { UserListModel, UserListResult } from '../models/user.list.model';
import { ApiResponse } from '../../../shared/models/api.response';

@Component({
  selector: 'app-user.list',
  imports: [CommonModule, PagingComponent, LoaderComponent],
  templateUrl: './user.list.html',
  styleUrl: './user.list.component.scss'
})
export class UserListComponent implements OnInit {
  users: UserListModel[] = [];
  pageIndex = 1;
  pageSize = 10;
  totalCount = 0;
  sortColumn = 'username';
  sortDirection: 'asc' | 'desc' = 'asc';
  isLoading = true;

  constructor(private userService: UserService) {
    console.log('UserList component initialized');
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    const request = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      sortColumn: this.sortColumn,
      sortDirection: this.sortDirection
    };

    this.isLoading = true;
    this.userService.getUsers(request).subscribe({
      next: (response: ApiResponse<UserListResult>) => {
        console.log('Users loaded:', response.data.items);
        this.users = response.data.items;
        this.totalCount = response.data.totalCount;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.users = [];
        this.totalCount = 0;
        this.isLoading = false;
      }
    });
  }

  sortByUsername() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.loadUsers();
  }

  onPageChange(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.loadUsers();
  }

  getSortSymbol(): string {
    return this.sortDirection === 'asc' ? '▲' : '▼';
  }

  get countPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }
}
