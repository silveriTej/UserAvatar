import { Component } from '@angular/core';
import { UserProfileComponent } from './user-profile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserProfileComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user = {
    profileImage: '',
    name: 'John Doe'
  };

  handleSelection(option: string): void {
    console.log('Option selected in AppComponent:', option);
    switch (option) {
      case 'profile':
        console.log('Profile selected');
        break;
      case 'settings':
        this.handleSettingsClick();
        break;
      case 'logout':
        this.handleLogoutClick();
        break;
      default:
        console.error('Invalid option selected');
    }
  }

  handleSettingsClick(): void {
    console.log('Settings clicked');
  }

  handleLogoutClick(): void {
    console.log('Logout clicked');
  }
}
