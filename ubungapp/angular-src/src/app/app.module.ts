import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WorkoutsComponent } from './components/workouts/workouts.component';
import { GymComponent } from './components/gym/gym.component';
import { RegWorkoutComponent } from './components/reg-workout/reg-workout.component';
import { ReviewComponent } from './components/review/review.component';
import { RegReviewComponent } from './components//reg-review/reg-review.component';


import { ValidateService } from './services/validate.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { WorkoutsService } from './services/workouts.service';
import { GymService } from './services/gym.service';
import { ReviewsService } from './services/reviews.service';
import { DashboardService } from './services/dashboard.service';
import { AboutUsComponent } from './components/about-us/about-us.component'


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'workouts', component: WorkoutsComponent },
  { path: 'gyms/:address', component: GymComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'reg-workout', component: RegWorkoutComponent },
  {
    path: 'workouts/:_id/reviews',
    component: ReviewComponent,
    children: [
      { path: 'reg-review', component: RegReviewComponent } // url: workouts/:_id/reviews/reg-review
    ]
  }

  //{path:'workouts/:_id/reviews/reg-review', component: RegReviewComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    WorkoutsComponent,
    GymComponent,
    RegWorkoutComponent,
    ReviewComponent,
    RegReviewComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [ValidateService, AuthService, AuthGuard, WorkoutsService, GymService, ReviewsService, DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
