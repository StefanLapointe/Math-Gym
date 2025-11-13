import { Component, inject } from '@angular/core';
import { AuthState } from '../../auth/auth-state';

@Component({
  selector: 'app-settings-page',
  imports: [],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.css'
})
export class SettingsPage {
  protected readonly authState = inject(AuthState);
  deleteAccount() {
    if (confirm("Are you sure you want to delete your account?")) {
      this.authState.terminate();
    }
  }
}
