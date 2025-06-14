import mongoose from "mongoose";

let ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("DB CONNECTED");
  } catch (error) {
    console.error(error.message);
  }
};

export default ConnectDB;
