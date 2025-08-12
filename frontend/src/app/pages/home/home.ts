import { Component } from '@angular/core';
import { ProblemTypeButton } from '../../components/problem-type-button/problem-type-button';

@Component({
  selector: 'app-home',
  imports: [ProblemTypeButton],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  problemTypes: string[];
  constructor() {
    this.problemTypes = [];
    fetch("http://localhost:8080/api/list")
      .then(response => response.json())
      .then(json => {
        this.problemTypes = json;
      });
  }
}
