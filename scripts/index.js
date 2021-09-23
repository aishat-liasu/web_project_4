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

function triggerLike(likeButton) {
  likeButton.classList.toggle("place__love-button_active");
}

function createCard(placeObj) {
  const { name, link } = placeObj;

  const place = placeTemplate.querySelector(".place").cloneNode(true);
  const placeTitle = place.querySelector(".place__title");
  const placeImage = place.querySelector(".place__image");
  const placeLikeButton = place.querySelector(".place__love-button");
  const placeDeleteButton = place.querySelector(".place__delete-button");

  //fills the card with input gotten from either the initialCards array
  //or new data inputted by a user
  placeTitle.textContent = name;
  placeImage.src = link;
  placeImage.alt = name + " picture";

  //if the love button hasn't been clicked, clicking it fills the inside with black
  //if it has, changes it back to an empty love shape
  placeLikeButton.addEventListener("click", function () {
    triggerLike(placeLikeButton);
  });

  //deletes the card when its delete icon is clicked
  placeDeleteButton.addEventListener("click", function () {
    let placeToBeDeleted = placeDeleteButton.closest(".place");
    placeToBeDeleted.remove();
    placeToBeDeleted = null;
  });

  //fills the popup with the image clicked
  //and its location, then it reveals the popup
  placeImage.addEventListener("click", function () {
    popupImage.src = link;
    popupImage.alt = name + " picture";
    popupImageLocation.textContent = name;
    openPopup(popupTypeImage);
  });

  return place;
}

const cards = initialCards.map(createCard);

//displays the initial cards on the page
placesContainer.prepend(...cards);

const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeEditCloseButton = document.querySelector(
  ".popup_type_edit .popup__close-button"
);
const popupTypeEditSaveButton = document.querySelector(
  ".popup_type_edit .popup__submit-button"
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
  ".popup_type_add .popup__submit-button"
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

//opens popup
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

//closes popup
function closePopup(popupElement) {
  //console.log(popupElement.querySelector(".popup__form"));
  if (popupElement.querySelector(".popup__form")) {
    popupElement.querySelector(".popup__form").reset();
  }
  resetForm(popupElement);
  popupElement.classList.remove("popup_opened");
}

//fills the values of the input fields to the value gotten from the page.
function fillProfileFormFields() {
  popupFieldTitle.value = profileTitle.textContent;
  popupFieldSubtitle.value = profileSubtitle.textContent;
}

//shows the edit profile popup,
//then fills the fields
function openProfilePopup() {
  openPopup(popupTypeEdit);
  fillProfileFormFields();

  enableValidation({
    formSelector: ".popup__form",
    fieldSelector: ".popup__field",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_disabled",
    fieldErrorClass: "popup__field_type_error",
    errorClass: "popup__field-error_active",
  });
}

//changes the profile title and subtitle,
//then closes the popup
function updateProfile(e) {
  e.preventDefault();
  profileTitle.textContent = popupFieldTitle.value;
  profileSubtitle.textContent = popupFieldSubtitle.value;
  closePopup(popupTypeEdit);
}

//adds a new card to the main page
//then closes the popup
function addCard(e) {
  e.preventDefault();
  const newCard = createCard({
    name: popupFieldPlaceTitle.value,
    link: popupFieldPlaceImageURL.value,
  });

  placesContainer.prepend(newCard);
  closePopup(popupTypeAdd);
}

const handleClickOutsideForm = (evt, popupElement) => {
  if (evt.target.classList.contains(evt.target.id)) {
    closePopup(popupElement);
  }
};

//closes popup when the popup overlay is clicked
const setEventForPopups = () => {
  const popupList = Array.from(document.querySelectorAll(".popup"));
  popupList.forEach((popupElement) => {
    popupElement.addEventListener("click", (evt) =>
      handleClickOutsideForm(evt, popupElement)
    );
  });
};

setEventForPopups();

//closes popup on escape key
document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    closePopup(popupTypeEdit);
    closePopup(popupTypeAdd);
    closePopup(popupTypeImage);
  }
});

profileEditButton.addEventListener("click", openProfilePopup);

popupTypeEditCloseButton.addEventListener("click", function () {
  closePopup(popupTypeEdit);
});

popupTypeEditSaveButton.addEventListener("click", updateProfile);

profileAddButton.addEventListener("click", function () {
  openPopup(popupTypeAdd);
  enableValidation({
    formSelector: ".popup__form",
    fieldSelector: ".popup__field",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_disabled",
    fieldErrorClass: "popup__field_type_error",
    errorClass: "popup__field-error_active",
  });
});

popupTypeAddCloseButton.addEventListener("click", function () {
  closePopup(popupTypeAdd);
});

popupTypeAddSaveButton.addEventListener("click", addCard);

popupTypeImageCloseButton.addEventListener("click", function () {
  closePopup(popupTypeImage);
});
