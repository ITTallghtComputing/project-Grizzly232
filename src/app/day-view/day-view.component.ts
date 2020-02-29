import { Component, OnInit, Input, Output } from '@angular/core';
import { DateHandlerService } from './../../_services/date-handler.service';

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

  dateString: Date;
  constructor(public dateHandler: DateHandlerService) { }

  ngOnInit() {
    //$('#dayModal').on('shown.bs.modal', this.getDateString);
  }

  getDateString() {
    //this.dateString = this.dateHandler.convertToOutDate(this.date);
  }

  private onDateChanged(date: Date): void {
    this.dateString = date;
  }
}
