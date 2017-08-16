import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class QuizNotifier {
    quiz = new BehaviorSubject<string>(null);
    quizChanges = this.quiz.asObservable();

    quizStarted = new BehaviorSubject<boolean>(true);
    quizStartedChanges = this.quizStarted.asObservable();

    constructor() {}

    public getState() {

        return this.quiz.value;
    }
    
    public setState(value) {

        this.quiz.next(value);

    }
    public getQuizStartState() {

        return this.quizStarted.value;
    }
    
    public setQuizStartState(value) {

        this.quizStarted.next(value);

    }

}