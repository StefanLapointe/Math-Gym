import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-routine-mode-list',
  imports: [],
  templateUrl: './routine-mode-list.html',
  styleUrl: './routine-mode-list.css'
})
export class RoutineModeList {
  protected readonly router = inject(Router);
}
