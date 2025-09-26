import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameFacade } from '../game-facade';
import { GameState } from '../game-state';

@Component({
  selector: 'app-training-page',
  imports: [],
  templateUrl: './training-page.html',
  styleUrl: './training-page.css'
})
export class TrainingPage implements OnInit {
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
      const gameMode = "endless";
      const problemType = params["problemType"];
      this.gameFacade.startNewGame({gameMode, problemType});
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
