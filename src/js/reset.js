const value = document.cookie.split(';')
const newValue = value[0].split('=');
const token = newValue[1];

const {resetPassword} = document.forms;
const {password, confirmpassword, resetPwd} = resetPassword.elements;


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
    if(errors.password){
     inputError[0].innerText = errors.password[0];
       inputError[0].style.display="block"
     }
     if(errors.confirmpassword){
        inputError[1].innerText = errors.confirmpassword[0];
          inputError[1].style.display="block"
        }
} 

const clearError = (event) => {
    event.target.parentElement.nextElementSibling.style.display = "none";
  }


  const resetUserPassword = (event) => {console.log(event.target.baseURI);

    const value = event.target.baseURI.split('?');
    const token = value[1];
    event.preventDefault();

    const formInfo = {
        password: password.value,
        confirmpassword: confirmpassword.value,
    }

    fetch(`https://mosinmiloluwa-app.herokuapp.com/api/v2/auth/users/${token}/resetPassword`, {
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
    window.location.href = '../html/login.html';
    setTimeout(closeSuccessMessage,4000);
    }
  })
}

password.addEventListener('focus', clearError);
confirmpassword.addEventListener('focus', clearError);
resetPwd.addEventListener('click', resetUserPassword);

