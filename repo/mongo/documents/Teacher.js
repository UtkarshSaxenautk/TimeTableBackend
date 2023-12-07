const mongoose = require('mongoose');
const { Schema, Types } = mongoose;


const TeacherSchema = new Schema({
    Teacher_ID: {
        type: String,
        required : true,
    },
    Teacher_Name: {
        type: String,   
        required : true,
    },
    Fathers_Name: {
        type: String,
        required : true,
    },
    Mobile_Number: {
        type: String,
        required : true,
    },
    Email: {
        type: String,
        required : true,
    },
    Department: {
        type: String,
        required : true,
    },
    Remaining_Hours: {
        type: Number,
        required : true,
    }
})


const Teacher = mongoose.model('Teacher', TeacherSchema);
module.exports = { Teacher };