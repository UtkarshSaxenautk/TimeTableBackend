const { writeInputSubject, readInputSubject } = require("../repo/mongo/InputSubject");

const EnterInputSubjects = async(input_subject) => {
    if (input_subject == null) {
        return false;
    }
    try {
        await writeInputSubject(input_subject)
    } catch (error) {
        console.log("error in writing input subject svc " ,error)
        return false
    }
    return true;
}

const GetInputSubject = async (inputSubject_id) => {
    try {
        const InputSubject = await readInputSubject(inputSubject_id);
        return InputSubject;
    }
    catch (error) {
        console.log("error in getting input_subject");
        return null;
    }
    
}

module.exports = {EnterInputSubjects , GetInputSubject}