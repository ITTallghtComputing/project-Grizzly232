import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { SwimBinderService } from '../services/swim-binder.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-swim-form',
  templateUrl: './swim-form.component.html',
  styleUrls: ['./swim-form.component.css']
})
export class SwimFormComponent implements OnInit {

  constructor() {}
  ngOnInit() {}

  // addForm;
  // constructor(public db: FirebaseService, public builder: FormBuilder, public binder: SwimBinderService) {
  //   this.addForm = this.builder.group({
  //     lengths: 0,
  //     distance: 0,
  //     activity: ''
  //   })
  // }

  // ngOnInit() {
  // }

  // onSubmit(swimData) {
  //   console.log("swim added");
  //   this.binder.setSwimData(swimData);
  //   this.addForm.reset();
  // }
}
