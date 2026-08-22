function closeIntro() {
  const popup = document.getElementById("introPopup");

  popup.style.opacity = "0";

  setTimeout(() => {
    popup.style.display = "none";
  }, 300);
}