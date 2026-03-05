import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameFacade } from '../game-facade';
import { EndlessModePage } from "../../endless-mode/endless-mode-page/endless-mode-page";
import { RoutineModePage } from "../../routine-mode/routine-mode-page/routine-mode-page";

@Component({
  selector: 'app-training-page',
  imports: [EndlessModePage, RoutineModePage],
  templateUrl: './training-page.html',
  styleUrl: './training-page.css'
})
export class TrainingPage implements OnInit {
  private route = inject(ActivatedRoute);
  private gameFacade = inject(GameFacade);
  protected gameMode = signal("");
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const gameId = params["gameId"];
      if (gameId == "guest") {
        this.route.queryParams.subscribe((queryParams) => {
          this.gameMode.set(queryParams["gameMode"]);
        })
      } else {
        this.gameFacade.loadState(gameId, gameMode => {this.gameMode.set(gameMode)});
      }
    })
  }
}
