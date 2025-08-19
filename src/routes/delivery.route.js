import {Router} from 'express';
import { createDelivery, getDeliveries, getOneDeliveryDetail, updateDelivryStat, deleteDelivery } from '../controllers/deliveries.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';
const router = Router();

router.use(authenticateToken);
router.use(authorizeRoles('admin'));


router.get('/', getDeliveries);
router.get('/:id', getOneDeliveryDetail);
router.post('/', createDelivery);
router.patch('/:id', updateDelivryStat);
router.delete('/:id', deleteDelivery);

export default router;