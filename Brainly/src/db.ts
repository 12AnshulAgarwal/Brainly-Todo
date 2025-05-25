import mongoose ,{ connect, model, Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongoUrl = process.env.MONGO_URI;
  if (!mongoUrl) {
    throw new Error("MongoUrl is not defined in the environment variables");
  }

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("error occured", error);
  }
};
const UserSchema = new Schema({
  name: { type: String, unique: true },
  password: String,
  email:String
});
const ContentSchema=new Schema({
  type:String, 
  title:String,
  link:String,
  tags:[{type:mongoose.Types.ObjectId,ref:'Tags'}],
  userId:{type:mongoose.Types.ObjectId,ref:'User'}
})

const LinkSchema=new Schema({
  hash:String,
  userId:{type:mongoose.Types.ObjectId,ref:'User',require:true}
})

export const UserModel = model("User", UserSchema);
export const LinkModel= model("Link",LinkSchema)
export const ContentModel = model("Content", ContentSchema);

