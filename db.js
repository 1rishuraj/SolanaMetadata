import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

const UserSchema=new mongoose.Schema({
    name: String,
    symbol: String,
    description: String,
    image: String
})

const User = mongoose.model('User', UserSchema);
export default User;