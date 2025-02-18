import mongoose from "mongoose";
    
// create a schema (strucutre) for the data (like a table in sql)

let studentSchema = mongoose.Schema({
    name: String,
    age: Number,
    height : Number
});
// create a model for the schema
// the model is the class that will be used to interact with the database
let Student = mongoose.model("students", studentSchema);

export default Student;