const AdminLogModel=require('../Models/AdminLoginSchema');
const AdminModel=require('../Models/AdminSchema');
const moment=require('moment');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const mailer=require('../Config/Mailer')
const session=require('express-session')

module.exports.Registration=async(req,res)=>{
  try{
     req.body.password=await bcrypt.hash(req.body.password,10);
     
     req.body.charAt=moment(Date.now()).toString();
  
     const registerdata=await AdminLogModel.create(req.body);
      
     
     res.status(200).json({msg : "Create data Successfully...",registerdata});
  }
  catch(err){
    console.log(err);
    
  }
}

module.exports.loginadmin=async(req,res)=>{
  try{
    console.log(req.body)
   const user=await AdminLogModel.findOne({email : req.body.email});
   console.log(user)
   if(user){
      if(await bcrypt.compare(req.body.password,user.password)){
         const token=jwt.sign({userdata : user},"node",{expiresIn : "1h"});
         res.status(200).json({msg : `Login Successfully By ${user.username}`,token:token})
      }
      else {
        res.status(404).json({msg : "Wrongh Password Please Try Again...!!"})

      }
   }
   else {
    res.status(404).json({msg : "Admin Not Found..."})
   }
  }
  catch {
   console.log("Login failed...");
   
  }
}


module.exports.changepass=async(req,res)=>{
  const user=await AdminLogModel.findOne({email : req.body.email})


  if(user){
    const isMatch=await bcrypt.compare(req.body.password,user.password)

    if(isMatch){
      const newpassword=await bcrypt.hash(req.body.newpassword,10);
      user.password=newpassword;
      await user.save();
      res.status(202).json({msg : "Password Successfully Changed...!!!"});
    } else {
      res.status(404).json({msg : "Password Not Changed...!!"})
    }
  }
  else{
    res.status(404).json({msg : "User Not Found"})
  }

}

module.exports.forgetpass=async(req,res)=>{

  console.log(req.body)
 
  let user=await AdminLogModel.findOne({email : req.body.email});

  console.log(user)
  
  
 if(user){
  let otp=Math.floor(Math.random()*100000+800000)
  const adminId=user.id;
 
  mailer.sendOtp(req.body.email,otp);
 
  req.session.otp=otp;
  req.session.adminId =adminId;

  res.status(202).json({msg : "OTP Sent to your email...!!"})
  
  console.log(req.session.otp)
  console.log(req.session.adminId);
  
 }
 else{
  res.status(404).json({msg : "User data not Found...!!"})

 }
  
 
}  
module.exports.verifyOtp=async(req,res)=>{
  const otp=req.body.otp;
  const newpass=req.body.newpass
  const confirmpass =req.body.confirmpass;

  let adminId=req.session.adminId;


  console.log(req.session.otp)
  console.log(adminId)
  console.log(req.body)


  if(req.session.otp==otp){
    if(newpass==confirmpass){
      const hashedpass=await bcrypt.hash(newpass,10);

      const newupdatepass=await AdminLogModel.findByIdAndUpdate(adminId,{password : hashedpass}) 

      newupdatepass ? res.status(200).json({ msg: "Password updated successfully" }) : 
      res.status(404).json({ msg: "Password can't be updated try again...!!" });

    }
    else {
      return res.status(400).json({ msg: "new paasword and confirmpassword is same" });
    }
  } else {
    return res.status(400).json({ msg: "Invalid OTP" });

  }


}
module.exports.viewAdmin=async(req,res)=>{
  try{
     const admindata=await AdminModel.find({})
     res.json(admindata);

  }
  catch (err){
    console.log(err)
  }
}
module.exports.insertadmin=async(req,res)=>{
  try {
    req.body.password=await bcrypt.hash(req.body.password,10);
    req.body.charAt=await  moment(Date.now()).toString();
    
    const insertdata=await AdminModel.create(req.body)

     res.json(insertdata)
  }
  catch(err) {
    res.status(404).json(err)
  }
}

module.exports.deleteadmin=async(req,res)=>{
  try {
    const deletedata=await AdminModel.findByIdAndDelete(req.query.id);

    deletedata ? res.status(202).json({msg : "Admin Delete Successfully...",deletedata}) :
    res.status(404).json({msg : "Admin Not Deleted Try again...!!!"})
    
  }
  catch(err){
    res.status(404).json(err)
  }
}

module.exports.editdata=async(req,res)=>{
  try {
    const editdata = await AdminModel.findById(req.query.id);
    editdata ? res.status(202).json({msg : "Admin get Successfully...",editdata}) :
    res.status(404).json({msg : "Admin Not edit Try again...!!!"})
  } catch (err) {
    res.status(400).json({success: false, message: 'error found while login user', err})

  }
}

module.exports.updatedata=async(req,res)=>{
  try{

    const updatee=await AdminModel.findByIdAndUpdate(req.query.id,req.body);
    updatee ? res.status(202).json({msg : "Admin edit Successfully...",updatee}) :
    res.status(404).json({msg : "Admin Not update Try again...!!!"})

  }catch(err){
    res.status(404).json(err)
  }
}