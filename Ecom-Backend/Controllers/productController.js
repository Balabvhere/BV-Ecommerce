const {ProductModel}=require('../Models/ecom');

exports.addProduct=async(req,res)=>
{
  const {productname,price,description,category,stock,seller}=req.body;
  try
  {
    let imagePaths =[];
    if (Array.isArray(req.files)) {
      imagePaths = req.files.map(file => ({ image: file.filename }));
    }
    else if (Array.isArray(req.body.images)) {
      imagePaths = req.body.images;
    }
    const existProduct=await ProductModel.findOne({productname})
    if(existProduct)
    {
      return res.status(401).json({message:"Product already exist"});
    }
    const newProduct=new ProductModel({
      productname,price,description,images:imagePaths,category,stock,seller,createdAt:new Date(),
    })
    await newProduct.save();
    return res.status(201).json({message:"Product Added Successful",product:newProduct})
  }
  catch(error)
  {
    return res.status(400).json({message:error.message})
  } 
}

exports.getProduct=async(req,res)=>
{
  try{
    const keyword=req.query.keyword||"";
    let products=[]
    if(keyword)
    {
      products= await ProductModel.find({
        productname:{$regex:keyword,$options:"i"},
      });
      return res.status(200).json(products)
    }
    else
    {
      const getProduct=await ProductModel.find()
      return res.status(200).json(getProduct)
    }    
  }
  catch(error)
  {
    return res.status(400).json({message:error.message})
  }
  
}

exports.getProductById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


exports.updateProduct=async(req,res)=>
{
  const{productname,price,description,images,category,stock,seller}=req.body;
  try{
    
    const id=req.params.id;
    let imagePaths=[];
    if (Array.isArray(req.files)) {
      imagePaths = req.files.map(file => ({ image: file.filename }));
    }
    else if (Array.isArray(req.body.images)) {
      imagePaths = req.body.images;
    }
    const upd_prod=await ProductModel.findByIdAndUpdate(
      id,{productname,price,description,images:imagePaths,category,stock,seller},{new:true}
    );
    if(!upd_prod)
    {
      return res.status(400).json({message:"Item not Found"})
    }
    return res.status(200).json(upd_prod,{message:"Product Updated"})
  }
  catch(error)
  {
      return res.status(400).json({message:error.message});
  }
}
exports.delProduct=async(req,res)=>
{
  try
  {
    const id=req.params.id;
    const del_prod=await ProductModel.findByIdAndDelete(id)
    return res.status(200).json(del_prod,{message:"Delete Successful"}).end();
  }
  catch(error)
  {
    return res.status(400).json({message:error.message})
  }
  
}

