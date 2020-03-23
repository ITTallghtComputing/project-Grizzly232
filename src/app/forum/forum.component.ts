import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './../../_services/firebase.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { Query } from '@angular/fire/firestore';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  posts: any
  currentCategory: Observable<string>;
  showCategories: boolean = true;

  constructor(public db: FirebaseService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.currentCategory = this.route.paramMap.pipe(
      map((params: ParamMap) => {
        return params.get("category");
      })
    )

    this.currentCategory.subscribe(category => {
      this.posts = this.db.getPosts(category);
      this.showCategories = false;
    })
  }
}
