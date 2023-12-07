const { Assign } = require("../helper/Assign");
const { SubjectClassHelper } = require("../helper/AssignSubjectsToClass");
const { ProgramClassHelper } = require("../helper/ProgramClassHelper");
const { SubjectHelper } = require("../helper/SubjectHelper");

const { readAllClasses } = require("../repo/mongo/InputClass");
const { readAllInputSubjects } = require("../repo/mongo/InputSubject");
const { writeSubject } = require("../repo/mongo/Subject");
const { readAllTeachers } = require("../repo/mongo/Teacher");


const DivideClasses = async () => {
    const input_classes = await readAllClasses()

    // Create an empty array for classes
    ProgramClassHelper.classes = [];
 
    // Set input_classes and classes
    ProgramClassHelper.input_classes = input_classes;
    
    ProgramClassHelper.class_count = 0;

    // Call the divideSubjects function
    ProgramClassHelper.divideClasses()
    //console.log("output : " , ProgramClassHelper.classes)

    return ProgramClassHelper.classes;
}

const DivideSubjects = async() => {

    const input_Subjects = await readAllInputSubjects()

    // Create an empty array for Subjects
    SubjectHelper.Subjects = [];

    // Set input_subjects and Subject_Count
    
    

    SubjectHelper.Subject_Count = 0;
    SubjectHelper.input_subjects = [];

    const program_classes = await DivideClasses();
    SubjectClassHelper.classes = program_classes;
    SubjectClassHelper.input_subjects = input_Subjects;
    SubjectClassHelper.divideSubjectsToClasses()
    console.log("lol: --------=    " , SubjectClassHelper.interMediateSubjects[0])
    SubjectHelper.input_subjects = SubjectClassHelper.interMediateSubjects;
    console.log("input subjects : " , input_Subjects.length)
    console.log("inter : ", SubjectClassHelper.intermediate_subject_count)
    console.log("output subjects and input for subjectHelper : " , SubjectHelper.input_subjects.length)
    // Call the divideSubjects function
    SubjectHelper.divideSubjects();
    

    return SubjectHelper.Subjects;
}

const AssignSubjects = async () => {
    const subjects = await DivideSubjects()
    const teachers = await readAllTeachers()
    
    const assignedSubjects = [];
    Assign.Subjects = subjects;
    Assign.Teachers = teachers;
    Assign.AssignSubjectsToTeachers();
    Assign.TeachersToSubjectMap.forEach((val, key) => {
        
        key.Teacher_Assigned_Name = val.Teacher_Name;
        key.Teacher_Assigned_ID = val.Teacher_ID;
        assignedSubjects.push(key)
        writeSubject(key)
    })
    return assignedSubjects;
}

module.exports = {DivideSubjects , DivideClasses , AssignSubjects}