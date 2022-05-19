const flashBox = document.querySelector(".flashMessage");
const message = document.querySelector(".flashMessage .message");

setTimeout(() => {
  message.classList.add("remove");
  flashBox.style.display = "none";
}, 2000);
