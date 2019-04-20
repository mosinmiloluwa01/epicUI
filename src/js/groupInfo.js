let groupName = document.getElementById("groupname");
let groupCompose = document.getElementById("grpcompose");

const saveEmail = () => {
    
      window.location.href = '../html/groupcomposemail.html';
 }
groupCompose.addEventListener('click', saveEmail);

window.onload = () => {
    const value = document.cookie.split(';')
    const newValue = value[0].split('=');
    const token = newValue[1];
    const grpId = localStorage.getItem('grpId');
    fetch(`https://mosinmiloluwa-app.herokuapp.com/api/v2/groups/${grpId}`,{
      method: 'GET',
      headers: new Headers({
        'content-type': 'application/json',
        'Authorization': token,
      })
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
        msg = data.data;
        groupName.innerText = msg[0].group_name;
        localStorage.setItem('groupEmail', msg[0].group_email)
      }).catch(err => err.message);
    }