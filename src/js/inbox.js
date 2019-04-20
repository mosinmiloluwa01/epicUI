const value = document.cookie.split(';')
const newValue = value[0].split('=');
const token = newValue[1];

let main = document.getElementById("main");
let content = document.getElementById("content");
let success = document.getElementById("success");
// for the responsive side bar

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
  const {id, email, message} = elements;

  // concatenate first name and last name to display sender name
  sender.innerText = `${elements.first_name} ${elements.last_name}`;
  // set message content to the element for display 
  messageBody.innerText = message + '...';
  if(message.length > 30){
   const msg = message.slice(0,30) + '...'
   messageBody.innerHTML = msg;
  }
  
  // add class name
  row.className = ('row');
  column1.className = ('column1');
  sender.className = ('sender-column');
  messageBody.classList.add('message-column', 'font-style');
  DeleteLink.classList.add('delete-column', 'fas', 'fa-trash-alt');


  //to call openmail function when clicked
  column1.addEventListener('click', openMail);

  DeleteLink.addEventListener('click', deleteMail);
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
const openMail = (event) => {
  const msgId = event.target.id; 
  localStorage.setItem('messageId', `${msgId}`);
  window.location.href = '../html/openedmail.html';
}
const closeSuccessMessage = () => {
  success.style.display = "none";
}
const deleteMail = (event) => {
  event.stopPropagation();

  
  // pick the target id from clickin the delete icon
  const msgId = event.target.id;
  fetch(`https://mosinmiloluwa-app.herokuapp.com/api/v2/messages/${msgId}`,{
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
    success.innerText = 'Message Deleted';
    setTimeout(closeSuccessMessage,4000);
    window.location.href = '../html/inbox.html'
  });
}
window.onload = () => {
  fetch('https://mosinmiloluwa-app.herokuapp.com/api/v2/messages',{
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
