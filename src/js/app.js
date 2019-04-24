const logout = () => {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  localStorage.clear();
  window.location.href = '/';
    
}

function openNav() {
  document.getElementById("responsive-sidebar").style.display = "block";
  document.getElementById("modal").style.display = "block"

}

function closeNav() {
  document.getElementById("responsive-sidebar").style.display = "none";
  document.getElementById("modal").style.display = "none"
}