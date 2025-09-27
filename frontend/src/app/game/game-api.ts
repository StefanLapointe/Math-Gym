import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface EndlessGameOptions {
  gameMode: "endless",
  problemType: string
}

export interface RoutineGameOptions {
  gameMode: "routine",
  routineId: string
}

export type GameOptions = EndlessGameOptions | RoutineGameOptions;

export interface GuestProblemRequest {
  gameOptions: GameOptions,
  problemNumber: number
}

export interface GuestProblemResponse {
  statement: string,
  seed: number
}

export interface GuestSolutionRequest {
  gameOptions: GameOptions,
  problemNumber: number,
  correctAnswers: number,
  seed: number,
  attempt: string
}

export interface GuestSolutionResponse {
  correct: boolean,
  correction: string,
  gameOver: boolean
}

@Injectable({
  providedIn: 'root'
})
export class GameApi {
  private readonly http = inject(HttpClient);
  problem(problemRequest: GuestProblemRequest) {
    return this.http.post<GuestProblemResponse>("/api/games/guest/problem", problemRequest);
  }
  solution(solutionRequest: GuestSolutionRequest){
    return this.http.post<GuestSolutionResponse>("/api/games/guest/solution", solutionRequest);
  }
}
