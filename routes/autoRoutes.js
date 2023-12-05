const express=require('express')
const {createAuto,getAutoController, getPhotoController, searchAutoController} = require('../controllers/autoControllers')
const formidable=require('express-formidable')

const router=express.Router()

router.post('/create',formidable(),createAuto)

router.get('/get-auto',getAutoController)

router.get('/get-photo/:id',formidable(),getPhotoController)

router.get('/search-auto/:keyword',searchAutoController)


module.exports=router