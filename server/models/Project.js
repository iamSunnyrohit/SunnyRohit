const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    tags: [String],
    imageUrl: { type: String, required: true },
    liveUrl: { type: String }
});

module.exports = mongoose.model('Project', ProjectSchema);
