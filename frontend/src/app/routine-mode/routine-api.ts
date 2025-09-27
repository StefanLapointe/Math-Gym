import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

interface Routine {
  components: [{problemType: string, count: number}],
  length: number
}

@Injectable({
  providedIn: 'root'
})
export class RoutineApi {
  private readonly http = inject(HttpClient);
  getRoutine(routineId: string) {
    return this.http.get<Routine>(`/api/routines/${routineId}`);
  }
}
