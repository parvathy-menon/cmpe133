import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:Object;
  height = '5ft 10in';
  weight = '160 lb';
  bio = 'Have a very active lifestyle.';
  img = 'https://img.clipartfox.com/60b365c0b69ce6f142a418820e0390fe_big-image-png-clipart-of-facebook-profile-picture_2400-2400.png';

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.height = profile.user.height;
      this.weight = profile.user.weight;
      this.bio = profile.user.bio;
      this.img = profile.user.img;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  saveChanges() {

    this.authService.updateProfile().subscribe(data => {
      if (data.success) {
        
      } else {
        
        }
    
  });
  }

  previewFile() {
  var preview = document.querySelector('img');
  var file    = document.querySelector('input[type=file]');
  var reader  = new FileReader();

  reader.addEventListener("load", function () {
    console.log(reader.result);
    this.img = reader.result;
  }, false);

  if (file) {
    
  }
 }
}

