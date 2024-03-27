import { Request, Response } from "express";
import { PaymentType } from "../database/Models/PaymentType.model"

class Controller {
    async get (req: Request, res: Response): Promise<any>{
        return 'holis'
    }
    async getOne (req: Request, res: Response): Promise<any>{
        return "holis"
    }
    async update (req: Request, res: Response): Promise<any>{
        return  "holis"
    }
    async delete (req: Request, res: Response): Promise<any>{
        return "holis"
    }
}
export default new Controller();