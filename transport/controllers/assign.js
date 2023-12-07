const { AssignSubjects } = require("../../service/Teacher_Subject");

async function assignTeachers(req, res) {

  try {
    const assignMap = await AssignSubjects()
    if (!assignMap) {
      return res.status(401).json({ message: 'no data' });
    }
    
    res.status(200).json({ assignMap });
  } catch (error) {
      res.status(500).json({ message: `Failed to divide subjects : ${error}` });
  }
}

module.exports = {assignTeachers}