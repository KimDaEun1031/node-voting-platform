const flashBox = document.querySelector(".flash-message");
const message = document.querySelector(".flash-message .message");

setTimeout(() => {
  message.classList.add("remove");
  flashBox.style.display = "none";
}, 2000);
