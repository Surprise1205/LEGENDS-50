
let signup = document.getElementById("signupForm");
let signin = document.getElementById("signinForm");

if (signup) {

    signup.onsubmit = function(event) {

        event.preventDefault();

        let user = document.getElementById("username").value;
        let pass = document.getElementById("password").value;
        let logo = document.querySelector('input[name="logo"]:checked').value;

        localStorage.setItem("username", user);
        localStorage.setItem("password", pass);
        localStorage.setItem("logo", logo);

        window.location.href = "signin.html";
    };
}

if (signin) {

    signin.onsubmit = function(event) {

        event.preventDefault();

        let user = document.getElementById("loginUsername").value;
        let pass = document.getElementById("loginPassword").value;

        if (user == localStorage.getItem("username") &&
            pass == localStorage.getItem("password")) {

            window.location.href = "home.html";

        } else {

            document.getElementById("loginMessage").innerHTML =
            "❌ Wrong username or password!";
        }
    };
}




