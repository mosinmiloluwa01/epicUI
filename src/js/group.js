const {group} = document.forms;
const {groupname, groupemail} = group.elements;

let main = document.getElementById("main");
let content = document.getElementById("content");
let error = document.getElementById("error");
let inputError = document.getElementsByClassName("error");
let success = document.getElementById("success");

const createGroup = (event) => {
  event.preventDefault();
  // get value from the compose form
  const groupInfo = {
    groupname: groupname.value,
    groupemail: groupemail.value, 
  }

const value = document.cookie.split(';')
const newValue = value[0].split('=');
const token = newValue[1];
fetch('https://mosinmiloluwa-app.herokuapp.com/api/v2/groups', {
    method:'POST',
    headers: new Headers({
        'content-type': 'application/json',
        'Authorization': token,
      }),
    body: JSON.stringify(groupInfo)
  })
  .then((response) => {
    return response.json(); 
  })
  .then((data) => {
    const result = data;
    if (result.status == 400){
      showErrors(result.data.errors);
    }
    if (result.status == 403 || result.status == 404 || result.status == 409){
      error.style.display = "block";
      // to append the message coming from the api route in the p tag that has a class error on top of the form
      error.innerText = result.message;
      setTimeout(closeErrorMessage,4000);
    }
    if (result.status == 201){
    success.style.display = "block";
    // to append the message coming from the api route in the p tag that has a class error on top of the form
    success.innerText = 'Group created';
    
    groupname.value = '';
    groupemail.value = '';
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
  if(errors.groupname){
   inputError[0].innerText = errors.groupname[0];
     inputError[0].style.display="block"
   }
   if(errors.groupemail){
    inputError[1].innerText = errors.groupemail[0];
      inputError[1].style.display="block"
    }
}

const clearError = (event) => {
  // to pick the parent element and the next sibling element i.e pick the p tag that is the next sibling to the div (containig the input) when its focused
  // ie pick <p class=error> that is next to inputtag.addEventListener('focus', clearError) eg firstName.addEventListener('focus', clearError);;
  event.target.parentElement.nextElementSibling.style.display = "none";
}
groupemail.addEventListener('focus', clearError);
groupname.addEventListener('focus', clearError);
group.addEventListener('submit', createGroup)



// // for the responsive side bar
// function openNav() {
//     document.getElementById("responsive-sidebar").style.width = "250px";
//     main.style.marginLeft = "250px";
//   }
  
//   function closeNav() {
//     document.getElementById("responsive-sidebar").style.width = "0";
//     main.style.marginLeft= "0";
//   }