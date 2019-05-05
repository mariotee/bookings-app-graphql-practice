const EventModel = require("../models/Event.model")

//TODO: look into how to actually use these?
//const DataLoader = require('dataloader')

// const eventLoader = new DataLoader((eventIds) => {
//   return someFunction(eventIds)
// })

// called with eventLoader.load or .loadMany

module.exports = {
  events: async () => {
    let stuff = await EventModel.find().populate({
      path: "creator",
      model: "User"
    })

    console.log("returning all events retrieved")
    return stuff.map((element) => {
      return {
        eventId: element._id,
        title: element.title,
        description: element.description,
        price: element.price,
        date: new Date(element.date).toISOString(),
        creator: {
          userId: element.creator._id,
          email: element.creator.email,
        }
      }
    })
  },
  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw "no auth!"
    }

    let created = await EventModel.create({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: Number(args.eventInput.price),
      date: args.eventInput.date,
      creator: req.userId,
    })
    .catch(err => console.log(err))
    created = await created.populate({
      path: "creator",
      model: "User"      
    }).execPopulate()

    console.log("returning created event for user with id: " + req.userId)
    return {
      eventId: created._id,
        title: created.title,
        description: created.description,
        price: created.price,
        date: new Date(created.date).toISOString(),
        creator: {
          userId: created.creator._id,
          email: created.creator.email,
        }
    }
  },
}