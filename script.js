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

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImageLocation = document.querySelector(".popup__image-location");

function prepCard(placeObj) {
  const place = placeTemplate.querySelector(".place").cloneNode(true);
  const placeTitle = place.querySelector(".place__title");
  const placeImage = place.querySelector(".place__image");
  const placeLikeButton = place.querySelector(".place__love-button");
  const placeDeleteButton = place.querySelector(".place__delete-button");

  placeTitle.textContent = placeObj.name;
  placeImage.src = placeObj.link;
  placeImage.alt = placeObj.name + " picture";

  placeLikeButton.addEventListener("click", function () {
    placeLikeButton.classList.toggle("place__love-button_active");
  });

  placeDeleteButton.addEventListener("click", function () {
    const placeToBeDeleted = placeDeleteButton.closest(".place");
    placeToBeDeleted.remove();
  });

  placeImage.addEventListener("click", function () {
    popupImage.src = placeObj.link;
    popupImageLocation.textContent = placeObj.name;
    triggerModal(popupTypeImage);
  });

  return place;
}

const cards = initialCards.map((card) => {
  return prepCard(card);
});

placesContainer.prepend(...cards);

const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeEditCloseButton = document.querySelector(
  ".popup_type_edit .popup__close-button"
);
const popupTypeEditSaveButton = document.querySelector(
  ".popup_type_edit .popup__save-button"
);

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const popupFieldTitle = document.querySelector(".popup__field_el_title");
const popupFieldSubtitle = document.querySelector(".popup__field_el_subtitle");

const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeAdd = document.querySelector(".popup_type_add");
const popupTypeAddCloseButton = document.querySelector(
  ".popup_type_add .popup__close-button"
);
const popupTypeAddSaveButton = document.querySelector(
  ".popup_type_add .popup__save-button"
);

const popupFieldPlaceTitle = document.querySelector(
  ".popup__field_el_place-title"
);
const popupFieldPlaceImageURL = document.querySelector(
  ".popup__field_el_place-image-url"
);

const popupTypeImageCloseButton = document.querySelector(
  ".popup_type_image .popup__close-button"
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

//adds and new place to the main page
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

popupTypeEditCloseButton.addEventListener("click", function () {
  triggerModal(popupTypeEdit);
});

popupTypeEditSaveButton.addEventListener("click", function (e) {
  saveInputs(e, popupTypeEdit);
});

profileAddButton.addEventListener("click", function () {
  triggerModal(popupTypeAdd);
});

popupTypeAddCloseButton.addEventListener("click", function () {
  triggerModal(popupTypeAdd);
});

popupTypeAddSaveButton.addEventListener("click", function (e) {
  addToPlaces(e, popupTypeAdd);
});

popupTypeImageCloseButton.addEventListener("click", function () {
  console.log("here");
  triggerModal(popupTypeImage);
});
