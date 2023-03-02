const mongoose = require('mongoose');


const User = mongoose.model('User');

function createUser(req, res, next) {
   
    const body = req.body,
        password = body.password

    // delete body.password
    const user = new User(body)

    user.crearPassword(password);
    user.save()
        .then(user => {
            return res.status(200).json(user.toAuthJSON())
        })
        .catch(next)


}


function getUser(req, res, next) {
    if (req.params.id) {
        User.findById(req.params.id)
            .then(user => res.send(user))
            .catch(next);
    }
    else {
        User.find()
            .then(users => res.send(users))
            .catch(next);
    }
}

function login(req, res, next) {
    let log = new Log(req.body);
    log.save()
        .then(log => res.send("Log created"))
        .catch(next);
}



module.exports = {
    createUser,
    login,
    getUser
}