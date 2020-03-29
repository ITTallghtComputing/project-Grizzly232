import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, take, first } from 'rxjs/operators';
import { FirebaseService } from '../../_services/firebase.service';
import { FormGroup, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post: any;
  comments: any;
  id: Observable<number>

  addForm: FormGroup
  showAddForm: boolean;

  editForm: FormGroup;
  showEditForm: boolean;

  showCommentEditForm: boolean;
  formIndex: number;

  constructor(
    public db: FirebaseService,
    public route: ActivatedRoute,
    public builder: FormBuilder,
    public router: Router
  ) { }

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

    this.addForm = this.builder.group({
      body: ''
    })

    this.editForm = this.builder.group({
      subject: '',
      body: ''
    })
  }

  debug() {
    console.log(this.comments);
  }

  addNewComment() {
    let values = this.addForm.getRawValue();
    this.id.pipe(first()).subscribe(postId => {
      this.db.addComment(values, postId);
      $('#commentAddedToast').toast('show')
      setTimeout(function() {
        location.reload();
      }, 2000)
    })
  }

  editPost() {
    let values = this.editForm.getRawValue();
    this.id.subscribe(postId => {
      this.db.updatePost(values, postId);
      $('#postEditedToast').toast('show')
      setTimeout(function() {
        location.reload();
      }, 2000)
    })
  }

  editComment(timestamp) {
    let values = this.addForm.getRawValue();
    values["timestamp"] = timestamp;
    this.id.subscribe(postId => {
      this.db.updateComment(values, postId);
      $('#commentEditedToast').toast('show')
      setTimeout(function() {
        location.reload();
      }, 2000)
    })
  }

  deletePost() {
    if (window.confirm('Are you sure you want to delete this post?')) {
      this.id.subscribe(postId => {
        this.db.deletePost(postId);
        this.router.navigate(['../../forum']);
      })
    }
  }

  deleteComment(timestamp) {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      this.id.subscribe(postId => {
        this.db.deleteComment(timestamp, postId);
        $('#commentDeletedToast').toast('show')
        setTimeout(function() {
          location.reload();
        }, 3000)
      })
    }
  }

  setSubject(value) {
    this.editForm.controls.subject.setValue(value);
  }

  setBody(value) {
    this.addForm.controls.body.setValue(value);
    this.editForm.controls.body.setValue(value);
  }
}
