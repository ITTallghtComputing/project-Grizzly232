import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { SwimBinderService } from '../services/swim-binder.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-swim-form',
  templateUrl: './swim-form.component.html',
  styleUrls: ['./swim-form.component.css']
})
export class SwimFormComponent implements OnInit {

  @Input() sessionId: number;
  addForm;
  constructor(public db: FirebaseService, public builder: FormBuilder, public binder: SwimBinderService) {
    this.addForm = this.builder.group({
      lengths: 0,
      distance: 0,
      activity: ''
    })
  }

  ngOnInit() {
    console.log(this.sessionId);
  }

  onSubmit(swimData) {
    console.log("swim added");
    console.log(swimData);
    let newData = {
      swims: [{
        
      }
    ]};
    newData.swims[0] = swimData;
    console.log(newData);
    this.db.updateSession(this.sessionId, swimData);
    this.addForm.reset();
  }
}
