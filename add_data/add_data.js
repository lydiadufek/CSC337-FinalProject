const fs = require('fs');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { profile } = require('console');
const saltRounds = 10;

// Load Mongoose models and connect to MongoDB
// const User = require('./models/user'); // Replace with your User model
var UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    hash: String,
    // salt: String,
    accountType: String, // ('Job Seeker' or 'Recruiter')
    profile: {
        firstName: String,
        lastName: String,
        profBackground: String,
        Resume: String,
        location: String,
        about: String, // (Optional, a longer bio or summary of the user's   experience)
        skills: [String],
        education: [{
            institution: String,
            degree: String,
            fieldOfStudy: String,
            startDate: Date,
            endDate: Date,
        }],
        experience: [{
            title: String,
            company: String,
            startDate: Date,
            endDate: Date,
            location: String,
            description: String, // (Optional, a brief summary of the user's responsibilities and achievements)
        }],
        links: {
            website: String,
            linkedin: String,
            github: String,
            portfolio: String,
        },
        createdAt: Date,
        updatedAt: Date,
    },
    AppliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }], // Store the Jobs the users have applied 	
    PostedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }] //the jobs the recruiter has listed.
    // { type: mongoose.Schema.Types.ObjectId, ref: 'Jobs' }

});
User = mongoose.model('User', UserSchema);
// Replace with your MongoDB connection string

// Read data from JSON file
const rawData = fs.readFileSync('users.json'); // Replace with the path to your JSON file
const usersData = JSON.parse(rawData);

// Loop through users data and insert into MongoDB
mongoose.connect("mongodb://127.0.0.1/").then(() => {
    console.log("connect");
    usersData.forEach(user => {

        bcrypt.hash(user.hash, saltRounds).then((hs) => {
            user.hash = hs;
            user.profile.education.forEach((edu) => {
                edu.startDate = new Date(edu.startDate);
                edu.endDate = new Date(edu.endDate);
            });
            user.profile.experience.forEach((edu) => {
                edu.startDate = new Date(edu.startDate);
                if (edu.endDate == "Present") {
                    edu.endDate = new Date("0001-01-01");
                } else {
                    edu.endDate = new Date(edu.endDate);
                }
            });

            user.profile.createdAt = new Date(user.profile.createdAt);
            user.profile.updatedAt = new Date(user.profile.updatedAt);

            // console.log(user.profile);

            const newUser = new User(user);
            newUser.save().then(savedUser => {
                console.log(`User ${savedUser.username} saved to MongoDB`);
            })
                .catch(err => {
                    console.error(`Error saving user: ${err}`);
                });
        });
    });
});
// Close MongoDB connection

