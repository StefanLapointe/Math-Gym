import { Component, inject } from '@angular/core';
import { GameFacade } from '../../game/game-facade';
import { GameState } from '../../game/game-state';

@Component({
  selector: 'app-answer-input',
  imports: [],
  templateUrl: './answer-input.html',
  styleUrl: './answer-input.css',
})
export class AnswerInput {
  protected readonly gameFacade = inject(GameFacade);
  protected readonly gameState = inject(GameState);
  protected next() {
    this.gameFacade.loadNextProblem(this.gameState.guestMode());
    const answerBox = document.getElementById("answer-box") as HTMLInputElement;
    answerBox.value = "";
  }
  protected submit() {
    const answerBox = document.getElementById("answer-box") as HTMLInputElement;
    const attempt = answerBox.value;
    this.gameFacade.submitAttempt(attempt, this.gameState.guestMode());
  }
}
