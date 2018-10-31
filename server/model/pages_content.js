const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PagesSchema = new Schema({
	page_name: 
	{
		type:String,
		enum: ['Privacy Notice', 'Terms and Condition for candidate', 'Terms and Condition for company', 'FAQ','Candidate popup message', 'Company popup message', 'Candidate chat popup message', 'Company chat popup message'],
		required:true,
	},
	page_title: 
	{
		type:String,
		required:true,
	},	
	page_content: 
	{
		type:String,
		required:true,
	},
    updated_by: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required:true
    },
	updated_date:
	{
		type:Date,
		required:true,
	}
});

module.exports = mongoose.model('pages_content', PagesSchema);




