import Student from "../models/student.js";

export function getStudents(req, res) {
    Student.find().then(
        (result) => {
            res.json(result);
        }
    ).catch(
        (error) => {
            res.status(500).json({ error: error  });// status 500 is for internal server error
        }
    )
}

export function postStudents(req, res) {
    let newStudent = req.body;
    let student = new Student(newStudent);

    student.save().then(
        () => {
            res.json({ "message": "Student Created Successfully" });
        }
    ).catch(
        () => {
            res.json({ "message": "An Error Occured" });
        }
    )
}
