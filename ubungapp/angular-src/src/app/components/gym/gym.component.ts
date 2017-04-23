import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GymService } from '../../services/gym.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-gym',
  templateUrl: './gym.component.html',
  styleUrls: ['./gym.component.css']
})

export class GymComponent implements OnInit {
  location: String;
  constructor(
    private router: Router,
    private gymService: GymService,
    private authService: AuthService
  ) { }

  gyms: Array<Object>;

  ngOnInit() {
    this.gymService.getGyms('http://localhost:3000/gyms/95113').subscribe(gyms => {
      var array = Object.keys(gyms).map((key) => {return gyms[key]});
      this.gyms = array[0];
      this.gyms = gyms.list;
    }, err => {
      console.log(err);
      return false;
    });
  }

  onSearchSubmit() {
    var url = 'http://localhost:3000/gyms/'+this.location;
    this.gymService.getGyms(url).subscribe(gyms => {
      var array = Object.keys(gyms).map((key) => {return gyms[key]});
      this.gyms = array[0];
      this.gyms = gyms.list;
    }, err => {
      console.log(err);
      return false;
    });
  }

}
