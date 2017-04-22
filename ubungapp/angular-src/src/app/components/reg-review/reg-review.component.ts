import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ReviewsService } from '../../services/reviews.service';
import { FlashMessagesService } from 'angular2-flash-messages'
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-reg-review',
  templateUrl: './reg-review.component.html',
  styleUrls: ['./reg-review.component.css']
})
export class RegReviewComponent implements OnInit {
  user: Object;
  title: String;
  body: String;
  workoutId: String;
  rating: Number;
  created_at: String;


  constructor(private reviewsService: ReviewsService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.authService.loadToken();
    this.user = this.authService.user;
    
    this.activatedRoute.params.subscribe((params: Params) => {
        this.workoutId = this.activatedRoute.snapshot.parent.url[1].path; // This gives us the correct workoutId to create a review
      });
  }

  onReviewCreateSubmit() {
    var review = {
      user: this.user,
      title: this.title,
      body: this.body,
      rating: this.rating,
      workoutId: this.workoutId,
      created_at: new Date().toString()
    }


    this.reviewsService.createReview(review).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Review Created!', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/workouts/' + this.workoutId  + '/reviews']);
        location.reload();
      } else {
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/workouts/' + this.workoutId  + '/reviews']);
        location.reload();
      }
    });
  }
}
