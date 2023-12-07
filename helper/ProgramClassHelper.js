const { ProgramClass } = require("../model/ProgramClass");

class ProgramClassHelper {
  static input_classes = [];
  static classes = [];
  static class_count = 0;

  static divideClasses() {
    console.log("input : " + this.input_classes.length)
    for (let i = 0; i < ProgramClassHelper.input_classes.length; i++) {
      if (ProgramClassHelper.input_classes[i].Strength > 70) {
        ProgramClassHelper.class_count++;
        ProgramClassHelper.classes.push(new ProgramClass(
          `${ProgramClassHelper.input_classes[i].Class_Name + "-" + ProgramClassHelper.input_classes[i].Semester}(I)`,
          ProgramClassHelper.input_classes[i].Program_Name,
          ProgramClassHelper.class_count.toString(),
          ProgramClassHelper.input_classes[i].Semester,
          ProgramClassHelper.input_classes[i].Strength / 2
        ));
        ProgramClassHelper.class_count++;
        ProgramClassHelper.classes.push(new ProgramClass(
          `${ProgramClassHelper.input_classes[i].Class_Name + "-" + ProgramClassHelper.input_classes[i].Semester}(II)`,
          ProgramClassHelper.input_classes[i].Program_Name,
          ProgramClassHelper.class_count.toString(),
          ProgramClassHelper.input_classes[i].Semester,
          ProgramClassHelper.input_classes[i].Strength / 2
        ));
      } else {
        ProgramClassHelper.class_count++;
        ProgramClassHelper.classes.push(new ProgramClass(
          ProgramClassHelper.input_classes[i].Class_Name + "-" + ProgramClassHelper.input_classes[i].Semester,
          ProgramClassHelper.input_classes[i].Program_Name,
          ProgramClassHelper.class_count.toString(),
          ProgramClassHelper.input_classes[i].Semester,
          ProgramClassHelper.input_classes[i].Strength
        ));
      }
    }
    console.log("output : " + this.class_count)
  }
  
}

module.exports = {ProgramClassHelper}
