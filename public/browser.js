function itemTemplate(item) {
  return `  <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
    <span class="item-text">${item.text}</span>
    <div>
      <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
      <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
    </div>
  </li>`;
}

//initial page load render Client sinde Rendering
let ourHTML = items
  .map(function(item) {
    return itemTemplate(item);
  })
  .join("");
document.getElementById("item-list").insertAdjacentHTML("beforeend", ourHTML);

//create feature
let createField = document.getElementById("create-field");

document.getElementById("create-form").addEventListener("submit", function(e) {
  e.preventDefault();
  axios
    .post("/create-item", { text: createField.value })
    .then(function(response) {
      //Crete the html for the new item
      document
        .getElementById("item-list")
        .insertAdjacentHTML("beforeend", itemTemplate(response.data));
      createField.value = "";
      createField.focus();
    })
    .catch(function() {
      console.log("try again");
    });
});
// ao clicar
document.addEventListener("click", function(e) {
  //Delete feature
  if (e.target.classList.contains("delete-me")) {
    if (confirm("Do you really want to delete this item?")) {
      //update on the fly using axios
      axios
        .post("/delete-item", { id: e.target.getAttribute("data-id") })
        .then(function() {
          //update that string of text in real time
          e.target.parentElement.parentElement.remove();
        })
        .catch(function() {
          console.log("try again");
        });
    }
  }

  //update feature
  if (e.target.classList.contains("edit-me")) {
    let userInput = prompt(
      "Enter your desired new text",
      e.target.parentElement.parentElement.querySelector(".item-text").innerHTML
    );
    if (userInput) {
      //on the fly update using axios
      axios
        .post("/update-item", {
          text: userInput,
          id: e.target.getAttribute("data-id")
        })
        .then(function() {
          //update that string of text in real time
          e.target.parentElement.parentElement.querySelector(
            ".item-text"
          ).innerHTML = userInput;
        })
        .catch(function() {
          console.log("try again");
        });
    }
  }
});
