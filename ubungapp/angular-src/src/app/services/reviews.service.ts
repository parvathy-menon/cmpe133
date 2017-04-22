import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './auth.service'


@Injectable()
export class ReviewsService {

  constructor(private http: Http,
    private authService: AuthService) { }


  getReviews(workoutId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/reviews/' + workoutId, { headers: headers })
      .map(res => res.json());
  }

  createReview(review) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/reviews/create', review,{headers: headers})
      .map(res => res.json());
  }
}
