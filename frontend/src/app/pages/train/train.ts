import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProblemApi } from '../../math-problems/problem-api';

@Component({
  selector: 'app-train',
  imports: [],
  templateUrl: './train.html',
  styleUrl: './train.css'
})
export class Train implements OnInit {
  statement = signal("Loading...");
  private seed = 0;
  private route = inject(ActivatedRoute);
  private problemType = "";
  correction = "";
  corrected = signal(false);
  buttonText = computed(() => this.corrected() ? "Next" : "Submit!");
  completed = signal(0);
  correct = signal(0);
  problemApi = inject(ProblemApi);
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.problemType = params["problemType"];
    })
    this.next();
  }
  next() {
    const answerBox = document.getElementById("answer-box") as HTMLInputElement;
    answerBox.value = "";
    this.correction = "";
    this.corrected.set(false);
    this.problemApi.generateStatement(this.problemType).subscribe(({statement, seed}) => {
      this.statement.set(statement);
      this.seed = seed;
    });
  }
  submit() {
    const answerBox = document.getElementById("answer-box") as HTMLInputElement;
    const problemResponse = {
      problemType: this.problemType,
      seed: this.seed,
      response: answerBox.value
    }
      this.problemApi.evaluateResponse(problemResponse).subscribe(({correct, correction}) => {
        this.correction = correction;
        this.corrected.set(true);
        this.completed.update(value =>  value + 1);
        if (correct) this.correct.update(value => value + 1);
      });
  }
}
