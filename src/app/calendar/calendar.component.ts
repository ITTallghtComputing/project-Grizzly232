import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';
import {
  startOfDay,
  subDays,
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseService} from './../../_services/firebase.service';
import {
  CalendarEvent,
  CalendarView
} from 'angular-calendar';
declare var $: any;

const colors: any = {
  green: {
    primary: '#43b030',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.css'],
  templateUrl: './calendar.component.html'
})
export class CalendarComponent {
  
  @ViewChild('dayModal', { static: true }) dayModal: any;
  @Output() dayOpened = new EventEmitter<boolean>();

  view: CalendarView = CalendarView.Month;
  dateToPass: Date;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      title: 'You\'ve logged your workouts for this day.',
      color: colors.green,
    }
  ];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, public db: FirebaseService) { }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  openDay(date) {
    this.dateToPass = date.date;
    $('#dayModal').modal('show')
    this.dayOpened.emit(date.date);
  }
}
