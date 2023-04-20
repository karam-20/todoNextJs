import mongoose from "mongoose";

export const schema = new mongoose.Schema({
   name:{
    type:String,
    required:true
   },

   email:{
    type:String,
    required:true,
    unique:true
   },

   password:{
    type:String,
    required:true,
    select:false,
    minLength:[6,'Password too short']
   },
})

mongoose.models = {}

export const User = mongoose.model("User",schema)