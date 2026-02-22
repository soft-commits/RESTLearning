import labels from "../labels.js";
import jwt from "jsonwebtoken";
import Login from "../models/login.model.js";
const validateJwt = (roleToValidate) => {
    return async (req, res, next) => {
        try {
            // es necesario el ? por que si sale error devuelve un undefined y no se para el proceso
            // el split y el [1] son ncesarios por que por formato siemrpe vien asi el token  "Authorization": Bearer <token>   ,  queremos eliminar el bearer y el espacio
            const token = req.header(labels.AUTH); //?.split(' ')[1]
            if (!token) {
                return res.status(401).json({
                    msg: labels.MSG_401,
                    response: labels.ERROR_TOKEN
                });
            }
            const { uid, role } = jwt.verify(token, process.env.SECRET_KEY || ' '); // pq any
            const user = await Login.findById(uid); //pq el de la clase le puso Login y no LoginModel y aun asi le funco la sintaxis
            //se explica pq en login.model.ts se exporto por default el LoginModel 
            // asi que aqui al importar Login se esta importando el modelo LoginModel pero como un alias con otro nombre
            if (!user) {
                return res.status(401).json({
                    msg: labels.MSG_401,
                    response: labels.ERROR_TOKEN
                });
            }
            if (!user._status) {
                return res.status(401).json({
                    msg: labels.MSG_401,
                    response: labels.STATUS_USER_INACTIVE
                });
            }
            if (user._role !== roleToValidate && user._role !== 'ADMIN' && roleToValidate) {
                return res.status(401).json({
                    msg: labels.MSG_401,
                    response: labels.NO_AUTH,
                    role: user._role
                });
            }
            next();
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                msg: labels.MSG_500,
                response: labels.ERROR_TOKEN
            });
        }
    };
};
export default validateJwt;
//# sourceMappingURL=validatejwt.js.map