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
  public quizStarted: boolean = true;

  constructor(private quizNotifier: QuizNotifier) {

    this.quizNotifier.quizChanges.subscribe((quizName) => {

      this.selectedQuiz = quizName;
      
    })

    this.quizNotifier.quizStartedChanges.subscribe((started) => {

      console.log(started);
      this.quizStarted = started;
      
    })
    
  }

  ngOnInit() {}

  navigateHome(){
    this.quizNotifier.setState("");
  }

}
