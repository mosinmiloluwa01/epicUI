let main = document.getElementById("main");
let contentInner = document.getElementById("contentInner");



const value = document.cookie.split(';')
const newValue = value[0].split('=');
const token = newValue[1];

const createElements = (elements) => {
    //create the elements
    const h2 = document.createElement("h2");
    const row = document.createElement("div");
    const dateContainer = document.createElement("div");
    const dateContent = document.createElement("p");
    const fromRow = document.createElement("div");
    const fromCol =  document.createElement("div");
    const fromContent =  document.createElement("p");
    const messageContainer =  document.createElement("div");
    const messageRow =  document.createElement("div");
    const messageCol =  document.createElement("div");
    const messageContent =  document.createElement("p");

    // give values to the elements
    const {created_on, email, subject, message} = elements;
    h2.innerText = subject; 
    dateContent.innerText = created_on;
    fromContent.innerText = `from: ${email}`;
    messageContent.innerText = message;

    //give class names
    contentInner.className = ('content-inner');
    row.className = ('row');
    dateContainer.className = ('full-col');
    dateContent.className = ('float-right');

    fromRow.className = ('row');
    fromCol.className = ('col-75');
    fromContent.classList.add('from-color', 'font-style');

    messageContainer.className = ('mailcontent-inner');
    messageRow.className = ('row');
    messageCol.className = ('col-75');

    //append child to parent
    contentInner.appendChild(h2);
    contentInner.appendChild(row);
    contentInner.appendChild(fromRow);
    contentInner.appendChild(messageContainer);

    row.appendChild(dateContainer);
    dateContainer.appendChild(dateContent);
    
    fromRow.appendChild(fromCol);
    fromCol.appendChild(fromContent);
    
    messageContainer.appendChild(messageRow);
    messageRow.appendChild(messageCol);
    messageCol.appendChild(messageContent);

}

window.onload = () => {
    const msg = localStorage.getItem("messageId");
    const msgId = parseInt(msg);
    fetch(`http://localhost:5000/api/v2/messages/${msgId}`,{
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
        createElements(data.data);
      }).catch(err => err.message);
}