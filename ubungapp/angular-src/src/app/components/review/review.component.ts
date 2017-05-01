import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ReviewsService} from '../../services/reviews.service'

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviews:Array<Object>;
  workoutId:String;
  _id: String;

  constructor(private router:Router,
              private reviewsService:ReviewsService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
        this.workoutId = params['_id'];
      });

    this.reviewsService.getReviews(this.workoutId).subscribe(reviews => {
      var array = Object.keys(reviews).map((key) => {return reviews[key]});
      this.reviews = array[1];
      console.log(this.reviews[0]);
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onDeleteSubmit(review){
    var id = review._id;
    this.reviewsService.deleteReview(id).subscribe(reviews => {
      this.activatedRoute.params.subscribe((params: Params) => {
        this.workoutId = params['_id'];
      });
      this.reviewsService.getReviews(this.workoutId).subscribe(reviews => {
        var array = Object.keys(reviews).map((key) => {return reviews[key]});
        this.reviews = array[1];
        console.log(this.reviews[0]);
      },
      err => {
        console.log(err);
        return false;
      });
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
