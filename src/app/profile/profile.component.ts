import { Component, OnInit } from '@angular/core';
import { User } from 'src/_models/user';
import { FirebaseService } from './../../_services/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  user: User;
  image: any;

  constructor(
    public db: FirebaseService) { 
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

  changeProfileImage() {
    if(this.image) {
      if(window.confirm("Are you sure you want to change your profile picture?")) {
        console.log(this.user.id);
        console.log(this.image)
        this.db.addToBucket(`images/profiles/${this.user.id}.png`, this.image)
      }
    }
  }

  previewImage(image) {
    let reader = new FileReader();
    reader.readAsDataURL(image.files[0])
    reader.onload = (event) => {
      this.image = event.target.result;
    }
  }
}