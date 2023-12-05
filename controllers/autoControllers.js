const autoModel=require('../model/autoModel')
const fs=require('fs')


//create auto
const createAuto=async(req,res)=>{
  const {name,registerNumber,location}=req.fields
  const {photo}=req.files
  try{
    if(!name) return res.send({message:"name is required"})
    if(!registerNumber) return res.send({message:"register number is required"})
    if(!location) return res.send({message:"location is required"})
    const auto= new autoModel({name,registerNumber,location})
    
    if(photo){
      auto.image.data=fs.readFileSync(photo.path)
      auto.image.ContentType=photo.type
    }
    await auto.save()
    res.send({
      success:true,
      message:'created auto successfully',
      auto
    })
  }catch(err){
    console.log(err);
    res.send({
      message:'error in creation',
      err
    })
  }
}

//get auto
const getAutoController=async(req,res)=>{
  try{
    const auto=await autoModel.find().select("-photo")
    res.send({
      auto
    })
  }catch(err){
    console.log(err);
  }
}

//get photo
const getPhotoController=async(req,res)=>{
  const {id}=req.params
  try{
    const auto=await autoModel.findById(id).select("image")
    if(!auto  || !auto.image.data ){
      return res.send({
        message:'no photo available for this'
      })
    }
    res.set('Content-Type',auto.image.ContentType)
    res.send(auto.image.data)
  }catch(err){
    console.log(err);
    res.status(500).send({
      message:'error in getting photo',
      success:false,
      err
    })
  }
}

//search auto
const searchAutoController=async(req,res)=>{
  const {keyword}=req.params
  try{
    const result=await autoModel.find({
      location:{$regex:keyword, $options: 'i' }
    }).select("-image")
    res.json(result)
  }catch(err){
    console.log(err);
    res.status(500).send({
      message:'error in searching',
      err,
      success:false
    })
  }
}

module.exports={
  getAutoController,
  createAuto,
  getPhotoController,
  searchAutoController
}