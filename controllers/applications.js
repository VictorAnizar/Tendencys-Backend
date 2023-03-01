const mongoose = require('mongoose');


const Application = mongoose.model('Application');

function createApplication(req, res, next){
    let application = new Application(req.body);
    application.save()  
    .then(() => res.send("Application created"))
    .catch(next);
}

module.exports = {
    createApplication
}