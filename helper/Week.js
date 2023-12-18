const PriorityQueue = require("js-priority-queue");

function getRandomRoom(rooms) {
  return rooms[Math.floor(Math.random() * rooms.length)];
}

function getRandomLab(labs) {
  return labs[Math.floor(Math.random() * labs.length)];
}

function generateRoomView(rooms, labs, subjects, teachers) {
  let timeTable = [];
  let subjectSet = new Set();
  let teacherSet = new Set();
  let classSet = new Set();
  const pq = new PriorityQueue((a, b) => b.Hours - a.Hours);
  const labsPq = new PriorityQueue((a, b) => b.Hours - a.Hours);
  const Subject_Map = new Map();
  let subHours = 0;
  let labHours = 0;
  subjects.forEach((subject) => {
    Subject_Map.set(subject.Subject_ID, subject.Hours);
    if (subject.Sub_Type !== "P") {
      subHours++;
      pq.queue(subject);
    } else {
      labHours += 2;
      labsPq.queue(subject);
    }
  });
  console.log(subHours, "---", labHours);
  //console.log(pq)
  const TeacherHourMap = new Map();
  const RoomMap = new Map();
  const LabMap = new Map();
  // Labs Map:

  console.log(rooms.length);
  rooms.forEach((room) => {
    for (let i = 1; i <= 5; i++) {
      timeTable[i] = [];
      for (let j = 9; j < 13; j++) {
        if (pq.length === 0) return RoomMap;
        let skippedSubjects = [];
        let subject = pq.dequeue();
        //console.log(pq)
        let subjectKey =
          i +
          "---" +
          j +
          "----" +
          room.Room_ID +
          "--" +
          subject.Subject_Name +
          "---" +
          subject.Subject_ID;
        let teacherKey =
          i + "----" + j + "----" + subject.Teacher_Assigned_Name;
        let classKey = i + "===" + j + "===" + subject.Class_Name;
        while (
          Subject_Map.get(subject.Subject_ID) <= 0 ||
          subjectSet.has(subjectKey) ||
          subject.Strength > room.Strength
        ) {
          subjectKey =
            i +
            "---" +
            j +
            "----" +
            room.Room_ID +
            "--" +
            subject.Subject_Name +
            "---" +
            subject.Subject_ID;
          teacherKey = i + "----" + j + "----" + subject.Teacher_Assigned_Name;
          classKey = i + "===" + j + "===" + subject.Class_Name;
          if (
            Subject_Map.get(subject.Subject_ID) > 0 &&
            subject.Sub_Type !== "P" &&
            !teacherSet.has(teacherKey) &&
            !classSet.has(classKey) &&
            TeacherHourMap.has(subject.Teacher_Assigned_Name) &&
            TeacherHourMap.get(subject.Teacher_Assigned_Name) < 20
          ) {
            teacherSet.add(teacherKey);
            classSet.add(classKey);
            break;
          }
          //console.log("subject : " + subject + " teacher Key : " + teacherKey + " classKey : " + classKey)
          skippedSubjects.push(subject);
          subject = pq.dequeue();
        }
        //console.log("set room : "+ room.Room_ID + " " + i + " " + j + " " + subject)
        Subject_Map.set(
          subject.Subject_ID,
          Subject_Map.get(subject.Subject_ID) - 1
        );
        RoomMap.set(room.Room_ID + " " + i + " " + j, {
          time: `${i}th day and ${j}th hour`,
          subject: subject,
          room: room,
        });
        TeacherHourMap.set(
          subject.Teacher_Assigned_Name,
          TeacherHourMap.get(subject.Teacher_Assigned_Name) + 1
        );
        subjectSet.add(subjectKey);
        classSet.add(classKey);
        teacherSet.add(teacherKey);
        subject.Hours--;
        if (subject.Hours > 0) {
          pq.queue(subject);
        }
        skippedSubjects.forEach((sub) => {
          if (sub.Hours > 0) {
            pq.queue(sub);
          }
        });
      }
      for (let j = 2; j < 5; j++) {
        if (pq.length === 0) return RoomMap;
        let skippedSubjects = [];
        let subject = pq.dequeue();
        //console.log(pq)
        let subjectKey =
          i +
          "---" +
          j +
          "----" +
          room.Room_ID +
          "--" +
          subject.Subject_Name +
          "---" +
          subject.Subject_ID;
        let teacherKey =
          i + "----" + j + "----" + subject.Teacher_Assigned_Name;
        let classKey = i + "===" + j + "===" + subject.Class_Name;
        while (
          Subject_Map.get(subject.Subject_ID) <= 0 ||
          subjectSet.has(subjectKey) ||
          subject.Strength > room.Strength
        ) {
          subjectKey =
            i +
            "---" +
            j +
            "----" +
            room.Room_ID +
            "--" +
            subject.Subject_Name +
            "---" +
            subject.Subject_ID;
          teacherKey = i + "----" + j + "----" + subject.Teacher_Assigned_Name;
          classKey = i + "===" + j + "===" + subject.Class_Name;
          if (
            Subject_Map.get(subject.Subject_ID) > 0 &&
            subject.Sub_Type !== "P" &&
            !teacherSet.has(teacherKey) &&
            !classSet.has(classKey) &&
            TeacherHourMap.has(subject.Teacher_Assigned_Name) &&
            TeacherHourMap.get(subject.Teacher_Assigned_Name) < 20
          ) {
            teacherSet.add(teacherKey);
            classSet.add(classKey);
            break;
          }
          //console.log("subject : " + subject + " teacher Key : " + teacherKey + " classKey : " + classKey)
          skippedSubjects.push(subject);
          subject = pq.dequeue();
        }
        //console.log("set room : "+ room.Room_ID + " " + i + " " + j + " " + subject)
        if (subject.Hours > 0) {
          Subject_Map.set(
            subject.Subject_ID,
            Subject_Map.get(subject.Subject_ID) - 1
          );
          RoomMap.set(room.Room_ID + " " + i + " " + j, {
            time: `${i}th day and ${j}th hour`,
            subject: subject,
            room: room,
          });
          TeacherHourMap.set(
            subject.Teacher_Assigned_Name,
            TeacherHourMap.get(subject.Teacher_Assigned_Name) + 1
          );
          subjectSet.add(subjectKey);
          classSet.add(classKey);
          teacherSet.add(teacherKey);
          subject.Hours--;
          if (subject.Hours > 0) {
            pq.queue(subject);
          }
        }

        skippedSubjects.forEach((sub) => {
          if (sub.Hours > 0) {
            pq.queue(sub);
          }
        });
      }
    }
  });

  console.log("pq : ", pq);

  labs.forEach((lab) => {
    for (let i = 1; i <= 5; i++) {
      timeTable[i] = [];
      for (let j = 9; j < 12; j = j + 2) {
        if (j > 11) {
          break;
        }
        if (labsPq.length === 0) return LabMap;
        let skippedSubjects = [];
        let subject = labsPq.dequeue();
        //console.log(pq)
        let subjectKey1 =
          i +
          "---" +
          j +
          "----" +
          lab.Lab_ID +
          "--" +
          subject.Subject_Name +
          "---" +
          subject.Subject_ID;

        let subjectKey2 = `${i}---${j + 1}----${lab.Lab_ID}--${
          subject.Subject_Name
        }---${subject.Subject_ID}`;
        let classKey1 = i + "===" + j + "===" + subject.Class_Name;
        let classKey2 = `${i}===${j + 1}===${subject.Class_Name}`;
        let teacherKey1 =
          i + "----" + j + "----" + subject.Teacher_Assigned_Name;
        let teacherKey2 = `${i}----${j + 1}----${
          subject.Teacher_Assigned_Name
        }`;
        while (
          Subject_Map.get(subject.Subject_ID) <= 0 ||
          subjectSet.has(subjectKey1) ||
          subjectSet.has(subjectKey2) ||
          subject.Strength > lab.Strength
        ) {
          subjectKey1 =
            i +
            "---" +
            j +
            "----" +
            lab.Lab_ID +
            "--" +
            subject.Subject_Name +
            "---" +
            subject.Subject_ID;
          subjectKey2 = `${i}---${j + 1}----${lab.Lab_ID}--${
            subject.Subject_Name
          }---${subject.Subject_ID}`;
          teacherKey1 = i + "----" + j + "----" + subject.Teacher_Assigned_Name;
          teacherKey2 = `${i}----${j + 1}----${subject.Teacher_Assigned_Name}`;
          classKey1 = i + "===" + j + "===" + subject.Class_Name;
          classKey2 = `${i}===${j + 1}===${subject.Class_Name}`;
          if (
            Subject_Map.get(subject.Subject_ID) > 0 &&
            subject.Sub_Type === "P" &&
            !teacherSet.has(teacherKey1) &&
            !teacherSet.has(teacherKey2) &&
            !classSet.has(classKey1) &&
            !classSet.has(classKey2) &&
            TeacherHourMap.has(subject.Teacher_Assigned_Name) &&
            TeacherHourMap.get(subject.Teacher_Assigned_Name) < 20
          ) {
            teacherSet.add(teacherKey1);
            teacherSet.add(teacherKey2);
            classSet.add(classKey1);
            classSet.add(classKey2);
            break;
          }
          //console.log("subject : " + subject + " teacher Key : " + teacherKey + " classKey : " + classKey)
          skippedSubjects.push(subject);
          subject = labsPq.dequeue();
        }
        //console.log("set room : "+ room.Room_ID + " " + i + " " + j + " " + subject)
        Subject_Map.set(
          subject.Subject_ID,
          Subject_Map.get(subject.Subject_ID) - 2
        );
        LabMap.set(lab.Lab_ID + " " + i + " " + j, {
          time: `${i}th day and ${j}th hour`,
          subject: subject,
          lab: lab,
        });
        LabMap.set(lab.Lab_ID + " " + i + " " + (j + 1), {
          time: `${i}th day and ${j + 1}th hour`,
          subject: subject,
          lab: lab,
        });
        TeacherHourMap.set(
          subject.Teacher_Assigned_Name,
          TeacherHourMap.get(subject.Teacher_Assigned_Name) + 2
        );
        subjectSet.add(subjectKey1);
        subjectSet.add(subjectKey2);
        teacherSet.add(teacherKey1);
        teacherSet.add(teacherKey2);
        classSet.add(classKey1);
        classSet.add(classKey2);
        subject.Hours = subject.Hours - 2;
        if (subject.Hours > 0) {
          labsPq.queue(subject);
        }
        skippedSubjects.forEach((sub) => {
          if (sub.Hours > 0) {
            labsPq.queue(sub);
          }
        });
      }
      for (let j = 2; j <= 4; j = j + 2) {
        if (j > 3) {
          break;
        }
        if (labsPq.length === 0) return LabMap;
        let skippedSubjects = [];
        let subject = labsPq.dequeue();
        //console.log(pq)
        let subjectKey1 =
          i +
          "---" +
          j +
          "----" +
          lab.Lab_ID +
          "--" +
          subject.Subject_Name +
          "---" +
          subject.Subject_ID;
        let subjectKey2 = `${i}---${j + 1}----${lab.Lab_ID}--${
          subject.Subject_Name
        }---${subject.Subject_ID}`;
        let classKey1 = i + "===" + j + "===" + subject.Class_Name;
        let classKey2 = `${i}===${j + 1}===${subject.Class_Name}`;
        let teacherKey1 =
          i + "----" + j + "----" + subject.Teacher_Assigned_Name;
        let teacherKey2 = `${i}----${j + 1}----${
          subject.Teacher_Assigned_Name
        }`;
        while (
          Subject_Map.get(subject.Subject_ID) <= 0 ||
          subjectSet.has(subjectKey1) ||
          subjectSet.has(subjectKey2) ||
          subject.Strength > lab.Strength
        ) {
          subjectKey1 =
            i +
            "---" +
            j +
            "----" +
            lab.Lab_ID +
            "--" +
            subject.Subject_Name +
            "---" +
            subject.Subject_ID;
          subjectKey2 = `${i}---${j + 1}----${lab.Lab_ID}--${
            subject.Subject_Name
          }---${subject.Subject_ID}`;
          teacherKey1 = i + "----" + j + "----" + subject.Teacher_Assigned_Name;
          teacherKey2 = `${i}----${j + 1}----${subject.Teacher_Assigned_Name}`;
          classKey1 = i + "===" + j + "===" + subject.Class_Name;
          classKey2 = `${i}===${j + 1}===${subject.Class_Name}`;
          if (
            Subject_Map.get(subject.Subject_ID) <= 0 &&
            subject.Sub_Type === "P" &&
            !teacherSet.has(teacherKey1) &&
            !teacherSet.has(teacherKey2) &&
            !classSet.has(classKey1) &&
            !classSet.has(classKey2) &&
            TeacherHourMap.has(subject.Teacher_Assigned_Name) &&
            TeacherHourMap.get(subject.Teacher_Assigned_Name) < 20
          ) {
            teacherSet.add(teacherKey1);
            teacherSet.add(teacherKey2);
            classSet.add(classKey1);
            classSet.add(classKey2);
            break;
          }
          //console.log("subject : " + subject + " teacher Key : " + teacherKey + " classKey : " + classKey)
          skippedSubjects.push(subject);
          subject = labsPq.dequeue();
        }
        //console.log("set room : "+ room.Room_ID + " " + i + " " + j + " " + subject)
        if (Subject_Map.get(subject.Subject_ID) > 0) {
          Subject_Map.set(
            subject.Subject_ID,
            Subject_Map.get(subject.Subject_ID) - 2
          );
          LabMap.set(lab.Lab_ID + " " + i + " " + j, {
            time: `${i}th day and ${j}th hour`,
            subject: subject,
            lab: lab,
          });
          LabMap.set(lab.Lab_ID + " " + i + " " + (j + 1), {
            time: `${i}th day and ${j + 1}th hour`,
            subject: subject,
            lab: lab,
          });
          TeacherHourMap.set(
            subject.Teacher_Assigned_Name,
            TeacherHourMap.get(subject.Teacher_Assigned_Name) + 2
          );
          subjectSet.add(subjectKey1);
          subjectSet.add(subjectKey2);
          teacherSet.add(teacherKey1);
          teacherSet.add(teacherKey2);
          classSet.add(classKey1);
          classSet.add(classKey2);
          subject.Hours = subject.Hours - 2;
          if (subject.Hours > 0) {
            labsPq.queue(subject);
          }
        }

        skippedSubjects.forEach((sub) => {
          if (sub.Hours > 0) {
            labsPq.queue(sub);
          }
        });
      }
    }
  });

  // console.log(RoomMap)
  console.log("sub size ", subjectSet.size);
  return {
    RoomMap,
    LabMap,
  };
}

