const { Teacher } = require("../model/Teacher");
const PriorityQueue = require('js-priority-queue');

class Assign {
  static SubjectAssigned = 0;
    static TeachersToSubjectMap = new Map();
  static Teachers = [];
  static Subjects = [];

  static AssignSubjectsToTeachers() {
    const pq = new PriorityQueue({ comparator: (a, b) => b.Remaining_Hours - a.Remaining_Hours });

    for (let i = 0; i < this.Teachers.length; i++) {
      const teacher = this.Teachers[i];
      pq.queue(new Teacher(teacher.Teacher_ID, teacher.Teacher_Name, teacher.Fathers_Name, teacher.MobileNo,
        teacher.Email, teacher.Department, teacher.Remaining_Hours));
    }
    
    for (let i = 0; i < this.Subjects.length; i++) {
      const currSubj = this.Subjects[i];
      const freeTeacher = pq.dequeue();

      if (freeTeacher.Remaining_Hours >= currSubj.Hours) {
        Assign.TeachersToSubjectMap.set(currSubj , freeTeacher);
          freeTeacher.Remaining_Hours -= currSubj.Hours;
        Assign.SubjectAssigned++;
      }

      pq.queue(freeTeacher);
      }
      console.log("total  subjects : ", this.Subjects.length);
      console.log("total teachers : ", this.Teachers.length);
      this.TeachersToSubjectMap.forEach((val, res) => {
          console.log(`${res.Subject_ID} is assigned to ${val.Teacher_Name}`);
      })
  }
}

module.exports = { Assign };
