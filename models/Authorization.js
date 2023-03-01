// Se importa a mongoose
const mongoose = require('mongoose');

//Se definen los esquemas, en este caso sera para el esquema Authorization
const AuthorizationSchema = new mongoose.Schema({
    application_id: {type: mongoose.Schema.Types.ObjectId, ref: "Application",required: true},
    token: {type: String, required: true}
}, {collection: "Authorizations", timestamps: true})

//Método con el cual indicaremos qué atributos del esquema son accesibles
//En este caso el ID de la aplication será accesible pero si resulta en una vulnerabilidad, dejará de serlo
AuthorizationSchema.methods.publicData = () => {
    return {
        token: this.token
    }
}


// Cuando en alguna parte del código se mencione a "Aplication", nos estaremos refiriendo al esquema "AplicationSchema"
mongoose.model("Authorization", AuthorizationSchema);