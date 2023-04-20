const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
      },
    email:{
        type: String,
        required: true,
        unique: true
      },
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

module.exports = mongoose.model('User', UserSchema);