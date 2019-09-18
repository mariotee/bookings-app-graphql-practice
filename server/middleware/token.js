const jwt = require("jsonwebtoken")

const Constants = require("../constants.js")

module.exports = (req,res,next) => {
  const authHeader = req.get("Authorization")
  if (!authHeader) {
    req[Constants.AUTH_KEY] = false
    return next()
  }

  const token = authHeader.split(" ")[1] //look like Bearer <token>
  if (!token || token === "") {
    req[Constants.AUTH_KEY] = false
    return next()
  }
  
  let decodedToken
  
  try {
    decodedToken = jwt.verify(token, process.env.TOKEN_KEY)
  } catch (err) {
    console.log(err)
    req[Constants.AUTH_KEY] = false
    return next()
  }

  if (!decodedToken) {
    req[Constants.AUTH_KEY] = false
    return next()
  }

  req[Constants.AUTH_KEY] = true
  req[Constants.USER_ID] = decodedToken.userId
  req[Constants.USER_EMAIL] = decodedToken.email
  next()
}