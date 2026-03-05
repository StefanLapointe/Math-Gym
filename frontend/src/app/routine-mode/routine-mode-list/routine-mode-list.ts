import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GameFacade } from '../../game/game-facade';
import { AuthState } from '../../auth/auth-state';
import { GameOptions } from '../../game/game-api';

@Component({
  selector: 'app-routine-mode-list',
  imports: [],
  templateUrl: './routine-mode-list.html',
  styleUrl: './routine-mode-list.css'
})
export class RoutineModeList {
  private readonly gameFacade = inject(GameFacade);
  private readonly authState = inject(AuthState);
  startRoutineMode(routineId: string) {
    const gameOptions: GameOptions = {
      gameMode: "routine",
      routineId
    };
    this.gameFacade.startNewGame(gameOptions, !this.authState.authenticated())
  }
}
