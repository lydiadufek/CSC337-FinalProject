const mongoose = require("mongoose");
const JobSchema = mongoose.Schema({
    title: String,
    description: String,
    company: String,
    location: String,
    employmentType: String,  // ('Full-time', 'Part-time', 'Contract', etc.)
    experienceLevel: String, // ('Entry-level', 'Mid-level', 'Senior-level', etc.)
    educationLevel: String, // ('High School', 'Bachelor's Degree','Master's Degree', etc.)
    salary: {
        JobType: String, //['Fixed', 'Hourly']
        amount: Number,
        currency: String,
    },
    postedBy: {
        RecruiterUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // (ID of the recruiter who posted the job listing)
        RecruiterUserName: String,
    },
    Applicants: [{
        UserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        Review: String,
        Rating: Number,
        TimePosted: Date
    }],
    createdAt: Date,
    updatedAt: Date,
});

module.exports = mongoose.model('Job', JobSchema);