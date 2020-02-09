import { Component, OnInit } from '@angular/core';
import { Swim } from '../swim/swim.component';

enum Location {
  SwimmingPool,
  OpenWater
}

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})

export class Session implements OnInit {

  id: number;
  location: Location;
  swims: Swim[];

  constructor() {
  }

  ngOnInit() {

  }
}