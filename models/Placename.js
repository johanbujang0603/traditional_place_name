const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const PlacenameSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  }
});

module.exports = User = mongoose.model("placename", PlacenameSchema);
