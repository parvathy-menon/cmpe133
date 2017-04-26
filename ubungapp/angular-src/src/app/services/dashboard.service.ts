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

    addWorkoutToSchedule(workout, day) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.authToken);

    return this.http.post('http://localhost:3000/users/workouts/days', {workout,day},{ headers: headers })
      .map(res => res.json());
    }



}
