import cartModel from '../models/cart.model.js'
import productModel from '../models/product.model.js'
import ticketModel from '../models/ticket.js'

export const getCart = async (req, res) => {
    try {
        const cartId = req.params.cid
        const foundCart = await cartModel.findOne({ _id: cartId })
        if (foundCart)
            res.status(200).send(foundCart)
        else
            res.status(404).send("Carrito no existe")
    } catch (e) {
        console.log("Error en cartManager get", e)
        res.status(500).render('templates/error', { e })
    }
}


export const createCart = async (req, res) => {
    try {
        const createdCart = await cartModel.create({ products: [] })
        res.status(201).send(createdCart)
    } catch (e) {
        console.log("Error cartManager create", e)
        res.status(500).render('templates/error', { e })
    }
}



export const insertProductCart = async (req, res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        const product = await productModel.findById(productId)
        const { quantity } = req.body
        const cart = await cartModel.findOne({ _id: cartId })
        if (!product) {
            res.status(404).send("Producto no encontrado")
        }
        if (cart) {
            const indice = cart.products.findIndex(products => products.id == productId)
            

            if (indice !== -1) {
                cart.products[indice].quantity = quantity
            } else {
                cart.products.push({
                    product: product.title,
                    price: product.price,
                    quantity: quantity,
                    _id: productId,
                })
            }

            await cart.save()
            return res.status(200).send(cart)
        } else {
            res.status(404).send("Carrito no existe")
        }
    } catch (e) {
        res.status(500).render('templates/error', { e })
    }
}

export const updateQuantityProductCart = async (req, res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        const { quantity } = req.body
        const cart = await cartModel.findOne({ _id: cartId })
        if (cart) {
            const indice = cart.products.findIndex(products => products.id == productId)
            console.log(indice)

            if (indice !== -1) {
                cart.products[indice].quantity = quantity
                cart.save()
                res.status(200).send(cart)
            } else {
                res.status(404).send("Producto no encontrado")
            }

            await cart.save()
            return res.status(200).send(cart)
        } else {
            res.status(404).send("Carrito no existe")
        }
    } catch (e) {
        res.status(500).render('templates/error', { e })
    }
}

export const deleteProductCart = async (req, res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        const cart = await cartModel.findOne({ _id: cartId })
        if (cart) {
            const indice = cart.products.findIndex(prod => prod._id == productId)

            if (indice != -1) {
                cart.products.splice(indice, 1)
                cart.save()
                res.status(200).send(cart)
            } else {
                res.status(404).send("Producto no existe")
            }

        } else {
            res.status(404).send("Carrito no existe")
        }
    } catch (e) {
        res.status(500).render('templates/error', { e })
    }
}

export const deleteCart = async (req, res) => {
    try {
        const cartId = req.params.cid
        const cart = await cartModel.findOne({ _id: cartId })
        if (cart) {
            cart.products = []
            cart.save()
            res.status(200).send(cart)
        } else {
            res.status(404).send("Carrito no existe")
        }
    } catch (e) {
        res.status(500).render('templates/error', { e })
    }
}

export const purchaseCart = async (req, res) => {
    try {
        const cartId = req.params.cid
        const cart = await cartModel.findById(cartId)

        const prodStockError = []
        if (cart) {
            for (const prod of cart.products) {
                let producto = await productModel.findById(prod._id)

                if (producto.stock - prod.quantity < 0) {
                    prodStockError.push(producto.id)
                }
            }
            if (prodStockError.length === 0) {
                let totalTicket = 0

                for (const prod of cart.products) {
                    const producto = await productModel.findById(prod._id);
                    if (producto) {
                        producto.stock -= prod.quantity;
                        totalTicket += producto.price * prod.quantity;
                        await producto.save();
                    }
                }


                const newTicket = await ticketModel.create({
                    code: crypto.randomUUID(),
                    buyer: req.user.email,
                    amount: totalTicket,
                    products: cart.products

                })
                await cartModel.findByIdAndUpdate(cartId, { products: [] })
                res.status(200).send(newTicket)

            } else {
                prodStockError.forEach((prodId) => {
                    let indice = cart.products.findIndex(prod => prod.id == prodId)
                    cart.products.splice(indice, 1)
                })
                await cartModel.findByIdAndUpdate(cartId, { products: cart.products })
                res.status(400).send("Uno de los productos ingresados no cuenta con el stock disponible")
            }
        } else {
            res.status(404).send("Carrito no fue encontrado")
        }
    } catch (e) {
        console.log(e)
        res.status(500).render('error/error')
    }






}