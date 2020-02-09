import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'firebase/firestore';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  items: Observable<any[]>;
  users: Observable<any[]>;
  constructor(firestore: AngularFirestore, public db: FirebaseService) {
    this.items = firestore.collection('items').valueChanges();
  }

  ngOnInit() {
    this.users = this.db.getAllUsers();
  }
}