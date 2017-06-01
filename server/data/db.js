var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/hyfdabaoge')

var userSchema = new mongoose.Schema({
	name: String,
	pwd: String,
	recheck: String,
	token: Boolean
})

var articleSchema = new mongoose.Schema({
	title: String,
	create_at: Date,
	content: String,
	classify: String
})

var classifySchema = new mongoose.Schema({
	classname: String,
    create_at: Date,
    value: String
})

var Models = {
	User: mongoose.model('User', userSchema),
	Article: mongoose.model('Article', articleSchema),
	Classify: mongoose.model('Classify', classifySchema)
}

module.exports = Models