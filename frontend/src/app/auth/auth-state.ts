import { inject, Injectable, signal } from '@angular/core';
import { AuthApi } from './auth-api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthState {
  readonly authenticated = signal(false);
  readonly username = signal("");
  private readonly authApi = inject(AuthApi);
  private readonly router = inject(Router);
  constructor() {
    this.authApi.state().subscribe(({authenticated, username}) => {
      this.authenticated.set(authenticated);
      this.username.set(username);
    })
  }
  login(username: string, password: string) {
    this.authApi.login(username, password).subscribe(({success}) => {
      if (success) {
        this.authenticated.set(true);
        this.username.set(username);
        this.router.navigate(["/"]);
      }
    });
  }
  logout() {
    this.authApi.logout().subscribe(() => {
      this.authenticated.set(false);
      this.username.set("");
    })
  }
}
