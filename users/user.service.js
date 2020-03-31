const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const users = [
    { id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' },
    { id: 2, username: 'user', password: 'password', firstName: 'Spurdo', lastName: 'Komurdo' }];

module.exports = {
    authenticate,
    getAll
};

async function authenticate({ username, password }) {
    //todo:
    // pull list of users from Firebase. gonna have to subscribe to these
    // get 'currentUser' global variable working (very useful later on)

    const user = users.find(u => u.username === username);
    if (user) {
        return bcrypt.hash(user.password, saltRounds).then(function (hash) {
            return bcrypt.compare(password, hash).then(function (result) {
                if (result) {
                    const token = jwt.sign({ sub: user.id }, config.secret);
                    const { password, ...userWithoutPassword } = user;
                    return {
                        ...userWithoutPassword,
                        token
                    };
                }
            })
        })
    }
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}