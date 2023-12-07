class Room {
    constructor(roomID, roomNo, capacity, floor, building) {
        this.Room_ID = roomID;
        this.Room_No = roomNo;
        this.Capacity = capacity;
        this.Floor = floor;
        this.Building = building;
    }
}

class Lab {
    constructor(labID, labName, capacity, floor, building) {
        this.Lab_ID = labID;
        this.Lab_Name = labName;
        this.Capacity = capacity;
        this.Floor = floor;
        this.Building = building;
    }
}

module.exports = {Room , Lab}