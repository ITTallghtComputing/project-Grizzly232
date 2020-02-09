import { Component, OnInit } from '@angular/core';

enum Activity {
  FrontCrawl,
  BackCrawl,
  ButterflyStroke,
}

@Component({
  selector: 'app-swim',
  templateUrl: './swim.component.html',
  styleUrls: ['./swim.component.css']
})
export class Swim implements OnInit {

  lengths: number;
  distance: number;
  activity: Activity;

  constructor() {}

  ngOnInit() {
  }

}
