import { Component, inject } from '@angular/core';
import { ProblemTypeButton } from '../../components/problem-type-button/problem-type-button';
import { ProblemApi } from '../../math-problems/problem-api';

@Component({
  selector: 'app-home',
  imports: [ProblemTypeButton],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  problemTypes: string[] = [];
  problemApi = inject(ProblemApi);
  constructor() {
    this.problemApi.listTypes().subscribe(problemTypes => {
      this.problemTypes = problemTypes;
    });
  }
}
