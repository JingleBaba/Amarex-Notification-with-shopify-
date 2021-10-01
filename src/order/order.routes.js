import express from 'express'
import { getOrderConfirmation, getOrderFulfilled, getOrderCancelled } from './order.controller';

const orderRouter = express.Router();

orderRouter
    .post('/created', getOrderConfirmation)
    .post('/fulfilled', getOrderFulfilled)
    .post('/cancelled', getOrderCancelled)

export default orderRouter;