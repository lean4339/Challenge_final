import express, {Request, Response} from 'express'
import {Payment} from '../database/Models/pago.model'
import auth from '../middleware/auth';
const router = express.Router();
router.get('/', auth, async (req: Request, res: Response) =>{
	const data = await Payment.findAll()
	res.send({message:'hello', data});
});

export default router;
