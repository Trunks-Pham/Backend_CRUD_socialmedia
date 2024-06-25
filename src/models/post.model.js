// const mongoose = require("mongoose");
// // const { use } = require("../app");

// const postSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     content: {
//         type: String,
//         required: true
//     },
//     dateCreated: {
//         type: Date,
//         default: Date.now
//     },
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     }
// });



// module.exports = mongoose.model("Post", postSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    content: String,
    dateCreated: { type: Date, default: Date.now },
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
});

postSchema.methods.remove = function() {
    return this.delete();
};

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
