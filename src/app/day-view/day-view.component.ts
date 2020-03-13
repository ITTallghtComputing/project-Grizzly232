import { Component, OnInit, Input } from '@angular/core';
import { DateHandlerService } from './../../_services/date-handler.service';
import { FirebaseService } from "./../../_services/firebase.service";
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
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
  sessions: Observable<any[]>;
  meals: Observable<any[]>;
  dateUntouched: Date;
  dateString: string;
  dateFirebase: firestore.Timestamp;
  dateRoute: string;
  constructor(public dateHandler: DateHandlerService, public db: FirebaseService, public router: Router) { }

  ngOnInit() {
    // $('#dayModal').on('shown.bs.modal', this.getDateString());
  }

  getDay() {
    this.db.isDayFilled(this.dateFirebase).subscribe(result => {
      if(result)
        this.db.addDay(this.dateFirebase);
    });
    this.day = this.db.getDay(this.dateFirebase);
    this.sessions = this.db.getSessions(this.dateFirebase);
    this.meals = this.db.getMeals(this.dateFirebase);
  }

  private onDateChanged(date: Date): void {
    if (date != null) {
      this.dateString = this.dateHandler.convertToOutDate(date);
      this.dateUntouched = date;
      this.dateFirebase = this.db.convertToTimestamp(date);
      this.getDay();
    }
  }

  navigateToDetail() {
    $('#dayModal').modal('hide')
    this.dateRoute = this.dateHandler.convertToRouteDate(this.dateUntouched)
    this.router.navigate(['/day', this.dateRoute]);
  }
}
