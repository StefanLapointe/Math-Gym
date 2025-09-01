import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-problem',
  imports: [],
  templateUrl: './problem.html',
  styleUrl: './problem.css'
})
export class Problem implements OnInit {
  statement = "Loading...";
  private seed = 0;
  private route = inject(ActivatedRoute);
  private problemType = "";
  correction = "";
  corrected = signal(false);
  buttonText = computed(() => this.corrected() ? "Next" : "Submit!");
  completed = 0;
  correct = 0;
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
    fetch("http://localhost:8080/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: this.problemType
    })
      .then(response => response.json())
      .then(json => {
        this.statement = json.statement;
        this.seed = json.seed;
      });
  }
  evaluate() {
    const answerBox = document.getElementById("answer-box") as HTMLInputElement;
    const response = {
      problemType: this.problemType,
      seed: this.seed,
      response: answerBox.value
    }
    fetch("http://localhost:8080/api/evaluate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(response)
    })
      .then(response => response.json())
      .then(problemCorrection => {
        this.correction = problemCorrection.correction;
        this.corrected.set(true);
        this.completed++;
        if (problemCorrection.correct) this.correct++;
      })
  }
}
