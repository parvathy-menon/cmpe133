import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutsService } from '../../services/workouts.service';
import { DashboardService } from '../../services/dashboard.service'
import {FlashMessagesService} from 'angular2-flash-messages'



@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {
  name: String;
  _id: String;
  workouts: Array<Object>;
  userWorkouts: Array<Object>;

  constructor(private router: Router, private workoutsService: WorkoutsService, private dashboardService: DashboardService,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.dashboardService.getUserWorkouts().subscribe(userWorkouts => {
        var array = Object.keys(userWorkouts).map((key) => { return userWorkouts[key] });
        this.userWorkouts = array[1];
        console.log(this.userWorkouts)
    },
      err => {
        console.log(err);
        return false;
      })

    this.workoutsService.getWorkouts('http://localhost:3000/workouts/all').subscribe(workouts => {
      var array = Object.keys(workouts).map((key) => { return workouts[key] });
      this.workouts = array[1];
    },
      err => {
        console.log(err);
        return false;
      });

      
  }

  onAddWorkout(workout) {
    this.workoutsService.addWorkoutToUser(workout).subscribe(workout => {
      if(workout.success){
        this.flashMessage.show('Workout Added!', {cssClass: 'alert-success', timeout: 3000});
        //this.router.navigate(['/home']);
      } else{
        this.flashMessage.show('You Already Have This Workout!', {cssClass: 'alert-danger', timeout: 3000});
       // this.router.navigate(['/workouts']);
      }
    },
      err => {
        console.log(err);
        return false;
      })
  }

  onSearchSubmit() {
    var url = 'http://localhost:3000/workouts/workout/' + this.name;
    this.workoutsService.getWorkouts(url).subscribe(workouts => {
      var array = Object.keys(workouts).map((key) => { return workouts[key] });
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
        var array = Object.keys(workouts).map((key) => { return workouts[key] });
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
