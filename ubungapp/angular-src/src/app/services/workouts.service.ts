import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class WorkoutsService {

  constructor(private http: Http) { }

  getWorkouts() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get('http://localhost:3000/workouts/all', { headers: headers })
      .map(res => res.json());
  }
  
}


