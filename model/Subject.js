class Input_Subject {
    constructor(Course_Name, Subject_Name, Subject_Code, Subject_ID, Lecture_Hours, Tutorial_Hours, Practical_Hours) {
        this.Course_Name = Course_Name;
        this.Subject_Name = Subject_Name;
        this.Subject_Code = Subject_Code;
        this.Subject_ID = Subject_ID;
        this.Lecture_Hours = Lecture_Hours;
        this.Tutorial_Hours = Tutorial_Hours;
        this.Practical_Hours = Practical_Hours;
        this.Class_Name = "";
        this.Strength = 0;
    }
}


class Subject {
    constructor(Course_Name, Subject_Name, Subject_Code, Subject_ID, Hours, Sub_Type) {
        this.Course_Name = Course_Name;
        this.Subject_Name = Subject_Name;
        this.Subject_Code = Subject_Code;
        this.Subject_ID = Subject_ID;
        this.Hours = Hours;
        this.Sub_Type = Sub_Type;
        this.Teacher_Assigned_Name = "";
        this.Teacher_Assigned_ID = "";
        this.Class_Name = "";
        this.Strength = 0;
    }
}

module.exports = {Subject , Input_Subject}