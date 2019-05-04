module.exports = (req,res,next) => {  
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization")

  if (req.method === "OPTIONS") {
    return res.sendStatus(200)
  }

  next()
}