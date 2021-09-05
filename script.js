const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

const placesContainer = document.querySelector(".places");
const placeTemplate = document.querySelector("#place-template").content;

const cards = initialCards.map((card) => {
  return prepCard(card);
});

function prepCard(placeObj) {
  const place = placeTemplate.querySelector(".place").cloneNode(true);
  let placeTitle = place.querySelector(".place__title");
  let placeImage = place.querySelector(".place__image");
  let placeLikeButton = place.querySelector(".place__love-button");

  placeTitle.textContent = placeObj.name;
  placeImage.src = placeObj.link;
  placeImage.alt = placeObj.name + " picture";

  placeLikeButton.addEventListener("click", function () {
    placeLikeButton.classList.toggle("place__love-button_active");
  });
  return place;
}

placesContainer.prepend(...cards);

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

function addToPlaces(e, popupElement) {
  e.preventDefault();
  let newCard = prepCard({
    name: popupFieldPlaceTitle.value,
    link: popupFieldPlaceImageURL.value,
  });
  placesContainer.prepend(newCard);
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

popupTypeAddSaveButton.addEventListener("click", function (e) {
  addToPlaces(e, popupTypeAdd);
});
