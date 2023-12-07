const { generateTimeTableForRoomView, teacherViewTimeTable, getRoomViewByID, getClassViewByID } = require("../../service/week");




async function getRoomTTView(req, res) {
  try {
      const roomID = req.params.roomID
    const generatedTimeTable = await getRoomViewByID(roomID)
    console.log(generatedTimeTable.length)
      //console.log(generatedTimeTable)
    if (!generatedTimeTable) {
      return res.status(401).json({ message: 'no data' });
    }
    // //console.log(generatedTimeTable)
    // let tt = []
    // // console.log(generatedTimeTable.ttRoom)
    // // console.log(generatedTimeTable.ttLab)
    // tt.push([...generatedTimeTable.ttRoom])
    // tt.push([...generatedTimeTable.ttLab])
    res.status(200).json({ "res" : generatedTimeTable });
  } catch (error) {
      res.status(500).json({ message: `Failed to generate TimeTable : ${error}` });
  }
}

async function getClassTTView(req, res) {
  try {
      const className = req.params.className
    const generatedTimeTable = await getClassViewByID(className)
    console.log(generatedTimeTable.length)
      //console.log(generatedTimeTable)
    if (!generatedTimeTable) {
      return res.status(401).json({ message: 'no data' });
    }
    // //console.log(generatedTimeTable)
    // let tt = []
    // // console.log(generatedTimeTable.ttRoom)
    // // console.log(generatedTimeTable.ttLab)
    // tt.push([...generatedTimeTable.ttRoom])
    // tt.push([...generatedTimeTable.ttLab])
    res.status(200).json({ "res" : generatedTimeTable });
  } catch (error) {
      res.status(500).json({ message: `Failed to generate TimeTable : ${error}` });
  }
}

async function generateTimeTableForRoom(req, res) {

  try {
      const generatedTimeTable = await generateTimeTableForRoomView()
      //console.log(generatedTimeTable)
    if (!generatedTimeTable) {
      return res.status(401).json({ message: 'no data' });
    }
    //console.log(generatedTimeTable)
    let tt = []
    // console.log(generatedTimeTable.ttRoom)
    // console.log(generatedTimeTable.ttLab)
    tt.push([...generatedTimeTable.ttRoom])
    tt.push([...generatedTimeTable.ttLab])
    res.status(200).json({ "res" : tt });
  } catch (error) {
      res.status(500).json({ message: `Failed to generate TimeTable : ${error}` });
  }
}

async function generateTimeTableForTeacherView(req, res) {

  try {
      const generatedTimeTableTeacherView = await teacherViewTimeTable()
      //console.log(generatedTimeTable)
    if (!generatedTimeTableTeacherView) {
      return res.status(401).json({ message: 'no data' });
    }
      //console.log(generatedTimeTable)
      res.status(200).json({ "res" : [...generatedTimeTableTeacherView] });
  } catch (error) {
      res.status(500).json({ message: `Failed to generate TimeTable : ${error}` });
  }
}

module.exports = {generateTimeTableForRoom , generateTimeTableForTeacherView , getRoomTTView , getClassTTView}