import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {WorkoutsService} from '../../services/workouts.service';


@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {
  name: String;
  _id: String;
  workouts:Array<Object>;

  constructor(private router:Router, private workoutsService:WorkoutsService) { }

  ngOnInit() {
    this.workoutsService.getWorkouts('http://localhost:3000/workouts/all').subscribe(workouts => {
      var array = Object.keys(workouts).map((key) => {return workouts[key]});
      this.workouts = array[1];
      console.log(this.workouts[0]);
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onAddWorkout(workout) {
    this.workoutsService.addWorkoutToUser(workout).subscribe(workout => {
      console.log(workout);
    },
    err => {
      console.log(err);
      return false;
    })
  }

  onSearchSubmit(){
    var url = 'http://localhost:3000/workouts/workout/' + this.name;
    this.workoutsService.getWorkouts(url).subscribe(workouts => {
      var array = Object.keys(workouts).map((key) => {return workouts[key]});
      this.workouts = array[1];
      console.log(this.workouts[0]);
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onDeleteSubmit(workout) { 
    var id = workout._id;
    this.workoutsService.deleteWorkout(id).subscribe(workouts => {
      this.workoutsService.getWorkouts('http://localhost:3000/workouts/all').subscribe(workouts => {
        var array = Object.keys(workouts).map((key) => {return workouts[key]});
        this.workouts = array[1];
        console.log(this.workouts[0]);
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
