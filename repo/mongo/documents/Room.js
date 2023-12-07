const mongoose = require('mongoose');
const { Schema, Types } = mongoose;


const RoomSchema = new Schema({
    Room_ID: {
        type: String,
        required : true,  
    },
    Room_No: {
        type: Number,
        required : true
    },
    Capacity: {
        type:Number,
        required:true
    },
    Floor: {
        type: Number,
        required : true,
    },
    Building: {
        type: String,
        required : true,
    }
})

const LabSchema = new Schema({
    Lab_ID: {
        type: String,
        required : true,
    },
    Lab_Name: {
        type: String,
        required: true,
    },
    Capacity: {
        type: Number,
        required : true,
    },
    Floor: {
        type: Number,
        required : true,
    },
    Building: {
        type: String,
        required : true,
    }
})


const Room = mongoose.model('Room', RoomSchema);
const Lab = mongoose.model('Lab', LabSchema);
module.exports = { Room , Lab};