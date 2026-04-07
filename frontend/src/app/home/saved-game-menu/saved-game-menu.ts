import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { GameApi, GameStateResponse } from '../../game/game-api';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-saved-game-menu',
  imports: [],
  templateUrl: './saved-game-menu.html',
  styleUrl: './saved-game-menu.css',
})
export class SavedGameMenu implements OnInit {
  private readonly router = inject(Router);
  private readonly gameApi = inject(GameApi);
  protected readonly savedGames = signal<{gameId: string, gameState: GameStateResponse}[] | null>(null);
  private readonly initTimestamp = +new Date();
  ngOnInit() {
    // This component should only be displayed if the user is
    // authenticated so it's ok that this is called without checking.
    this.gameApi.games().subscribe((savedGameIds: string[]) => {
      if (savedGameIds.length == 0) return;
      forkJoin(
	savedGameIds
	  .map((gameId) =>
	    this.gameApi.gameState(gameId).pipe(map((gameState) =>
	      ({gameId, gameState}))))
      ).subscribe((gameStates) => this.savedGames.set(gameStates));
    })
  }
  protected computeAge(gameState: GameStateResponse): string {
    const ageMillis = this.initTimestamp - gameState.timestampMillis;
    const ageSeconds = Math.trunc(ageMillis / 1000);
    if (ageSeconds < 60) return "less than a minute";
    const ageMinutes = Math.trunc(ageSeconds / 60);
    if (ageMinutes < 60) return `${ageMinutes} minutes`;
    const ageHours = Math.trunc(ageMinutes / 60);
    if (ageHours < 24) return `${ageHours} hours`;
    const ageDays = Math.trunc(ageHours / 24);
    return `${ageDays} days`;
  }
  protected resume(gameId: string): void {
    this.router.navigate([`/training/${gameId}`]);
  }
}
