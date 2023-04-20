const express = require('express')
var cookie = require('cookie');
const app = express()
const port = 80;
const SESSION_LENGTH = 600 * 1000;
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Import the mongoose module
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

// Define the database URL to connect to.
const mongoDB = "mongodb+srv://337project:337FinalProject@jobdata.dqgctlf.mongodb.net/test";


var User = require('./module/UserSchema');
var Job = require('./module/JobSchema');
var Message = require('./module/MessageSchema');
var CompanyProfile = require('./module/CompanyProfileSchema');

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

        User.findOne({ username: u }).exec().then((results) => {
            console.log(results); // single object
            bcrypt.compare(p, results.hash, function (err, result) {
                console.log("result" + result);
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
        bcrypt.hash(req.body.password, saltRounds, function (err, hs) {
            var newUser = new User({
                username: req.body.username,
                hash: hs
            });
            newUser.save();
            res.end("save user susses");
        });
    })

    app.post('/search/job/', function (req, res) {
        and = JobFilter(req);
        console.log(and);
        Job.find({$and : and}).exec().then((results) => {
            console.log(results);
            res.end(JSON.stringify(results));
        })
    })



    app.listen(port, () =>
        console.log(`App listening at http://165.22.176.109:${port}`))

}


function JobFilter(req) {
    and = [];
    if (req.params.title != undefined) {
        and.push({ title: new RegExp('\w*' + req.params.title + '\w*') });
        and.push({ description: new RegExp('\w*' + req.params.title + '\w*') });
    }
    if (req.params.company != undefined) {
        and.push({ company: new RegExp('\w*' + req.params.company + '\w*') });
    }
    if (req.params.location != undefined) {
        and.push({ location: new RegExp('\w*' + req.params.location + '\w*') });
    }
    if (req.params.employmentType != undefined) {
        and.push({ employmentType: req.params.employmentType });
    }
    if (req.params.employmentType != undefined) {
        and.push({ employmentType: req.params.employmentType });
    }
    if (req.params.educationLevel != undefined) {
        and.push({ educationLevel: req.params.educationLevel });
    }
    if (req.params.JobType != undefined) {
        and.push({
            salary: {
                JobType: req.params.JobType
            }
        });
    }
    if (req.params.lowSalary != undefined && req.params.HighSalary != undefined) {
        and.push({
            salary: {
                amount: { $in: [req.params.lowSalary, req.params.highSalary] }
            }
        });
    } else if (req.params.lowSalary != undefined) {
        and.push({
            salary: {
                amount: { $gte: req.params.lowSalary }
            }
        });
    } else if (req.params.HighSalary != undefined) {
        and.push({
            salary: {
                amount: { $lte: req.params.HighSalary }
            }
        });
    }
    if (req.params.currency != undefined) {
        and.push({
            salary: {
                currency: req.params.currency
            }
        });
    }
    if (req.params.RecruiterUserId != undefined) {
        and.push({
            postedBy: {
                RecruiterUserId: req.params.RecruiterUserId
            }
        });
    }
    if (req.params.RecruiterUserName != undefined) {
        and.push({
            postedBy: {
                RecruiterUserName: req.params.RecruiterUserName
            }
        });
    }
    if (req.params.dateAfter != undefined) {
        and.push({
            createAt: { $gte: req.params.dateAfter }
        })
    }
    return and;

}

// start the server and connect to the database.
async function main() {
    await mongoose.connect(mongoDB).then(console.log("finish"));
    startServer();
}

main();