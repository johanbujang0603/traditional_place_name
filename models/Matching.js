const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const MatchingSchema = new Schema({
  placename: {
    type: Schema.Types.ObjectId,
    ref: "placenames"
  },
  postcode: {
    type: Schema.Types.ObjectId,
    ref: "postcodes",
  }
});

module.exports = Matching = mongoose.model("matching", MatchingSchema);
