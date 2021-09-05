let profileEditButton = document.querySelector(".profile__edit-button");
let popupTypeEdit = document.querySelector(".popup_type_edit");
let popupTypeEditCloseButton = document.querySelector(
  ".popup_type_edit .popup__close-button"
);
let popupTypeEditSaveButton = document.querySelector(
  ".popup_type_edit .popup__save-button"
);

let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");

let popupFieldTitle = document.querySelector(".popup__field_el_title");
let popupFieldSubtitle = document.querySelector(".popup__field_el_subtitle");

let profileAddButton = document.querySelector(".profile__add-button");
let popupTypeAdd = document.querySelector(".popup_type_add");
let popupTypeAddCloseButton = document.querySelector(
  ".popup_type_add .popup__close-button"
);
let popupTypeAddSaveButton = document.querySelector(
  ".popup_type_add .popup__save-button"
);

let popupFieldPlaceTitle = document.querySelector(
  ".popup__field_el_place-title"
);
let popupFieldPlaceImageURL = document.querySelector(
  ".popup__field_el_place-image-url"
);

//if popup is hidden, displays it.
///if popup on display, hids it
function triggerModal(popupElement) {
  popupElement.classList.toggle("popup_opened");
}

//changes the values of the input fields to value gotten from the page.
function fillFields() {
  popupFieldTitle.value = profileTitle.textContent;
  popupFieldSubtitle.value = profileSubtitle.textContent;
}

//shows the edit profile popup, then fills the fields
function showAndFill(popupElement) {
  triggerModal(popupElement);
  fillFields();
}

//changes the profile title and subtitle, then closes the popup
function saveInputs(e, popupElement) {
  e.preventDefault();
  profileTitle.textContent = popupFieldTitle.value;
  profileSubtitle.textContent = popupFieldSubtitle.value;
  triggerModal(popupElement);
}

profileEditButton.addEventListener("click", function () {
  showAndFill(popupTypeEdit);
});

profileAddButton.addEventListener("click", function () {
  triggerModal(popupTypeAdd);
});

popupTypeEditCloseButton.addEventListener("click", function () {
  triggerModal(popupTypeEdit);
});
popupTypeAddCloseButton.addEventListener("click", function () {
  triggerModal(popupTypeAdd);
});
popupTypeEditSaveButton.addEventListener("click", function (e) {
  saveInputs(e, popupTypeEdit);
});
