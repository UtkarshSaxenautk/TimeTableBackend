class Teacher {
    constructor(Teacher_ID, Teacher_Name, Fathers_Name, Mobile_No, Email, Department, Remaining_Hours) {
        this.Teacher_ID = Teacher_ID;
        this.Teacher_Name = Teacher_Name;
        this.Fathers_Name = Fathers_Name;
        this.Mobile_Number = Mobile_No;
        this.Email = Email;
        this.Department = Department;
        this.Remaining_Hours = Remaining_Hours;
    }
}

module.exports = {Teacher}