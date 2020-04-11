const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// firebase.initializeApp({
//     apiKey: 'AIzaSyAvgAdnejzqDmSwz2USui_-Gfu4jSHh-v4',
//     authDomain: 'swimapp-d4f4a.firebaseapp.com',
//     projectId: 'swimapp-d4f4a'
//   });  

// var db = firebase.firestore;

const userRef = admin.firestore().collection('users')
const dayRef = admin.firestore().collection('days')
const postRef = admin.firestore().collection('posts')

//update methods
exports.sumSessions = functions.firestore
    .document('users/{userId}/days/{day}/session/{sessionId}')
    .onUpdate((snapshot, context) => {
        let dayRefDoc = admin.firestore().collection(`users/${context.params.userId}/days`)
        return dayRefDoc.doc(context.params.day).get().then(inner => {
            let day = inner.data();
            return inner.ref.update({
                caloriesBurned: (parseInt(day.caloriesBurned) - parseInt(snapshot.before.data().caloriesBurned)) + parseInt(snapshot.after.data().caloriesBurned),
                sessionTime: (parseInt(day.sessionTime) - parseInt(snapshot.before.data().duration)) + parseInt(snapshot.after.data().duration)
            })
        })
    })

exports.sumMeals = functions.firestore
    .document('users/{userId}/days/{day}/meals/{mealId}')
    .onUpdate((snapshot, context) => {
        let dayRefDoc = admin.firestore().collection(`users/${context.params.userId}/days`)
        return dayRefDoc.doc(context.params.day).get().then(inner => {
            let day = inner.data();
            return inner.ref.update({
                caloriesGained: (parseInt(day.caloriesGained) - parseInt(snapshot.before.data().caloriesGained)) + parseInt(snapshot.after.data().caloriesGained)
            })
        })
    })

//add methods
exports.addSessions = functions.firestore
    .document('users/{userId}/days/{day}/session/{sessionId}')
    .onCreate((snapshot, context) => {
        let dayRefDoc = admin.firestore().collection(`users/${context.params.userId}/days`)
        return dayRefDoc.doc(context.params.day).get().then(inner => {
            return inner.ref.update({
                activities: parseInt(inner.data().activities) + 1
            })
        })
    });

exports.addMeals = functions.firestore
    .document('users/{userId}/days/{day}/meals/{mealId}')
    .onCreate((snapshot, context) => {
        let dayRefDoc = admin.firestore().collection(`users/${context.params.userId}/days`)
        return dayRefDoc.doc(context.params.day).get().then(inner => {
            return inner.ref.update({
                meals: parseInt(inner.data().meals) + 1
            })
        })
    });

exports.deleteSessions = functions.firestore
    .document('users/{userId}/days/{day}/session/{sessionId}')
    .onDelete((snapshot, context) => {
        let dayRefDoc = admin.firestore().collection(`users/${context.params.userId}/days`)
        return dayRefDoc.doc(context.params.day).get().then(inner => {
            let day = inner.ref.data();
            return inner.ref.update({
                activities: parseInt(day.activities) - 1,
                caloriesBurned: parseInt(day.caloriesBurned) - parseInt(snapshot.before.data().caloriesBurned),
                sessionTime: parseInt(day.sessionTime) - parseInt(snapshot.before.data().duration)
            })
        })
    })

exports.deleteMeals = functions.firestore
    .document('users/{userId}/days/{day}/meals/{mealId}')
    .onDelete((snapshot, context) => {
        let dayRefDoc = admin.firestore().collection(`users/${context.params.userId}/days`)
        return dayRefDoc.doc(context.params.day).get().then(inner => {
            let day = inner.ref.data();
            return inner.ref.update({
                meals: parseInt(day.meals) - 1,
                caloriesGained: parseInt(day.caloriesGained) - parseInt(snapshot.before.data().caloriesGained)
            })
        })
    })

exports.incrementReplies = functions.firestore
    .document('posts/{postId}/comments/{commentId}')
    .onCreate((snapshot, context) => {
        let postRefDoc = postRef.doc(context.params.postId)
        return postRefDoc.get().then(inner => {
            return postRefDoc.update({
                replies: inner.data().replies + 1
            })
        })
    })

exports.decrementReplies = functions.firestore
    .document('posts/{postId}/comments/{commentId}')
    .onDelete((snapshot, context) => {
        let postRefDoc = postRef.doc(context.params.postId)
        return postRefDoc.get().then(inner => {
            return postRefDoc.update({
                replies: inner.data().replies - 1
            })
        })
    })

exports.getAverage = functions.firestore
    .document('users/{userId}/days/{day}')
    .onUpdate((snapshot, context) => {
        let averages = {};
        let temp = {
            sessionTime: [],
            caloriesBurned: [],
            activity: {}
        };
        let docs = [];
        let dayRefDoc = admin.firestore().collection(`users/${context.params.userId}/days`)
        return dayRefDoc.get().then(inner => {
            for (doc of inner.docs) {
                docs.push(doc.ref.collection('session').get());
            }
        }).then(() => {
            Promise.all(docs).then(docs => {
                docs.forEach(doc => {
                    doc.docs.forEach(doc => {
                        let data = doc.data();
                        temp["sessionTime"].push(parseInt(data.duration))
                        temp["caloriesBurned"].push(parseInt(data.caloriesBurned))
                        if (data.activity in temp["activity"])
                            temp["activity"][data.activity]++;
                        else
                            temp["activity"][data.activity] = 1;
                    });
                })
                averages["sessionTime"] = (temp["sessionTime"].reduce(function (a, b) { return a + b; }, 0)) / temp["sessionTime"].length;
                averages["caloriesBurned"] = (temp["caloriesBurned"].reduce(function (a, b) { return a + b; }, 0)) / temp["caloriesBurned"].length;
                averages["activity"] = Object.keys(temp["activity"]).find(key => temp["activity"][key] === Math.max.apply(null, Object.keys(temp["activity"]).map(function (key) { return temp["activity"][key] })));
                return admin.firestore().collection('users').doc(context.params.userId).get().then(inner => {
                    return inner.ref.update({ averageSessionTime: averages.sessionTime, averageCaloriesBurned: averages.caloriesBurned, favoriteActivity: averages.activity })
                })
            })
        })
    })