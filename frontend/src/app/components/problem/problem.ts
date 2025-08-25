import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-problem',
  imports: [],
  templateUrl: './problem.html',
  styleUrl: './problem.css'
})
export class Problem implements OnInit {
  statement = "Loading...";
  private route = inject(ActivatedRoute);
  private problemType = "";
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.problemType = params["problemType"];
    })
    this.next();
  }
  next() {
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
      });
  }
}
