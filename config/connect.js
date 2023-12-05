const mongoose=require('mongoose')

const connect=()=>{
try{
  mongoose.connect('mongodb://127.0.0.1:27017/Auto')
  console.log('connected with database');
}
catch(err){
  console.log(err);
}
}





module.exports=connect