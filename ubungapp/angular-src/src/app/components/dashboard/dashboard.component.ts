import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userWorkouts:Array<Object>;
  dayWorkouts:Array<Object>;
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
    if(this.addSunday) {days.push("sunday"); this.addSunday = false;}
    if(this.addMonday) {days.push("monday"); this.addMonday = false;}
    if(this.addTuesday) {days.push("tuesday"); this.addTuesday = false;}
    if(this.addWednesday) {days.push("wednesday"); this.addWednesday = false;}
    if(this.addThursday) {days.push("thursday"); this.addThursday = false;}
    if(this.addFriday) {days.push("friday"); this.addFriday = false;}
    if(this.addSaturday) {days.push("saturday"); this.addSaturday = false;}


    this.dashboardService.addWorkoutToSchedule(workout, days).subscribe(cc => {
      console.log(cc);
  })
}
  displayWorkoutsFor(day) {
    this.dashboardService.getWorkoutsFor(day).subscribe(dayWorkouts => {
      this.dayWorkouts = dayWorkouts.workouts;
      console.log(this.dayWorkouts);
    })
  }
}