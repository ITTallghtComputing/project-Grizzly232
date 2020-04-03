import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './../../_services/firebase.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map } from 'rxjs/operators';
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
    public builder: FormBuilder,
    public router: Router
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
      values["id"] = Math.floor(Math.random() * 1000000000);
      this.db.addNewPost(values);
      this.router.navigate([`./../../post/${values["id"]}`]);
    })
  }
}
