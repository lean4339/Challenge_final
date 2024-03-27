import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../database/Models/user.model"
import loginController from "./login.controller";
class Controller {
    async get (req: Request, res: Response): Promise<any>{
        return 'holis'
    }
    async getOne (req: Request, res: Response): Promise<any>{
        return "holis"
    }
    async create (req: Request, res: Response): Promise<any>{
        try {
            const {name, surname, email, password } = req.body;
            if(!name || !surname || !email || !password){
                throw new Error('data is not complete');
            }
            const user = await User.create({name, surname, email, password: bcrypt.hashSync(password,12)},{raw:true});
            const token = loginController.createToken(user);
            res.cookie('authorization',token, { maxAge: 900000, httpOnly: true });
            res.cookie('user',{name: user.name, surname: user.surname, id: user.id, email: user.email}, { maxAge: 900000, httpOnly:true }); 
            res.send({data: {...user, password: undefined}, status:'success', error: false, token});
        } catch (err: any) {
            console.log(err);
            res.send({error: true, message: err.message })
        }
    }
    async update (req: Request, res: Response): Promise<any>{
        return  "holis"
    }
    async delete (req: Request, res: Response): Promise<any>{
        return "holis"
    }
}
export default new Controller();