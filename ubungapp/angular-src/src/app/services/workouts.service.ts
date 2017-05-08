import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './auth.service'

@Injectable()
export class WorkoutsService {

  constructor(private http: Http,
    private authService: AuthService) { }

  getWorkouts(url) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get(url, { headers: headers })
      .map(res => res.json());
  }

  createWorkout(workout) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/workouts/create', workout, { headers: headers })
      .map(res => res.json());
  }

  addWorkoutToUser(workout) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken)
    headers.append('Content-Type', 'application/json');
    return this.http.patch('http://localhost:3000/users/:id', workout, { headers: headers })
      .map(res => res.json());
  }

  

  deleteWorkout(id) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken)
    headers.append('Content-Type', 'application/json');
    return this.http.delete('http://localhost:3000/workouts/delete/'+ id,{ headers: headers })
      .map(res => res.json());
  }
}
