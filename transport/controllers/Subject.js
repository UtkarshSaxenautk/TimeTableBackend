const { GetSubject } = require("../../service/subject");


async function readSubject(req, res) {
  const subject_id =  req.params.id
  if (subject_id === "" )  {
     return res.status(400).json({ message: 'Bad Request' });
  } 
  try {
    const subject = await GetSubject(subject_id)
    if (!subject) {
      return res.status(401).json({ message: 'Wrong subject name' });
    }
    
    res.status(200).json({ subject });
  } catch (error) {
      res.status(500).json({ message: `Failed to read subject name ${subject_id} : ${error}` });
  }
}





module.exports = {
    readSubject, 
}