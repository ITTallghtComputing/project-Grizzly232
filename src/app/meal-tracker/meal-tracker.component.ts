import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../_services/firebase.service';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-meal-tracker',
  templateUrl: './meal-tracker.component.html',
  styleUrls: ['./meal-tracker.component.css']
})
export class MealTrackerComponent implements OnInit {

  showForm;
  days: Observable<any[]>;
  whatever: any;

  constructor(
    public db: FirebaseService,
    public builder: FormBuilder) {
  }

  ngOnInit() {
    this.days = this.db.getAll('days');
  }

  addNewDay() {
    //this.db.addDay();
  }

  closeMealForm() {
    this.showForm = false;
  }
}
