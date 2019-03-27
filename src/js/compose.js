function openNav() {
  document.getElementById("responsive-sidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("responsive-sidebar").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}
// Get the modal
let feedbakModal = document.getElementById('feedbackModal');

// Get the button that opens the modal
let openFeedback = document.getElementById("open-feedback");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
let span1 = document.getElementsByClassName("close1")[0];

let retract = document.getElementById("retract");
let to = document.getElementById("to");
let cc = document.getElementById("cc");

let save = document.getElementById("saveModal");
let saveFeedback = document.getElementById("save-feedback");

// When the user clicks on the button, open the modal 
openFeedback.onclick = function() {
  if (to.value !=""){
  feedbakModal.style.display = "block";
  }
}

// When the user clicks on <span> (x), close the modal
let timeOut = 4000;

span.onclick = function() {
  feedbakModal.style.display = "none";
}
span1.onclick = function() {
  save.style.display = "none";
}

retract.onclick= function(){
	feedbakModal.style.display = "none";
}

saveFeedback.onclick = function(){
	save.style.display = "block"
}
