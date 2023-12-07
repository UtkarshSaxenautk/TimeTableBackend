
const { readTeacher, writeTeacher } = require("../repo/mongo/Teacher");


const EnterTeacher = async (teacher) => {
    if (teacher == null) {
        return false;
    }
    try {
        console.log(teacher)
        await writeTeacher(teacher)
    } catch (error) {
        console.log("error in writing teacher svc " ,error)
        return false
    }
    return true;
} 

const GetTeacher = async (teacher_id) => {
    try {
        const teacher = await readTeacher(teacher_id);
        return teacher;
    }
    catch (error) {
        console.log("error in getting teacher svc");
        return null;
    }
    
}

module.exports = {EnterTeacher , GetTeacher}