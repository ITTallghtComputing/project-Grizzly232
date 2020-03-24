import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseService } from '../../_services/firebase.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post: any;
  comments: any;
  id: Observable<number>

  constructor(public db: FirebaseService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.paramMap.pipe(
      map((params: ParamMap) => {
        return parseInt(params.get("postId"));
      })
    )

    this.id.subscribe(postId => {
      this.post = this.db.getPostById(postId);
      this.comments = this.db.getComments(postId);
    })
  }

  debug() {
    console.log(this.comments);
  }
}
