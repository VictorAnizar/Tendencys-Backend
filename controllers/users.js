const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model('User');

function createUser(req, res, next) {



    const { body } = req

    const userSchemaJoi = Joi.object().keys({
        name: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required()
    })

    const result = userSchemaJoi.validate(body);

    const { value, error } = result;

    const valid = error == null;
    if (!valid) {
        res.status(422).json({
            message: 'Fields name, username and password are required',
            data: body
        })
    } else {
        const password = body.password

        // delete body.password
        const user = new User(req.body)

        user.crearPassword(password);
        user.save()
            .then(user => {
                return res.status(200).json(user.toAuthJSON())
            })
            .catch(next)

    }



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


    if (!req.body.username || !req.body.password) {
        return res.status(422).json({ error: { usuario: "Missing information to login" } })
    }

    User.findOne({ username: req.body.username })
        .then(user => {
            console.log(user);

            if (user != null) {
                if (user.validarPassword(req.body.password)) {
                    return res.status(200).json(user.toAuthJSON());
                } else {
                    return res.status(400).send("Error")
                }

            }
            if (user == null) {
                return res.status(400).send("Error")
            }
            // return 
        }
        )
        .catch(next);

}


module.exports = {
    createUser,
    login,
    getUser
}