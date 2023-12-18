const { teacherViewTimeTable } = require("../../service/week");

async function checkTTReady(req, res) {
  try {
    const generatedTimeTableTeacherView = await teacherViewTimeTable();
    //console.log(generatedTimeTable)
    if (!generatedTimeTableTeacherView) {
      return res.status(401).json({ message: "no data" });
    }
    //console.log(generatedTimeTable)
    res.status(200).json({ res: "sucess" });
  } catch (error) {
    console.log("err : ", error);
    res
      .status(500)
      .json({ message: `Failed to generate TimeTable : ${error}` });
  }
}

module.exports = checkTTReady;
