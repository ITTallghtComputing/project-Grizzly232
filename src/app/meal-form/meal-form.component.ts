import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.css']
})
export class MealFormComponent implements OnInit {

  @Input() dayId;
  addForm2;
  @Output() cancelled = new EventEmitter<boolean>();
  constructor(public db: FirebaseService, public builder: FormBuilder) {
    this.addForm2 = this.builder.group({
      name: '',
      calories: 0
    })
  }

  ngOnInit() {
    
  }

  cancel() {
    this.cancelled.emit(true);
  }

  onSubmit(mealData) {
    this.db.updateDay(this.dayId, mealData);
    this.addForm2.reset();
  }
}
