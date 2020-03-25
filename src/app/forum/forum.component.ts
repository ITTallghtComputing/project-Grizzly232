import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './../../_services/firebase.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { Query } from '@angular/fire/firestore';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  posts: any
  currentCategory: Observable<string>;

  addForm: FormGroup;
  showForm: boolean;

  constructor(
    public db: FirebaseService,
    public route: ActivatedRoute,
    public builder: FormBuilder
  ) { }

  ngOnInit() {
    this.currentCategory = this.route.paramMap.pipe(
      map((params: ParamMap) => {
        return params.get("category");
      })
    )

    this.currentCategory.subscribe(category => {
      this.posts = this.db.getPosts(category);
    })

    this.addForm = this.builder.group({
      subject: '',
      body: ''
    })
  }

  addNewPost() {
    let values = this.addForm.getRawValue();
    this.currentCategory.subscribe(category => {
      values["category"] = category;
      values["id"] = 4;
      this.db.addNewPost(values);
    })
  }
}
