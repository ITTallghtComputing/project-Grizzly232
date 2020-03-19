const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// firebase.initializeApp({
//     apiKey: 'AIzaSyAvgAdnejzqDmSwz2USui_-Gfu4jSHh-v4',
//     authDomain: 'swimapp-d4f4a.firebaseapp.com',
//     projectId: 'swimapp-d4f4a'
//   });  

// var db = firebase.firestore;

const dayRef = admin.firestore().collection('days')

exports.sumSessions = functions.firestore.document('days/{day}/session/{sessionId}')
.onUpdate((snapshot, context) => {
    let dayRefDoc = dayRef.doc(context.params.day)
    return dayRefDoc.get().then(inner => {
        let day = inner.data();
        return dayRefDoc.update({ 
            caloriesBurned: (parseInt(day.caloriesBurned) - parseInt(snapshot.before.data().caloriesBurned)) + parseInt(snapshot.after.data().caloriesBurned),
            sessionTime: (parseInt(day.sessionTime) - parseInt(snapshot.before.data().duration)) + parseInt(snapshot.after.data().duration)
        })
    })
})

exports.sumMeals = functions.firestore.document('days/{day}/meals/{mealId}')
.onUpdate((snapshot, context) => {
    let dayRefDoc = dayRef.doc(context.params.day)
    return dayRefDoc.get().then(inner => {
        let meal = inner.data();
        return dayRefDoc.update({ 
            caloriesGained: (parseInt(meal.caloriesGained) - parseInt(snapshot.before.data().caloriesGained)) + parseInt(snapshot.after.data().caloriesGained)})
    })
})