// Se importa a mongoose
const mongoose = require('mongoose');

//Se definen los esquemas, en este caso sera para el esquema Log
const LogSchema = new mongoose.Schema({
    application_id: {type: mongoose.Schema.Types.ObjectId, ref: "Application",required: true},
    type: {type: String , enum: ['error', 'info', 'warning'],  required: true},
    priority: {type: String , enum: ['lowest', 'low', 'medium', 'high', 'highest'],  required: true},
    path: {type: String, required: true},
    message: {type: String, required: true},
    request: {type: mongoose.Schema.Types.Mixed, required: true},
    response: {type: mongoose.Schema.Types.Mixed, required: true}

}, {collection: "Logs", timestamps: true})

//Método con el cual indicaremos qué atributos del esquema son accesibles
//En este caso el ID de la aplication será accesible pero si resulta en una vulnerabilidad, dejará de serlo
LogSchema.methods.publicData = () => {
    return {
        application_id: this.application_id,
        type: this.type,
        priority: this.priority,
        path: this.path,
        message: this.message,
        request: this.request,
        response: this.response,
        
    }
}


// Cuando en alguna parte del código se mencione a "Log", nos estaremos refiriendo al esquema "LogSchema"
mongoose.model("Log", LogSchema);