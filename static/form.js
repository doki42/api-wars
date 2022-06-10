
const registrationForm = document.getElementsByTagName("form")[0];
const username = document.getElementById("username_input");
const password = document.getElementById("password_input");


registrationForm.addEventListener('submit', function (event) {
    if (username.validity.valueMissing){
        username.setCustomValidity('Please, fill in both fields!');
        registrationForm.reportValidity();
        event.preventDefault();
    } else if (password.validity.valueMissing){
        password.setCustomValidity('Please, fill in both fields!');
        registrationForm.reportValidity();
        event.preventDefault();
    } else {
        username.setCustomValidity("");
        password.setCustomValidity("");
    }
});