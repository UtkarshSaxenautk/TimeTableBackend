const { Room, Lab } = require("./documents/Room");

async function readRoom(room_id) {
    const room = await Room.find({ Room_ID : room_id });
    console.log(room)
    return room;
}

async function readAllRooms() {
    const rooms = await Room.find({});
   // console.log("rooms all : " , rooms )
    return rooms;
}

async function readLab(lab_id) {
    const lab = await Lab.find({ Lab_ID : lab_id });
    console.log(lab)
    return lab;
}

async function readAllLabs() {
    const labs = await Lab.find({});
    //console.log(labs)
    return labs;
}

async function writeRoom(roomData) {
    const room = new Room(roomData)
    try {
       await room.save()
    }
    catch (error) {
        console.log(error)
        throw new Error("mongo internal error saving room data")
    }
}

async function writeLab(labData) {
    const lab = new Lab(labData)
    try {
       await lab.save()
    }
    catch (error) {
        console.log(error)
        throw new Error("mongo internal error saving lab data")
    }
}

module.exports = {readRoom , writeRoom , readLab , writeLab , readAllRooms , readAllLabs}



