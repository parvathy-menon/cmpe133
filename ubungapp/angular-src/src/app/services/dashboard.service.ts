import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './auth.service'

@Injectable()
export class DashboardService {

  constructor(private http: Http,
    private authService: AuthService) { }

  getUserWorkouts() {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.authToken);

    return this.http.get('http://localhost:3000/users/workouts', { headers: headers })
      .map(res => res.json());
  }

  addWorkoutToSchedule(workout, days) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.authToken);

    return this.http.patch('http://localhost:3000/users/workouts/days', { workout, days }, { headers: headers })
      .map(res => res.json());
  }

  getWorkoutsFor(day) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.authToken);

    return this.http.get('http://localhost:3000/users/workouts/' + day,  { headers: headers })
      .map(res => res.json());
  }



}
