import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase';
import * as bcrypt from 'bcryptjs';
import * as firebase from 'firebase';
import { User } from 'src/_models/user';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  currentDay: Observable<any[]>;
  currentDayRef: string;

  currentUser: User;

  constructor(
    public db: AngularFirestore,
    public storage: AngularFireStorage
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }

  getAllUsers() {
    return this.db.collection('users').snapshotChanges();
  }

  getUser(id) {
    return this.db.firestore.collection('users').doc(id).get().then(inner => {
      return inner.data();
    })
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

  isDayFilled(date): Observable<boolean> {
    return this.db.collection(`users/${this.currentUser.id}/days`, ref => ref.where('date', '==', date)).valueChanges().pipe(map(docRef => {
      return docRef.length == 0;
    }))
  }

  convertToTimestamp(date) {
    return firestore.Timestamp.fromMillis(date);
  }

  addNewUser(id, values) {
    values["password"] = bcrypt.hashSync(values["password"], 0);
    console.log("hello")
    return this.db.collection('users').doc(id).set(values);
  }

  addDay(date: firestore.Timestamp) {
    return this.db.collection(`users/${this.currentUser.id}/days`).add({
      date: date,
      caloriesBurned: 0,
      caloriesGained: 0,
      activities: 0,
      sessionTime: 0,
      meals: 0
    })
  }

  setRef(ref) {
    this.currentDayRef = ref;
  }

  getDay(date: firestore.Timestamp) {
    this.currentDay = this.db.collection(`users/${this.currentUser.id}/days`, ref => ref.where('date', '==', date)).snapshotChanges();
    this.currentDay.subscribe(docRef => {
      if(docRef.length != 0)  
        this.setRef(docRef[0].payload.doc.id);
    })
    return this.db.collection(`users/${this.currentUser.id}/days`, ref => ref.where('date', '==', date)).valueChanges();
  }

  getSessions(date: firestore.Timestamp) {
    return this.currentDay.pipe(switchMap(docRef => {
      return this.db.collection(`users/${this.currentUser.id}/days`).doc(docRef[0].payload.doc.id).collection('session').valueChanges();
    }))
  }

  getMeals(date: firestore.Timestamp) {
    return this.currentDay.pipe(switchMap(docRef => {
      return this.db.collection(`users/${this.currentUser.id}/days`).doc(docRef[0].payload.doc.id).collection('meals').valueChanges();
    }))
  }

  addActivity(value) {
    return this.currentDay.pipe(switchMap(docRef => {
      return this.db.collection(`users/${this.currentUser.id}/days`).doc(docRef[0].payload.doc.id).collection('session').doc('3').set(value);
    }))
  }

  updateActivity(value, index) {
    let docRef = this.db.collection(`users/${this.currentUser.id}/days`).doc(this.currentDayRef).collection('session').doc(index.toString());
    return this.db.firestore.runTransaction(function (transaction) {
      return transaction.get(docRef.ref).then(function () {
        transaction.set(docRef.ref, value);
      })
    })
  }

  updateMeal(value, index) {
    let docRef = this.db.collection(`users/${this.currentUser.id}/days`).doc(this.currentDayRef).collection('meals').doc(index.toString())
    return this.db.firestore.runTransaction(function (transaction) {
      return transaction.get(docRef.ref).then(function () {
        transaction.set(docRef.ref, value);
      })
    })
  }

  deleteActivity(index) {
    let ref = this.db.collection(`users/${this.currentUser.id}/days`).doc(this.currentDayRef).collection('session').doc(index.toString())
    return this.db.firestore.runTransaction(function (transaction) {
      return transaction.get(ref.ref).then(function () {
        transaction.delete(ref.ref);
      })
    })
  }

  deleteMeal(index) {
    let ref = this.db.collection(`users/${this.currentUser.id}/days`).doc(this.currentDayRef).collection('meals').doc(index.toString())
    return this.db.firestore.runTransaction(function (transaction) {
      return transaction.get(ref.ref).then(function () {
        transaction.delete(ref.ref);
      })
    })
  }

  getPosts(category) {
    return this.db.firestore.collection('posts').where('category', '==', category).orderBy("timestamp", "desc").get().then(inner => {
      return inner.docs.map(doc => doc.data());
    })
  }

  getPostById(postId) {
    return this.db.firestore.collection('posts').where('id', '==', postId).get().then(inner => {
      return inner.docs.map(doc => doc.data());
    })
  }

  addNewPost(values) {
    return this.db.collection('posts').add({
      body: values.body,
      category: values.category,
      id: values.id,
      subject: values.subject,
      timestamp: firestore.Timestamp.fromDate(new Date()),
      replies: 0
    })
  }

  updatePost(values, postId) {
    values["lastEdit"] = firestore.Timestamp.fromDate(new Date());
    return this.db.collection('posts', ref => ref.where('id', '==', postId)).get().subscribe(docRef => {
      return docRef.docs[0].ref.update(values);
    })
  }

  deletePost(postId) {
    return this.db.collection('posts', ref => ref.where('id', '==', postId)).get().subscribe(docRef => {
      console.log(docRef)
      return docRef.docs[0].ref.delete();
    })
  }

  getComments(postId) {
    return this.db.firestore.collection('posts').where('id', '==', postId).get().then(docRef => {
      return docRef.docs[0].ref.collection('comments').orderBy("timestamp", "asc").get().then(docRef => {
        return docRef.docs.map(doc => doc.data())
      })
    })
  }

  addComment(values, postId) {
    return this.db.collection('posts', ref => ref.where('id', '==', postId)).snapshotChanges().pipe(first()).subscribe(docRef => {
      return this.db.collection('posts').doc(docRef[0].payload.doc.id).collection('comments').add({
        body: values.body,
        timestamp: firestore.Timestamp.fromDate(new Date())
      });
    })
  }

  updateComment(values, postId) {
    values["lastEdit"] = firestore.Timestamp.fromDate(new Date());
    return this.db.collection('posts', ref => ref.where('id', '==', postId)).snapshotChanges().subscribe(docRef => {
      return this.db.collection('posts').doc(docRef[0].payload.doc.id).collection('comments',
        ref => ref.where('timestamp', '==', values["timestamp"])).get().subscribe(docRef => {
          docRef.docs[0].ref.update(values);
        })
    })
  }

  deleteComment(timestamp, postId) {
    return this.db.collection('posts', ref => ref.where('id', '==', postId)).snapshotChanges().pipe(first()).subscribe(docRef => {
      return this.db.collection('posts').doc(docRef[0].payload.doc.id).collection('comments',
        ref => ref.where('timestamp', '==', timestamp)).get().subscribe(docRef => {
          docRef.docs[0].ref.delete();
        })
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

  // addToBucket(path, file) {
  //   console.log(path);
  //   this.storage.storage.ref(path).(file).then(function(snapshot) {
  //     console.log(snapshot);
  //   })
  // }

  addToBucket(path, file) {
    let storageRef = this.storage.ref(path);
    storageRef.put(file).then(whatever => {
      console.log(whatever);
    }).catch(function(error) {
      console.log(error);
    });
  }

  getFromBucket(path) {
    let storageRef = this.storage.ref(path);
    return storageRef.getDownloadURL().pipe(map(function (url) {
      return url;
    }))
  }

  editBio(values) {
    this.db.collection('users', ref => ref.where('id', '==', JSON.parse(localStorage.getItem('currentUser')).id)).get().subscribe(user => {
      user.docs[0].ref.update({ bio: values.bio});
    })
  }
}