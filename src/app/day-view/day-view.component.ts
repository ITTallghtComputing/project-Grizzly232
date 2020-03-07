import { Component, OnInit, Input, Output } from '@angular/core';
import { DateHandlerService } from './../../_services/date-handler.service';
import { FirebaseService } from "./../../_services/firebase.service";
import { firestore } from 'firebase';
import { getDay } from 'date-fns';

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

  day: any;
  dateString: Date;
  dateFirebase: firestore.Timestamp;
  constructor(public dateHandler: DateHandlerService, public db: FirebaseService) { }

  ngOnInit() {
    $('#dayModal').on('shown.bs.modal', this.getDateString);
  }

  getDateString() {
    setInterval(function() {
      console.log(this.day);
    }, 1000)
  }

  async getDay() {
    try {
      let ref = this.db.getDay(this.dateFirebase);
      await ref.then(out => {
        out.get().then(inner => {
          console.log(inner.data());
          console.log(this.day);
          this.day = inner.data();
          console.log(this.day);
        });
      })
    } catch (err) {
      console.log(err);
    }
  }

  private onDateChanged(date: Date): void {
    if (date != null) {
      this.dateString = date;
      this.dateFirebase = this.db.convertToTimestamp(date);
      this.getDay();
    }
  }
}
