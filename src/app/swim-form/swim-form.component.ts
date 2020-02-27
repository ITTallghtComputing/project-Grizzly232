import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from '../../_services/firebase.service';
import { SwimBinderService } from '../../_services/swim-binder.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-swim-form',
  templateUrl: './swim-form.component.html',
  styleUrls: ['./swim-form.component.css']
})
export class SwimFormComponent implements OnInit {

  @Input() sessionId: number;
  addForm;
  @Output() cancelled = new EventEmitter<boolean>();
  constructor(public db: FirebaseService, public builder: FormBuilder, public binder: SwimBinderService) {
    this.addForm = this.builder.group({
      lengths: 0,
      distance: 0,
      activity: ''
    })
  }

  ngOnInit() {
    
  }

  onSubmit(swimData) {
    this.db.updateSession(this.sessionId, swimData);
    this.addForm.reset();
  }

  cancel() {
    this.cancelled.emit(true);
  }
}
