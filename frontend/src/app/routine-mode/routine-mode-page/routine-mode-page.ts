import { Component, computed, inject, signal, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameFacade } from '../../game/game-facade';
import { GameState } from '../../game/game-state';
import { RoutineApi } from '../routine-api';
import { GameOptions } from '../../game/game-api';

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
  protected readonly totalAnswers = computed(() => {
    if (this.gameState.waitingForAnswer()) return this.gameState.problemNumber() - 1;
    return this.gameState.problemNumber();
  })
  protected readonly score = computed(() => {
    return 100 * this.gameState.correctAnswers() / this.totalAnswers();
  });
  private guestMode = false;
  ngOnInit() {
    this.route.params.subscribe(params => {
      const gameId = params["gameId"];
      this.guestMode = gameId == "guest";
      if (this.guestMode) {
        this.route.queryParams.subscribe(queryParams => {
          const routineId = queryParams["routineId"];
          const gameOptions: GameOptions = {
            gameMode: "routine",
            routineId
          };
          this.gameFacade.initialize(gameOptions);
          this.routineApi.getRoutine(routineId).subscribe(routine => {
            this.length.set(routine.length);
          });
        });
      } else {
        const gameOptions = this.gameState.gameOptions();
        if (gameOptions?.gameMode == "routine") {
          this.routineApi.getRoutine(gameOptions.routineId).subscribe(routine => {
            this.length.set(routine.length);
          });
        }
      }
    });
  }
  protected next() {
    this.gameFacade.loadNextProblem(this.guestMode);
    const answerBox = document.getElementById("answer-box") as HTMLInputElement;
    answerBox.value = "";
  }
  protected submit() {
    const answerBox = document.getElementById("answer-box") as HTMLInputElement;
    const attempt = answerBox.value;
    this.gameFacade.submitAttempt(attempt, this.guestMode);
  }
}
