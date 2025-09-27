import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameFacade } from '../../game/game-facade';
import { GameState } from '../../game/game-state';

@Component({
  selector: 'app-routine-mode-page',
  imports: [],
  templateUrl: './routine-mode-page.html',
  styleUrl: './routine-mode-page.css'
})
export class RoutineModePage {
  private readonly route = inject(ActivatedRoute);
  protected readonly gameFacade = inject(GameFacade);
  protected readonly gameState = inject(GameState);
  ngOnInit() {
    this.route.params.subscribe(params => {
      const gameMode = "routine";
      const routineId = params["routineId"];
      this.gameFacade.startNewGame({gameMode, routineId});
      this.gameFacade.loadNextProblem();
    });
  }
  protected next() {
    this.gameFacade.loadNextProblem();
    const answerBox = document.getElementById("answer-box") as HTMLInputElement;
    answerBox.value = "";
  }
  protected submit() {
    const answerBox = document.getElementById("answer-box") as HTMLInputElement;
    const attempt = answerBox.value;
    this.gameFacade.submitAttempt(attempt);
  }
}
