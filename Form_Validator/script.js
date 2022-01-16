const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");


// To show Error Message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector("small");
    small.innerText = message;
}

// To show Success Message
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

// To Capitalize the first word of the input
function capitalize(input) {
    return input.id[0].toUpperCase() + input.id.slice(1);
}

// To Validate the Email
function isValidateEmail(email) {
    return String(email)
        .trim()
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}


// Create a function by passing all the input as an array

function checkRequired(inputArr) {
    inputArr.forEach(input => {
        if (input.value === "") {
            showError(input, `${capitalize(input)} is required`);
        } else {
            if (input.id === "email") {
                console.log(input.value);
                if (!isValidateEmail(input.value)) {
                    console.log("Yes");
                    showError(input, `${capitalize(input)} is not valid`);
                    console.log("Yes");
                } else {
                    showSuccess(input)
                }
            } else {
                showSuccess(input)
            }
        }
    })
}


// function to check the input value checkLength

function checkLength(input, min, max) {
    if (input.value !== "") {
        if (input.value.length < min) {
            showError(input, `${capitalize(input)} must have atleast ${min} characters`)
        } else if (input.value.length > max) {
            showError(input, `${capitalize(input)} cannot have more than ${max} characters`)
        }
    }
}

function passwordCheck(pass1, pass2) {
    if (pass1.value.length >= 3 && pass2.value.length >= 3) {
        if (pass1.value === pass2.value) {
            showSuccess(pass1);
        } else {
            showError(pass2, "Password do not match")
        }
    }
}


// Add a submit event listener
form.addEventListener("submit", (e) => {
    e.preventDefault();

    checkRequired([username, email, password, password2]);

    // to check username and password length 
    checkLength(username, 3, 15);
    checkLength(password, 3, 20);
    checkLength(password2, 3, 20);

    // to check password match 
    passwordCheck(password, password2);
});

