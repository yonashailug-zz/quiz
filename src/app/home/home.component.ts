import { QuizNotifier } from './../services/quiz.notifier';
import { QuizService } from './../services/quiz.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [QuizService]
})
export class HomeComponent implements OnInit {

  public quizes: any[];
  constructor(private quizService: QuizService,
              private quizNotifier: QuizNotifier) { }

  ngOnInit() {
    this.quizes = this.quizService.getAll();
  }

  public selectedQuiz(quiz) {

    this.quizNotifier.setState(quiz.name);

  }

}
