import express from "express";
import User from './db.js'
const app = express();
app.use(express.json())
app.post('/api',async function(req,res){
  const name=req.body.name
  const symbol=req.body.symbol
  const description="Token Description"
  const image=req.body.imgURL;

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
