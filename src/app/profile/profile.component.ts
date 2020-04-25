import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FirebaseService } from './../../_services/firebase.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  user: any;
  isCurrentUser: boolean;
  image: any;

  bioForm: FormGroup;
  showBioForm: false;

  profileId: any;

  constructor(
    public db: FirebaseService,
    public builder: FormBuilder,
    public route: ActivatedRoute,
    ) {
  }

  ngOnInit() {
    this.profileId = this.route.paramMap.pipe(
      map((params: ParamMap) => {
        return params.get('profileId');
      })
    );

    this.profileId.subscribe(id => {
        this.user = this.db.getUser(id);
        if (id === JSON.parse(localStorage.getItem('currentUser')).id) {
          this.isCurrentUser = true;
        }
      });

    this.bioForm = this.builder.group({
      bio: ''
    });
  }

  editBio() {
    const values = this.bioForm.getRawValue();
    this.db.editBio(values);
    this.showBioForm = false;
  }
}
