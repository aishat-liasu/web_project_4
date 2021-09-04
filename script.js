let popup = document.querySelector(".popup_type_add");
let popupCloseButton = document.querySelector(".popup__close-button");
let popupSaveButton = document.querySelector(".popup__save-button");

let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");

let popupFieldTitle = document.querySelector(".popup__field_el_title");
let popupFieldSubtitle = document.querySelector(".popup__field_el_subtitle");

let popupFieldPlaceTitle = document.querySelector(
  ".popup__field_el_place-title"
);
let popupFieldPlaceImageURL = document.querySelector(
  ".popup__field_el_place-image-url"
);

let profileEditButton = document.querySelector(".profile__edit-button");
let profileAddButton = document.querySelector(".profile__add-button");

//if popup is hidden, displays it.
///if popup on display, hids it
function triggerModal() {
  popup.classList.toggle("popup_opened");
}

//changes the values of the input fields to value gotten from the page.
function fillFields() {
  popupFieldTitle.value = profileTitle.textContent;
  popupFieldSubtitle.value = profileSubtitle.textContent;
}

//shows the popup, then fills the fields
function showAndFill() {
  triggerModal();
  fillFields();
}

//changes the profile title and subtitle, then closes the popup
function saveInputs(e) {
  e.preventDefault();
  profileTitle.textContent = popupFieldTitle.value;
  profileSubtitle.textContent = popupFieldSubtitle.value;
  triggerModal();
}

profileEditButton.addEventListener("click", showAndFill);
profileAddButton.addEventListener("click", triggerModal);
popupCloseButton.addEventListener("click", triggerModal);
popupSaveButton.addEventListener("click", saveInputs);
