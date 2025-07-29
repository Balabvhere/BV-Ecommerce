const express=require('express');
const router=express.Router();
const authController=require("../Controllers/authController")
const productController=require("../Controllers/productController")
const uploads=require("../Middleware/upload");

router.post('/register',authController.register);
router.get('/fetchUser',authController.fetchUser);
router.delete('/delUser/:id',authController.deleteUser);
router.post('/login',authController.login);
router.post('/admin',authController.admLogin);

router.post('/product', uploads.array('image'), productController.addProduct);
router.get('/getProduct',productController.getProduct);
router.patch('/updateProduct/:id', uploads.array('images'), productController.updateProduct);
router.delete('/delProduct/:id',productController.delProduct);
router.get('/getProduct/:id', productController.getProductById);

module.exports=router;