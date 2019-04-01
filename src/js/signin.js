//credit: w3schools
// Get the modal
const {signup} = document.forms;
const {firstName, lastName, email, password} = signup.elements;
let error = document.getElementById("error");
let inputError = document.getElementsByClassName("error");

const signupUser = (event) => {
  event.preventDefault();
  const signupInfo = {
    firstName: firstName.value,
    lastName: lastName.value, 
    email: email.value,
    password: password.value,
  }
  const closeErrorMessage = () => {
    error.style.display = "none";
}
// this picks the errors from result.data.errors
  const showErrors = (errors) => {
    if(errors.firstName){
     // to append the message coming from the api route (ie the error associated with firstname) in the p tag that has a class error (ie input error)
     // this error should show in the first element[0] (input tag) of the form array
    inputError[0].innerText = errors.firstName[0];
      inputError[0].style.display="block"
    }
    if(errors.lastName){
    inputError[1].innerText = errors.lastName[0];
      inputError[1].style.display="block"
    }
    if(errors.email){
    inputError[2].innerText = errors.email[0];
      inputError[2].style.display="block"
    }
    if(errors.password){
      inputError[3].innerText = errors.password[0];
        inputError[3].style.display="block"
      }
  }
  fetch('http://localhost:5000/api/v2/auth/signup', {
    method:'POST',
    headers: new Headers({
        'content-type': 'application/json',
      }),
    body: JSON.stringify(signupInfo)
  })
  .then((response) => {
    return response.json(); 
  })
  .then((data) => {
    const result = data;
    if (result.status == 400 || result.status == 404){
      showErrors(result.data.errors);
    }
    if (result.status == 409){
      error.style.display = "block";
      setTimeout(closeErrorMessage,4000);
      // to append the message coming from the api route in the p tag that has a class error on top of the form
      error.innerText = result.message;
    }
    document.cookie=`token=${result.data.token}`; 
        const value = document.cookie.split(';')
        const newValue = value[0].split('=');
        const token = newValue[0];
        if(token){
        window.location.href = '../html/inbox.html';
        }
  }).catch(err => err.message);
}
const clearError = (event) => {
  // to pick the parent element and the next sibling element i.e pick the p tag that is the next sibling to the div (containig the input) when its focused
  // ie pick <p class=error> that is next to inputtag.addEventListener('focus', clearError) eg firstName.addEventListener('focus', clearError);;
  event.target.parentElement.nextElementSibling.style.display = "none";
}
signup.addEventListener('submit', signupUser);
firstName.addEventListener('focus', clearError);
lastName.addEventListener('focus', clearError);
email.addEventListener('focus', clearError);
password.addEventListener('focus', clearError);

