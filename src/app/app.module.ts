import { routing } from './app.route';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from "@angular/material";
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { HomeComponent } from './home/home.component';
import { QuizNotifier } from './services/quiz.notifier';
import { SnackBarService } from './services/snackbar.service';
import { LottieAnimationViewModule } from 'ng-lottie';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    BrowserAnimationsModule,
    NoopAnimationsModule,    
    ReactiveFormsModule,
    MaterialModule,
    LottieAnimationViewModule.forRoot()
    // MaterialModule
  ],
  providers: [
    QuizNotifier,
    SnackBarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
