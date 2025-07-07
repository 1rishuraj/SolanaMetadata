import express from 'express'
const app=express()
app.get('/',function(req,res){
    res.json({
  "name": "MaaToken",
  "symbol": "MAA",
  "description": "Mummy meri jhakas",
  "image": "https://images.pexels.com/photos/64242/baby-hand-dad-64242.jpeg",
  "external_url": "https://example.com",
  "attributes": [],
  "properties": {
    "files": [
      {
        "uri": "https://images.pexels.com/photos/64242/baby-hand-dad-64242.jpeg",
        "type": "image/jpeg"
      }
    ],
    "category": "image"
  }
}
)
})
app.listen(3000)