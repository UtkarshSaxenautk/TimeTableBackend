const { GetClass, EnterClass } = require("../../service/class");
const  ProgramClass  = require("../../model/ProgramClass")



async function readClassProgram(req, res) {
  const programs_id =  req.params.id
  if (programs_id === "" )  {
     return res.status(400).json({ message: 'Bad Request' });
  } 
  try {
    const program = await GetClass(programs_id)
    if (!program) {
      return res.status(401).json({ message: 'Wrong program name' });
    }
    
    res.status(200).json({ program });
  } catch (error) {
      res.status(500).json({ message: `Failed to read program name ${programs_id} : ${error}` });
  }
}

async function writeClass(req, res) {
  const classData = req.body;
  if (classData.id === "")  {
     return res.status(400).json({ message: 'Bad Request' });
  } 
  try {
    const class_modelData = new ProgramClass(classData.name, classData.program, "", classData.semester, classData.strength);
    const classProgram = await EnterClass(class_modelData)
    if (!classProgram) {
      return res.status(401).json({ message: 'error in writing program' });
    }
    
    res.status(200).json({ classProgram });
  } catch (error) {
      res.status(500).json({ message: `Failed to write teacher ${classData} : ${error}` });
  }
}

module.exports = {
    writeClass,
    readClassProgram
}