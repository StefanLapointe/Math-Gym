import { Component, inject } from '@angular/core';
import { ProblemTypeButton } from "../problem-type-button/problem-type-button";
import { ProblemTypeApi } from '../../math-problems/problem-api';

@Component({
  selector: 'app-problem-type-list',
  imports: [ProblemTypeButton],
  templateUrl: './problem-type-list.html',
  styleUrl: './problem-type-list.css'
})
export class ProblemTypeList {
  problemTypes: string[] = [];
  problemApi = inject(ProblemTypeApi);
  constructor() {
    this.problemApi.getProblemTypes().subscribe(problemTypes => {
      this.problemTypes = problemTypes;
    });
  }
}