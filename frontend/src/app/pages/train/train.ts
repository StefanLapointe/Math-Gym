import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

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
    fetch(`${environment.apiUrl}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: this.problemType
    })
      .then(response => response.json())
      .then(json => {
        this.statement.set(json.statement);
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
    fetch(`${environment.apiUrl}/api/evaluate`, {
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
        this.completed.update(value =>  value + 1);
        if (problemCorrection.correct) this.correct.update(value => value + 1);
      })
  }
}
