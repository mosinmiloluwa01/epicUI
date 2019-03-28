let login = document.getElementById("login");
let error = document.getElementById("error");
const {loginForm} = document.forms;
const {email, password} = loginForm.elements;

console.log(loginForm);
const loginUser = (event) => {
    event.preventDefault();
    const loginCredentials = {
        email: email.value,
        password: password.value,
    }
    const closeErrorMessage = () => {
        error.style.display = "none"; console.log('fff');
    }
    fetch('http://localhost:5000/api/v2/auth/login', {
        method:'POST',
        headers: new Headers({
            'content-type': 'application/json',
          }),
        body: JSON.stringify(loginCredentials)  
    })
    .then((response) =>{
        return response.json();
    })
    .then((data) => {
        const result = data;
        console.log(result);
        if (result.status == 400 || result.status == 404){
            error.style.display = "block";
            setTimeout(closeErrorMessage,3000);
            error.innerText = result.message;
        }
        
        document.cookie=`token=${result.data.token}`; 
        const value = document.cookie.split(';')
        const newValue = value[0].split('=');
        const token = newValue[0]; console.log(newValue);
        if(token){
        window.location.href = '../html/inbox.html';
        }
    }).catch(err => err.message);
}

loginForm.addEventListener('submit', loginUser);
