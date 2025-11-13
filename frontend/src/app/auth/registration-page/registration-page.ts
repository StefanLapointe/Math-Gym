import { Component, inject } from '@angular/core';
import { AuthState } from '../auth-state';

@Component({
  selector: 'app-registration-page',
  imports: [],
  templateUrl: './registration-page.html',
  styleUrl: './registration-page.css'
})
export class RegistrationPage {
  private readonly authState = inject(AuthState);
  register() {
    const usernameInput = document.getElementById("username") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;
    this.authState.register(usernameInput.value, passwordInput.value);
  }
}
