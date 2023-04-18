const { faker } = require('@faker-js/faker');
const skillsArray = [
    'Algorithms',
    'Analytical Skills',
    'Big Data',
    'Calculating',
    'Compiling Statistics',
    'Data Analytics',
    'Data Mining',
    'Database Design',
    'Database Management',
    'Documentation',
    'Modeling',
    'Modification',
    'Needs Analysis',
    'Quantitative Research',
    'Quantitative Reports',
    'Statistical Analysis',
    'Applications',
    'Certifications',
    'Coding',
    'Computing',
    'Configuration',
    'Customer Support',
    'Debugging',
    'Design',
    'Development',
    'Hardware',
    'Implementation',
    'Information Technology',
    'Infrastructure',
    'Languages',
    'Maintenance',
    'Network Architecture',
    'Network Security',
    'Networking',
    'New Technologies',
    'Operating Systems',
    'Programming',
    'Restoration',
    'Security',
    'Servers',
    'Software',
    'Solution Delivery',
    'Storage',
    'Structures',
    'Systems Analysis',
    'Technical Support',
    'Technology',
    'Testing',
    'Tools',
    'Training',
    'Troubleshooting',
    'Usability',
    'Benchmarking',
    'Budget Planning',
    'Engineering',
    'Fabrication',
    'Following Specifications',
    'Operations',
    'Performance Review',
    'Project Planning',
    'Quality Assurance',
    'Quality Control',
    'Scheduling',
    'Task Delegation',
    'Task Management',
    'Blogging',
    'Digital Photography',
    'Digital Media',
    'Facebook',
    'Instagram',
    'Networking',
    'Pinterest',
    'SEO',
    'Social Media Platforms',
    'Twitter',
    'Web Analytics',
    'Client Relations',
    'Email',
    'Requirements Gathering',
    'Research',
    'Subject Matter Experts (SMEs)',
    'Technical Documentation'
];

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomUser() {

    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const username = faker.internet.userName(firstName, lastName);
    const email = faker.internet.email();
    const hash = '1234';
    const accountType = faker.helpers.arrayElement(['Job Seeker', 'Recruiter']);

    const profBackground = faker.lorem.sentence();
    const resume = faker.internet.url();
    const location = faker.address.city();
    const about = faker.lorem.paragraph();
    const skills = faker.helpers.arrayElements(skillsArray, Math.floor(Math.random() * 5) + 1);
    // education
    const education = [];
    for (let i = 0; i < getRandomNumber(1, 3); i++) {
        var institution = faker.company.name() + " University";
        var degree = faker.helpers.arrayElement(['Bachelor', 'Master', 'PhD']);
        var fieldOfStudy = faker.name.jobArea();
        var startDate = faker.date.past();
        var endDate = faker.date.future();
        education.push({
            institution,
            degree,
            fieldOfStudy,
            startDate,
            endDate,
        });
    }
    // experience
    const experience = [];
    for (let i = 0; i < getRandomNumber(1, 3); i++) {
        var title = faker.name.jobTitle();
        var company = faker.company.name()
        var experienceStartDate = faker.date.past();
        var experienceEndDate = faker.date.future();
        var experienceLocation = faker.address.city();
        var experienceDescription = faker.name.jobArea() + ", " + faker.name.jobDescriptor();
        experience.push({
            title,
            company,
            startDate: experienceStartDate,
            endDate: experienceEndDate,
            location: experienceLocation,
            description: experienceDescription,
        });

    }

    // links
    const website = faker.internet.url();
    const linkedin = faker.internet.url();
    const github = faker.internet.url();
    const portfolio = faker.internet.url();
    const createdAt = new Date();
    const updatedAt = new Date();

    const appliedJobs = [];
    const postedJobs = [];

    const obj = {
        username,
        email,
        hash,
        accountType,
        profile: {
            firstName,
            lastName,
            profBackground,
            resume,
            location,
            about,
            skills,
            education,
            experience,
            links: {
                website,
                linkedin,
                github,
                portfolio,
            },
            createdAt,
            updatedAt,
        },
        AppliedJobs: appliedJobs,
        PostedJobs: postedJobs,
    };

    return obj;
}

function getRandomJob(RecruiterUserId, userName) {
    const title = faker.name.jobTitle();
    const description = faker.lorem.paragraph();
    const company = faker.company.name();
    const location = faker.address.city();
    const employmentType = faker.helpers.arrayElement(['Full-time', 'Part-time', 'Contract']);
    const experienceLevel = faker.helpers.arrayElement(['Entry-level', 'Mid-level', 'Senior-level']);
    const educationLevel = faker.helpers.arrayElement(['High School', 'Bachelor\'s Degree', 'Master\'s Degree']);
    // salary
    const JobType = faker.helpers.arrayElement(['Fixed', 'Hourly']);
    var amount;
    if (JobType == 'Fixed') {
        amount = getRandomNumber(3, 30) * 10000;
    } else {
        amount = getRandomNumber(12, 50);
    }
    const currency = faker.finance.currencyCode();
    // postedBy
    const createdAt = new Date();
    const updatedAt = new Date();

    const obj = {
        title,
        description,
        company,
        location,
        employmentType,
        experienceLevel,
        educationLevel,
        salary: {
            JobType,
            amount,
            currency,
        },
        postedBy: {
            RecruiterUserId,
            userName,
        },
        Applicants: [],
        createdAt,
        updatedAt,
    };

    return obj;
}

exports.getRandomUser = getRandomUser;
exports.getRandomJob = getRandomJob;
exports.getRandomNumber = getRandomNumber;
// console.log(getRandomUser());
// pconsole.log(getRandomJob());