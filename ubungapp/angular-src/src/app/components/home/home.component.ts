import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {WorkoutsService} from '../../services/workouts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router, private workoutsService:WorkoutsService) { }
  workouts:Array<Object>;

  ngOnInit() {
  this.workoutsService.getWorkouts().subscribe(workouts => {
    var array = Object.keys(workouts).map((key) => {return workouts[key]});
    this.workouts = array[1];
    console.log(this.workouts[0]);
  },
  err => {
    console.log(err);
    return false;
  });
  }

}
