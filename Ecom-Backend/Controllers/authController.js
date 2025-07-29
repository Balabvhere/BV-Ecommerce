const {RegsiterModel,AdminLogModel, ProductModel}=require("../Models/ecom");

exports.register =async(req,res)=>
    {
        const{username,email,password,confirmPass}=req.body;
        try{
            const userEmail = await RegsiterModel.findOne({email}); // correct usage
            console.log(userEmail);
            
          if (userEmail) {
            return res.status(408).json({ message: 'Email already Exist'});
          }
                const newTodo= new RegsiterModel({username,email,password,confirmPass});
                await newTodo.save();
                res.status(200).json(newTodo);
            
            
        }
        catch(error){
            console.log(error);
            res.status(500).json({message:error.message});
        }
    }


exports.fetchUser=async(req,res)=>
{
  const id=req.params._id
  try{
    const userData=await RegsiterModel.find(id);
    return res.status(200).json(userData,{message:"user Found"})
  }
  catch(error)
  {
    return res.status(400).json({message:error.message})
  }
}

exports.deleteUser=async(req,res)=>
{
  
  try{
    const id=req.params.id;
    const delUser=await RegsiterModel.findByIdAndDelete(id);
    return res.status(200).json(delUser,{message:"user Deleted"}).end();
  }
  catch(error)
  {
    return res.status(400).json({message:error.message})
  }
}
   
exports.login=async (req, res) => {
        const { email, password } = req.body;
      
        try {
          const userEmail = await RegsiterModel.findOne({email}); // correct usage
          console.log(userEmail);
          
          if (!userEmail) {
            return res.status(404).json({ message: 'Email not registered' });
          }
          console.log(userEmail.password);
          const isMatch = password === userEmail.password;
          
          if (isMatch) {
            return res.status(200).json({ message: 'Login successful' ,username:userEmail.username,userId:userEmail._id});
          } else {
            return res.status(401).json({ message: 'Password incorrect' });
          }
      
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      };

  


exports.admLogin=async(req,res)=>{
      const{email,password}=req.body;
      const a = {
        succes:"Login Successfull",
        incorrect:"Password Incorrect"
      }
      try
      {
        const admEmail = await AdminLogModel.findOne({ email: email.trim().toLowerCase() });

          console.log(admEmail);
          if(!admEmail)
          {
            return res.status(400).json({message:"Email not register"})
          }
          const isMatch = password === admEmail.password;
          
          if (isMatch) {
            return res.status(200).json({ message: 'Login successful',username:admEmail.username});
          } else {
            return res.status(401).json({ message: 'Password incorrect' });
          }
      
      } 
      catch (err)
      {
        res.status(500).json({ message: err.message });
      }

}
