const mongoose = require("mongoose");
const CompanyProfileSchema = mongoose.Schema({
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

module.exports = mongoose.model('CompanyProfile', CompanyProfileSchema);