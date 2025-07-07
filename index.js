import express from "express";
import User from './db.js'
import cors from 'cors'
const app = express();
app.use(express.json())

const allowedOrigins = [
    'http://localhost:5173', 
    'https://token-launcher-nine.vercel.app',
    'https://token-launcher-rishu-rajs-projects-d80232cf.vercel.app',
    'https://token-launcher-git-main-rishu-rajs-projects-d80232cf.vercel.app/'
    // Add more allowed origins as necessary
];
// Middleware
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Allow credentials
}));// allows only our frontend client localhost to access data from server running '/' etc endpoints. & blocks other website to access our endpoints data


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
