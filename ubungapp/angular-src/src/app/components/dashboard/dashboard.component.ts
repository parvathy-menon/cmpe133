import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userWorkouts:Array<Object>;
  
  constructor(private dashboardService:DashboardService) { }

  ngOnInit() {
    this.dashboardService.getUserWorkouts().subscribe(workoutsArray => {
      this.userWorkouts = workoutsArray.workouts;
    })
  }

  onAddWorkoutToSchedule(workout,day) {
    this.dashboardService.addWorkoutToSchedule(workout,day);
  }

}