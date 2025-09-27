import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProblemTypeApi {
  private readonly http = inject(HttpClient);
  getProblemTypes() {
    return this.http.get<string[]>("/api/problem-types");
  }
}
