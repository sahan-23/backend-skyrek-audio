import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true,
    },
    name : {
        type: String,
        required: true,
    },
    rating : {
        type: Number,
        required: true,
    },
    Comment : {
        type: String,
        required: true,
    },
    date : {
        type: Date,
        default: Date.now,
    },
    profilePicture : {
        type: String,
        required: true,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-user&psig=AOvVaw2vZ4aw4wiE3dOsmuiWWySs&ust=1738008269646000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPDd0MSXlIsDFQAAAAAdAAAAABAE"
    },    
    isApproved : {
        type: Boolean,
        required: true,
        default: false,
    },
    
});

const Review = mongoose.model("reviews", reviewSchema);

export default Review;