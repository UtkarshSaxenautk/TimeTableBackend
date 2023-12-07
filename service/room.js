const { writeRoom, readRoom, writeLab, readLab } = require("../repo/mongo/Room");


const EnterRoom = async (room) => {
    if (room == null) {
        return false;
    }
    try {
        await writeRoom(room)
    } catch (error) {
        console.log("error in writing input room svc " ,error)
        return false
    }
    return true;
} 

const GetRoom = async (room_id) => {
    try {
        const room = await readRoom(room_id);
        return room;
    }
    catch (error) {
        console.log("error in getting room");
        return null;
    }
    
}

const EnterLab = async (lab) => {
    if (lab == null) {
        return false;
    }
    try {
        await writeLab(lab)
    } catch (error) {
        console.log("error in writing input lab svc " ,error)
        return false
    }
    return true;
} 

const GetLab = async (lab_id) => {
    try {
        const lab = await readLab(lab_id);
        return lab;
    }
    catch (error) {
        console.log("error in getting lab");
        return null;
    }
    
}

module.exports = {EnterRoom , GetRoom , EnterLab , GetLab}