import { Component, inject } from '@angular/core';
import { ProblemTypeList } from "../../math-problems/problem-type-list/problem-type-list";

@Component({
  selector: 'app-home-page',
  imports: [ProblemTypeList],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {

}
