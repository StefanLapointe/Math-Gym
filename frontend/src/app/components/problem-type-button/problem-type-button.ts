import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-problem-type-button',
  imports: [],
  templateUrl: './problem-type-button.html',
  styleUrl: './problem-type-button.css'
})
export class ProblemTypeButton {
  @Input() problemType: string = "";
}
