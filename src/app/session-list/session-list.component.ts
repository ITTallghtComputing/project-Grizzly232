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
  showForm: boolean = false;
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

  debug() {
    console.log(this.sessions);
    console.log(this.whatever);
  }

  onSubmit(sessionData) {
    sessionData["id"] = 5;
    console.log(sessionData);
    this.db.addSession(sessionData);
    this.db.updateSession(7, {});
  }

  addSwim() {
    this.formAdder.setRootViewContainerRef(this.viewContainerRef);
    this.formAdder.addSwimForm();
  }

  closeSwimForm() {
    this.showForm = false;
  }
}