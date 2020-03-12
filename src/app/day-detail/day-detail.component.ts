import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from './../../_services/firebase.service';
import { DateHandlerService } from './../../_services/date-handler.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-day-detail',
  templateUrl: './day-detail.component.html',
  styleUrls: ['./day-detail.component.css']
})
export class DayDetailComponent implements OnInit {

  @Input() day: Observable<any[]>;
  @Input() sessions: Observable<any[]>;
  @Input() meals: Observable<any[]>;

  date: Observable<string>;

  constructor(public db: FirebaseService, public route: ActivatedRoute, public dateHandler: DateHandlerService) { }

  ngOnInit() {
    this.date = this.route.paramMap.pipe(
      map((params: ParamMap) => {
        return params.get("date");
      })
    )

    this.date.subscribe(date => {
      console.log(date);
      let tempDate = this.dateHandler.convertToFirebaseDate(date);
      this.day = this.db.getDay(tempDate);
      this.sessions = this.db.getSessions(tempDate);
      this.meals = this.db.getMeals(tempDate);
    })
  }
}
