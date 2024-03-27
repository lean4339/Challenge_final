import { Request, Response, NextFunction } from "express";
import loginController from "../controllers/login.controller";
export default (req: Request, res: Response, next: NextFunction) =>{
    try {
        console.log(req.headers)
        const auth = req.cookies.authorization || req.headers.authorization;
        if(!auth) {
            throw new Error('Not authorized')
        }
        const payload = loginController.validateToken(auth)
        next();
    } catch (err: any) {
        res.send({error: true, message: err.message})
    }
}