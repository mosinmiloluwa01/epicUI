const value = document.cookie.split(';')
const newValue = value[0].split('=');
const token = newValue[1];

let main = document.getElementById("main");
let content = document.getElementById("content");
let success = document.getElementById("success");
let groupCompose = document.getElementById("grpcompose");
console.log(groupCompose);
const createElements = (elements) => {console.log('groupCompose');
  const row = document.createElement("div");
  const column1 = document.createElement("div");
  const useremail = document.createElement("p");
  const DeleteLink = document.createElement("i");

  // destructure to get data from db
  const { id, group_email, email, user_ids } = elements;
  useremail.innerText = email;
  
const saveEmail = () => {console.log('just work');
      localStorage.setItem('groupEmail', group_email);
      window.location.href = '../html/groupcomposemail.html';
 }
groupCompose.addEventListener('click', saveEmail);


  // add class name
  row.className = ('row');
  column1.className = ('column11');
  useremail.classList.add('message-column', 'font-style');
  DeleteLink.classList.add('delete-column', 'fas', 'fa-trash-alt');

  //to give the id a value so u can use it to get event.target.id
  column1.setAttribute('id',`${user_ids}`);
  DeleteLink.setAttribute('id',`${user_ids}`); 
  // useremail.setAttribute('id', `${user_ids}`);
  
  DeleteLink.addEventListener('click', deleteUser);

  // localStorage.setItem('userId', useremail.id)
  // append child element to parent element
  column1.appendChild(useremail);
  column1.appendChild(DeleteLink);
  row.appendChild(column1);
  content.appendChild(row);
}

const openGroup = (event) => {
    const grpId = event.target.id; 
  localStorage.setItem('groupId', `${grpId}`);
  window.location.href = '../html/groupDetails.html';
}

const closeSuccessMessage = () => {
  success.style.display = "none";
}

const deleteUser = () => {
  event.stopPropagation();
  // pick the target id from clickin the delete icon
  const userId = event.target.id;
  const grpId = localStorage.getItem('groupId');
  fetch(`https://mosinmiloluwa-app.herokuapp.com/api/v2/groups/${grpId}/user/${userId}`,{
    method: 'DELETE',
    headers: new Headers({
      'content-type': 'application/json',
      'Authorization': token,
    })
  })
  .then((response) => {
    return response.json(); 
  })
  .then((data) => {
    success.style.display = "block";
    success.innerText = 'User Deleted';
    setTimeout(closeSuccessMessage,4000);
    window.location.href = '../html/groupDetails.html'
  });
}

window.onload = () => {
  const grpId = localStorage.getItem('groupId');
  fetch(`https://mosinmiloluwa-app.herokuapp.com/api/v2/groups/${grpId}/users`,{
    method: 'GET',
    headers: new Headers({
      'content-type': 'application/json',
      'Authorization': token,
    })
})
  .then((response) => {
    return response.json();
  }).then((data) => {
    msg = data.data;
    msg.forEach((element) =>  {
    createElements(element);
    });
    
  }).catch(err => err.message);
}

