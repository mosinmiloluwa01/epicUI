let main = document.getElementById("main");
let content = document.getElementById("content");
let success = document.getElementById("success");

const createElements = (elements) => {console.log(elements);
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
  
  // add class name
  row.className = ('row');
  column1.className = ('column1');
  groupname.className = ('sender-column');
  groupemail.classList.add('message-column', 'font-style');
  DeleteLink.classList.add('delete-column', 'fas', 'fa-trash-alt');


  //to call openmail function when clicked
//   column1.addEventListener('click', openDraftMail);

//   DeleteLink.addEventListener('click', deleteMail);
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
  console.log(content);
}

window.onload = () => {
  const value = document.cookie.split(';')
  const newValue = value[0].split('=');
  const token = newValue[1];
  fetch('http://localhost:5000/api/v2/groups',{
    method: 'GET',
    headers: new Headers({
      'content-type': 'application/json',
      'Authorization': token,
    })
})
  .then((response) => {
    return response.json();
  }).then((data) => {console.log(data);
    msg = data.data
    msg.forEach((element) =>  {
    createElements(element);
    });
  }).catch(err => err.message);
}