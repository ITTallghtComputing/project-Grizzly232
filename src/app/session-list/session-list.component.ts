import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormAdderService } from '../services/form-adder.service';
import { SwimBinderService } from '../services/swim-binder.service';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit {

  addForm;
  sessions: Observable<any[]>;
  whatever: any;

  numSessions: number;
  constructor(
      public db: FirebaseService,
      public formAdder: FormAdderService,
      public builder: FormBuilder,
      public binder: SwimBinderService,
      public viewContainerRef: ViewContainerRef) {
    this.addForm = this.builder.group({
      location: '',
      swims: ''
    })
  }

  ngOnInit() {
    this.sessions = this.db.getAll('sessions');
    this.sessions.subscribe(result => {
      this.whatever = result;
    })
  }

  onSubmit(sessionData) {
    sessionData["id"] = 5;
    console.log(sessionData);
    this.db.addSession(sessionData);
    // console.log("Session added");
    // sessionData += { id: this.numSessions + 1};
    // console.log(sessionData[0], sessionData[1]);
    //this.db.addSession(sessionData);
    //this.addForm.reset();
    // sessionData = {
    //   id: 1,
    //   location: "a place",
    // };
    var extraData = {
      swims: [{
        length: 5,
        distance: 100,
        activity: "shwimmin"
      },
      {
        length: 10,
        distance: 20,
        activity: "shwimmin upside down"
      }]
    };
    console.log(this.whatever);
    this.db.updateSession(1, extraData);
  }

  addSwim() {
    this.formAdder.setRootViewContainerRef(this.viewContainerRef);
    this.formAdder.addSwimForm();
  }
}