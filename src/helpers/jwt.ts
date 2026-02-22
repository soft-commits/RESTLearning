import commonJs_sign from 'jsonwebtoken';
import labels from '../labels.js';

const { sign } = commonJs_sign; // Adjusted for CommonJS import (jsonwebtoken tiene la forma antigua de exportar)'

function getJwt(uid: String, role: String) {
    try {
        return new Promise((resolve, reject) => {

            const payload = { uid ,role };
            sign(
                payload,
                process.env.SECRET_KEY || ' ',
                {
                    expiresIn: '2m'
                },
                (error, token) => {
                    if (error) {
                        console.error(error);
                        reject(labels.ERROR_TOKEN);
                    } else {
                        resolve(token);
                    }
                }
            );
        }
        );

    } catch (error) {
        console.error(error);
        throw new Error(labels.ERROR);
    }
}

export default getJwt;