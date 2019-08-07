const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const TOKEN_EXPIRE_HOURS = 4 

const UserModel = require("../models/User.model")

module.exports = {
  login: async ({ email, password }) => {    
    const existing = await UserModel.findOne({ email })    

    if (!existing) {      
      throw "user does not exist"
    }

    const hasheq = await bcrypt.compare(password, existing.password)

    if (!hasheq) {
      throw "password is incorrect"
    }

    const data = {
      userId: existing._id,
      email: existing.email,
    }

    const options = {
      expiresIn: `${TOKEN_EXPIRE_HOURS}h`
    }

    const token = jwt.sign(data, process.env.TOKEN_KEY, options)

    return {
      userId: existing._id,
      token: token,
      expiresHrs: TOKEN_EXPIRE_HOURS
    }
  },
  createUser: async (args) => {
    let exists = await UserModel.findOne({
      email: args.userInput.email
    })

    if (exists) {
      throw "user exists"
    }

    let hash = await bcrypt.hash(args.userInput.password, 12)
    .catch((err) => console.log(err))
    let created = await UserModel.create({
      email: args.userInput.email,
      password: hash,
    })    
    .catch(err => console.log(err))

    return Object.assign(created, { 
      userId: created._id, 
      _id: null, 
      password:null 
    })
  }
}