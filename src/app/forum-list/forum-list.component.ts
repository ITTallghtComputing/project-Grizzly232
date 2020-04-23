import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.css']
})
export class ForumListComponent implements OnInit {

  categories = ['General', 'Workout Routines', 'Meal Planning', 'Tips and Advice'];

  constructor() { }

  ngOnInit() {
  }

}
