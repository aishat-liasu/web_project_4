let popup = document.querySelector(".popup");
let popupCloseButton = document.querySelector(".popup__close-button");
let popupSaveButton = document.querySelector(".popup__save-button");

let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");

let popupFieldTitle = document.querySelector(".popup__field_el_title");
let popupFieldSubtitle = document.querySelector(".popup__field_el_subtitle")

popupFieldSubtitle.textContent = profileSubtitle.textContent;
popupFieldTitle.textContent = profileTitle.textContent;

let profileEditButton = document.querySelector(".profile__edit-button");

function showPopup() {
  popup.classList.add("popup_opened")
  console.log(popup.classList)
}

function closePopup(e) {
  e.preventDefault();
  console.log("Here")
  popup.classList.remove("popup_opened")
  console.log(popup.classList)
}

profileEditButton.addEventListener("click", showPopup)
popupCloseButton.addEventListener("click", closePopup)
