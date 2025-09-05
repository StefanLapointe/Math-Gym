import { Component, inject } from '@angular/core';
import { ProblemTypeList } from "../../math-problems/problem-type-list/problem-type-list";

@Component({
  selector: 'app-home',
  imports: [ProblemTypeList],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
