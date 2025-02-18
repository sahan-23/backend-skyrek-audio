import Review from '../models/review.js';

export function addReview(req, res) {
    if(req.user == null){
        res.status(401).json({
            message: 'You need to be logged in to add a review'
        })
        return;
    }

    const data = req.body;
    data.name = req.user.firstName + ' ' + req.user.lastName;        
    data.profilePicture = req.user.profilePicture;
    data.email = req.user.email;

    const newReview = new Review(data);
    newReview.save().then(() => {
        res.json({message: 'Review added successfully'});
    }).catch((error) => {
        res.status(500).json({error: 'Failed to add review'});
    });
}

export function getReviews(req, res) {
    
    const user = req.user;
    if(user == null || user.role != 'admin'){
        Review.find({isApproved: true}).then((reviews) => {
            res.json(reviews);
        })
        return; 
    }
    if(user.role == 'admin'){
        Review.find().then((reviews) => {
            res.json(reviews);
        })
    }
}
// delete a review
export function deleteReview(req, res) {
    const email = req.params.email;
    // check if the user is logged in
    if(req.user == null){
        res.status(401).json({
            message: 'Please log in and try again'
        })
        return;
    }
    // check if the user is an admin
    if(req.user.role == 'admin'){
        Review.deleteOne({email: email}).then(() => {
            res.json({message: "Review deleted successfully"});
        }).catch(() => {
            res.status(500).json({ error: "Failed to delete review" });  
        });
        return;
    }
    // check if the user is a customer
    if (req.user.role == "customer"){
        // check if the user is the owner of the review
        if(req.user.email == email){
            Review.deleteOne({email: email}).then(() => {
                res.json({message: "Review deleted successfully"});
            }).catch(() => {
                res.status(500).json({ error: "Failed to delete review" });  
            });
        }else{
            res.status(401).json({
                message: 'You are not authorized to delete this review'
            })
        }
    }
}

// approve a review
export function approveReview(req, res) {
    const email = req.params.email;
    
    // check if the user is logged in
    if(req.user == null){
        res.status(401).json({
            message: 'Please log in and try again'
        })
        return;
    }
    // check if the user is an admin
    if(req.user.role == 'admin'){
        Review.updateOne(
            {
                email: email
            },
            {
                isApproved: true
            }
        ).then(() => {
            res.json({message: "Review approved successfully"});
        }).catch(() => {
            res.status(500).json({ error: "Failed to approve review" });  
        });
    }else{
        res.status(401).json({
            message: 'You are not authorized to approve this review'
        })
    }
}