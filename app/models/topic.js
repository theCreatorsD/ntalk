// app/models/topic.js

var mongoose = require('mongoose')

var topicSchema = mongoose.Schema({
  title : String,
  description : String
})

module.exports = mongoose.model('Topic', topicSchema)
