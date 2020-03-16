import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  currentDay: string;

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

  isDayFilled(date) : Observable<boolean> {
    return this.db.collection('days', ref => ref.where('date', '==', date)).valueChanges().pipe(map(docRef => {
      return docRef.length == 0;
    }))
  }

  convertToTimestamp(date) {
    return firestore.Timestamp.fromMillis(date);
  }

  count(collection) {

  }

  addDay(date: firestore.Timestamp) {
    return this.db.collection('days').add({
      date: date,
      caloriesBurned: 0,
      caloriesGained: 0,
      sessions: 0,
      sessionTime: 0,
      meals: 0
    })
  }

  getDay(date: firestore.Timestamp) {
    return this.db.collection('days', ref => ref.where('date', '==', date)).valueChanges();
  }

  getSessions(date: firestore.Timestamp) {
    return this.db.collection('days', ref => ref.where('date', '==', date)).snapshotChanges().pipe(switchMap(docRef => {
      return this.db.collection('days').doc(docRef[0].payload.doc.id).collection('session').valueChanges();
    }))
  }

  getMeals(date: firestore.Timestamp) {
    return this.db.collection('days', ref => ref.where('date', '==', date)).snapshotChanges().pipe(switchMap(docRef => {
      return this.db.collection('days').doc(docRef[0].payload.doc.id).collection('meals').valueChanges();
    }))
  }

  addActivity(value, date) {
    return this.db.collection('days', ref => ref.where('date', '==', date)).snapshotChanges().pipe(switchMap(docRef => {
      return this.db.collection('days').doc(docRef[0].payload.doc.id).collection('session').doc('3').set(value);
    }))
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
      return this.db.collection('sessions').doc(query[0].payload.doc.id).update({ swims: firestore.FieldValue.arrayUnion(value) });
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

  getAll(type: string) {
    return this.db.collection(type).valueChanges();
  }

  getCount(type: string) {
    this.db.collection(type).get()
  }
}
