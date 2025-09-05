import { Component, inject } from '@angular/core';
import { ProblemTypeButton } from "../../components/problem-type-button/problem-type-button";
import { ProblemApi } from '../problem-api';

@Component({
  selector: 'app-problem-type-list',
  imports: [ProblemTypeButton],
  templateUrl: './problem-type-list.html',
  styleUrl: './problem-type-list.css'
})
export class ProblemTypeList {
  problemTypes: string[] = [];
  problemApi = inject(ProblemApi);
  constructor() {
    this.problemApi.listTypes().subscribe(problemTypes => {
      this.problemTypes = problemTypes;
    });
  }
}