import productModel from "../models/product.model.js";

export const getProducts = async (req, res) => {
    try {
        const { limit, page, metFilter, filter, metOrder, ord } = req.query
        const askedPage = page !== undefined ? page : 1
        const askedLimit = (limit === undefined || limit === null) ? 10 : limit;
        const filQuery = metFilter !== undefined ? { [metFilter]: filter } : {}
        const ordQuery = metOrder !== undefined ? { metOrder: ord } : {}
        const products = await productModel.paginate(filQuery, { limit: askedLimit, page: askedPage, ordQuery, lean: true })        

        products.pageNumbers = Array.from({ length: products.totalPages }, (_, i) => ({
            number: i + 1,
            isCurrent: i + 1 === products.page
        }))
        res.status(200).render('templates/home', { products })
    } catch (e) {
        console.log("Error en getProducts getAll", e)
        res.status(500).render('templates/error', { e })
    }
}

export const getProduct = async (req, res) => {
    try {
        const idProd = req.params.pid
        const prod = await productModel.findById(idProd)

        if (prod) {
            res.status(200).send(prod)
        } else {
            res.status(404).render('templates/Error', { e: "Producto no encontrado" })
        }
    } catch (e) {
        console.log("Error en productManager getOne", e)
        res.status(500).render('templates/error', { e })
    }
}


export const updateProduct = async (req, res) => {
    try {
        const idProd = req.params.pid
        const updateProduct = req.body
        const prod = await productModel.findByIdAndUpdate(idProd, updateProduct)
        if (prod) {
            res.status(200).send(prod)
        } else {
            res.status(404).render('templates/error', { e: "Producto no encontrado" })
        }
    } catch (e) {
        console.log("Error el productManager update", e)
        res.status(500).render('templates/error', { e })
    }
}


export const createProduct = async (req, res) => {
    try {
        const product = req.body
        await productModel.create(product)
        res.status(201).send("Producto creado con éxito")
    } catch (e) {
        console.log("Error en productManager create", e)
        res.status(500).send(e)
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const idProd = req.params.pid
        const rta = await productModel.findByIdAndDelete(idProd)

        if (rta)
            res.status(200).send("Producto eliminado con éxito id: " + idProd)
        else
            res.status(404).render('templates/error', { e: "Producto no encontrado" })
    } catch (e) {
        console.log("Error en productManager delete", e)
        res.status(500).send("Error al eliminar")
    }
}
