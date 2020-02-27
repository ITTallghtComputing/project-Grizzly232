import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../_services/firebase.service';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {

  constructor(
    public db: FirebaseService
  ) { }

  ngOnInit() {
  }

}
