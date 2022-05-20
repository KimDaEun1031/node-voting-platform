const optionList = document.querySelector(".optionList");
const deleteAllBtn = document.querySelectorAll(".deleteBtn");
const optionAddBtn = document.querySelector(".optionAddBtn");

const createOption = () => {
  const option = document.createElement("li");
  const optionContent = document.createElement("div");
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
  radioBtn.classList.add("newRadioBtn");
  voteContent.classList.add("votePostContent");
  deleteBtn.classList.add("deleteBtn");
  optionContent.classList.add("optionContent");

  deleteBtn.textContent = "✘";

  optionContent.appendChild(radioBtn);
  optionContent.appendChild(voteContent);
  option.appendChild(optionContent);
  option.appendChild(deleteBtn);

  if (optionList.children.length <= 10) {
    optionList.appendChild(option);
  }

  deleteAllBtn.forEach(item => item.addEventListener("click", removeOption));
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
