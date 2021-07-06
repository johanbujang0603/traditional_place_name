const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const PostcodeSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  postcode: {
    type: String,
    required: true,
  },
  locality: {
    type: String
  },
  state: {
    type: String
  },
  long: {
    type: Number
  },
  lat: {
    type: Number
  },
  dc: {
    type: String
  },
  type: {
    type: String
  },
  status: {
    type: String
  },
  sa3: {
    type: String
  },
  sa3name: {
    type: String
  },
  sa4: {
    type: String
  },
  sa4name: {
    type: String
  },
  region: {
    type: String
  },
  Lat_precise: {
    type: String
  },
  Long_precise: {
    type: String
  },
  SA1_MAINCODE_2011: {
    type: String
  },
  SA1_MAINCODE_2016: {
    type: String
  },
  SA2_MAINCODE_2016: {
    type: String
  },
  SA2_NAME_2016: {
    type: String
  },
  SA3_CODE_2016: {
    type: String
  },
  SA3_NAME_2016: {
    type: String
  },
  SA4_CODE_2016: {
    type: String
  },
  SA4_NAME_2016: {
    type: String
  },
  RA_2011: {
    type: String
  },
  RA_2016: {
    type: String
  },
  MMM_2015: {
    type: String
  },
  MMM_2019: {
    type: String
  },
  ced: {
    type: String
  }
});

module.exports = Postcode = mongoose.model("postcode", PostcodeSchema);
