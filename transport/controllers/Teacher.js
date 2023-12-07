const { GetTeacher, EnterTeacher } = require("../../service/teacher");
const {Teacher} = require('../../model/Teacher.js')


async function readTeacher(req, res) {
  const teacher_id =  req.params.id
  if (teacher_id === "" )  {
     return res.status(400).json({ message: 'Bad Request' });
  } 
  try {
    const teacher = await GetTeacher(teacher_id)
    if (!teacher) {
      return res.status(401).json({ message: 'Wrong teacher name' });
    }
    
    res.status(200).json({ teacher });
  } catch (error) {
      res.status(500).json({ message: `Failed to read teacher name ${teacher_id} : ${error}` });
  }
}

async function writeTeacher(req, res) {
  const teacherData = req.body;
  if (teacherData.name === ""  || teacherData.id === "")  {
     return res.status(400).json({ message: 'Bad Request' });
  } 
  try {
    const teacher_modelData = new Teacher(teacherData.id, teacherData.name, teacherData.fathers_name, teacherData.mobile_no, teacherData.email, teacherData.department, 20);
    const teacher = await EnterTeacher(teacher_modelData)
    if (!teacher) {
      return res.status(401).json({ message: 'error in writing teacher' });
    }
    
    res.status(200).json({ "success" : "saved teacher"});
  } catch (error) {
      res.status(500).json({ message: `Failed to write teacher ${teacherData} : ${error}` });
  }
}

module.exports = {
  writeTeacher,
  readTeacher
}