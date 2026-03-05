import { Injectable, signal, WritableSignal } from '@angular/core';
import { GameOptions } from './game-api';

@Injectable({
  providedIn: 'root'
})
export class GameState {
  readonly gameOptions: WritableSignal<GameOptions | null> = signal(null);
  readonly problemNumber = signal(1);
  readonly correctAnswers = signal(0);
  readonly gameOver = signal(false);
  readonly statement = signal("");
  readonly seed = signal(0);
  readonly waitingForAnswer = signal(false);
  readonly correct = signal(false);
  readonly correction = signal("");
  readonly gameId = signal("");
}
