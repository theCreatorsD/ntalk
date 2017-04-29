// app/models/issue.js

var mongoose = require('mongoose')

var issueSchema = mongoose.Schema({
  title     : String,
  topic_id  : mongoose.Schema.Types.ObjectId

})

module.exports = mongoose.model('Issue', issueSchema)
