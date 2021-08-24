let popup = document.querySelector(".popup");
let popupCloseButton = document.querySelector(".popup__close-button");
let popupSaveButton = document.querySelector(".popup__save-button");

let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");

let popupFieldTitle = document.querySelector(".popup__field_el_title");
let popupFieldSubtitle = document.querySelector(".popup__field_el_subtitle");

let profileEditButton = document.querySelector(".profile__edit-button");

//shows the popup, then chnages the values of the input fields
//to value gotten from the page.
function showPopup() {
  popup.classList.add("popup_opened");
  popupFieldTitle.value = profileTitle.textContent;
  popupFieldSubtitle.value = profileSubtitle.textContent;
}

//prevents form default action, then closes the popup
function closePopup(e) {
  e.preventDefault();
  popup.classList.remove("popup_opened");
}

//changes the profile title and subtitle, then closes the popup
function saveInputs(e) {
  e.preventDefault();
  profileTitle.textContent = popupFieldTitle.value;
  profileSubtitle.textContent = popupFieldSubtitle.value;
  popup.classList.remove("popup_opened");
}

profileEditButton.addEventListener("click", showPopup);
popupCloseButton.addEventListener("click", closePopup);
popupSaveButton.addEventListener("click", saveInputs);
