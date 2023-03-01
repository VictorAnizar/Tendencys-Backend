// Se importa a mongoose
const mongoose = require('mongoose');

//Se definen los esquemas, en este caso sera para el esquema Application
const ApplicationSchema = new mongoose.Schema({
    name: {type: String, required: true}
}, {collection: "Applications", timestamps: true})

//Método con el cual indicaremos qué atributos del esquema son accesibles
ApplicationSchema.methods.publicData = () => {
    return {
        name: this.name
    }
}


// Cuando en alguna parte del código se mencione a "Application", nos estaremos refiriendo al esquema "ApplicationSchema"
module.exports = mongoose.model('Application', ApplicationSchema);