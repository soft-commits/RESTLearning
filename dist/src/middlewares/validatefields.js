import { validationResult } from 'express-validator';
import labels from '../labels.js';
const validateFieldsRequest = (req, res, next) => {
    try {
        const errors = validationResult(req); //validationResult es de express-validator y devuelve un objeto con los errores de validacion encontrados en la request
        if (!errors.isEmpty()) {
            return res.status(400).json({
                msg: labels.EMPTY_FIELD,
                errors
            });
        }
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: labels.MSG_500,
            response: labels.ERROR
        });
    }
};
export { validateFieldsRequest };
//# sourceMappingURL=validateFields.js.map