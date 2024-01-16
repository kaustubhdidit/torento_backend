import  {Room}  from "../models/room.js"
import { User } from "../models/user.js";
import ErrorHandler from "../middlewares/error.js";
import jwt from "jsonwebtoken";


export const newRoom= async(req,res, next)=>{

    try{
        const {address,photo, price,title, description}=req.body;
        let {name, phone,user}=req.body;
        const decoded = jwt.verify(user, process.env.JWT_SECRET);
         user= decoded.user.id;
         name=decoded.user.name;
         phone=decoded.user.phone;
// console.log(userid)
// console.log("check")
        // const userid = req.user._id;
        await Room.create({
          name,
          phone,
          address,
            photo,
            price,
            title,
            description,    
            user,
        })

        res.status(201).json({
            success: true,
            message: "Room added Successfully",
          });
        } catch (error) {
            next(error);
          }
}

export const getRoom = async (req, res, next) => {
  try {
    // const userid = req.user._id;
// console.log("work")
    const rooms = await Room.find({ });
    res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyRoom = async (req, res, next) => {
  try {

    const userid = req.query.userid;
    // console.log(userid)
    const decoded = jwt.verify(userid, process.env.JWT_SECRET);
//     console.log(decoded)
// console.log("work")
// console.log(decoded.user.id)
    const rooms = await Room.find({user:decoded.user.id});

    res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    next(error);
  }
};

export const editVac = async (req, res, next) => {  

  try {
    const {i}= req.body;
    console.log("first")
console.log(i._id)
console.log(i.display)
  
  //Create a newNote object
  // const newRoom={};
  // if(display){newRoom.display=display};

  // Find the note to be updateed and update it
  let room=await Room.findById(i._id);
  console.log(room)
  if(!room){return req.status(404).send("Not Found")}


  const complementedDisplay = !room.display;

  room=await Room.findByIdAndUpdate(i._id,{$set: {display:complementedDisplay}}, {new:true})
  console.log(room.display)

  // console.log(done)

  res.json({room})
} catch (error) {
  console.error(error.message);
  res.status(500).send("Some error occured")
}
};

export const updateRoom = async (req, res, next) => {  

    try {
      const {id,title,price, description,address,phone}= req.body;
    //Create a newNote object
    const newRoom={};
    if(title){newRoom.title=title};
    if(price){newRoom.price=price};
    if(description){newRoom.description=description};
    if(address){newRoom.address=address};
    if(phone){newRoom.phone=phone};

    // Find the note to be updateed and update it
    let room=await Room.findById(id);
    if(!room){return req.status(404).send("Not Found")}

    // if(room.user.toString()!==req.user.id){
    //   return res.status(401).json("Not allowed");
    // }

    room=await Room.findByIdAndUpdate(id,{$set: newRoom}, {new:true})

    res.json({room})
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured")
  }
};
  
  export const deleteRoom = async (req, res, next) => {
    try {
      const room = await Room.findById(req.params.id);
  
      if (!room) return next(new ErrorHandler("Room not found", 404));
      await room.deleteOne();
  
      res.status(200).json({
        message: "Room Deleted!",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };