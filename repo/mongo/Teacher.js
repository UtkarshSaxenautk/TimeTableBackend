const { Teacher } = require("./documents/Teacher");


async function readTeacher(teacher_id) {
    const teacher = await Teacher.find({ Teacher_ID : teacher_id });
   // console.log(teacher)
    return teacher;
}

async function writeTeacher(teacherData) {
    const teacher = new Teacher(teacherData)
    //console.log(teacherData)
    try {
       await teacher.save()
    }
    catch (error) {
        console.log(error)
        throw new Error("mongo internal error saving teacher data")
    }
}

async function readAllTeachers() {
    const allTeachers = await Teacher.find({});
    //console.log(allTeachers)
    return allTeachers;
}

module.exports = {
    readTeacher,
    writeTeacher,
    readAllTeachers
};