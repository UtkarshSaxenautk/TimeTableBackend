const { generateRoomView } = require("../helper/Week");
const { readAllRooms, readAllLabs } = require("../repo/mongo/Room");
const { readAllSubject } = require("../repo/mongo/Subject");
const { readAllTeachers } = require("../repo/mongo/Teacher");

var ttGlobalRooms = null;
var ttGlobalLabs = null;

function spreadMapElements(value, key, map, teacherViewMap) {
  //console.log(`map.get('${key}') = ${value}`);
  const teacherId = value.subject.Teacher_Assigned_ID;

  if (teacherViewMap.has(teacherId)) {
    let tempArray = teacherViewMap.get(teacherId);
    tempArray.push(
      `Room No : ${value.room.Room_No} and Time : ${value.time} teaching subject : ${value.subject.Subject_Name} to class ${value.subject.Class_Name}`
    );
    teacherViewMap.set(teacherId, tempArray);
  } else {
    let tempArray = [];
    tempArray.push(
      `Room No : ${value.room.Room_No} and Time : ${value.time} teaching subject : ${value.subject.Subject_Name} to class ${value.subject.Class_Name}`
    );
    teacherViewMap.set(teacherId, tempArray);
  }
}

function spreadMapElementsLab(value, key, map, teacherViewMap) {
  //console.log(`map.get('${key}') = ${value}`);
  const teacherId = value.subject.Teacher_Assigned_ID;

  if (teacherViewMap.has(teacherId)) {
    let tempArray = teacherViewMap.get(teacherId);
    tempArray.push(
      `Room No : ${value.lab.Lab_Name} and Time : ${value.time} teaching subject : ${value.subject.Subject_Name} to class ${value.subject.Class_Name}`
    );
    teacherViewMap.set(teacherId, tempArray);
  } else {
    let tempArray = [];
    tempArray.push(
      `Room No : ${value.lab.Lab_Name} and Time : ${value.time} teaching subject : ${value.subject.Subject_Name} to class ${value.subject.Class_Name}`
    );
    teacherViewMap.set(teacherId, tempArray);
  }
}

async function teacherViewTimeTable() {
  console.log("making new teacher view");
  try {
    // Read rooms, labs, and subjects
    const rooms = await readAllRooms();
    const labs = await readAllLabs();
    const subjects = await readAllSubject(); // Fixed: readAllSubjects instead of readAllSubject
    const teachers = await readAllTeachers(); // Fixed: readAllTeachers instead of readAllSubject
    const TeacherRoomMap = new Map();

    // Check if rooms and subjects are defined before generating the timetable
    if (rooms && subjects && labs && teachers) {
      const tt = generateRoomView(rooms, labs, subjects, teachers);
      const timeTableRoom = tt.RoomMap;
      const timeTableLab = tt.LabMap;
      timeTableRoom.forEach((value, key) =>
        spreadMapElements(value, key, timeTableRoom, TeacherRoomMap)
      );
      timeTableLab.forEach((value, key) =>
        spreadMapElementsLab(value, key, timeTableLab, TeacherRoomMap)
      );
      return TeacherRoomMap;
    } else {
      console.log("Rooms or subjects are undefined.");
      return null;
    }
  } catch (err) {
    console.log("Error in service:", err);
    return err;
  }
}

async function getClassViewByID(className) {
  try {
    const tt = await generateTimeTableForRoomView();
    const roomTT = ttGlobalRooms;
    const labTT = ttGlobalLabs;

    // Using destructuring to create a shallow copy
    const roomArray = [...roomTT];
    const labArray = [...labTT];

    console.log(labArray.length, " : ", roomArray.length);
    // Filter the data based on the provided roomID
    const filteredData = [];
    for (let i = 0; i < roomArray.length; i++) {
      if (roomArray[i][1].subject.Class_Name == className) {
        filteredData.push(roomArray[i]);
      }
    }
    for (let i = 0; i < labArray.length; i++) {
      if (labArray[i][1].subject.Class_Name == className) {
        filteredData.push(labArray[i]);
      }
    }

    return filteredData;
  } catch (error) {
    console.error("Error fetching room data:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
}

async function swapEntry(
  day1,
  hour1,
  room1,
  class1,
  day2,
  hour2,
  room2,
  class2
) {}

async function getTeacherViewByID(teacherName) {
  try {
    const tt = await generateTimeTableForRoomView();
    const roomTT = ttGlobalRooms;
    const labTT = ttGlobalLabs;

    // Using destructuring to create a shallow copy
    const roomArray = [...roomTT];
    const labArray = [...labTT];

    console.log(labArray.length, " : ", roomArray.length);
    // Filter the data based on the provided roomID
    const filteredData = [];
    for (let i = 0; i < roomArray.length; i++) {
      if (roomArray[i][1].subject.Teacher_Assigned_Name == teacherName) {
        filteredData.push(roomArray[i]);
      }
    }
    for (let i = 0; i < labArray.length; i++) {
      if (labArray[i][1].subject.Teacher_Assigned_Name == teacherName) {
        filteredData.push(labArray[i]);
      }
    }

    return filteredData;
  } catch (error) {
    console.error("Error fetching teacher data:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
}

async function getRoomViewByID(roomID) {
  try {
    const tt = await generateTimeTableForRoomView();
    const roomTT = ttGlobalRooms;

    // Using destructuring to create a shallow copy
    const roomArray = [...roomTT];

    // Filter the data based on the provided roomID
    const filteredData = [];
    for (let i = 0; i < roomArray.length; i++) {
      if (roomArray[i][1].room.Room_ID == roomID) {
        filteredData.push(roomArray[i]);
      }
    }

    return filteredData;
  } catch (error) {
    console.error("Error fetching room data:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
}

async function generateTimeTableForRoomView() {
  console.log("hello");

  try {
    // Read rooms, labs, and subjects
    const rooms = await readAllRooms();
    const labs = await readAllLabs();
    const subjects = await readAllSubject();
    const teachers = await readAllSubject();

    // Check if rooms and subjects are defined before generating the timetable
    if (rooms && subjects && labs && teachers) {
      const tt = generateRoomView(rooms, labs, subjects, teachers);
      const timeTableRoom = tt.RoomMap;
      const timeTableLab = tt.LabMap;
      //console.log(timeTable)
      //console.log(tt.LabMap)
      ttGlobalRooms = timeTableRoom;
      ttGlobalLabs = timeTableLab;
      return {
        ttRoom: timeTableRoom,
        ttLab: timeTableLab,
      };
    } else {
      console.log("Rooms or subjects are undefined.");
      return null;
    }
  } catch (err) {
    console.log("Error in service:", err);
    return err;
  }
}

module.exports = {
  generateTimeTableForRoomView,
  teacherViewTimeTable,
  getRoomViewByID,
  getClassViewByID,
  getTeacherViewByID,
};
