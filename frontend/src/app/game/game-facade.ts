import { inject, Injectable } from '@angular/core';
import { GameApi, GameOptions } from './game-api';
import { GameState } from './game-state';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameFacade {
  private readonly gameApi = inject(GameApi);
  private readonly gameState = inject(GameState);
  private readonly router = inject(Router);
  startNewGame(gameOptions: GameOptions, guestMode: boolean) {
    /*
    Basically what needs to happen here is if it's guest mode you go to /training/guest/gameMode/gameOption
    and if it's not guest mode you call gameApi.newGame() and then go to /training/gameId.
    It is the responsibility of those pages to then initialize the game state in their ngInit.
    Maybe this class can have some helper methods for that.
    Actually it can just be one "initialize" method with a guest mode flag.
    */
    if (guestMode) {
      this.router.navigate(["/training/guest"], {queryParams: gameOptions});
    } else {
      this.gameApi.newGame({gameOptions}).subscribe(({gameId}) => {
        this.router.navigate(["/training", gameId]);
      });
    }
  }
  // This is for guest mode where the game options are determined from the query parameters.
  initialize(gameOptions: GameOptions) {
    this.gameState.gameOptions.set(gameOptions);
    this.gameState.problemNumber.set(0);
    this.gameState.correctAnswers.set(0);
    this.gameState.gameOver.set(false);
    this.gameState.statement.set("");
    this.gameState.seed.set(0);
    this.gameState.waitingForAnswer.set(false);
    this.gameState.correct.set(false);
    this.gameState.correction.set("");
    this.loadNextProblem(true);
  }
  // This is for authenticated mode where the game mode must be retrieved from DB.
  loadState(gameId: string, callback: (gameMode: string) => void) {
    this.gameApi.gameState(gameId).subscribe(({gameOptions, problemNumber, correctAnswers}) => {
      this.gameState.gameOptions.set(gameOptions);
      this.gameState.problemNumber.set(problemNumber);
      this.gameState.correctAnswers.set(correctAnswers);
      this.gameState.gameOver.set(false);
      this.gameState.statement.set("");
      this.gameState.waitingForAnswer.set(false);
      this.gameState.correct.set(false);
      this.gameState.correction.set("");
      this.gameState.gameId.set(gameId);
      this.loadNextProblem(false);
      callback(gameOptions.gameMode);
    });
  }
  loadNextProblem(guestMode: boolean) {
    if (!guestMode) {
      this.gameApi.userProblem(this.gameState.gameId()).subscribe(({problemNumber, statement}) => {
        this.gameState.problemNumber.set(problemNumber);
        this.gameState.statement.set(statement);
        this.gameState.waitingForAnswer.set(true);
      });
      return;
    }

    const gameOptions = this.gameState.gameOptions();
    if (gameOptions == null) {
      throw new Error("loadNextProblem called before startNewGame");
    }
    this.gameState.problemNumber.update(value => value + 1);
    const problemNumber = this.gameState.problemNumber();
    this.gameApi.guestProblem({gameOptions, problemNumber}).subscribe(({statement, seed}) => {
      this.gameState.statement.set(statement);
      this.gameState.seed.set(seed);
      this.gameState.waitingForAnswer.set(true);
    });
  }
  submitAttempt(attempt: string, guestMode: boolean) {
    if (!guestMode) {
      this.gameApi.userSolution(this.gameState.gameId(), {attempt}).subscribe(({correct, correction, correctAnswers, gameOver}) => {
        this.gameState.correct.set(correct);
        this.gameState.correction.set(correction);
        this.gameState.correctAnswers.set(correctAnswers);
        this.gameState.gameOver.set(gameOver);
        this.gameState.waitingForAnswer.set(false);
      });
      return;
    }

    const gameOptions = this.gameState.gameOptions();
    if (gameOptions == null) {
      throw new Error("submitAttempt called before startNewGame");
    }
    const problemNumber = this.gameState.problemNumber();
    const correctAnswers = this.gameState.correctAnswers();
    const seed = this.gameState.seed();
    this.gameApi.guestSolution({gameOptions, problemNumber, correctAnswers, seed, attempt}).subscribe(({correct, correction, gameOver}) => {
      if (correct) {
        this.gameState.correctAnswers.update(value => value + 1);
      }
      this.gameState.correct.set(correct);
      this.gameState.correction.set(correction);
      this.gameState.gameOver.set(gameOver);
      this.gameState.waitingForAnswer.set(false);
    });
  }
}
