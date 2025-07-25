const mongoose = require('mongoose');
const { Schema } = mongoose;

const UVSchema = new Schema({
    value: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UVData', UVSchema);