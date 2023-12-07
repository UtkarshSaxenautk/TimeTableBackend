const { InputSubject } = require("./documents/Subject");


async function readInputSubject(subject_id) {
    const input_subject = await InputSubject.find({ Subject_ID : subject_id });
    console.log(input_subject)
    return input_subject;
}

async function writeInputSubject(input_subjectData) {
    console.log(input_subjectData)
    const input_subject = new InputSubject(input_subjectData)
    try {
        await input_subject.save()
    }
    catch (error) {
        console.log(error)
        throw new Error("mongo internal error saving input subject data")
    }
}

async function readAllInputSubjects() {
    const allInputSubjects = await InputSubject.find({});
    console.log(allInputSubjects)
    return allInputSubjects;
}

module.exports = {
    readInputSubject,
    writeInputSubject,
    readAllInputSubjects,
};