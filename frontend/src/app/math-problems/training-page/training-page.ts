import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProblemApi } from '../problem-api';

@Component({
  selector: 'app-training-page',
  imports: [],
  templateUrl: './training-page.html',
  styleUrl: './training-page.css'
})
export class TrainingPage implements OnInit {
  statement = signal("Loading...");
  private seed = 0;
  private readonly route = inject(ActivatedRoute);
  private problemType = "";
  correction = "";
  corrected = signal(false);
  buttonText = computed(() => this.corrected() ? "Next" : "Submit!");
  completed = signal(0);
  correct = signal(0);
  problemApi = inject(ProblemApi);
  protected lives = signal(0);
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.problemType = params["problemType"];
    })
    this.lives.set(3);
    this.next();
  }
  next() {
    const answerBox = document.getElementById("answer-box") as HTMLInputElement | null;
    if (answerBox != null) answerBox.value = "";
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
        else this.lives.update(value => value - 1);
      });
  }
}
