const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    dueDate: {
        type: Date,
        required: true,
        validate: {
            validator: value => value >= new Date(),
            message: 'Due date must be today or later.'
        }
    },
    completed: { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('Todo', todoSchema);