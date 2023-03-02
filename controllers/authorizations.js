const mongoose = require('mongoose');

const Joi = require('joi');

const Authorization = mongoose.model('Authorization');

function createAuthorization(req, res, next) {
    
    const { body } = req

    const authorizationSchemaJoi = Joi.object().keys({
        application_id: Joi.string().required(),
        token: Joi.string().required()
    })

    const result = authorizationSchemaJoi.validate(body);

    const { value, error } = result;

    const valid = error == null;
    if (!valid) {
        res.status(422).json({
            message: 'Fields application_id and token required',
            data: body
        })
    } else {
        let authorization = new Authorization(req.body);
        authorization.save()
            .then(auth => res.send("Authorization created"))
            .catch(next);
    
    
    }



}


function getAuthorization(req, res, next) {
    if (req.params.id) {
        Authorization.findById(req.params.id)
            .then(auth => res.send(auth))
            .catch(next);
    }
    else {
        Authorization.find()
            .then(auths => res.send(auths))
            .catch(next);
    }
}

function updateAuthorization(req, res, next) {
    Authorization.findById(req.params.id)
        .then(
            (auth) => {
                if (!auth) {
                    return res.send("Unable to find Authorization to update");
                }
                let nuevaauth = req.body;
                // Actualizando campo "token"
                if (typeof nuevaauth.token !== "undefined") {
                    auth.token = nuevaauth.token
                }

                auth.save()
                    .then(
                        //se manda respuesta al usuario
                        updated => res.status(200).send("Authorization updated")
                    )
                    .catch(next);
            }
        )
        .catch(next)
}

function deleteAuthorization(req, res, next) {
    Authorization.findByIdAndDelete({ _id: req.params.id })
        .then(auth => { res.send("Authorization deleted") })
        .catch(next);
}


module.exports = {
    createAuthorization,
    getAuthorization,
    updateAuthorization,
    deleteAuthorization
}