import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userWorkouts:Array<Object>;
  addSunday:Boolean = false;
  addMonday:Boolean = false;
  addTuesday:Boolean = false;
  addWednesday:Boolean = false;
  addThursday:Boolean = false;
  addFriday:Boolean = false;
  addSaturday:Boolean = false;


  constructor(private dashboardService:DashboardService) { }

  ngOnInit() {
    this.dashboardService.getUserWorkouts().subscribe(workoutsArray => {
      this.userWorkouts = workoutsArray.workouts;
    })
  }

  onAddWorkoutToSchedule(workout) {
    console.log(workout);
    let days = [];
    if(this.addSunday) days.push("sunday");
    if(this.addMonday) days.push("monday");
    if(this.addTuesday) days.push("tuesday");
    if(this.addWednesday) days.push("wednesday");
    if(this.addThursday) days.push("thursday");
    if(this.addFriday) days.push("friday");
    if(this.addSaturday) days.push("saturday");


    this.dashboardService.addWorkoutToSchedule(workout, days).subscribe(cc => {
      console.log(cc);
  })

}
}