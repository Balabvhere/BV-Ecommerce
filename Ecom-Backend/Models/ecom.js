const mongoose=require('mongoose');

const RegisterSchema = new mongoose.Schema({
    username:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String
    },
    confirmPass:{
        required:true,
        type:String
    }
})

const adminLogSchema=new mongoose.Schema(
    {
        username:{
            required:true,
            type:String
        },
        email:
        {
            type:String,
            required:true
        },
        password:
        {
            type:String,
            required:true
        }
    }
)

const ProductSchema=new mongoose.Schema({
    productname:
    {
         type:String,
         required:true
    },
    price:
    {
         type:String,
         required:true
    },
    ratings:
    {
         type:String
    },
    description:
    {
         type:String,
         required:true
    },
    images:[{
        image:{type:String}
    }],
    category:
    {
         type:String,
         required:true
    },
    seller:
    {   
        type:String,
        default:"admin"
    },
    stock:
    {
         type:String,
         required:true
    },
    numOfReviews:String,
    createdAt:
    {
        type:Date,
        default:Date.now
    }    
})




const CartItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'register', // references RegisterSchema
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: true
  },
  productname: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  stock: {
    type: Number,
   
  },
  image: {
    type: String
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "register", // ✅ this matches your RegsiterModel
    required: true
  },
  orderItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product", // ✅ this matches your ProductModel
        required: true
      },
      productname:
      {
        type:String,
        required:true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      image:
      {
        type:String
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: "Pending"
  },
  orderedAt: {
    type: Date,
    default: Date.now
  }
});



const RegsiterModel = mongoose.model('register', RegisterSchema);
const AdminLogModel = mongoose.model('admin', adminLogSchema);
const ProductModel  = mongoose.model('product',ProductSchema);
const CartModel = mongoose.model('cart', CartItemSchema);
const OrderModel = mongoose.model('order', orderSchema);

module.exports = { RegsiterModel, AdminLogModel,ProductModel,CartModel,OrderModel };