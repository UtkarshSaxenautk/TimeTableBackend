const mongoose = require('mongoose');
const { Schema, Types } = mongoose;


const InputSubjectSchema = new Schema({
    Course_Name: {
        type: String,
        required: true,
    },
    Subject_Name: {
        type: String,
        required : true,
    },
    Subject_ID: {
        type: String,
        required : true,
    },
    Subject_Code: {
        type: String,
        required : true,
    },
    Lecture_Hours: {
        type: Number,
        required : true,
    },
    Tutorial_Hours: {
        type: Number,
        required : true,
    },
    Practical_Hours: {
        type: Number,
        required : true,
    }
})

const SubjectSchema = new Schema({
    Course_Name: {
        type: String,
        required : true,
    },
    Subject_Name: {
        type: String,
        required : true,
    },
    Subject_ID: {
        type: String,
        required : true,
    },
    Subject_Code: {
        type: String,
        required : true,
    },
    Hours: {
        type: Number,
        required : true,
    },
    Sub_Type: {
        type: String,
        required : true,
    },
    Teacher_Assigned_Name: {
        type : String,
    },
    Teacher_Assigned_ID: {
        type : String,
    },
    Class_Name: {
        type: String,
    },
    Strength: {
        type: Number,
    }
})

const InputSubject = mongoose.model('InputSubject', InputSubjectSchema);
const Subject = mongoose.model('Subject', SubjectSchema);
module.exports = { InputSubject, Subject };