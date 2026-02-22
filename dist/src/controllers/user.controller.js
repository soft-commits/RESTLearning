import {} from "express";
import Login from "../models/login.model.js";
import bcrypt from "bcryptjs";
import labels from "../labels.js";
const createUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const user = new Login({ username, password, role });
        const salt = bcrypt.genSaltSync();
        user._password = bcrypt.hashSync(password, salt);
        await user.save();
        res.status(201).json({ message: labels.CREATE_USER_SUCEFULLY, user });
    }
    catch (error) {
        res.status(500).json({ message: labels.ERROR, error });
    }
};
export { createUser };
//# sourceMappingURL=user.controller.js.map