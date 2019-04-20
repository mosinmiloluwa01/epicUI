const value = document.cookie.split(';')
const newValue = value[0].split('=');
const token = newValue[1];

let main = document.getElementById("main");
let content = document.getElementById("content");
let success = document.getElementById("success");
let groupMessages = document.getElementById("groupmessages");

const viewGroupMessages = () => {
  window.location.href = '../html/groupmessages.html';
}
groupMessages.addEventListener('click', viewGroupMessages);

const createElements = (elements) => {
  const row = document.createElement("div");
  const column1 = document.createElement("div");
  const groupname = document.createElement("p");
  const groupemail = document.createElement("p");
  const messageLink = document.createElement("a");
  const DeleteLink = document.createElement("i");

  // destructure to get data from db
  const {id, group_name, group_email} = elements;

  groupname.innerText = group_name;
  // set message content to the element for display 
  groupemail.innerText = group_email;

  column1.addEventListener('click', openGroup);
  DeleteLink.addEventListener('click', deleteGroup);
  // add class name
  row.className = ('row');
  column1.className = ('column1');
  groupname.className = ('sender-column');
  groupemail.classList.add('message-column', 'font-style');
  DeleteLink.classList.add('delete-column', 'fas', 'fa-trash-alt');

  //to give the id a value so u can use it to get event.target.id
  column1.setAttribute('id',`${id}`);
  DeleteLink.setAttribute('id',`${id}`); 
  // append child element to parent element
  row.appendChild(column1);
  groupname.appendChild(messageLink);
  column1.appendChild(groupname);
  column1.appendChild(groupemail);
  column1.appendChild(DeleteLink);
  content.appendChild(row);
}

const closeSuccessMessage = () => {
  success.style.display = "none";
}

const openGroup = (event) => {
    const grpId = event.target.id; 
  localStorage.setItem('groupId', `${grpId}`);
  window.location.href = '../html/groupDetails.html';
}

const deleteGroup = (event) => {
  event.stopPropagation();
  // pick the target id from clickin the delete icon
  const grpId = event.target.id;
  fetch(`https://mosinmiloluwa-app.herokuapp.com/api/v2/groups/${grpId}`,{
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
    if (data) {
    success.style.display = "block";
    success.innerText = 'Group Deleted';
    setTimeout(closeSuccessMessage,4000);
    }
    window.location.href = '../html/group.html'
    
  });
}

window.onload = () => {
  fetch('https://mosinmiloluwa-app.herokuapp.com/api/v2/groups',{
    method: 'GET',
    headers: new Headers({
      'content-type': 'application/json',
      'Authorization': token,
    })
})
  .then((response) => {
    return response.json();
  }).then((data) => {
    msg = data.data
    msg.forEach((element) =>  {
    createElements(element);
    });
  }).catch(err => err.message);
}