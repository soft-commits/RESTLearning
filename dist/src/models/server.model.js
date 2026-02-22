import express, {} from 'express';
import labels from "../labels.js";
import db_conn from '../database/config.js';
import loginRoutes from '../routes/login.routes.js';
import userRoutes from '../routes/user.routes.js';
import cors from 'cors';
import productRoutes from '../routes/product.routes.js';
class Server {
    app;
    port;
    //Paths
    login_path;
    user_path;
    product_path;
    constructor() {
        this.app = express();
        this.port = process.env.PORT || "3000";
        this.login_path = "/api/login";
        this.user_path = "/api/users";
        this.product_path = "/api/products";
        this.connectDB();
        this.middlewares();
        this.routes();
    }
    listen() {
        this.app.listen(this.port, () => console.log(labels.LISTEN_SERVER + ": " + this.port));
    }
    async connectDB() {
        await db_conn();
    }
    routes() {
        this.app.use(this.login_path, loginRoutes);
        this.app.use(this.user_path, userRoutes); //temporal hasta crear el user routes
        this.app.use(this.product_path, productRoutes);
    }
    middlewares() {
        //CORS PERMITE DEFINIR QUE METODOOS HTTP PUEDE PEDIR UN API X A UN API Z, EN ESTE CASO DEFINIREMOS QUE OTROS APIS NOS PUEDEN PEDIR COSAS
        const allowedCors = process.env.ALLOWED_CORS;
        this.app.use(cors({ origin: allowedCors }));
        this.app.use(express.json());
    }
}
export default Server;
//# sourceMappingURL=server.model.js.map