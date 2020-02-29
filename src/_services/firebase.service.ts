import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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

  addSession(values) {
    return this.db.collection('sessions').add({
      id: values.id,
      location: values.location
    })
  }

  isDayFilled(date) {
    let dayRef = this.db.collection('days');
    let allDays = dayRef.get();
    allDays.forEach(doc => {
      doc.forEach(inner => {
        if(JSON.stringify(inner.data()["date"]) == JSON.stringify(date)) {
          return true;
        }
      })
    })
  }

  count(collection) {

  }

  addDay() {
    return this.db.collection('days').add({
      id: this.count('days')
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

  updateDay(key, value) {
    const size$ = new Subject<string>();
    const queryObservable = size$.pipe(
      switchMap(size =>
        this.db.collection('days', ref => ref.where('id', '==', key)).snapshotChanges()
      )
    )

    queryObservable.subscribe(query => {
      console.log(query);
      this.db.collection('days').doc(query[0].payload.doc.id).update({ meals: firestore.FieldValue.arrayUnion(value) });
    })
    size$.next('1');
  }

  getMeals(id) {
    return this.db.collection('meals', ref => ref.where('id', '==', id)).valueChanges()
  }

  getAll(type: string) {
    return this.db.collection(type).valueChanges();
  }

  getCount(type: string) {
    this.db.collection(type).get()
  }
}
