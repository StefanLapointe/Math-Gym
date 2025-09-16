import { Component, inject } from '@angular/core';
import { ProblemTypeList } from "../../math-problems/problem-type-list/problem-type-list";
import { AuthState } from '../../auth/auth-state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [ProblemTypeList],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {
  protected readonly authState = inject(AuthState);
  protected readonly router = inject(Router);
}
