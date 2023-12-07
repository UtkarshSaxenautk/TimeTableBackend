const { InputClassProgram } = require("./documents/ClassProgram");

async function readInputClass(class_id) {
    const inputClass = await InputClassProgram.find({ Class_ID : class_id });
    console.log(inputClass)
    return inputClass;
}

async function readAllClasses() {
    const allClasses = await InputClassProgram.find({});
    console.log(allClasses)
    return allClasses;
}

async function writeInputClass(inputClassData) {
    console.log(inputClassData)
    inputClassData.Class_ID = 10;
    const inputClass = new InputClassProgram(inputClassData)
    try {
       await inputClass.save()
    }
    catch (error) {
        console.log(error)
        throw new Error("mongo internal error saving input class data")
    }
}

module.exports = {
    readInputClass,
    writeInputClass,
    readAllClasses
};