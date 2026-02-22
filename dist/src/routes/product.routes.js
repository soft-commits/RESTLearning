import { Router } from "express";
import { getProducts, getProductsbyPrice, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";
import validateJwt from "../middlewares/validatejwt.js";
import { validateFieldsRequest } from "../middlewares/validateFields.js";
import { check } from "express-validator";
import labels from "../labels.js";
import { productExist } from "../helpers/db.validators.js";
const router = Router();
//para leer todos los productos
router.get("/", [
    validateJwt("TEC")
], getProducts);
//para leer productos por rango de precio
router.get("/byprice", [
    validateJwt()
], getProductsbyPrice);
//para crear un nuevo producto
router.post("/create", [
    validateJwt("SUPER"),
    validateFieldsRequest
], createProduct);
//para actualizar un productoa
router.put("/update/:id", [
    validateJwt(), // validar el token JWT para asegurar que el usuario esté autenticado
    check("id", labels.INVALID_MOONGOSE_ID).isMongoId(), // validar que el id sea un ObjectId válido de MongoDB
    check("id").custom(productExist) // validar que el producto exista en la base de datos (revisar como se creo esta funcion custom asi se creo las otras)
], updateProduct);
router.delete("/delete/:id", [
    validateJwt(),
    check("id", labels.INVALID_MOONGOSE_ID).isMongoId(),
    check("id").custom(productExist)
], deleteProduct);
export default router;
//# sourceMappingURL=product.routes.js.map