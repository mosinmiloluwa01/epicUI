// get compose form from document.forms and extract the fields
const {compose} = document.forms;
//sent and draft are buttons
const {to, subject, message, sent, draft} = compose.elements;
//to display errors
let error = document.getElementById("error");
let inputError = document.getElementsByClassName("error");
let success = document.getElementById("success");

to.value = localStorage.getItem('groupEmail');
const composeMail = (event) => {
  event.preventDefault();
  // get value from the compose form
  const composeMailInfo = {
    email: to.value,
    subject: subject.value, 
    message: message.value,
    type: event.target.name,
  }
  const value = document.cookie.split(';')
  const newValue = value[0].split('=');
  const token = newValue[1];
  const grpId = localStorage.getItem('groupId');
fetch(`https://mosinmiloluwa-app.herokuapp.com/api/v2/groups/${grpId}/messages`, {
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
    if (result.status == 200){
    success.style.display = "block";
    // to append the message coming from the api route in the p tag that has a class error on top of the form
    if(event.target.name == 'draft'){
      success.innerText = 'Message Saved';
      localStorage.removeItem('groupEmal');
    }
    else{
    success.innerText = 'Message Sent';
    localStorage.removeItem('groupEmal');
    }
    to.value = '';
    subject.value = '';
    message.value = '';
    setTimeout(closeSuccessMessage,4000);
    }
  })
}
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
  const closeSuccessMessage = () => {
    success.style.display = "none";
  }
  sent.addEventListener('click', composeMail);