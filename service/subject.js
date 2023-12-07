const {writeSubject , readSubject} =require('../repo/mongo/Subject')

const EnterSubjects = async (subjects) => {
    if (subjects == null || subjects.length === 0) {
        return false;
    }
    try {
        await writeSubject(subjects)
    } catch (error) {
        console.log("error in writing input subject svc " ,error)
        return false
    }
    return true;
} 

const GetSubject = async (subject_id) => {
    try {
        const subject = await readSubject(subject_id);
        return subject;
    }
    catch (error) {
        console.log("error in getting input_subject");
        return null;
    }
    
}

module.exports = {EnterSubjects , GetSubject}