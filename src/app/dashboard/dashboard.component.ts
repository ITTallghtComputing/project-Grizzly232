import { Component, OnInit } from '@angular/core';
import { User } from 'src/_models/user';
import { AngularFireFunctionsModule, AngularFireFunctions } from '@angular/fire/functions';
import { FirebaseService } from 'src/_services/firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser: any;

  constructor(public fireFunctions: AngularFireFunctions, public db: FirebaseService) {
    this.currentUser = this.db.getUser(JSON.parse(localStorage.getItem('currentUser')).id);
  }

  ngOnInit() {
  }
}
