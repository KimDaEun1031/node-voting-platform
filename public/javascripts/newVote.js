const optionList = document.querySelector(".optionList");
const deleteBtn = document.querySelectorAll(".deleteBtn");
const optionAddBtn = document.querySelector(".optionAddBtn");

const createOption = () => {
  const option = document.createElement("li");
  const radioBtn = document.createElement("input");
  const voteContent = document.createElement("input");
  const deleteBtn = document.createElement("button");

  radioBtn.setAttribute("type", "radio");
  voteContent.setAttribute("type", "text");
  voteContent.setAttribute("name", "voteContent");
  voteContent.setAttribute("value", "option");
  voteContent.setAttribute("required", "");
  deleteBtn.setAttribute("type", "button");

  option.classList.add("option");
  radioBtn.classList.add("radioBtn");
  voteContent.classList.add("votePostContent");
  deleteBtn.classList.add("deleteBtn");

  deleteBtn.textContent = "✘";

  option.appendChild(radioBtn);
  option.appendChild(voteContent);
  option.appendChild(deleteBtn);

  optionList.appendChild(option);

  deleteBtn.forEach(item => item.addEventListener("click", removeOption));
  deleteBtn.addEventListener("click", removeOption);
}

const removeOption = (event) => {
  const target = event.target;
  const parentTarget = target.parentNode;

  if (optionList.children.length >= 3) {
    optionList.removeChild(parentTarget);
  }
}

optionAddBtn.addEventListener("click", createOption);

const expirationDate = document.querySelector(".votePostExpirationDate");
const currentDate = new Date().toISOString().substring(0, 16);

expirationDate.setAttribute("min", currentDate);
