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

// There is no UserProblemRequest since the body of the request is empty.

export interface UserProblemResponse {
  problemNumber: number,
  statement: string
}

export interface UserSolutionRequest {
  attempt: string
}

export interface UserSolutionResponse {
  correct: boolean,
  correction: string,
  correctAnswers: number,
  gameOver: boolean
}

export interface NewGameRequest {
  gameOptions: GameOptions
}

export interface NewGameResponse {
  gameId: string
}

export interface GameStateResponse {
  gameOptions: GameOptions,
  problemNumber: number,
  correctAnswers: number,
  timestampMillis: number
}

@Injectable({
  providedIn: 'root'
})
export class GameApi {
  private readonly http = inject(HttpClient);
  guestProblem(guestProblemRequest: GuestProblemRequest) {
    return this.http.post<GuestProblemResponse>("/api/games/guest/problem", guestProblemRequest);
  }
  guestSolution(guestSolutionRequest: GuestSolutionRequest) {
    return this.http.post<GuestSolutionResponse>("/api/games/guest/solution", guestSolutionRequest);
  }
  userProblem(gameId: string) {
    return this.http.get<UserProblemResponse>(`/api/games/${gameId}/problem`);
  }
  userSolution(gameId: string, userSolutionRequest: UserSolutionRequest) {
    return this.http.post<UserSolutionResponse>(`/api/games/${gameId}/solution`, userSolutionRequest);
  }
  newGame(newGameRequest: NewGameRequest) {
    return this.http.post<NewGameResponse>("/api/games", newGameRequest);
  }
  games() {
    return this.http.get<[string]>("/api/games");
  }
  gameState(gameId: string) {
    return this.http.get<GameStateResponse>(`/api/games/${gameId}`);
  }
}
