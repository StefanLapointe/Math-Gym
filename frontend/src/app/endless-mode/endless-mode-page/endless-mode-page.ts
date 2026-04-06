import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswerInput } from '../../game/answer-input/answer-input';
import { GameFacade } from '../../game/game-facade';
import { GameState } from '../../game/game-state';
import { GameOptions } from '../../game/game-api';

@Component({
  selector: 'app-endless-mode-page',
  imports: [AnswerInput],
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
  ngOnInit() {
    this.route.params.subscribe(params => {
      const gameId = params["gameId"];
      this.gameState.guestMode.set(gameId == "guest");
      if (this.gameState.guestMode()) {
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
}
