const { EnterInputSubjects, GetInputSubject } = require("../../service/input");
const {Input_Subject} = require('../../model/Subject')

async function readInputSubject(req, res) {
  const subject_id =  req.params.id
  if (subject_id === "" )  {
     return res.status(400).json({ message: 'Bad Request' });
  } 
  try {
    const subject = await GetInputSubject(subject_id)
    if (!subject) {
      return res.status(401).json({ message: 'Wrong subject name' });
    }
    
    res.status(200).json({ subject });
  } catch (error) {
      res.status(500).json({ message: `Failed to read subject name ${subject_id} : ${error}` });
  }
}

async function writeInputSubject(req, res) {
  const inputSubjectData = req.body;
  if (inputSubjectData.name === ""  || inputSubjectData.id === "")  {
     return res.status(400).json({ message: 'Bad Request' });
  } 
  try {
    const input_subject = new Input_Subject(inputSubjectData.course , inputSubjectData.name, inputSubjectData.code,inputSubjectData.id, inputSubjectData.lecture,inputSubjectData.tutorial,inputSubjectData.practical);
      const subjectMsg = await EnterInputSubjects(input_subject);
    if (!subjectMsg) {
      return res.status(401).json({ message: 'error in writing subject' });
    }
    
    res.status(200).json({ msg:  "success" });
  } catch (error) {
      res.status(500).json({ message: `Failed to write subject ${inputSubjectData} : ${error}` });
  }
}

module.exports = {
    readInputSubject, 
    writeInputSubject
}