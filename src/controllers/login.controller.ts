import { type Request, type Response } from "express";
import Login from "../models/login.model.js";
import labels from "../labels.js";
import bcrypt from "bcryptjs";
import { get } from "node:http";
import getJwt from "../helpers/jwt.js";

const login = async (req: Request, res: Response) => {
    try {
        
        const {username,password} = req.body
        const user = await Login.findOne({username})
        

        if(!user){
            return res.status(404).json({
                msg: labels.MSG_404,
                response: labels.FAILED_LOGIN
            })
        }

        if(!user._status){
            return res.status(403).json({
                msg: labels.MSG_403,
                response: labels.STATUS_USER_INACTIVE
            })
        }

        const validPassword = bcrypt.compareSync(password,user._password)   

        if(!validPassword){
            return res.status(400).json({
                msg: labels.MSG_400,
                response: labels.FAILED_LOGIN
            })
        }

        const token = await getJwt(String(user._id), String(user._role))

        res.status(200).json({
            msg: labels.MSG_200,
            username: user._username,
            token,
            expiresIn: 3600,            
        })

    } catch (error) {
        
        console.error(error)
        return res.status(500).json({
            msg: labels.MSG_500,
            response: labels.ERROR
        })
    }
}

export default login;