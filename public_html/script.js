// CSC337 CHIU YEH CHEN
// This file is a js file to be used in this project.
// it contain a function that need to be called when the event happens.

const URL = "http://localhost";

// check user's info to login in.
function userLogin() {

    var u = document.getElementById("username_login").value;
    var p = document.getElementById("password_login").value;

    let url = URL + '/account/login/' + u + '/' + p + '/';
    fetch(url)
        .then((response) => {
            // console.log(response);
            // if (response.text() == 'failed') {
            //     document.getElementById("login_p").value = "wrong username/password!";
            // } else {
            //     window.location.href = response.url;
            // }
            return response.text();
        })
        .then((text) => {
            
            if (JSON.parse(text)['status'] == "match") {
                console.log('href');
                //if userType = recruiter or seeker
                window.location.href = "/home.html";
            } else {
                document.getElementById("login_p").value = "wrong username/password!";
            }
            console.log(text);
        })
        .catch((error) => {
            console.log('THERE WAS A PROBLEM');
            console.log(error);
        });

}

//  using ajax to add a user to the database.
function addUser() {

    var u = document.getElementById("username").value;
    var p = document.getElementById("password").value;
    var e = document.getElementById('email').value;

    var radioButtons = document.querySelectorAll('input[name="userType"]');
        let userType;
        for (const radioButton of radioButtons) {
            if (radioButton.checked) {
                userType = radioButton.value;
                break;
            }
        }
    //add recruiter/seeker and email

    let url =  URL + '/add/user/';
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            username: u,
            password: p,
            email: e,
            accountType: userType,
        }),
        headers: {
            'Content-type': 'application/json',
        }
    })
        .then((response) => {
            return response.text();
        })
        .then((text) => {
            console.log(text);
            alert(text);
        })
        .catch((error) => {
            console.log('THERE WAS A PROBLEM');
            console.log(error);
        });
}

//  using ajax to add a item to the database.
function addItem() {

    var t = document.getElementById("title").value;
    var d = document.getElementById("description").value;
    var i = document.getElementById("image").value;
    var p = document.getElementById("price").value;
    var s = document.getElementById("stat").value;
    var u = getUsername();

    let url =  URL + '/add/item/' + u + '/';
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            title: t,
            description: d,
            image: i,
            price: p,
            stat: s

        }),
        headers: {
            'Content-type': 'application/json',
        }
    })
        .then((response) => {
            return response.text();
        })
        .then((text) => {
            console.log(text);
            alert(text);
            window.location.href = "/home.html";
        })
        .catch((error) => {
            console.log('THERE WAS A PROBLEM');
            console.log(error);
        });
}

function addPosting() {
    var t = document.getElementById("title").value;
    var d = document.getElementById("description").value;
    var c = document.getElementById("company").value;
    var l = document.getElementById("location").value;

    var employmentRadio = document.querySelectorAll('input[name="employment"]');
    let employment;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            employment = radioButton.value;
            break;
        }
    }

    var experienceRadio = document.querySelectorAll('input[name="experience"]');
    let experience;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            experience = radioButton.value;
            break;
        }
    }

    var educationRadio = document.querySelectorAll('input[name="education"]');
    let education;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            education = radioButton.value;
            break;
        }
    }

    let url =  URL + '/add/posting/';
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            title: t,
            description: d,
            company: c,
            location: l,
            employmentType: employment,
            experienceLevel: experience,
            educationLevel: education,
        }),
        headers: {
            'Content-type': 'application/json',
        }
    })
        .then((response) => {
            return response.text();
        })
        .then((text) => {
            console.log(text);
            alert(text);
        })
        .catch((error) => {
            console.log('THERE WAS A PROBLEM');
            console.log(error);
        });
}

function searchJob(){

    var t = document.getElementById("title").value;
    var d = document.getElementById("description").value;
    var c = document.getElementById("company").value;
    var l = document.getElementById("location").value;


    let url =  URL + '/add/posting/';
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            title: t,
            description: d,
            company: c,
            location: l,
            employmentType: employment,
            experienceLevel: experience,
            educationLevel: education,
        }),
        headers: {
            'Content-type': 'application/json',
        }
    })
        .then((response) => {
            return response.text();
        })
        .then((text) => {
            console.log(text);
            alert(text);
        })
        .catch((error) => {
            console.log('THERE WAS A PROBLEM');
            console.log(error);
        });


}


// turn js cookie to readable string.
// from internet.
const parseCookie = str =>
    str
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, v) => {
            acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
            return acc;
        }, {});


// return username in the cookie.        
function getUsername() {
    return JSON.parse(parseCookie(document.cookie)['login'].slice(2,)).username;
}

function sendToProfile() {
    //different profiles for seeker/recruiter?
    //send to user profile for now
    window.location.href = "/profile.html";
}
