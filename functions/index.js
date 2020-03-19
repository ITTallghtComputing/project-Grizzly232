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

//update methods
exports.sumSessions = functions.firestore
.document('days/{day}/session/{sessionId}')
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

exports.sumMeals = functions.firestore
.document('days/{day}/meals/{mealId}')
.onUpdate((snapshot, context) => {
    let dayRefDoc = dayRef.doc(context.params.day)
    return dayRefDoc.get().then(inner => {
        let day = inner.data();
        return dayRefDoc.update({ 
            caloriesGained: (parseInt(day.caloriesGained) - parseInt(snapshot.before.data().caloriesGained)) + parseInt(snapshot.after.data().caloriesGained)})
    })
})

//add methods
exports.addSessions = functions.firestore
.document('days/{day}/session/{sessionId}')
.onCreate((snapshot, context) => {
    let dayRefDoc = dayRef.doc(context.params.day)
    return dayRefDoc.get().then(inner => {
        return dayRefDoc.update({
            activities: parseInt(inner.data().activities) + 1
        })
    })
});

exports.addMeals = functions.firestore
.document('days/{day}/meals/{mealId}')
.onCreate((snapshot, context) => {
    let dayRefDoc = dayRef.doc(context.params.day)
    return dayRefDoc.get().then(inner => {
        return dayRefDoc.update({
            meals: parseInt(inner.data().meals) + 1
        })
    })
});

exports.deleteSessions = functions.firestore
.document('days/{day}/session/{sessionId}')
.onDelete((snapshot, context) => {
    let dayRefDoc = dayRef.doc(context.params.day)
    return dayRefDoc.get().then(inner => {
        let day = inner.data();
        return dayRefDoc.update({
            activities: parseInt(day.activities) - 1,
            caloriesBurned: parseInt(day.caloriesBurned) - parseInt(snapshot.before.data().caloriesBurned),
            sessionTime: parseInt(day.sessionTime) - parseInt(snapshot.before.data().duration)
        })
    })
})

exports.deleteMeals = functions.firestore
.document('days/{day}/meals/{mealId}')
.onDelete((snapshot, context) => {
    let dayRefDoc = dayRef.doc(context.params.day)
    return dayRefDoc.get().then(inner => {
        let day = inner.data();
        return dayRefDoc.update({
            meals: parseInt(day.meals) - 1,
            caloriesGained: parseInt(day.caloriesGained) - parseInt(snapshot.before.data().caloriesGained)
        })
    })
})