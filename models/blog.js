const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema)
// the 'Blog' string gets pluralized ('Blogs') and looks for that collection in the DB; the blogSchema is the type of schema to be stored in the collection.

module.exports = Blog;