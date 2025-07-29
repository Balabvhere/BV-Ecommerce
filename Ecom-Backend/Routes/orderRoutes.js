const express = require('express');
const router = express.Router();
const orderController=require("../Controllers/orderController");

router.post('/create',orderController.createOrder);
router.get('/getOrder/:userId',orderController.getOrderItems);
router.get('/getOrder',orderController.fetchOrder);
router.patch('/updateOrderStatus/:_id',orderController.updateOrderStatus);

module.exports=router;  