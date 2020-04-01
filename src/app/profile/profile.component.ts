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

  constructor(public db: FirebaseService) { 
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

}
