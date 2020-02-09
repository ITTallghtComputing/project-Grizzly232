import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit {

  addForm;
  sessions: Observable<any[]>;
  constructor(public db: FirebaseService, public builder: FormBuilder) {
    this.addForm = this.builder.group({
      id: '',
      location: '',
      swims: ''
    })
  }

  ngOnInit() {
    this.sessions = this.db.getAll('sessions');
  }

  onSubmit(sessionData) {
    console.log("Session added");
    this.db.addSession(sessionData);
    this.addForm.reset();
  }
}
