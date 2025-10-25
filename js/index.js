var userEmailLoginInput = document.getElementById('userLoginEmail');
var userPasswordLoginInput = document.getElementById('userLoginPassword');

var signUpBtn = document.querySelector('#signUpBtn');
var signUpMsg = document.querySelector('#signUpMsg');
var signUpLink = document.querySelector('#signUpLink');
var signUpPage = document.querySelector('#signUpPage');

var loginBtn = document.querySelector('#loginBtn');
var loginLink = document.querySelector('#loginLink');
var loginPage = document.querySelector('#loginPage');
var logoutBtn = document.querySelector('#logoutBtn');
var loginErrorMsg = document.querySelector('#loginErrorMsg');

var userNameInput = document.querySelector('#userName');
var userEmailInput = document.querySelector('#userEmail');
var userPasswordInput = document.querySelector('#userPassword');

var homePage = document.querySelector('#homePage');

var users = [];

if (localStorage.getItem('users') != null) {
    users = JSON.parse(localStorage.getItem('users'));
}

//1- Get input from sign up page
signUpBtn.addEventListener('click', function () {
    readSignUpInput();
});

function readSignUpInput() {
    var name = userNameInput.value.trim();
    var email = userEmailInput.value.trim();
    var password = userPasswordInput.value.trim();

    if (name === "" || email === "" || password === "") {
        ShowSignUpMsg('All inputs are required', 'danger');
        return;
    }

    var emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|outlook|yahoo)+\.(com)$/;
    if (!emailRegex.test(email)) {
        ShowSignUpMsg('Invalid email format', 'danger');
        return;
    }

    if (isEmailExist(email)) {
        ShowSignUpMsg('Email already exists', 'danger');
        return;
    }

    addNewUser(name, email, password);
    ShowSignUpMsg('Success', 'success');
}

// 2- Add new user
function addNewUser(userName, userEmail, userPassword) {
    var user = {
        name: userName,
        email: userEmail,
        password: userPassword
    };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    clearForm();
}

// 3- Check if email exists before
function isEmailExist(email) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            return true;
        }
    }
    return false;
}

// 4- Show sign up msg
function ShowSignUpMsg(msg, type) {
    signUpMsg.classList.remove('text-danger', 'text-success');
    signUpMsg.classList.add('text-' + type);
    signUpMsg.innerHTML = msg;
}

// 5- Show Login page 
loginLink.addEventListener('click', function () {
    showLoginPage();
});

function showLoginPage() {
    loginPage.classList.remove('d-none');
    signUpPage.classList.add('d-none');
    homePage.classList.add('d-none');
}

// 6- clear login or sign in form
function clearForm() {
    userNameInput.value = null;
    userEmailInput.value = null;
    userPasswordInput.value = null;
}

// 7- Get input from login page
loginBtn.addEventListener('click', function () {
    readLoginInput();
})

function readLoginInput() {
    var userLogin = {
        email: userEmailLoginInput.value.trim(),
        password: userPasswordLoginInput.value.trim()
    }

    loginUser(userLogin.email, userLogin.password);
}

// 8- validate Login inputs
function loginUser(email, password) {
    if (email === "" || password === "") {
        ShowLoginErrorMsg("All inputs is required");
        return;
    }

    var userFound = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].email == email && users[i].password == password) {
            userFound = true;
            localStorage.setItem('currentUser', users[i].name);
            showHomePage();
            break;
        }
    }

    if (!userFound) {
        ShowLoginErrorMsg("incorrect email or password");
    }

}

// 9- show login error msg
function ShowLoginErrorMsg(msg) {
    loginErrorMsg.innerHTML = msg;
}

// 10- Show sign up page (If user has no account)
signUpLink.addEventListener('click', function () {
    showSignUpPage();
})

function showSignUpPage() {
    loginPage.classList.add('d-none');
    signUpPage.classList.remove('d-none');
}

// 11- show home page
function showHomePage() {
    loginPage.classList.add('d-none');
    loginPage.classList.remove('d-flex');

    homePage.classList.remove('d-none');

    var currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        document.querySelector('#welcomeUser').innerHTML = `<h1>Welcome ${currentUser}</h1>`;
    }
}

// 12- Check if user is already logged in
window.addEventListener('load', function () {
    var currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        showHomePage();
    } else {
        showLoginPage();
    }
});

// 13-log out from the page
logoutBtn.addEventListener('click', function () {
    localStorage.removeItem('currentUser');
    showLoginPage();
});
