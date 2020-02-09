import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) { }

  getAllUsers() {
    return this.db.collection('users').valueChanges();
  }

  addUser(values) {
    return this.db.collection('users').add({
      
    })
  }

  addSession(values) {
    return this.db.collection('sessions').add({
      id: values.id,
      location: values.location
    })
  }

  getAll(type: string) {
    return this.db.collection(type).valueChanges();
  }
}
