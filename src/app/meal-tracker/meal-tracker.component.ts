import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../_services/firebase.service';

@Component({
  selector: 'app-meal-tracker',
  templateUrl: './meal-tracker.component.html',
  styleUrls: ['./meal-tracker.component.css']
})
export class MealTrackerComponent implements OnInit {

  constructor(
    public db: FirebaseService) {
  }

  ngOnInit() {

  }
}
