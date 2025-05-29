import mongoose from "mongoose"


let isConnected = false;

export const connectToDB = async()=>{
    mongoose.set("strictQuery",true);

    if(!process.env.MONGODB_URL) return console.log("MongoDb URL not found");

    if(isConnected) return console.log("DB already connected")

    try {
        await mongoose.connect(process.env.MONGODB_URL);

        isConnected=true;

        console.log("Mongo DB Connected");
    } catch (error) {
        console.log(error);
    }
}