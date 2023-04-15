const mongoose = require("mongoose");
const MessageSchema = mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    content: String,
    createdAt: Date,
    updatedAt: Date
})

module.exports = mongoose.model('Message', MessageSchema);