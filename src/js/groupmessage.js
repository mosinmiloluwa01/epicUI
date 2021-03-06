let main = document.getElementById("main");
let content = document.getElementById("content");
let success = document.getElementById("success");
// for the responsive side bar
function openNav() {
    document.getElementById("responsive-sidebar").style.width = "250px";
    main.style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("responsive-sidebar").style.width = "0";
    main.style.marginLeft= "0";
  }

  //for fetch api
// elements refer to data gotten from db (ie when u call the function , the data u pass in)
const createElements = (elements) => {
  const row = document.createElement("div");
  const column1 = document.createElement("div");
  const sender = document.createElement("p");
  const messageBody = document.createElement("p");
  const messageLink = document.createElement("a");
  const DeleteLink = document.createElement("i");

  // destructure to get data from db
  const {id, message} = elements;

  // concatenate first name and last name to display sender name
  sender.innerText = `${elements.first_name} ${elements.last_name}`;
  // set message content to the element for display 
  messageBody.innerText = message + '...';
  if(message.length > 30){
   const msg = message.slice(0,30) + '...'
   messageBody.innerHTML = msg;
  }

  column1.addEventListener('click', openMail);
  
  // add class name
  row.className = ('row');
  column1.className = ('column1');
  sender.className = ('sender-column');
  messageBody.classList.add('message-column', 'font-style');
  DeleteLink.classList.add('delete-column', 'fas', 'fa-trash-alt');

  //to give the id a value so u can use it to get event.target.id
  column1.setAttribute('id',`${id}`);
  DeleteLink.setAttribute('id',`${id}`); 
  // append child element to parent element
  row.appendChild(column1);
  sender.appendChild(messageLink);
  column1.appendChild(sender);
  column1.appendChild(messageBody);
  column1.appendChild(DeleteLink);
  content.appendChild(row);
}
// function to open a mail and get the id of the row clicked

const closeSuccessMessage = () => {
  success.style.display = "none";
}

window.onload = () => {
  const value = document.cookie.split(';')
  const newValue = value[0].split('=');
  const token = newValue[1];
  const grpId = localStorage.getItem('groupId')
  fetch(`https://mosinmiloluwa-app.herokuapp.com/api/v2/groups/${grpId}/messages`,{
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

const openMail = (event) => {
    const groupMsgId = event.target.id; 
    localStorage.setItem('messageId', `${groupMsgId}`);
    window.location.href = '../html/openedmail.html';
  }

