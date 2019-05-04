const {model, Schema} = require("mongoose")

module.exports = model("Booking", new Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },  
}, { timestamps: true }), "Bookings")