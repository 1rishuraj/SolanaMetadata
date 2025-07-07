import express from "express";
import User from './db.js'
import cors from 'cors'
const app = express();
app.use(express.json())
// CORS Configuration
const corsOptions = {
  origin: 'https://token-launcher-nine.vercel.app/', // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  credentials: true, // Allow credentials (if needed)
};

// Use CORS middleware with options
app.use(cors(corsOptions));

app.post('/api',async function(req,res){
  const name=req.body.name
  const symbol=req.body.symbol
  const description="Token Description"
  const image=req.body.image;

  const newUser=await User.create({
    name,symbol,description,image
  })

  res.json({
    msg:"created",
    tokenID:newUser._id
  })
})
app.get("/metadata/:tokenID",async function (req, res) {
  const TokenID=req.params.tokenID
  const user=await User.findOne({
    _id:TokenID
  })
  res.json({
    name: user.name,
    symbol: user.symbol,
    description: user.description,
    image: user.image,
  });
});
app.listen(3000);
