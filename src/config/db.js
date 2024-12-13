import mongoose from "mongoose";

export const dbConnection = async () => {
 try{
    await mongoose.connect( "mongodb://localhost:27017/event_Management")
    console.log("Successfully connected to Database");
 }catch(err){
    console.error("Couldn't connect with database",err)
 }
}

