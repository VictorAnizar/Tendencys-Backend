const { allow } = require('joi');
const mongoose = require('mongoose');
const Joi = require('joi');


const Log = mongoose.model('Log');

function createLog(req, res, next) {

    const { body } = req

    const userSchemaJoi = Joi.object().keys({
        application_id: Joi.string().required(),
        type: Joi.string().required({allow:['error', 'info', 'warning']}),
        priority: Joi.string().required({allow:['lowest', 'low', 'medium', 'high', 'highest']}),
        path: Joi.string().required(),
        message: Joi.string().required(),
        request: Joi.string().required(),
        response: Joi.string().required()

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
        let log = new Log(req.body);
        log.save()
            .then(log => res.send("Log created"))
            .catch(next);

    }



}


function getLog(req, res, next) {
    if (req.params.id) {
        Log.findById(req.params.id)
            .then(log => res.send(log))
            .catch(next);
    }
    else {
        Log.find()
            .then(logs => res.send(logs))
            .catch(next);
    }
}

function updateLog(req, res, next) {
    Log.findById(req.params.id)
        .then(
            (log) => {
                if (!log) {
                    return res.send("Unable to find Log to update");
                }
                let nuevalog = req.body;
                // Actualizando campo "type"
                if (typeof nuevalog.type !== "undefined") {
                    log.type = nuevalog.type
                }

                // Actualizando campo "priority"
                if (typeof nuevalog.priority !== "undefined") {
                    log.priority = nuevalog.priority
                }

                // Actualizando campo "path"
                if (typeof nuevalog.path !== "undefined") {
                    log.path = nuevalog.path
                }

                // Actualizando campo "message"
                if (typeof nuevalog.message !== "undefined") {
                    log.message = nuevalog.message
                }

                log.save()
                    .then(
                        //se manda respuesta al usuario
                        updated => res.status(200).send("Log updated")
                    )
                    .catch(next);
            }
        )
        .catch(next)
}

function deleteLog(req, res, next) {
    Log.findByIdAndDelete({ _id: req.params.id })
        .then(log => { res.send("Log deleted") })
        .catch(next);
}


module.exports = {
    createLog,
    getLog,
    updateLog,
    deleteLog
}