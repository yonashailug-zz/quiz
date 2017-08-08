import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class QuizService {

  constructor(private http: Http) { }

  get(url: string) {
    return this.http.get(url).map(res => res.text().length > 0 ? res.json() : null);
  }

  getAll() {
    return [
      { 
        id: 'data/aspnet.json', 
        name: 'Asp.Net',
        duration: "30 Minutes" 
      },
      { id: 'data/csharp.json', name: 'CSharp',
     duration: "30 Minutes"  },
      { id: 'data/designPatterns.json', name: 'Design Patterns',
     duration: "30 Minutes"  }
    ];
  }

}
