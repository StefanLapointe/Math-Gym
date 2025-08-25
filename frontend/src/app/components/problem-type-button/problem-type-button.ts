import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-problem-type-button',
  imports: [],
  templateUrl: './problem-type-button.html',
  styleUrl: './problem-type-button.css'
})
export class ProblemTypeButton {
  private router = inject(Router);
  @Input() problemType: string = "";
  showProblem() {
    this.router.navigate(["/train", this.problemType]);
  }
}
