const logout = () => {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  // localStorage.removeItem("messageId");
  // localStorage.removeItem("existingDraftId");
  // localStorage.removeItem("existingDraftId");
  // localStorage.removeItem("newDraftId");
  localStorage.clear();
  window.location.href = '../html/login.html';
    
}