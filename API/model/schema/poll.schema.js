'use strict';
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { v4: uuidV4 } = require('uuid');

const pollSchema = new schema({
    id: {
        type: String,
        default: () => { return uuidV4() },
        unique: [true, "This ID is already used"],
    },
    positionRoom: {
        type: Number,
        required: [true, 'Unknown position'],
        min: [1, 'Position of Croma only 1 -> 6'],
        max: [3, 'Position of Croma only 1 -> 3'],
    },
    levelRoom: {
        type: Number,
        min: [1, 'Level of room required 1 -> 6'],
        max: [6, 'Level of room required 1 -> 6'],
        required: [true, 'Unknown level of room'],
    },
    agreed: {
        type: [String],
        //default: [],
    },
    noAgreed: {
        type: [String],
    },
    room: {
        type: Number,
        default: 0,
    },
    processed: {
        type: Boolean,
        default: false,
    }
})

module.exports = pollSchema;