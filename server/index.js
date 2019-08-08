//npm
const express = require("express")
const bodyParser = require("body-parser")
const graphQLhttp = require("express-graphql")
const mongoose = require("mongoose")
//GraphQL definitions
const schema = require("./schema")
const resolvers = require("./resolvers")
//custom middleware
const myJwtMiddleware = require("./middleware/token")
const myCorsMiddleware = require("./middleware/cors")
//App
const app = express()

app.use(bodyParser.json())
app.use(myJwtMiddleware)
app.use(myCorsMiddleware)

app.use("/graphql", graphQLhttp({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}))

app.get("/", (req,res,next) => {
  res.send("Welcome to my Api")
})

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useCreateIndex: true,
})
.then(app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
  console.log('cors on ',process.env.CLIENT_HOST)
}))
.catch(err => {
  console.log(err)
})