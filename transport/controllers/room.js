const { Room, Lab } = require("../../model/Room");
const { GetRoom, EnterRoom, GetLab, EnterLab } = require("../../service/room");



async function readRoom(req, res) {
  const room_id =  req.params.id
  if (room_id === "" )  {
     return res.status(400).json({ message: 'Bad Request' });
  } 
  try {
    const room = await GetRoom(room_id)
    if (!room) {
      return res.status(401).json({ message: 'Wrong room name' });
    }
    res.status(200).json({ room });
  } catch (error) {
      res.status(500).json({ message: `Failed to read teacher name ${room_id} : ${error}` });
  }
}

async function readLab(req, res) {
  const lab_id =  req.params.id
  if (lab_id === "" )  {
     return res.status(400).json({ message: 'Bad Request' });
  } 
  try {
    const lab = await GetLab(room_id)
    if (!lab) {
      return res.status(401).json({ message: 'Wrong lab name' });
    }
    res.status(200).json({ lab });
  } catch (error) {
      res.status(500).json({ message: `Failed to read teacher name ${lab_id} : ${error}` });
  }
}

async function writeRoom(req, res) {
  const roomData = req.body;
  if (roomData.room_no === ""  || roomData.room_id === "")  {
     return res.status(400).json({ message: 'Bad Request' });
  } 
  try {
    const room_modelData = new Room(roomData.room_id , roomData.room_no , roomData.capacity, roomData.floor , roomData.building);
    const room = await  EnterRoom(room_modelData)
    if (!room) {
      return res.status(401).json({ message: 'error in writing room' });
    }
    
    res.status(200).json({ "success" : "saved room"});
  } catch (error) {
      res.status(500).json({ message: `Failed to write room ${roomData} : ${error}` });
  }
}

async function writeLab(req, res) {
  const labData = req.body;
  if (labData.lab_id === ""  || labData.lab_name === "")  {
     return res.status(400).json({ message: 'Bad Request' });
  } 
  try {
    const lab_modelData = new Lab(labData.lab_id, labData.lab_name, labData.capacity, labData.floor, labData.building);
    const lab = await  EnterLab(lab_modelData)
    if (!lab) {
      return res.status(401).json({ message: 'error in writing lab' });
    }
    
    res.status(200).json({ "success" : "saved lab"});
  } catch (error) {
      res.status(500).json({ message: `Failed to write room ${labData} : ${error}` });
  }
}

module.exports = {
  readRoom,
  writeRoom,
  writeLab,
  readLab
}