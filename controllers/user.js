import { User } from "../models/user.js";
import bcrypt from "bcrypt";
// import {useNavigate} from "react-router-dom";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";
import jwt from "jsonwebtoken";
export const login=async (req, res, next)=>{
  // const navigate= useNavigate();
try{
    const {email,password}=req.body;
    const user= await User.findOne({email}).select("+password");

    if(!user) return next(new ErrorHandler("Invalid Email or Password", 400));

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch)
    return next(new ErrorHandler("Invalid Email or Password", 400));

    const data={
      user:{ 
        id:user.id,
        name:user.name,
        phone:user.phone,
      }
    }
    let success=false;

    // console.log(data)
    const authtoken=jwt.sign(data, process.env.JWT_SECRET);
    success=true;
    console.log()
    res.json({success, authtoken, data});

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
}
catch (error) {
    next(error);
  }
};

export const register = async (req, res,next)=>{
    try{
        const {name, email,phone, password}=req.body;

        const usr=await User.findOne({email});
        if (usr) return next(new ErrorHandler("User Already Exist", 400));

        const hashedPassword= await bcrypt.hash(password, 10);

        const user=await User.create({name,email,phone,password: hashedPassword});

        const data={
          user:{ 
            id:user.id,
            name:user.name,
            phone:user.phone
          }
        }
        let success=false;
    console.log("first")
        // console.log(data)
        const authtoken=jwt.sign(data, process.env.JWT_SECRET);
        success=true;
        res.json({success, authtoken});
        
        sendCookie(user, res, "Registered Successfully", 201);
  
} catch (error) {
  next(error);
}
}

export const getMyProfile = async (req, res) => {
  const user = await User.find({ });
    res.status(200).json({
      success: true,
      user,
    });
  };

  export const logout= async(req,res)=>{
    res.status(200).cookie("token","",{
      httpOnly: false,
        expires: new Date(0),
        sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Develpoment" ? false : true,
      })
      .json({
        success: true,
        user: req.user,
      });
      console.log("out")
      // navigate("/");
  }