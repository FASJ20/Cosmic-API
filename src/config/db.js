import "dotenv/config"
import mongoose from "mongoose";
import { mongourl } from "./env.config.js";

export const dbconnect = async () => {
  try{
    const connect = await mongoose.connect("mongodb://localhost:27017/CosmicShopDB");
    console.log(`Database connected: ${connect.connection.host}, ${connect.connection.name}`)
  } catch (err){
    console.error("error connecting to database", err)
  }
}
  