import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  problem: string;
  constructor() {
    this.problem = "loading...";
    fetch("http://localhost:8080/api/list")
      .then(response => response.text())
      .then(text => {
        this.problem = text;
      });
  }
}
