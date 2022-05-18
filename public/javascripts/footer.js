const flash = document.querySelector(".flash-massage");
const span = document.querySelector(".flash-massage span");
const p = document.querySelector(".flash-massage p");

p.classList.add("show");

setTimeout(() => {
  p.classList.remove("show");
}, 2000);
