let main = document.getElementById("main");
let content = document.getElementById("content");
let success = document.getElementById("success");
let groupMessages = document.getElementById("groupmessages");

const createElements = (elements) => {
  const row = document.createElement("div");
  const column1 = document.createElement("div");
  const groupemail = document.createElement("p");

  // destructure to get data from db
  const { id, group_email, email } = elements;

  groupemail.innerText = group_email;
 
  column1.setAttribute('id',`${id}`);
  groupemail.setAttribute('id',`email`);
  
  const groupInfo = () => {
      const grpId = event.target.id;
      localStorage.setItem('grpId', grpId);
      window.location.href = '../html/groupInfo.html';
  }
  column1.addEventListener('click', groupInfo);

  // add class name
  row.className = ('row');
  column1.className = ('column1');
  groupemail.className = ('sender-column');

  //to give the id a value so u can use it to get event.target.id
  column1.setAttribute('id',`${id}`); 
  // append child element to parent element
  column1.appendChild(groupemail);
  row.appendChild(column1);
  content.appendChild(row);
}

const openGroup = (event) => {
    const grpId = event.target.id; 
  localStorage.setItem('groupId', `${grpId}`);
//   window.location.href = '../html/groupDetails.html';
}

window.onload = () => {
  const value = document.cookie.split(';')
  const newValue = value[0].split('=');
  const token = newValue[1];
  fetch(`http://localhost:5000/api/v2/groups/users`,{
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
    localStorage.setItem('groupEmail', msg[0].group_email);
    msg.forEach((element) =>  {
    createElements(element);
    });
    
  }).catch(err => err.message);
}

