import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, MenuModule, FormsModule], 
  template: `
    <div class="user-profile">
    
      <div class="profile-avatar">
        <div class="profile-initials">{{ initials }}</div>
      </div>
  
      <div class="profile-info">
        <h4>{{ userDetails.name || 'Unknown User' }}</h4>
      <i class="pi pi-caret-down custom-dropdown-icon" (click)="menu.toggle($event)"></i>
     <p-menu #menu [popup]="true" [model]="menuItems" [appendTo]="'body'" class="dropdown-menu"></p-menu>
      </div>
    </div>
  `,
  styles: [`
    .user-profile {
      display: flex;
      align-items: center;
      position: relative;
    }

    .profile-avatar {
      border-radius: 50%;
      width: 50px;
      height: 50px;
      margin-right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #42a5f5;
      color: white;
      font-size: 20px;
      font-weight: bold;
      text-transform: uppercase;
    }

    .profile-info {
      display: flex;
      align-items: center;
      position: relative;
    }

    .profile-info h4 {
      font-size: 16px;
      margin: 0;
      margin-right: 5px; 
    }

    .custom-dropdown-icon {
      font-size: 14px;
      cursor: pointer;
      color: #42a5f5;
      margin-left: 5px;
    }

    .custom-dropdown-icon:hover {
      color: #357ae8;
    }

  
    .dropdown-menu {
      z-index: 1000; 
      position: absolute;
      top: 100%; 
      left: 0;
      margin-top: 5px; 
    }
  `]
})
export class UserProfileComponent implements OnInit {
  @Input() userDetails!: { name: string };
  @Output() onSelect = new EventEmitter<string>();
  
  initials: string = '';
  selectedOption!: string;

  menuItems = [
    { label: 'Profile', icon: 'pi pi-user', command: () => this.handleMenuSelection('profile') },
    { label: 'Settings', icon: 'pi pi-cog', command: () => this.handleMenuSelection('settings') },
    { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.handleMenuSelection('logout') }
  ];

  ngOnInit(): void {
    this.initials = this.getInitials(this.userDetails.name);
  }

  getInitials(name: string): string {
    const names = name.split(' ');
    if (names.length === 1) {
      return names[0][0].toUpperCase();
    } else if (names.length > 1) {
      return names.slice(0, 2).map(n => n[0].toUpperCase()).join('');
    }
    return '';
  }

  handleMenuSelection(option: string): void {
    this.onSelect.emit(option);
  }
}
