import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FirebaseService } from './../../_services/firebase.service';
import { DateHandlerService } from './../../_services/date-handler.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-day-detail',
  templateUrl: './day-detail.component.html',
  styleUrls: ['./day-detail.component.css']
})
export class DayDetailComponent implements OnInit {

  @ViewChild('sessionGrid', { static: true }) sessionGrid: any;
  @ViewChild('mealGrid', { static: true }) mealGrid: any;
  @Input() day: Observable<any[]>;
  @Input() sessions: Observable<any[]>;
  @Input() meals: Observable<any[]>;
  activities: Observable<any[]>;

  date: Observable<string>;
  dateString: string;

  mealForm: FormGroup;
  activityForm: FormGroup;
  activityColumnDefs = [
    { headerName: 'Activity', field: 'activity', editable: true, sortable: true, filter: true, checkboxSelection: true},
    { headerName: 'Calories Burned', field: 'caloriesBurned', editable: true, sortable: true, filter: true},
    { headerName: 'Duration', field: 'duration', editable: true, sortable: true, filter: true}
  ];
  mealColumnDefs = [
    { headerName: 'Name', field: 'name', editable: true, sortable: true, filter: true, checkboxSelection: true},
    { headerName: 'Calories Gained', field: 'caloriesGained', editable: true, sortable: true, filter: true},
  ]

  constructor(public db: FirebaseService,
    public route: ActivatedRoute,
    public dateHandler: DateHandlerService,
    public builder: FormBuilder) {
    this.mealForm = this.builder.group({
      name: '',
      calories: 0
    })
    this.activityForm = this.builder.group({
      activity: '',
      caloriesBurned: 0,
      duration: 0
    })
  }

  ngOnInit() {
    this.date = this.route.paramMap.pipe(
      map((params: ParamMap) => {
        return params.get("date");
      })
    )

    this.date.subscribe(date => {
      let tempDate = this.dateHandler.convertToFirebaseDate(date);
      this.day = this.db.getDay(tempDate);
      this.sessions = this.db.getSessions(tempDate);
      this.meals = this.db.getMeals(tempDate);
      this.dateString = this.dateHandler.convertToOutDate(new Date(date));
    })
  }

  onSessionGridReady(params) {
    this.sessionGrid = params.api;
  }

  onMealGridReady(params) {
    this.mealGrid = params.api;
  }

  updateSession(row) {
    this.db.updateActivity(row.data, row.rowIndex + 1);
  }

  updateMeal(row) {
    this.db.updateMeal(row.data, row.rowIndex + 1);
  }

  onNewSession() {
    this.sessionGrid.gridOptionsWrapper.gridOptions.api.updateRowData({ add: [{ activity: '', caloriesBurned: 0, duration: 0}]});
  }

  onNewMeal() {
    this.mealGrid.gridOptionsWrapper.gridOptions.api.updateRowData({ add: [{ name: '', caloriesGained: 0}]});
  }

  isSelected() {
      return this.mealGrid.gridOptionsWrapper.gridOptions.api.getSelectedNodes().length == 0;
  }

  deleteActivity() {
    let row = this.sessionGrid.gridOptionsWrapper.gridOptions.api.getSelectedNodes();
    if(row.length != 0)
      this.db.deleteActivity(parseInt(row[0].id) + 1);
  }

  deleteMeal() {
    let row = this.mealGrid.gridOptionsWrapper.gridOptions.api.getSelectedNodes();
    if(row.length != 0)
      this.db.deleteMeal(parseInt(row[0].id) + 1);
  }
}