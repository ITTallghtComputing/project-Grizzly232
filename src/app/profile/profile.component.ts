import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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

  bioForm: FormGroup;
  showBioForm: false;

  constructor(
    public db: FirebaseService,
    public builder: FormBuilder) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.db.getFromBucket(`images/profiles/${this.user.id}.png`).subscribe(url => {
      this.image = url;
    })
    this.bioForm = this.builder.group({
      bio: ''
    })
  }

  changeProfileImage() {
    if (this.image) {
      if (window.confirm("Are you sure you want to change your profile picture?")) {
        console.log(this.user.id);
        console.log(this.image)
        // this.db.addToBucket(`images/profiles/${this.user.id}.png`, this.image)
      }
    }
  }

  previewImage(image) {
    let reader = new FileReader();
    console.log(image);
    reader.readAsDataURL(image.files[0])
    // reader.onload = (event) => {
    //   console.log(event.target.result)
    // }
  }

  editBio() {
    let values = this.bioForm.getRawValue();
    this.db.editBio(values);
    this.user["bio"] = values.bio;
    localStorage.setItem("currentUser", JSON.stringify(this.user)); 
    this.showBioForm = false;
  }
}