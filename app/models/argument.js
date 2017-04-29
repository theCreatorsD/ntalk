// app/models/argument.js

var mongoose = require('mongoose')

var argumentSchema = mongoose.Schema({
  title     : String,
  contents  : String,
  author    : String,
  stance    : {
      type    : Boolean,
      default : true
  },
  date      : {
      type    : Date,
      default : Date.now
  },
  pros      : Number,
  proser    : [mongoose.Schema.Types.ObjectId],
  cons      : Number,
  conser    : [mongoose.Schema.Types.ObjectId],
  issue_id  : mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model('Argument', argumentSchema)
