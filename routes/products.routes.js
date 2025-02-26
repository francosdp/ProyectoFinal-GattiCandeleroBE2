import { Router } from "express";
import { getProduct,getProducts,updateProduct,deleteProduct,createProduct } from "../controllers/productsManager.js";


const productRouter=Router()

productRouter.get('/', getProducts)
productRouter.get('/:pid', getProduct)
productRouter.post('/', createProduct)
productRouter.put('/:pid', updateProduct)
productRouter.delete('/:pid', deleteProduct)

export default productRouter