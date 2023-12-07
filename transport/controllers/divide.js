const { DivideSubjects, DivideClasses } = require("../../service/Teacher_Subject");

async function divideSubjects(req, res) {

  try {
    const subjects = await DivideSubjects()
    if (!subjects) {
      return res.status(401).json({ message: 'no subjects' });
    }
    
    res.status(200).json({ subjects });
  } catch (error) {
      res.status(500).json({ message: `Failed to divide subjects : ${error}` });
  }
}

async function divideClasses(req, res) {

  try {
    const classes = await DivideClasses()
    if (!classes) {
      return res.status(401).json({ message: 'no subjects' });
    }
    
    res.status(200).json({ classes });
  } catch (error) {
      res.status(500).json({ message: `Failed to divide subjects : ${error}` });
  }
}

module.exports = {
  divideSubjects,
  divideClasses
}