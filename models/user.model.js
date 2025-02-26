
import { Schema, model } from "mongoose";
import cartModel from "./cart.model.js";

const StringNRequired = {
    type: String,
    required: true
}



const userSchema = new Schema({
    first_name:StringNRequired ,
    last_name: StringNRequired ,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: StringNRequired,
    age: { type: Number, required: true },
    rol: { type: String, default: "Usuario" },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "carts"
    }

})

userSchema.post("save", async function (userCreated) {
    try {
        if (!userCreated.cart) {
            const newCart = await cartModel.create({ products: [] })
            userCreated.cart = newCart._id //Referencio el id del carrito con el usuario
            const mensaje = await userCreated.updateOne({ cart: newCart._id })
            console.log(mensaje);
        } else {
            console.log("El usuario ya tiene carrito")
        }
    } catch (e) {
        console.log("Error al crear carrito", e)
    }
})







const userModel = model("users", userSchema)

export default userModel