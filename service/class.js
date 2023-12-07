const { writeInputClass, readInputClass } = require("../repo/mongo/InputClass");

const EnterClass = async (programClass) => {
    if (programClass == null) {
        return false;
    }
    try {
        await writeInputClass(programClass)
    } catch (error) {
        console.log("error in writing program class svc " ,error)
        return false
    }
    return true;
} 

const GetClass = async (class_id) => {
    try {
        const programClass = await readInputClass(class_id);
        return programClass;
    }
    catch (error) {
        console.log("error in getting program class svc");
        return null;
    }
    
}

module.exports = {EnterClass , GetClass}