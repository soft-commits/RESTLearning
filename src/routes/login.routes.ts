import { Router } from "express";
import login from "../controllers/login.controller.js";
import { check } from "express-validator";
import labels from "../labels.js";

const router = Router();

router.post('/'
    , check('username',labels.EMPTY_FIELD).not().isEmpty()
    , check('password',labels.EMPTY_FIELD).not().isEmpty()
    , check('role',labels.EMPTY_FIELD).not().isEmpty()
    , check('status',labels.EMPTY_FIELD).not().isEmpty()
    , login) 

export default router;