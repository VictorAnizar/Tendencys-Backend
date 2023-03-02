const mongoose = require('mongoose');


const Application = mongoose.model('Application');

function createApplication(req, res, next) {
    let application = new Application(req.body);
    application.save()
        .then(app => res.send("Application created"))
        .catch(next);
}


function getApplications(req, res, next) {
    if (req.params.id) {
        Application.findById(req.params.id)
            .then(app => res.send(app))
            .catch(next);
    }
    else {
        Application.find()
            .then(apps => res.send(apps))
            .catch(next);
    }
}

function updateApplication(req, res, next) {
    Application.findById(req.params.id)
    .then(
            (app) => {
                if (!app) {
                    return res.send("Unable to find application to update");
                }
                let nuevaApp = req.body;
                // Actualizando campo "name"
                if (typeof nuevaApp.name !== "undefined") {
                    app.name = nuevaApp.name
                }

                app.save()
                .then(
                        //se manda respuesta al usuario
                        updated => res.status(200).send("Application updated")
                    )
                .catch(next);
            }
        )
    .catch(next)
}

function deleteApplication(req, res, next) {
    Application.findByIdAndDelete({ _id: req.params.id })
      .then(app => { res.send("Application deleted") })
      .catch(next);
  }


module.exports = {
    createApplication,
    getApplications,
    updateApplication,
    deleteApplication
}