const express = require("express");
const { writeTeacher, readTeacher } = require("../controllers/Teacher");
const {
  writeInputSubject,
  readInputSubject,
} = require("../controllers/Inputsubject");
const { writeClass, readClassProgram } = require("../controllers/programClass");
const { divideSubjects, divideClasses } = require("../controllers/divide");
const { assignTeachers } = require("../controllers/assign");
const {
  readRoom,
  writeRoom,
  readLab,
  writeLab,
} = require("../controllers/room");
const {
  generateTimeTableForRoom,
  generateTimeTableForTeacherView,
  getRoomTTView,
  getClassTTView,
  getTeacherTTView,
} = require("../controllers/timeTableRoom");
const checkTTReady = require("../controllers/ready");
const router = express.Router();

router.post("/createTeacher", writeTeacher);
router.get("/readTeacher/:id", readTeacher);
router.post("/createInputSubject", writeInputSubject);
router.get("/readInputSubject/:id", readInputSubject);
router.post("/createClass", writeClass);
router.get("/readProgramClass/:id", readClassProgram);
router.get("/divideSubjects", divideSubjects);
router.get("/divideClasses", divideClasses);
router.get("/assignTeachers", assignTeachers);
router.get("/readRoom/:id", readRoom);
router.post("/createRoom", writeRoom);
router.get("/readLab/:id", readLab);
router.post("/createLab", writeLab);
router.get("/getRoomTimeTable", generateTimeTableForRoom);
router.get("/getRoomTimeTable/teacher", generateTimeTableForTeacherView);
router.get("/getRoomView/:roomID", getRoomTTView);
router.get("/getClassView/:className", getClassTTView);
router.get("/getTeacherView/:teacherName", getTeacherTTView);
router.get("/ready", checkTTReady);

module.exports = router;
