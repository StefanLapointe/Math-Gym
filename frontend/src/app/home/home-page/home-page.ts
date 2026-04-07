import { Component, inject } from '@angular/core';
import { ProblemTypeList } from '../../endless-mode/problem-type-list/problem-type-list';
import { AuthState } from '../../auth/auth-state';
import { Router } from '@angular/router';
import { RoutineModeList } from '../../routine-mode/routine-mode-list/routine-mode-list';
import { SavedGameMenu } from '../saved-game-menu/saved-game-menu';

@Component({
  selector: 'app-home-page',
  imports: [SavedGameMenu, ProblemTypeList, RoutineModeList],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {
  protected readonly authState = inject(AuthState);
  protected readonly router = inject(Router);
}
