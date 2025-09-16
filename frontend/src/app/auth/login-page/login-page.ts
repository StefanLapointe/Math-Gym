import { Component, inject } from '@angular/core';
import { AuthApi } from '../auth-api';
import { AuthState } from '../auth-state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {
  private readonly authApi = inject(AuthApi);
  private readonly authState = inject(AuthState);
  private readonly router = inject(Router)
  login() {
    const usernameInput = document.getElementById("username") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;
    this.authState.login(usernameInput.value, passwordInput.value);
  }
}
