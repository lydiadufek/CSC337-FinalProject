import { faker } from '@faker-js/faker';

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
const skills = [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()];
const institution = faker.company.companyName();
const degree = faker.helpers.arrayElement(['Bachelor', 'Master', 'PhD']);
const fieldOfStudy = faker.lorem.word();
const startDate = faker.date.past();
const endDate = faker.date.future();
const title = faker.name.jobTitle();
const company = faker.company.companyName();
const experienceStartDate = faker.date.past();
const experienceEndDate = faker.date.future();
const experienceLocation = faker.address.city();
const experienceDescription = faker.lorem.sentence();
const website = faker.internet.url();
const linkedin = faker.internet.url();
const github = faker.internet.url();
const portfolio = faker.internet.url();
const createdAt = faker.date.past();
const updatedAt = faker.date.past();
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
        education: [{
            institution,
            degree,
            fieldOfStudy,
            startDate,
            endDate,
        }],
        experience: [{
            title,
            company,
            startDate: experienceStartDate,
            endDate: experienceEndDate,
            location: experienceLocation,
            description: experienceDescription,
        }],
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

console.log(obj);
