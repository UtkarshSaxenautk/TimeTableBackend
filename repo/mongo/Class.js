const { ProgramClass } = require("./documents/ClassProgram");


async function readClass(class_id) {
    const classProgram = await ProgramClass.find({ class_id : class_id });
    console.log(classProgram)
    return classProgram;
}

async function writeClass(classData) {
    console.log(classData)
    const classProgram = new ProgramClass(classData)
    try {
       await classProgram.save()
    }
    catch (error) {
        console.log(error)
        throw new Error("mongo internal error saving class data")
    }
}

module.exports = {
    readClass,
    writeClass
};