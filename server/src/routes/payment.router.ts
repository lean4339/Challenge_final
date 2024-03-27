import express, { Request, Response } from 'express'
import { Payment } from '../database/Models/pago.model'
import paymentController from '../controllers/payment.controller';
import auth from '../middleware/auth';
const router = express.Router();
router.get('/', auth, async (req: Request, res: Response) => {
	const data = await Payment.findAll()
	res.send({ message: 'hello world', data });
});
router.post('/', auth, async (req: Request, res: Response) => {
	return await paymentController.create(req, res)
})
router.get('/:id', auth, async (req: Request, res: Response) => {
	return await paymentController.getOne(req, res)
})
router.put('/:id', auth, async (req: Request, res: Response) => {
	return await paymentController.update(req, res)
})
router.delete('/:id', auth, async (req: Request, res: Response) => {
	return await paymentController.delete(req, res)
})
export default router;
