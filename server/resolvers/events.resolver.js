const EventModel = require("../models/Event.model")

const Constants = require("../constants.js")

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
    if (!req[Constants.AUTH_KEY]) {
      throw "no auth!"      
    }

    let created = await EventModel.create({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: Number(args.eventInput.price),
      date: args.eventInput.date,
      creator: req[Constants.USER_ID],
    })
    .catch(err => console.log(err))
    created = await created.populate({
      path: "creator",
      model: "User"      
    }).execPopulate()

    console.log("returning created event for user with id: " + req[Constants.USER_ID])
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
  deleteEvent: async (args, req) => {
    if (!req[Constants.AUTH_KEY]) {
      throw "no auth!"      
    }

    let deleted = await EventModel.findByIdAndDelete(args.id)
    .catch(err => console.log(err))
    deleted = await deleted.populate({
      path: "creator",
      model: "User"      
    }).execPopulate()

    console.log("returning created event for user with id: " + req[Constants.USER_ID])
    return {
      eventId: deleted._id,
        title: deleted.title,
        description: deleted.description,
        price: deleted.price,
        date: new Date(deleted.date).toISOString(),
        creator: {
          userId: deleted.creator._id,
          email: deleted.creator.email,
        }
    }
  }
}