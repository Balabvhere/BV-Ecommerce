const {OrderModel}=require("../Models/ecom")
const {ProductModel}=require("../Models/ecom")

exports.createOrder=async(req,res)=>
{
    try{
        const {userId,orderItems,totalAmount}=req.body;
        for(let item of orderItems)
        {
            const product=await ProductModel.findById(item.productId);
            
            if(!product)
            {
                return res.status(400).json({message:"Product Not Found..."})
            }
            if(product.stock<item.quantity)
            {
                return res.status(400).json({message:"out of stock..."})
            }
            product.stock-=item.quantity;
            await product.save()
        }
        const order=await OrderModel.create({userId,orderItems,totalAmount})
        return res.status(200).json(order,{message:"order successful"})
    }
    catch(error)
    {
        return res.status(400).json({message:error.message});
    }
    
}

exports.getOrderItems=async(req,res)=>
{
    const userId=req.params.userId;
    try{
        
        const getOrder=await OrderModel.find({userId}).populate("orderItems.productId","productname price images");
        return res.status(200).json(getOrder)
    }
    catch(error)
    {
        return res.status(400).json({message:error.message});
    }
}

exports.fetchOrder=async(req,res)=>
{
  const id=req.params._id
  try{
    const fetch_Ord=await OrderModel.find(id);
    return res.status(200).json(fetch_Ord,{message:"Order Found"})
  }
  catch(error)
  {
    return res.status(400).json({message:error.message})
  }
}

exports.updateOrderStatus = async (req, res) => {
  const { id, status } = req.body;
  try {
    const order = await OrderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true } // this is valid here
    );

    if (!order) {
      return res.status(404).json({ message: "Order Not Found" });
    }

    return res.status(200).json({ message: "Order Status Updated", order });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

