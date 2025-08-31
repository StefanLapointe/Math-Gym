import { Component, inject, input, } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-problem-type-button',
  imports: [],
  templateUrl: './problem-type-button.html',
  styleUrl: './problem-type-button.css'
})
export class ProblemTypeButton {
  private router = inject(Router);
  problemType = input("");
  showProblem() {
    this.router.navigate(["/train", this.problemType]);
  }
}
