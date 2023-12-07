const { Subject } = require('../model/Subject');

class SubjectHelper {
  static input_subjects = [];
  static Subjects = [];
  static Subject_Count = 0;

  static divideSubjects() {
    for (let i = 0; i < SubjectHelper.input_subjects.length; i++) {
      const curr = SubjectHelper.input_subjects[i];
      if (curr.Practical_Hours > 0) {
        if (curr.Strength >= 50 && curr.Strength <= 70) {
          // Divide into two subjects and make them in group1 and group2
          let even = true;
          if ((curr.Strength % 2) !== 0) {
            even = false;
          }
          const group1 = new Subject(
            curr.Course_Name,
            `${curr.Subject_Name}-Lab-Group1`,
            curr.Subject_Code,
            SubjectHelper.Subject_Count.toString(),
            curr.Practical_Hours,
            "P"
          );
          group1.Class_Name = curr.Class_Name;
          var g1Strength = 0;
          if (even) {
            g1Strength = curr.Strength / 2;
          } else {
            g1Strength = Math.floor(curr.Strength / 2) + 1;
          }
          group1.Strength = g1Strength;
          SubjectHelper.Subjects.push(group1);
          SubjectHelper.Subject_Count++;

          const group2 = new Subject(
            curr.Course_Name,
            `${curr.Subject_Name}-Lab-Group2`,
            curr.Subject_Code,
            SubjectHelper.Subject_Count.toString(),
            curr.Practical_Hours,
            "P"
          );
          group2.Class_Name = curr.Class_Name;
          var g2Strength = 0;
          if (even) {
            g2Strength = curr.Strength / 2;
          } else {
            g2Strength = Math.floor(curr.Strength / 2) ;
          }
          group2.Strength = g2Strength;
          SubjectHelper.Subjects.push(group2);
          SubjectHelper.Subject_Count++;
        } else {
          // Otherwise, create a single subject for practical hours
          const subject = new Subject(
            curr.Course_Name,
            `${curr.Subject_Name}-Lab`,
            curr.Subject_Code,
            SubjectHelper.Subject_Count.toString(),
            curr.Practical_Hours,
            "P"
          );
          subject.Class_Name = curr.Class_Name;
          subject.Strength = curr.Strength;
          SubjectHelper.Subjects.push(subject);
          SubjectHelper.Subject_Count++;
        }
      }
      if (curr.Tutorial_Hours > 0) {
        const subject = new Subject(
          curr.Course_Name,
          `${curr.Subject_Name}-Tut`,
          curr.Subject_Code,
          SubjectHelper.Subject_Count.toString(),
          curr.Tutorial_Hours,
          "T"
        )
        subject.Class_Name = curr.Class_Name;
        subject.Strength = curr.Strength;
        SubjectHelper.Subjects.push(subject);
        SubjectHelper.Subject_Count++;
      }
      if (curr.Lecture_Hours > 0) {
        const subject = new Subject(
          curr.Course_Name,
          `${curr.Subject_Name}-Lecture`,
          curr.Subject_Code,
          SubjectHelper.Subject_Count.toString(),
          curr.Lecture_Hours,
          "L"
        )
        subject.Class_Name = curr.Class_Name
        subject.Strength = curr.Strength;
        SubjectHelper.Subjects.push(subject);
        SubjectHelper.Subject_Count++;
      }
    }
  }
}

module.exports = { SubjectHelper };
