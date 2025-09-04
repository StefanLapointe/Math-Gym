import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProblemApi {
  http = inject(HttpClient);
  listTypes() {
    return this.http.get<string[]>(`${environment.apiUrl}/api/list`);
  }
  generateStatement(problemType: string) {
    return this.http.post<{statement: string, seed: number}>(`${environment.apiUrl}/api/generate`, problemType);
  }
  evaluateResponse(problemResponse: {problemType: string, seed: number, response: string}) {
    return this.http.post<{correct: boolean, correction: string}>(`${environment.apiUrl}/api/evaluate`, problemResponse);
  }
}
