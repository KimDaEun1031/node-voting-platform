const options = document.querySelector(".options");
const deleteBtn = document.querySelectorAll(".delete-btn");
const optionBtn = document.querySelector(".option-btn");

const createOption = () => {
  const option = document.createElement("li");
  const voter = document.createElement("input");
  const voteContent = document.createElement("input");
  const delBtn = document.createElement("button");

  voter.setAttribute("type", "radio");
  voter.setAttribute("name", "voter");
  voter.setAttribute("value", "");
  voteContent.setAttribute("type", "text");
  voteContent.setAttribute("name", "vote_content");
  voteContent.setAttribute("value", "option");
  delBtn.setAttribute("type", "button");

  option.classList.add("option");
  voter.classList.add("voter");
  voteContent.classList.add("vote-content");
  delBtn.classList.add("delete-btn");

  delBtn.textContent = "✘";

  option.appendChild(voter);
  option.appendChild(voteContent);
  option.appendChild(delBtn);

  options.appendChild(option);
  deleteBtn.forEach(item => item.addEventListener("click", removeOption));
  delBtn.addEventListener("click", removeOption);
}

const removeOption = (event) => {
  const target = event.target;
  const parentTarget = target.parentNode;

  if (options.children.length >= 3) {
    options.removeChild(parentTarget);
  }
}

optionBtn.addEventListener("click", createOption);

const date = document.querySelector(".vote-expiration-date");
const currentDate = new Date().toISOString().substring(0, 16);

date.setAttribute("min", currentDate);
