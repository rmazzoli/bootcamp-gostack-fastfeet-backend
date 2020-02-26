import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';
import OrderController from './app/controllers/OrderController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.use(authMiddleware);
routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);

routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.findOne);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

routes.get('/deliveryman', DeliverymanController.index);
routes.get('/deliveryman/:id', DeliverymanController.findOne);
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

routes.post('/order', OrderController.store);

routes.post('/files', upload.single('file'), FileController.store);
routes.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' });
});

export default routes;
