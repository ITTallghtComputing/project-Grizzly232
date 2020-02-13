import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) { }

  getAllUsers() {
    return this.db.collection('users').snapshotChanges();
  }

  addUser(values) {
    return this.db.collection('users').add({
      
    })
  }

  addSwimToSession() {
    
  }

  addSession(values) {
    return this.db.collection('sessions').add({
      id: values.id,
      location: values.location
    })
  }

  updateSession(key, value) {
    const size$ = new Subject<string>();
    const queryObservable = size$.pipe(
      switchMap(size => 
        this.db.collection('sessions', ref => ref.where('id', '==', key)).snapshotChanges()
      )
    )

    queryObservable.subscribe(query => {
      console.log(query);
      this.db.collection('sessions').doc(query[0].payload.doc.id).update({ swims: firestore.FieldValue.arrayUnion(value) });
    })
    size$.next('1');
  }

  getAll(type: string) {
    return this.db.collection(type).valueChanges();
  }

  getCount(type: string) {
    this.db.collection(type).get()
  }
}
