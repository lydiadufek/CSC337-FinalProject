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
            return response.text();
        })
        .then((text) => {
            console.log('username' + u);
            if (JSON.parse(text)['status'] == true) {
                searchUsername(u);
            } else {
                document.getElementById("login_p").value = "wrong username/password!";
            }
        })
        .catch((error) => {
            console.log('THERE WAS A PROBLEM');
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

    if(u == undefined || p == undefined || e == undefined || userType == undefined) {
        document.getElementById("create_p").value = "Enter all required information";
    } else {
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
}

//  using ajax to add a item to the database.
function addItem() {
    var t = document.getElementById("title").value;
    var d = document.getElementById("description").value;
    var i = document.getElementById("image").value;
    var p = document.getElementById("price").value;
    var s = document.getElementById("stat").value;
    var u = getUsername();

    let url = URL + '/add/item/' + u + '/';
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

    let url = URL + '/add/posting/';
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

function searchUsername(u) {  
    console.log('i got here');
    var url = '/search/users/' + u;
  
    let p = fetch(url);
    let ps = p.then( (results) => {
      return results.json();
    }).then((items) => { 
        if(items[0].accountType == 'recruiter') {
            window.location.href = "/recruiter.html";
        } else {
            //job seeker
            window.location.href = "/home.html";
        }
    }).catch(() => { 
      alert('something went wrong');
    });
  }
function searchJob() {

    var t = document.getElementById("title").value;
    var l = document.getElementById("location").value;
    var e = document.getElementById("employment-type").value;
    var a = document.getElementById("salary").value;
    var d = document.getElementById("date").value;
    if (d == "24h") {
        d = new Date();
        d.setDate(d.getDate() - 1);
    } else if (d == "week") {
        d = new Date();
        d.setDate(d.getDate() - 7);
    } else if (d == "month") {
        d = new Date();
        d.setDate(d.getDate() - 30);
    } else if (d == "Anytime") {
        d = "";

    }
    if (a == "All salaries") {
        a = "";
    }
    if (e == "All jobs") {
        e = "";
    }



    // var c = document.getElementById("company").value;
    // var l = document.getElementById("location").value;

    console.log(JSON.stringify({
        title: t,
        company: t,
        description: t,
        location: l,
        date: d,
        amount: a,
        employmentType: e
        // employmentType: employment,
        // experienceLevel: experience,
        // educationLevel: education,
    }));

    let url = URL + '/search/job/';
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            title: t,
            company: t,
            description: t,
            location: l,
            date: d,
            amount: a,
            employmentType: e
            // employmentType: employment,
            // experienceLevel: experience,
            // educationLevel: education,
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
            displayDiv(text);
        })
        .catch((error) => {
            console.log('THERE WAS A PROBLEM');
            console.log(error);
        });


}

function displayDiv(items) {
  let items_div = document.getElementById("displayContent");

  //clearing the display area
//   while (items_div.firstChild) {
//     items_div.removeChild(items_div.firstChild);
//   }
  
  for(let i=0; i < items.length; i++) {
    console.log(items[i])
    // formatString = '<div' + '">' 
    //   + items[i].title + '<br/>' 
    //   + '' + '<br/>' 
    //   + items[i].description + '<br/>' 
    //   + items[i].company +'<br/>' 
    //   + items[i].location + '</div>\n' + '<br/>';

    // //styling the new div
    // let div = document.createElement("div");
    // div.style.border = "dashed 2px rgb(29, 29, 83)";
    // div.style.marginTop = "15px";
    // div.style.textAlign = "center"
    // div.innerHTML = formatString;
    
    // items_div.appendChild(div);
  }
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
