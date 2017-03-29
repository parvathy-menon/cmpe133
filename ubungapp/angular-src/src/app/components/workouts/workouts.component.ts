import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {WorkoutsService} from '../../services/workouts.service';


@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {
  workouts:Object;

  constructor(private router:Router, private workoutsService:WorkoutsService) { }

  ngOnInit() {
    this.workoutsService.getWorkouts().subscribe(workouts => {
      //var array = Object.keys(workouts).map((key) => {return workouts[key]});
      this.workouts = workouts;
      console.log(JSON.stringify(workouts))
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
