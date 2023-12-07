const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const InputClassProgramSchema = new Schema({
    Class_Name: {
        type: String,
        required : true,
    },
    Program_Name: {
        type: String,
        required : true,
    },
    Class_ID: {
        type: String,
        required : true,
    },
    Semester: {
        type: Number,
        required : true,
    },
    Strength: {
        type: Number,
        required : true,
    }
})

const ClassProgramSchema = new Schema({
    Class_Name: {
        type: String,
        required : true,
    },
    Program_Name: {
        type: String,
        required : true,
    },
    Class_ID: {
        type: String,
        required : true,
    },
    Semester: {
        type: Number,
        required : true,
    },
    Strength: {
        type: Number,
        required : true,
    }
})

const ProgramClass = mongoose.model('ProgramClass', ClassProgramSchema);
const InputClassProgram = mongoose.model('InputProgramClass', InputClassProgramSchema);
module.exports = {
    ProgramClass,
    InputClassProgram
}