import { Component, OnInit } from '@angular/core';

import { QuizService } from '../services/quiz.service';
import { HelperService } from '../services/helper.service';
import { Option, Question, Quiz, QuizConfig } from '../models/index';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { QuizNotifier } from './../services/quiz.notifier';
import { SnackBarService } from './../services/snackbar.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService]
})
export class QuizComponent implements OnInit {

  quizes: any[];
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  quizName: string;
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 0,  // indicates the time in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': true,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  isbackToQuiz: boolean = false;

  constructor(private quizService: QuizService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private quizNotifier: QuizNotifier,
              private snackBarService: SnackBarService) { 

               this.activatedRoute.params.subscribe((params) => {

                let quizName = params['id'];

                if (quizName) {

                  if(quizName == 'home') {
                    this.quizNotifier.setState("");
                  } else {
                    this.quizNotifier.setState(quizName);
                  }
                  

                  this.quizInit(quizName);

                }

              }, (error) => {

                console.log("error routing");
      });

  }

  ngOnInit() {

  }

  quizInit(quizName) {

    this.quizes = this.quizService.getAll();

    this.quizes.forEach(quiz => {

      if (quizName === quiz.name) {
        this.quizName = quiz.id;
        this.loadQuiz(this.quizName);
        //TODO: disable going to home page menu;
         this.quizNotifier.setQuizStartState(false);
      }

    });

    if(!this.quizName) {
      this.router.navigateByUrl("home");
    }
  }

  loadQuiz(quizName: string) {

    this.quizService.get(quizName).subscribe(res => {
      console.log(res);
      this.quiz = new Quiz(res);
      this.pager.count = this.quiz.questions.length;
    });
    this.mode = 'quiz';
  }

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; });
    }

    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }

  goTo(index: number) {
    
    if (index >= 0 && index < this.pager.count) {
      if(index > 0){
        if(this.quiz.questions[index - 1].attempts > 0) {
          for(let i = 0; i < this.quiz.questions[index - 1].options.length; i++) {
            if (this.quiz.questions[index - 1].options[i].selected) {
              --this.quiz.questions[index - 1].attempts; 
            }
          }
        }

        console.log("attempts for", this.quiz.questions[index - 1], " is ",this.quiz.questions[index - 1].attempts );
      }
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }

  isAnswered(question: Question) {
    return  question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };

  isCorrect(question: Question) {
    return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
  };

  onSubmit() {

    let answers = [];
    let unansweredCounter: number = 0;

    this.quiz.questions.forEach( question => {

      if(this.isAnswered(question) == "Not Answered") {

        unansweredCounter++;

      }

    });

    if(unansweredCounter > 0) {

        this.snackBarService.openSnackBar("Please answer all questions!");
        return false;

    } else {
        // this.quiz.questions.forEach(x => answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered': x.answered }));
        this.snackBarService.openSnackBar("Thank you. You've finished!");
        // this.mode = 'result';
        
    }
    

    // Post your data to the server here. answers contains the questionId and the users' answer.
    
  }

  navigateHome() {
    this.quizNotifier.setState("");
  }

  addHintRequired(question: Question) {
    question.isHintRequired = true;
    console.log(question);
  }

  closeWindow() {
    var customWindow = window.open('', '_blank', '');
    customWindow.close();
  }

  backToQuiz(value) {
    this.isbackToQuiz = value;
  }

}
