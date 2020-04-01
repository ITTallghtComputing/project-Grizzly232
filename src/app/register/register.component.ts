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
        password: ''
      })
    }

  ngOnInit() {
    
  }

  addNewUser() {
    let values = this.addForm.getRawValue();
    this.db.addNewUser(values);
    setTimeout(() => {
      this.router.navigate(['./../login']);
    }, 1000)
  }
}