function generate3DTimetable(rooms, labs, subjects, teachers) {
  let timetable3D = [];
  let roomSet = new Set();
  let labSet = new Set();
  let teacherSet = new Set();

  let numberOfDays = 5;

  const priorityQueue = new PriorityQueue((a, b) => b.Hours - a.Hours);

  subjects.forEach((subject) => {
    priorityQueue.enq(subject);
  });

  for (let i = 1; i <= numberOfDays; i++) {
    timetable3D[i] = [];
    for (let j = 9; j < 13; j++) {
      if (priorityQueue.isEmpty()) {
        return timetable3D;
      }

      let subject = priorityQueue.deq();
      let teacherVal = `${i}==${j}==${subject.Subject_Name}==${subject.Teacher_Assigned_Name}`;

      while (teacherSet.has(teacherVal)) {
        const newSubject = priorityQueue.deq();
        teacherVal = `${i}==${j}==${newSubject.Subject_Name}==${newSubject.Teacher_Assigned_Name}`;
        priorityQueue.enq(subject);
        subject = newSubject;
      }

      let randomLab = null;
      let randomRoom = null;
      let roomVal = "";
      let labVal = "";

      if (subject.Sub_Type !== "P") {
        while (true) {
          randomRoom = getRandomRoom(rooms);
          roomVal = `${i}--${j}--${subject.Subject_Name}--${randomRoom.Room_ID}`;

          if (!roomSet.has(roomVal)) {
            roomSet.add(roomVal);
            break;
          }
        }
      } else {
        while (true) {
          randomLab = getRandomLab(labs);
          labVal = `${i}--${j}--${subject.Subject_Name}--${randomLab.Lab_ID}`;

          if (!labSet.has(labVal)) {
            labSet.add(labVal);
            break;
          }
        }
      }

      timetable3D[i][j] = {
        Schedule: `Day: ${i} Time: ${j}`,
        Room: randomRoom ? randomRoom : "",
        Lab: randomLab ? randomLab : "",
        Teacher: subject.Teacher_Assigned_Name,
        Subject: subject,
      };

      subject.Hours--;

      if (subject.Hours > 0) {
        priorityQueue.enq(subject);
      }
    }
  }

  return timetable3D;
}

module.exports = { generate3DTimetable, generateRoomView };
