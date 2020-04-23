import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FirebaseService } from './../../_services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  addForm: FormGroup;

  constructor(
    public builder: FormBuilder,
    public db: FirebaseService,
    public router: Router) {
      this.addForm = this.builder.group({
        username: '',
        email: '',
        password: ''
      });
    }

  ngOnInit() {

  }

  addNewUser() {
    const values = this.addForm.getRawValue();
    const id = (Math.floor(Math.random() * 1000000000)).toString();
    this.db.addNewUser(id, values);
    setTimeout(() => {
      this.router.navigate(['./../login']);
    }, 1000);
  }
}
