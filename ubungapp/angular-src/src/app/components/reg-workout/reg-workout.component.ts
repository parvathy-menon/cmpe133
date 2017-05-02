import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {WorkoutsService} from '../../services/workouts.service';
import {FlashMessagesService} from 'angular2-flash-messages'
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-reg-workout',
  templateUrl: './reg-workout.component.html',
  styleUrls: ['./reg-workout.component.css']
})
export class RegWorkoutComponent implements OnInit {
  user: Object;
  title: String;
  description: String;
  cardioname: String;
  duration: String;
  liftingname: String;
  sets: Number;
  reps: Number;
  created_at: String;
  created_by: String;


  constructor(
    private workoutsService:WorkoutsService,
    private flashMessage: FlashMessagesService,
    private router:Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.loadToken();
    this.user = this.authService.user;
  }

  onRegisterSubmit(){
    var workout = {
      user: this.user,
      title: this.title,
      description: this.description,
      cardioname: this.cardioname,
      duration: this.duration,
      liftingname: this.liftingname,
      sets: this.sets,
      reps:this.reps,
      created_at: new Date().toString()
    }


    this.workoutsService.createWorkout(workout).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Workout Created!', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/home']);
      } else{
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/home']);
      }
    });
  }
}
