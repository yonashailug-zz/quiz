import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class QuizNotifier {
    quiz = new BehaviorSubject<string>(null);
    quizChanges = this.quiz.asObservable();
    

    constructor() {}

    public getState() {

        return this.quiz.value;
    }
    
    public setState(value) {

        this.quiz.next(value);

    }

}