const value = document.cookie.split(';')
const newValue = value[0].split('=');
const token = newValue[1];

const {resetPassword} = document.forms;
const {email, recoverPassword} = resetPassword.elements;

let error = document.getElementById("error");
let inputError = document.getElementsByClassName("error");
let success = document.getElementById("success");

const closeErrorMessage = () => {
    error.style.display = "none";
}
const closeSuccessMessage = () => {
  success.style.display = "none";
}

const showErrors = (errors) => {
    if(errors.email){
     inputError[0].innerText = errors.email[0];
       inputError[0].style.display="block"
     }
} 

const clearError = (event) => {
    event.target.parentElement.nextElementSibling.style.display = "none";
  }

const sendEmail = (event) => {console.log(event.target.baseURI);
    event.preventDefault();

    const formInfo = {
        email: email.value,
    }

    fetch('https://mosinmiloluwa-app.herokuapp.com/api/v2/auth/users/recoverPassword', {
    method:'POST',
    headers: new Headers({
        'content-type': 'application/json',
        'Authorization': token,
      }),
    body: JSON.stringify(formInfo)
  })
  .then((response) => {
    return response.json(); 
  })
  .then((data) => {
    const result = data;console.log(result.message);
    if (result.status == 400){
      showErrors(result.data.errors);
    }
    if (result.status == 403 || result.status == 404){
      error.style.display = "block";
      error.innerText = result.message;
      setTimeout(closeErrorMessage,4000);
    }
    if (result.status == 200){
    success.style.display = "block";
    success.innerText = result.message;
    setTimeout(closeSuccessMessage,4000);
    }
  })
}

email.addEventListener('focus', clearError);
recoverPassword.addEventListener('click', sendEmail);