let main = document.getElementById("main");
let content = document.getElementById("content");
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

  // destructure to get data from db
  const {id, email, message} = elements;

  // concatenate first name and last name to display sender name
  sender.innerText = `${elements.first_name} ${elements.last_name}`;
  // set message content to the element for display 
  messageBody.innerText = message;
  
  // add class name
  row.className = ('row');
  column1.className = ('column1');
  sender.className = ('sender-column');
  messageBody.classList.add('message-column', 'font-style');

  //to call openmail function when clicked
  column1.addEventListener('click', openMail);
  //to give the id a value so u can use it to get event.target.id
  column1.setAttribute('id',`${id}`);

  // append child element to parent element
  row.appendChild(column1);
  sender.appendChild(messageLink);
  column1.appendChild(sender);
  column1.appendChild(messageBody);
  content.appendChild(row);
}

// function to open a mail and get the id of the row clicked
const openMail = (event) => {console.log(event.target.id);
  const msgId = event.target.id; 
  localStorage.setItem('messageId', `${msgId}`);
  window.location.href = '../html/openedmail.html';
}

window.onload = () => {
  const value = document.cookie.split(';')
  const newValue = value[0].split('=');
  const token = newValue[1]; console.log(token);
  fetch('http://localhost:5000/api/v2/messages',{
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