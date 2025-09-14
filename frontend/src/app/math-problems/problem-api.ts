import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProblemApi {
  private readonly http = inject(HttpClient);
  listTypes() {
    return this.http.get<string[]>("api/problem/list");
  }
  generateStatement(problemType: string) {
    return this.http.post<{statement: string, seed: number}>("/api/problem/generate", problemType);
  }
  evaluateResponse(problemResponse: {problemType: string, seed: number, response: string}) {
    return this.http.post<{correct: boolean, correction: string}>("api/problem/evaluate", problemResponse);
  }
}
