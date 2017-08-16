import { QuizNotifier } from './services/quiz.notifier';
import { Component, OnInit } from '@angular/core';

import { QuizComponent } from './quiz/quiz.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public selectedQuiz: string;

  constructor(private quizNotifier: QuizNotifier) {

    this.quizNotifier.quizChanges.subscribe((quizName) => {

      this.selectedQuiz = quizName;
      
    })
    
  }

  ngOnInit() {}

  navigateHome(){
    this.quizNotifier.setState("");
  }

}
