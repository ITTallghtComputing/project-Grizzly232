import { Component, OnInit, Input, Output } from '@angular/core';
import { DateHandlerService } from './../../_services/date-handler.service';
import { FirebaseService } from "./../../_services/firebase.service";
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import 'firebase/firestore';

declare var $: any;

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.css']
})
export class DayViewComponent implements OnInit {

  @Input() public set date(value: Date) {
    this.onDateChanged(value);
  };

  day: Observable<any[]>;
  sessions: any;
  meals: Observable<any[]>;
  dateString: string;
  dateFirebase: firestore.Timestamp;
  constructor(public dateHandler: DateHandlerService, public db: FirebaseService) { }

  ngOnInit() {
    // $('#dayModal').on('shown.bs.modal', this.getDateString());
  }

  getDay() {
    this.day = this.db.getDay(this.dateFirebase);
    this.sessions = this.db.getSessions(this.dateFirebase);
  }

  private onDateChanged(date: Date): void {
    if (date != null) {
      this.dateString = this.dateHandler.convertToOutDate(date);
      this.dateFirebase = this.db.convertToTimestamp(date);
      this.getDay();
    }
  }
}
