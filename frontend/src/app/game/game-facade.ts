import { inject, Injectable } from '@angular/core';
import { GameApi, GameOptions } from './game-api';
import { GameState } from './game-state';

@Injectable({
  providedIn: 'root'
})
export class GameFacade {
  private readonly gameApi = inject(GameApi);
  private readonly gameState = inject(GameState);
  startNewGame(gameOptions: GameOptions) {
    this.gameState.gameOptions.set(gameOptions);
    this.gameState.problemNumber.set(0);
    this.gameState.correctAnswers.set(0);
    this.gameState.gameOver.set(false);
    this.gameState.statement.set("");
    this.gameState.seed.set(0);
    this.gameState.waitingForAnswer.set(false);
    this.gameState.correct.set(false);
    this.gameState.correction.set("");
  }
  loadNextProblem() {
    const gameOptions = this.gameState.gameOptions();
    if (gameOptions == null) {
      throw new Error("loadNextProblem called before startNewGame");
    }
    this.gameState.problemNumber.update(value => value + 1);
    const problemNumber = this.gameState.problemNumber();
    this.gameApi.problem({gameOptions, problemNumber}).subscribe(guestProblemResponse => {
      this.gameState.statement.set(guestProblemResponse.statement);
      this.gameState.seed.set(guestProblemResponse.seed);
      this.gameState.waitingForAnswer.set(true);
    })
  }
  submitAttempt(attempt: string) {
    const gameOptions = this.gameState.gameOptions();
    if (gameOptions == null) {
      throw new Error("submitAttempt called before startNewGame");
    }
    const problemNumber = this.gameState.problemNumber();
    const correctAnswers = this.gameState.correctAnswers();
    const seed = this.gameState.seed();
    this.gameApi.solution({gameOptions, problemNumber, correctAnswers, seed, attempt}).subscribe(guestSolutionResponse => {
      if (guestSolutionResponse.correct) {
        this.gameState.correctAnswers.update(value => value + 1);
      }
      this.gameState.correct.set(guestSolutionResponse.correct);
      this.gameState.correction.set(guestSolutionResponse.correction);
      this.gameState.gameOver.set(guestSolutionResponse.gameOver);
      this.gameState.waitingForAnswer.set(false);
    })
  }
}
