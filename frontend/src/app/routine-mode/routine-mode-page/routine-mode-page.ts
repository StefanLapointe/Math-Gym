import { Component, computed, inject, signal, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameFacade } from '../../game/game-facade';
import { GameState } from '../../game/game-state';
import { RoutineApi } from '../routine-api';

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
  private readonly routineApi = inject(RoutineApi);
  protected readonly length = signal(0);
  protected readonly score = computed(() => {
    const totalAnswers = this.gameState.waitingForAnswer() ? this.gameState.problemNumber() - 1 : this.gameState.problemNumber();
    return 100 * this.gameState.correctAnswers() / totalAnswers;
  });
  ngOnInit() {
    this.route.params.subscribe(params => {
      const gameMode = "routine";
      const routineId = params["routineId"];
      this.gameFacade.startNewGame({gameMode, routineId});
      this.gameFacade.loadNextProblem();
      this.routineApi.getRoutine(routineId).subscribe(routine => {
        this.length.set(routine.length);
      })
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
