const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  location:{
    type:String,
    required:true
  },
  registerNumber:{
    type:String,             
    required:true
  },
  image:{
    data:Buffer,
    ContentType:String
  }    
  
},{timestamps:true})

const autoModel=mongoose.model('autoDetails',userSchema)

module.exports=autoModel