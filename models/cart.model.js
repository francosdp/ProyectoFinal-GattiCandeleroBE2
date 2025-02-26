import { Schema, model } from 'mongoose'

const cartSchema = new Schema({
    products: [
        {
            product:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                requireed:true
            },
            quantity: {
                type: Number,
                required: true
            },
            refersTo:{}
        }
    ],
})


const cartModel = model("carts", cartSchema)

export default cartModel