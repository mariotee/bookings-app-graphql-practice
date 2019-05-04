const BookingModel = require("../models/Booking.model")

module.exports = {
  bookings: async (_, req) => {
    if (!req.isAuth) {
      throw "not auth!"
    }
    let stuff = await BookingModel
      .find({
        user: req.userId
      })
      .populate({path: "user", model: "User"})
      .populate({
        path: "event", model: "Event",
        populate: {path: "creator", model: "User"}
      })
    
    return stuff.map((booking) => {
      return {
        bookingId: booking._id,
        event: {
          eventId: booking.event._id,
          title: booking.event.title,
          description: booking.event.description,
          price: booking.event.price,
          date: new Date(booking.event.date).toISOString(),
          creator: {
            userId: booking.event.creator._id,
            email: booking.event.creator.email,
          },
        },
        user: {
          userId: booking.user._id,
          email: booking.user.email
        },
        createdAt: new Date(booking.createdAt).toISOString(),
        updatedAt: new Date(booking.updatedAt).toISOString(),
      }
    })
  },
  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw "not auth!"
    }
    
    let booking = await BookingModel.create({
      user: req.userId,
      event: args.eventId,
    })
    
    booking = await booking
      .populate({
        path: 'user',
        model: "User",
      }).populate({
        path: 'event',
        model: "Event",
      }).execPopulate()
    
    return {
      bookingId: booking._id,
      event: {
        eventId: booking.event._id,
        title: booking.event.title,
        description: booking.event.description,
        price: booking.event.price,
        date: new Date(booking.event.date).toISOString(),
        creator: {
          userId: booking.event.creator._id,
          email: booking.event.creator.email,
        },
      },
      user: {
        userId: booking.user._id,
        email: booking.user.email
      },
      createdAt: new Date(booking.createdAt).toISOString(),
      updatedAt: new Date(booking.createdAt).toISOString(),
    }
  },
  cancelBooking: async (args,req) => {
    if (!req.isAuth) {
      throw "not auth!"
    }
    console.log(args.bookingId)
    try {
      let deleted = await BookingModel.findByIdAndDelete(args.bookingId)
      
      deleted = await deleted
      .populate({
        path: 'user',
        model: "User",
      }).populate({
        path: 'event',
        model: "Event",
      }).execPopulate()
      
      return {
        bookingId: deleted._id,
        event: {
          eventId: deleted.event._id,
          title: deleted.event.title,
          description: deleted.event.description,
          price: deleted.event.price,
          date: new Date(deleted.event.date).toISOString(),
          creator: {
            userId: deleted.event.creator._id,
            email: deleted.event.creator.email,
          },
        },
        user: {
          userId: deleted.user._id,
          email: deleted.user.email
        },
        createdAt: new Date(deleted.createdAt).toISOString(),
        updatedAt: new Date(deleted.createdAt).toISOString(),
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}