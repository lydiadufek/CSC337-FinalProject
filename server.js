const express = require('express')
var cookie = require('cookie');
const app = express()
const port = 80;
const SESSION_LENGTH = 600 * 1000;      
const bcrypt = require('bcrypt');
const saltRounds = 10;

var User;
var Job;
var Message;
var CompanyProfile;

// Import the mongoose module
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

// Define the database URL to connect to.
const mongoDB = "mongodb://127.0.0.1/";


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

var JobSchema = new mongoose.Schema({
    title: String,
    description: String,
    company: String,
    location: String,
    employmentType: String,  // ('Full-time', 'Part-time', 'Contract', etc.)
    experienceLevel: String, // ('Entry-level', 'Mid-level', 'Senior-level', etc.)
    educationLevel: String, // ('High School', 'Bachelor's Degree','Master's Degree', etc.)
    salary: {
        type: String,
        amount: Number,
        currency: String,
    },
    postedBy: {
        RecruiterUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // (ID of the recruiter who posted the job listing)
        username: String,
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

var MessageSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    content: String,
    createdAt: Date,
    updatedAt: Date
});

var CompanyProfileSchema = new mongoose.Schema({
    name: String,
    description: String, // Description of the company
    logoUrl: String, // URL of the company's logo image
    websiteUrl: String, // URL of the company's website
    industry: String, // Industry in which the company operates
    headquarters: String, // Location of the company's headquarters
    specialties: [String], // List of specialties or areas of expertise for the company
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // ID of the user who created the company profile
    createdAt: Date,
    updatedAt: Date,
});

let session = [];

// add given user to session.
// user: data want to add to session.
function addSession(user) {
    let sessionId = Math.floor(Math.random() * 100000);
    let sessionStart = Date.now();
    session[user] = { 'sid': sessionId, 'start': sessionStart };
    return sessionId;
}


// check if given user is still in session.
// user : data want to be check.
// session :data want to be check.
function checkSession(user, sessionId) {
    let entry = session[user];
    if (entry != undefined) {
        return entry.sid == sessionId;
    }
    return false;
}


// clean up session that is overdue.
function cleanupSession() {
    let current = Date.now();
    for (i in session) {
        let sess = session[i];
        if (sess.start + SESSION_LENGTH < current) {
            console.log("remove :" + i);
            delete session[i];
        }
    }
}

setInterval(cleanupSession, 1 * 1000);


//  check authenticate stats and if is outdate send the user back to index.html.
// req : req data.
// res : res data.
// next : callback function.
function authenticate(req, res, next) {
    if (req.headers.cookie == undefined) {
        res.redirect('/index.html');
        return;
    }

    let c = cookie.parse(req.headers.cookie);
    c = JSON.parse(c['login'].slice(2,));
    if (c.username) {
        if (checkSession(c.username, c.s_id)) {
            next();
            return;
        }
    }
    res.redirect('/index.html');
}


// Start the server using the http.
// and listen the user input to return database data.
async function startServer() {
    app.use(express.static('public_html'))
    app.use(express.json());
    app.use('/home.html/', authenticate);
    app.use('/post.html/', authenticate);

    app.get('/account/login/:username/:password', (req, res) => {
        let u = req.params.username;
        let p = req.params.password;

        User.findOne({ username: u}).exec().then((results) => {
           console.log(results); // single object
           bcrypt.compare(p, results.hash, function(err, result) {
            console.log(result);
            res.end(JSON.stringify({ 'status': result }));
        });
    
        }).catch((err) => {
            console.log(err);
            res.end("login failed");
        });
    })

    app.post('/add/user/', function (req, res) {

        // res.write(JSON.stringify(User.find().exec()));
        // console.log(req.body.username);
        var hashPW;
        bcrypt.hash(req.body.password, saltRounds, function(err, hs) {
            console.log("hashPW : "+ hs);
            var newUser = new User({
                username: req.body.username,
                hash: hs
            });
            newUser.save();
            res.end("save user susses");
        });

    })

    app.listen(port, () =>
        console.log(`App listening at http://165.22.176.109:${port}`))

}


// start the server and connect to the database.
async function main() {
    await mongoose.connect(mongoDB).then(console.log("finish"));

    User = mongoose.model('User', UserSchema);
    Job = mongoose.model('Job', JobSchema);
    Message = mongoose.model('Message', MessageSchema);
    CompanyProfile = mongoose.model('CompanyProfile', CompanyProfileSchema);

    startServer();
}

main();