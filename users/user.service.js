const config = require('config.json');
const jwt = require('jsonwebtoken');
const firebase = require('firebase');
const rxjs = require('rxjs');
const bcrypt = require('bcrypt');
const saltRounds = 10;

firebase.initializeApp({
    apiKey: "AIzaSyAvgAdnejzqDmSwz2USui_-Gfu4jSHh-v4",
    authDomain: "swimapp-d4f4a.firebaseapp.com",
    projectId: "swimapp-d4f4a"
});

const db = firebase.firestore();



module.exports = {
    authenticate,
    getAll
};

function authenticate({ username, password }) {
    const users = db.collection('users').where('username', '==', username);
    return users.get().then(async (querySnapshot) => {
        console.log(querySnapshot.docs);
        const userDoc = querySnapshot.docs.find(doc => {
            return doc.data().username.toUpperCase() === username.toUpperCase();
        })

        if (userDoc) {
            let user = userDoc.data();
            const pwdCompareResult = await bcrypt.compare(password, user.password);

            console.log(password);
            console.log(user.password);
            console.log(pwdCompareResult);

            if (pwdCompareResult) {
                const token = jwt.sign({ sub: user.id }, config.secret);
                const { password, ...userWithoutPassword } = user;
                return {
                    ...userWithoutPassword,
                    token
                }
            }
        }
    })
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}