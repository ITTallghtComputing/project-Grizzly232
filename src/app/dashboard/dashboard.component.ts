import { Component, OnInit } from '@angular/core';
import { User } from 'src/_models/user';
import { AngularFireFunctionsModule, AngularFireFunctions } from '@angular/fire/functions';
import { FirebaseService } from 'src/_services/firebase.service';
import { Chart } from 'chart.js';
import { LineToLineMappedSource } from 'webpack-sources';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser: any;
  days: Observable<any[]>;
  averages: any = [];
  chart: any;

  constructor(public fireFunctions: AngularFireFunctions, public db: FirebaseService) {
    this.currentUser = this.db.getUser(JSON.parse(localStorage.getItem('currentUser')).id);
    this.days = this.db.getDays();
  }

  getChart() {
    let out = [];
    let averages = [];
    this.days.subscribe(days => {
      console.log(days);
      let compDate = new Date(days[0].date.toDate().getTime());
      console.log(days[days.length - 1].date.toDate())
      console.log(compDate);
      let endDate = Math.ceil((days[days.length - 1].date.toDate().getTime() - compDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
      console.log(endDate);
      for (let i = 0; i < endDate; i++) {
        compDate.setDate(compDate.getDate() - compDate.getDay());
        let toDate = new Date(compDate.getTime());
        toDate.setDate(toDate.getDate() + 6);
        for (compDate; compDate.getTime() <= toDate.getTime(); compDate.setDate(compDate.getDate() + 1)) {
          for (let day of days) {
            if (day.date.toDate().getTime() == compDate.getTime()) {
              out.push(day.caloriesBurned)
            }
          }
        }
        if (out.length == 0)
          averages.push(0);
        else
          averages.push(out.reduce(function (a, b) { return a + b }) / out.length)
        console.log(out);
        out = [];
      }
      this.averages = averages;
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
          datasets: [{
            label: '# of calories burned',
            data: this.averages,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 10,
            fill: false
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    }
    )
  }

  ngOnInit() {
    this.getChart();
  }
}