

module.exports.candidate = function candidate() {
    return {
        first_name: "Tayyab",
        last_name: "Hussain",
        email: "tayyab@mail.com",
        password: "Password1",
        type: "candidate",
        social_type : ""
    };
};

module.exports.company = function company() {
    return {
        first_name: "Salman",
        last_name: "Safdar",
        email: "salman@email.com",
        job_title: "Designer",
        company_name: "My Company",
        company_website: "my-web.com",
        phone_number: "926546456",
        country: "Pakistan",
        postal_code: "25000",
        city: "RWP",
        password: "Password1",
        type: "company"
    };
};

module.exports.initialJobOffer = function initialJobOffer() {
    return {
        sender_name: "My Company",
        receiver_name: "Tayyab",
        message: "",
        description: "this is for test case",
        job_title: "job title for test case",
        salary: 1500,
        currency: "€ EUR",
        date_of_joining: "",
        job_type: "Part Time",
        is_company_reply: 0,
        interview_location: "",
        interview_time: "",
        msg_tag: "job_offer"
    };
};

module.exports.message = function message() {
    return {
        sender_name: "My Company",
        receiver_name: "Tayyab",
        message: "this is a test msg",
        description: "",
        job_title: "",
        salary: "",
        currency: "",
        date_of_joining: "",
        job_type: "",
        is_company_reply: 1,
        interview_location: "",
        interview_time: "",
        msg_tag: "normal"
    };
};

module.exports.chatFile = function chatFile() {
    return {
        message: "file",
        file_name: "my-test-file.jpg"
    };
};

module.exports.employmentOffer = function employmentOffer() {
    return {
        message: "You have been send an employment offer!",
        description: "this is a test description",
        job_title: "Test job title",
        salary: 2000,
        currency: "€ EUR",
        date_of_joining: "10-25-2018",
        job_type: "Full Time",
        msg_tag: "employment_offer"
    };
};

module.exports.changePassword = function changePassword(){
    return {
        current_password : "Password1",
        password : "myPassword1"
    }
}

module.exports.accountSetting = function accountSetting(){
    return {
        disable_account : true
    }
}


module.exports.companyTnCWizard = function companyTnCWizard(){
    return {
        terms:true,
        marketing: true
    }
}

module.exports.companyAbout = function companyAbout(){
    return {
        company_founded:2015,
        no_of_employees:10,
        company_funded:"i don't know",
        company_description:"Global blockchain agnostic hiring platform for developers, designers, product managers, CTO's and interns who are passionate about public and enterprise blockchain technology and cryptocurrencies."
    }
}


module.exports.companyProfileImage = function companyProfileImage() {
    return {
        image_name: "1535782403315Koala.jpg"
    }
}

module.exports.companyUpdateProfile = function companyUpdateProfile(){
    return {
        first_name: "Sara",
        last_name: "khan",
        job_title: "Developer",
        company_name: "Mwan Mobile",
        company_website: "www.mwanmobile.com",
        phone_number: "090078601",
        country: "Pakistan",
        postal_code: "44000",
        city: "rawalpindi",
        company_founded:2013,
        no_of_employees:8,
        company_funded:"i have no idea",
        company_description:"Global blockchain agnostic hiring platform for developers."

    }
}

module.exports.companyFilterData = function companyFilterData() {
    return {
        currency: "$ USD",
        salary: 1200,
        roles: "Ripple",
        skill: "Java",
        location: "Andorra",
        blockchain: "Stellar",
        availability: "3 months",
        word: "Blockchain"
    }
}

module.exports.referredEmailDocs = function referredEmailDocs(){
    return {
        firstnameOfReferee : 'Tayyab',
        referred_fname : 'Salman',
        referred_lname : 'Safdar'
    }
}

module.exports.profileData = function profileData(){
    return {
        first_name : 'Tayyab',
        last_name : 'Hussain',
        github_account : 'fb.com',
        stackexchange_account : 'fb.com',
        contact_number : '65464655',
        nationality : 'Pakistani',
        image_src : 'dffdfd.jpg'
    }
}

module.exports.experience = function experience(){
    return {
        detail:{
            intro: 'I am a chief. I am a chief. I am a chief. I am a chief. I am a chief. I am a chief. I am a chief. I am a chief. I am a chief. I am a chief. I am a chief. '
        },
        education:[
            {
                uniname: 'CUST',
                degreename: 'BSCS',
                fieldname: 'CS',
                eduyear: 2016
            }
        ],
        work:[
            {
                companyname: 'MWAN',
                positionname: 'Developer',
                locationname: 'Tokyo Japan',
                description: 'i am in it. i am in it. i am in it. i am in it. i am in it. i am in it. i am in it. ',
                startdate: '2019-01-31T19:00:00.000Z',
                enddate: null,
                currentwork: true
            }
        ],
        language_exp: [
            {
                language: 'Java', exp_year: '0-1'
            },
            {
                language: 'C#', exp_year: '1-2'
            }
        ]
    }
}

module.exports.job = function job(){
    return {
        expected_salary: 50000,
        base_currency: '€ EUR',
        current_salary: 20000,
        current_currency: '£ GBP',
        availability_day: '1 month',
        country: [
            'remote', 'Amsterdam', 'Berlin'
        ],
        roles: [
            'Backend Developer', 'Fullstack Developer'
        ],
        interest_area: [
            'Enterprise blockchain', 'Smart contract development'
        ]
    }
}

module.exports.resume = function resume(){
    return {
        why_work: 'I want to work. I want to work. I want to work. I want to work. I want to work. I want to work. I want to work.',
        commercially_worked: [],
        platforms_designed: [
            { value: 'Bitcoin' },
            { value: 'Hyperledger Sawtooth' }
         ],
        experimented_platform:[
            {
                _id: '5bbc37432997bf00408501b9',
                name: 'Bitcoin',
                value: 'Bitcoin',
                checked: true
            },
            {
                _id: '5bbc37432997bf00408501b8',
                name: 'Hyperledger Fabric',
                value: 'Hyperledger Fabric',
                checked: true
            }
        ],
        platforms:[
            {
                _id: '5bbc37432997bf00408501b7',
                platform_name: 'Bitcoin',
                exp_year: '0-1'
            },
            {
                _id: '5bbc37432997bf00408501b6',
                platform_name: 'Hyperledger Sawtooth',
                exp_year: '1-2'
            }
        ]
    }
}