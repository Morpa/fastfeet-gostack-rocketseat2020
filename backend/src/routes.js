import { Router } from 'express';
import multer from 'multer';

import Delivery from './app/controllers/DeliveryController';
import DeliveryFinish from './app/controllers/DeliveryFinishController';
import Deliveryman from './app/controllers/DeliverymanController';
import DeliveryPending from './app/controllers/DeliveryPendingController';
import DeliveryProblem from './app/controllers/DeliveryProblemController';
import DeliveryWithDraw from './app/controllers/DeliveryWithDrawController';
import File from './app/controllers/FileController';
import OrderDelivered from './app/controllers/OrderDeliveredController';
import Recipient from './app/controllers/RecipientController';
import Session from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import validateDelivery from './app/validators/Delivery';
import validateDeliveryman from './app/validators/Deliveryman';
import validateDeliveryProblem from './app/validators/DeliveryProblem';
import validateRecipient from './app/validators/Recipient';
import validateSession from './app/validators/Session';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', validateSession, Session.store);

routes.get('/delivery/:id/problems', DeliveryProblem.show);
routes.post(
  '/delivery/:id/problem',
  validateDeliveryProblem,
  DeliveryProblem.store
);
routes.get('/deliveryman/:id', DeliveryPending.index);
routes.get('/deliveryman/:id/deliveries', OrderDelivered.index);
routes.get('/deliveryman/:id', DeliveryPending.index);
routes.put(
  '/deliveryman/:deliverymanId/delivery/:deliveryId/finish',
  DeliveryFinish.update
);
routes.put('/deliveryman/:deliverymanId/delivery/:id', DeliveryWithDraw.update);

routes.get('/deliverymen/:id', Deliveryman.show);

routes.post('/files', upload.single('file'), File.store);

routes.use(authMiddleware);

routes.get('/recipient', Recipient.index);
routes.post('/recipient', validateRecipient, Recipient.store);
routes.put('/recipient/:id', validateRecipient, Recipient.update);
routes.get('/recipient/:id', Recipient.show);
routes.delete('/recipient/:id', Recipient.destroy);

routes.delete('/problem/:id/cancel-delivery', DeliveryProblem.destroy);

routes.get('/deliveries/problems', DeliveryProblem.index);
routes.get('/delivery/:id/problems', DeliveryProblem.show);

routes.get('/deliverymen', Deliveryman.index);
routes.post('/deliverymen', validateDeliveryman, Deliveryman.store);
routes.put('/deliverymen/:id', validateDeliveryman, Deliveryman.update);
routes.delete('/deliverymen/:id', Deliveryman.destroy);

routes.get('/delivery', Delivery.index);
routes.post('/delivery', validateDelivery, Delivery.store);
routes.put('/delivery/:id', validateDelivery, Delivery.update);
routes.get('/delivery/:id', Delivery.show);
routes.delete('/delivery/:id', Delivery.destroy);

export default routes;
