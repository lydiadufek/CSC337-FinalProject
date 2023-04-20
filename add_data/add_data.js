const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var User = require('../module/UserSchema');
var Job = require('../module/JobSchema');
var getRandom = require('./getRandom');
// Define the database URL to connect to.
const mongoDB = "mongodb+srv://337project:337FinalProject@jobdata.dqgctlf.mongodb.net/test";
const numberAdd = 5;

async function addUserAndJob() {

    user_obj = getRandom.getRandomUser();
    bcrypt.hash(user_obj.hash, saltRounds).then((hs) => {
        user_obj.hash = hs;
        let newUser = new User(user_obj);

        // check if the user is already.
        User.findOne({ username: newUser.username }).then((user) => {
            if (!user) {
                // console.log(`User ${user.username} already exists`);
                console.log(`newUser: ` + newUser.username);
            
            
                newUser.save().then(savedUser => {
                    console.log(`User ${savedUser._id} saved to MongoDB`);
                    // console.log(savedUser.accountType == "Recruiter");

                    if (savedUser.accountType == "Recruiter") {
                        for (let i = 0; i < getRandom.getRandomNumber(1, 5); i++) {

                            job_obj = getRandom.getRandomJob(savedUser._id, savedUser.username);
                            var newJob = new Job(job_obj);
                            console.log(typeof job_obj.salary);
                            
                            newJob.save().then((savedJob) => {
                                console.log(`User ${savedUser._id} saved Job ${savedJob._id}`);
                            }).catch(err => {
                                console.error(`Error saving Job: ${err}`);
                            });
                        }
                    }
                }).catch(err => {
                    console.error(`Error saving user: ${err}`);
                    return;
                });
            }
        });

    });
}

function addData() {
    mongoose.connect(mongoDB).then(() => {
        console.log("connect");
        for (i = 0; i < numberAdd; i++) {
            console.log("/////////////////////////////////");
            console.log("i : " + i);
            console.log("/////////////////////////////////");
            setInterval(addUserAndJob, 1);
            // addUserAndJob();
        };
    }).catch(err => {
        console.error('Error connecting to database:', err.message);
    }).finally(() => {
            // mongoose.connection.close();
        })

}

addData();
