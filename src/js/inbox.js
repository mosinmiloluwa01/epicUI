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
// document.getElementById('inbox').addEventListener('click',getInboxMessages);
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

  // append child element to parent element
  row.appendChild(column1);
  sender.appendChild(messageLink);
  column1.appendChild(sender);
  column1.appendChild(messageBody);

  content.appendChild(row);
  console.log(row);
}


window.onload = () => {
  fetch('http://localhost:5000/api/v2/messages',{
    method: 'GET',
    headers: new Headers({
      'content-type': 'application/json',
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0ZXZlbjFAZXBpYy5jb20iLCJpZCI6MiwiaWF0IjoxNTUzNjgyNzM1LCJleHAiOjE1NTM3NjkxMzV9.-EKQsF51v5F8qWQ6W6QLbMYjtA0mTfca_4qO7hwvfR8'
    })
})
  .then(function(response) {
    return response.json();
  }).then(function(data) {
    console.log(data.data);
    let output = `<div class="row">
    <div class="column 1">`
    msg = data.data
    msg.forEach((element) =>  {
    createElements(element);

    // output += `
    // <p><a href="openedmail.html">email: ${element.email}</a></p>
    // <p class="font-style"><a href="openedmail.html">email: ${element.message}</p></a>`
    });
    output += ` </div>
    </div> `
    console.log(output);
  }).catch(err => err.message);
}