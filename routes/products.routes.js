import { Router } from "express";
import { getProduct,getProducts,updateProduct,deleteProduct,createProduct } from "../controllers/productsManager.js";
import { authorization } from "../config/middlewares.js";


const productRouter=Router()

productRouter.get('/', getProducts)
productRouter.get('/:pid', getProduct)
productRouter.post('/', authorization("Admin"),createProduct)
productRouter.put('/:pid',authorization("Admin"), updateProduct)
productRouter.delete('/:pid', authorization("Admin"),deleteProduct)

export default productRouter