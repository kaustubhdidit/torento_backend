import mongoose from "mongoose";
export const connectDB= () => {
    mongoose.connect(process.env.MONGO_URI, {dbName: "backendRento",}).then((c)=> console.log(`Database connected at ${c.connection.host}`)).catch((e)=>console.log(e));
};