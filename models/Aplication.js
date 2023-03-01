// Se importa a mongoose
const mongoose = require('mongoose');

//Se definen los esquemas, en este caso sera para el esquema Aplication
const AplicationSchema = new mongoose.Schema({
    name: {type: String, required: true}
}, {collection: "Aplications", timestamps: true})

//Método con el cual indicaremos qué atributos del esquema son accesibles
AplicationSchema.methods.publicData = () => {
    return {
        name: this.name
    }
}


// Cuando en alguna parte del código se mencione a "Aplication", nos estaremos refiriendo al esquema "AplicationSchema"
mongoose.model("Aplication", AplicationSchema);