import { Request, Response } from "express";
import { Payment } from "../database/Models/pago.model"
import { PaymentType } from "../database/Models/PaymentType.model";
class Controller {
    async get (req: Request, res: Response): Promise<any>{
        try {
            const data = await Payment.findAll({raw:true})
            res.send({status: 'success', data, error: false})
        } catch (err: any) {
            res.send({status: 'error', error: true, message: err.message});
        }
    }
    async getOne (req: Request, res: Response): Promise<any>{
        try {
            const { id } = req.params
            const data =  await Payment.findOne({where: {id}, raw:true});
            res.send({status: 'success', data, error: false});
        } catch (err: any) {
            res.send({status: 'error', error: true, message: err.message});
        }
    }
    async update (req: Request, res: Response): Promise<any>{
        try {
            const { id } = req.params
            const {creator, amount, type, recipient } = req.body
            if (!creator || !amount || !recipient || !type) {
                throw new Error('Invalid data')
            }
            const data = await Payment.update({...req.body},{where: {id}})
            res.send({status: 'success', data, error: false});
        } catch (err: any) {
            res.send({status: 'error', error: true, message: err.message});
        }
    }
    async delete (req: Request, res: Response): Promise<any>{
        try {
            const {id} = req.params
            await Payment.destroy({where: {id: id}})
            res.send({status: 'success', data: {message: 'deleted'}, error: false})
        } catch (err: any) {
            res.send({status: 'error', error: true, message: err.message})
        }
    }
    async create (req: Request, res: Response): Promise<any>{
        try {
            const {creator, amount, type, recipient } = req.body
            if (!creator || !amount || !recipient || !type) {
                throw new Error('Invalid data')
            }
            const newPayment = await Payment.create({creator, amount, type, recipient}) 
            res.send({status: 'success', data: newPayment, error: false})
        } catch (err: any) {
            res.send({status: 'error', error: true, message: err.message})
        }
    }
}

export default new Controller();