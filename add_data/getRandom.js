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

function getRandomUser() {

    const username = faker.internet.userName();
    const email = faker.internet.email();
    const hash = '1234';
    const accountType = faker.helpers.arrayElement(['Job Seeker', 'Recruiter']);
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const profBackground = faker.lorem.sentence();
    const resume = faker.internet.url();
    const location = faker.address.city();
    const about = faker.lorem.paragraph();
    const skills = faker.helpers.arrayElements(skillsArray, 5);
    // education
    const education = [];
    for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
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
    for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
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

console.log(getRandomUser());