import { Router } from "express";
import { validateFieldsRequest } from "../middlewares/validateFields.js";
import validateJwt from "../middlewares/validatejwt.js";
import { createUser } from "../controllers/user.controller.js";
const router = Router();
router.post('/create', [
    validateJwt(), // SE USA EL JWT PARA VALIDAR EL TIEMPO DE VIDA DE LA SESION
    validateFieldsRequest // SE USA ESTO COMO SUSTITUTO DE LOS CHECK QUE SON OBSOLETOS
] // PUEDEN ENTRAR EN UN ARRAY [] COMO PUEDEN ESTAR SUELTOS
, createUser);
export default router;
//# sourceMappingURL=user.routes.js.map