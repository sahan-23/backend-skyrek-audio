
//1 
import mongoose from "mongoose";
// create a schema (strucutre) for the data (like a table in sql)
const userSchema = new mongoose.Schema({
    email: {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required : true
    },
    role: {
        type : String,
        required : true,
        default : "customer"
    },
    firstName: {
        type : String,
        required : true
    },
    lastName: {
        type : String,
        required : true
    },
    address: {
        type : String,
        required : true
    },
    phone: {
        type : String,
        required : true
    },
    profilePicture: {
        type : String,
        required : true,
        default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-user&psig=AOvVaw2vZ4aw4wiE3dOsmuiWWySs&ust=1738008269646000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPDd0MSXlIsDFQAAAAAdAAAAABAE"
    },
})

// create a model for the schema
// the model is the class that will be used to interact with the database
const User = mongoose.model("users", userSchema);

export default User;