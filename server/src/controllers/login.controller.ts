import { Request, Response } from "express";
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { User } from "../database/Models/user.model";
dotenv.config();

export class Controller {
    async login (req: Request, res: Response): Promise<any> {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new Error('Invalid data')
            }
            const user = await User.findOne({where: {email: email}, raw:true})
            if(!user){
                throw new Error('user not found')
            }
            const hash = user.password;
            const isValid = bcrypt.compareSync(password, hash);
            if (!isValid) {
                throw new Error('Invalid data')
            }
            const token = this.createToken(user)
            res.cookie('authorization',token, { maxAge: 900000, httpOnly: true });
            res.cookie('user',{name: user.name, surname: user.surname, id: user.id, email: user.email}, { maxAge: 900000, httpOnly:true });   
            console.log(token);
            res.send({data: {...user, password: undefined}, status:'success', error: false, token});
        } catch (err: any) {
            console.log(err)
            res.send({error: true,message: err.message});
        }
    }
    async logout (req: Request, res: Response): Promise<any> {
        try {
            res.clearCookie("authorization");
            res.clearCookie("user");
            res.send({success: true, error: false});
        } catch (err: any) {
            res.send({error: true, message: err.message})
        }
    }
    createToken(user: any) {
        const payload = {
            id: user.id,
            email: user.email,
            password: user.password
        }
        return JWT.sign(payload, process.env.APP_SECRET || '')
    }
    validateToken(token: string){
        return JWT.sign(token, process.env.APP_SECRET || '')
    }
}
export default new Controller();