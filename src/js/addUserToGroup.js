const {createuser} = document.forms;
const {user, adduser} = createuser.elements;
let main = document.getElementById("main");
let content = document.getElementById("content");
let error = document.getElementById("error");
let inputError = document.getElementsByClassName("error");
let success = document.getElementById("success");

const addUserToGroup = (event) => {
    event.preventDefault();
    const userInfo = {
        userEmails: user.value,
      }
    
    const value = document.cookie.split(';')
    const newValue = value[0].split('=');
    const token = newValue[1];  
    const userId = localStorage.getItem('groupId')
    fetch(`https://mosinmiloluwa-app.herokuapp.com/api/v2/groups/${userId}/users`, {
    method:'POST',
    headers: new Headers({
        'content-type': 'application/json',
        'Authorization': token,
      }),
    body: JSON.stringify(userInfo)
  })
  .then((response) => {
    return response.json(); 
  })
  .then((data) => {
    const result = data;
    if (result.status == 400){
      showErrors(result.data.errors);
    }
    if (result.status == 404){
      error.style.display = "block";
      // to append the message coming from the api route in the p tag that has a class error on top of the form
      error.innerText = result.message;
      setTimeout(closeErrorMessage,4000);
    }
    if (result.status == 201){
    success.style.display = "block";
    // to append the message coming from the api route in the p tag that has a class error on top of the form
    success.innerText = 'User has been added';
    
    user.value = '';
    setTimeout(closeSuccessMessage,4000);
    }
  })

}

const closeErrorMessage = () => {
    error.style.display = "none";
}

const closeSuccessMessage = () => {
  success.style.display = "none";
}

// this picks the errors from result.data.errors
const showErrors = (errors) => {
  if(errors.userEmails){
   inputError[0].innerText = errors.userEmails[0];
     inputError[0].style.display="block"
   }
}

const clearError = (event) => {
    // to pick the parent element and the next sibling element i.e pick the p tag that is the next sibling to the div (containig the input) when its focused
    // ie pick <p class=error> that is next to inputtag.addEventListener('focus', clearError) eg firstName.addEventListener('focus', clearError);;
    event.target.parentElement.nextElementSibling.style.display = "none";
  }

adduser.addEventListener('click', addUserToGroup);
user.addEventListener('focus', clearError);