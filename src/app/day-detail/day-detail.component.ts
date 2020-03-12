import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-day-detail',
  templateUrl: './day-detail.component.html',
  styleUrls: ['./day-detail.component.css']
})
export class DayDetailComponent implements OnInit {

  @Input() days: Observable<any[]>;
  @Input() sessions: Observable<any[]>;
  @Input() meals: Observable<any[]>;

  constructor() { }

  ngOnInit() {
  }

}
