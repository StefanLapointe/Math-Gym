import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameFacade } from '../../game/game-facade';
import { GameState } from '../../game/game-state';
import { GameOptions } from '../../game/game-api';

@Component({
  selector: 'app-endless-mode-page',
  imports: [],
  templateUrl: './endless-mode-page.html',
  styleUrl: './endless-mode-page.css'
})
export class EndlessModePage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  protected readonly gameFacade = inject(GameFacade);
  protected readonly gameState = inject(GameState);
  protected readonly lives = computed(() => {
    const difference = this.gameState.problemNumber() - this.gameState.correctAnswers();
    if (this.gameState.waitingForAnswer()) return 4 - difference;
    return 3 - difference;
  });
  private guestMode = false;
  ngOnInit() {
    this.route.params.subscribe(params => {
      const gameId = params["gameId"];
      this.guestMode = gameId == "guest";
      if (this.guestMode) {
        this.route.queryParams.subscribe(queryParams => {
          const problemType = queryParams["problemType"];
          const gameOptions: GameOptions = {
            gameMode: "endless",
            problemType
          };
          this.gameFacade.initialize(gameOptions);
        });
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
