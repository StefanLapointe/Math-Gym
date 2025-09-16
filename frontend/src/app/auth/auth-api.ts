import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthApi {
  private readonly http = inject(HttpClient);
  login(username: string, password: string) {
    return this.http.post<{success: boolean}>("/api/auth/login", {username, password});
  }
  logout() {
    return this.http.post<void>("/api/auth/logout", null);
  }
  state() {
    return this.http.get<{authenticated: boolean, username: string}>("/api/auth/state");
  }
}
