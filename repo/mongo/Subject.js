const { Subject } = require("./documents/Subject");



async function readSubject(subject_id) {
    const subject = await Subject.find({ Subject_ID : subject_id });
    console.log(subject)
    return subject;
}

async function readAllSubject() {
    const subjects = await Subject.find({});
   // console.log(subjects)
    return subjects;
}

async function writeSubject(subjectData) {
    const subject = new Subject(subjectData)
    try {
       await subject.save()
    }
    catch (error) {
        console.log(error)
        throw new Error("mongo internal error saving subject data")
    }
}

module.exports = {
    readSubject,
    writeSubject,
    readAllSubject
};