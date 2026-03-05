import { Component, inject, input, } from '@angular/core';
import { GameOptions } from '../../game/game-api';
import { GameFacade } from '../../game/game-facade';
import { AuthState } from '../../auth/auth-state';

@Component({
  selector: 'app-problem-type-button',
  imports: [],
  templateUrl: './problem-type-button.html',
  styleUrl: './problem-type-button.css'
})
export class ProblemTypeButton {
  private gameFacade = inject(GameFacade);
  private authState = inject(AuthState);
  problemType = input("");
  startEndlessMode() {
    const gameOptions: GameOptions = {
      gameMode: "endless",
      problemType: this.problemType()
    };
    this.gameFacade.startNewGame(gameOptions, !this.authState.authenticated());
  }
}
