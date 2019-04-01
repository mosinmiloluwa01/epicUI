const logout = () => {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  localStorage.removeItem("messageId"); console.log(localStorage)
  window.location.href = '../html/login.html';
    
}