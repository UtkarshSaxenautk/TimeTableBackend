const { Input_Subject } = require("../model/Subject");

class SubjectClassHelper {
    static classes = [];
    static interMediateSubjects = [];
    static intermediate_subject_count = 0;
    static input_subjects = [];

    static divideSubjectsToClasses() {
        console.log("input : " + this.input_subjects.length);

        let modifiedInputSubjects = []; 

        for (let i = 0; i < this.classes.length; i++) {
            let program_name = this.classes[i].Class_Name;
            program_name = program_name.replaceAll("-", "");
            program_name = program_name.replaceAll(".", "");
            var n = program_name.indexOf("(");
            program_name = program_name.substring(0, n != -1 ? n : program_name.length);
            //console.log(i , " : -- " , program_name)
            for (let j = 0; j < this.input_subjects.length; j++) {
                let input_subject_program_name = this.input_subjects[j].Course_Name;
                input_subject_program_name = input_subject_program_name.replaceAll(" ", "");
                //console.log(j , " := " ,input_subject_program_name)
                if (input_subject_program_name === program_name) {
                    let temp_subject = new Input_Subject(this.input_subjects[j].Course_Name, this.input_subjects[j].Subject_Name,
                        this.input_subjects[j].Subject_Code, this.input_subjects[j].Subject_ID, this.input_subjects[j].Lecture_Hours,
                        this.input_subjects[j].Tutorial_Hours, this.input_subjects[j].Practical_Hours);

                    temp_subject.Class_Name = this.classes[i].Class_Name;
                    temp_subject.Strength = this.classes[i].Strength;
                    modifiedInputSubjects.push(temp_subject); // Push the modified subject to the new array
                    this.intermediate_subject_count++;
                }
            }
        }

        this.interMediateSubjects = modifiedInputSubjects; 

        console.log("output : " + this.intermediate_subject_count);
    }
}

module.exports = { SubjectClassHelper };
