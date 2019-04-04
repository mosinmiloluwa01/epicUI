// get compose form from document.forms and extract the fields
const {compose} = document.forms;
const {to, subject, message} = compose.elements;
//to display errors
let error = document.getElementById("error");
let inputError = document.getElementsByClassName("error");
let success = document.getElementById("success");

const composeMail = (event) => {
  event.preventDefault();
  // get value from the compose form
  const composeMailInfo = {
    email: to.value,
    subject: subject.value, 
    message: message.value,
  }
  const closeErrorMessage = () => {
    error.style.display = "none";
}
const closeSuccessMessage = () => {
  success.style.display = "none";
}

// this picks the errors from result.data.errors
const showErrors = (errors) => {
  if(errors.email){
   inputError[0].innerText = errors.email[0];
     inputError[0].style.display="block"
   }
   if(errors.subject){
    inputError[1].innerText = errors.subject[0];
      inputError[1].style.display="block"
    }
    if(errors.message){
      inputError[2].innerText = errors.message[0];
        inputError[2].style.display="block"
      }
}
const value = document.cookie.split(';')
const newValue = value[0].split('=');
const token = newValue[1]; console.log(token);
fetch('http://localhost:5000/api/v2/messages', {
    method:'POST',
    headers: new Headers({
        'content-type': 'application/json',
        'Authorization': token,
      }),
    body: JSON.stringify(composeMailInfo)
  })
  .then((response) => {
    return response.json(); 
  })
  .then((data) => {
    const result = data;
    if (result.status == 400){
      showErrors(result.data.errors);
    }
    if (result.status == 403 || result.status == 404){
      error.style.display = "block";
      // to append the message coming from the api route in the p tag that has a class error on top of the form
      error.innerText = result.message;
      setTimeout(closeErrorMessage,4000);
    }
    if (result.status == 201){
    success.style.display = "block";
    // to append the message coming from the api route in the p tag that has a class error on top of the form
    success.innerText = 'Message Sent';
    to.value = '';
    subject.value = '';
    message.value = '';
    setTimeout(closeSuccessMessage,4000);
    }
  })
}
const clearError = (event) => {
  // to pick the parent element and the next sibling element i.e pick the p tag that is the next sibling to the div (containig the input) when its focused
  // ie pick <p class=error> that is next to inputtag.addEventListener('focus', clearError) eg firstName.addEventListener('focus', clearError);;
  event.target.parentElement.nextElementSibling.style.display = "none";
}
compose.addEventListener('submit', composeMail);
to.addEventListener('focus', clearError);
subject.addEventListener('focus', clearError);
message.addEventListener('focus', clearError);


function openNav() {
  document.getElementById("responsive-sidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("responsive-sidebar").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}
