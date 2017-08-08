import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },{
        path: 'home',
        component: HomeComponent
    },{
        path: ':id',
        component: QuizComponent
    }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
