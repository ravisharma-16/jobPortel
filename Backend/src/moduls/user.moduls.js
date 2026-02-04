import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
 fullname :
 {
    type : String,
    required : true
 },
 email: {
  type: String,
  required: true,
  unique: true,
  index: true
},
phoneNumber: {
  type: String,
  required: true,
  unique: true,
  index: true
},
 password :
 {
    type : String,
    required : true
 },
 role :
 {
    type : String,
    enum : ['Student','Recruiter'],
    default : 'Student',
    required : true
 },
 profile :
 {
    bio :
    {
        type : String
    },
    skill :
    [{type : String}],
    resume :
    {
        type : String   // url fetch for file
    },
    originalnameFile :  
    {
        type : String  // original name of file
    },
    company :
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Company'
    },
    profilephoto :
    {
        type : String,   // url fetch for file
        default : ""
    }
 },
 refreshToken :
 {
    type : String
 }
},{timestamps:true})


userSchema.pre('save', async function(next) {
   if(!this.isModified('password')) 
      return next()

   this.password = await bcrypt.hash(this.password, 10);
   next();
})

userSchema.methods.ispasswordCorrect = async function(password) {
   return await bcrypt.compare(password, this.password);
}

// userSchema.methods.generateAccessToken = function()
// {
//    return jwt.sign({id : this._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn : process.env.ACCESS_TOKEN_EXPIRY})  // 15 minuts
// }

// userSchema.methods.generateRefreshToken = function()
// {
//    return jwt.sign({id : this._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn : '7d'})
// }

export const User = mongoose.model("User",userSchema)