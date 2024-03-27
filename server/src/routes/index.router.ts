import express, {Request, Response} from 'express'
import {Payment} from '../database/Models/pago.model'
import auth from '../middleware/auth';
import loginController from '../controllers/login.controller';
import usersController from '../controllers/users.controller';
const router = express.Router();
router.get('/',auth, async (req: Request, res: Response) =>{
	const data = await Payment.findAll()
	res.send({message:'hello world', data});
});
router.post('/login', async (req: Request, res: Response) => {
	return await loginController.login(req, res);
})
router.post('/singin', async (req: Request, res: Response) => {
	return await usersController.create(req, res);
})
router.get('/logout', auth, async (req: Request, res: Response) => {
	return await loginController.logout(req, res);
})

export default router;

