import express from 'express';
import orderRouter from './order/order.routes';
import path from 'path';
require('dotenv').config();
//init express
const app = express();

//middlewares
app.use(express.json()); //body parser
app.use(express.static(path.resolve(__dirname,'../public')));


//server created
app.listen('4040', () => {
    console.log("server done");
})

//order creation
app.use('/order',orderRouter);
