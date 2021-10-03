const placesContainer = document.querySelector(".places");
const placeTemplate = document.querySelector("#place-template").content;

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImageLocation = document.querySelector(".popup__image-location");

class Card {
  constructor(data, cardTemplate) {
    this._name = data.name;
    this._link = data.link;
    //this._cardTemplate = cardTemplate;
    this._place = cardTemplate.querySelector(".place").cloneNode(true);
  }

  _getPlaceDetails() {
    this._placeTitle = this._place.querySelector(".place__title");
    this._placeImage = this._place.querySelector(".place__image");
    this._placeLikeButton = this._place.querySelector(".place__love-button");
    this._placeDeleteButton = this._place.querySelector(
      ".place__delete-button"
    );

    this._placeTitle.textContent = this._name;
    this._placeImage.src = this._link;
    this._placeImage.alt = this._name + " picture";
  }

  _triggerLike() {
    this._placeLikeButton.classList.toggle("place__love-button_active");
  }

  _deleteCard() {
    this._placeToBeDeleted = this._placeDeleteButton.closest(".place");
    this._placeToBeDeleted.remove();
    this._placeToBeDeleted = null;
  }

  _openImagePopup() {
    popupImage.src = this._link;
    popupImage.alt = this._name + " picture";
    popupImageLocation.textContent = this._name;
    openPopup(popupTypeImage);
  }

  _setEventListeners() {
    this._placeLikeButton.addEventListener("click", () => {
      this._triggerLike();
    });
    //deletes the card when its delete icon is clicked
    this._placeDeleteButton.addEventListener("click", () => {
      this._deleteCard();
    });

    //fills the popup with the image clicked
    //and its location, then it reveals the popup
    this._placeImage.addEventListener("click", () => {
      this._openImagePopup();
    });
  }

  generateCard() {
    this._getPlaceDetails();
    this._setEventListeners();
    return this._place;
  }
}

const cards = initialCards.map((item) => {
  const card = new Card(item, placeTemplate);

  return card.generateCard();
});

console.log(cards);

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

const popupList = Array.from(document.querySelectorAll(".popup"));

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

//closes popup when the Esc key is clicked
const handleEscapeKey = (evt) => {
  const openedPopup = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(openedPopup);
  }
};

//adds event to the document
function addEventToDocument() {
  document.addEventListener("keydown", handleEscapeKey);
}

//removes event to the document
function removeEventFromDocument() {
  document.removeEventListener("keydown", handleEscapeKey);
}

//opens popup
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  addEventToDocument();
}

//closes popup
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  removeEventFromDocument();
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
}

//changes the profile title and subtitle,
//then closes the popup
function updateProfile(e) {
  e.preventDefault();
  profileTitle.textContent = popupFieldTitle.value;
  profileSubtitle.textContent = popupFieldSubtitle.value;
  closePopup(popupTypeEdit);
  resetForm(popupTypeEdit);
}

//adds a new card to the main page
//then closes the popup
function addCard(e) {
  e.preventDefault();
  const newCard = new Card(
    {
      name: popupFieldPlaceTitle.value,
      link: popupFieldPlaceImageURL.value,
    },
    placeTemplate
  );

  placesContainer.prepend(newCard.generateCard());
  closePopup(popupTypeAdd);
  resetForm(popupTypeAdd);
}

//closes popup when the popup overlay is clicked
const handleClickOutsideForm = (evt, popupElement) => {
  if (evt.target.classList.contains(evt.target.id)) {
    closePopup(popupElement);
  }
};

//assigns events to all the popups
const setEventForPopups = () => {
  popupList.forEach((popupElement) => {
    popupElement.addEventListener("click", (evt) =>
      handleClickOutsideForm(evt, popupElement)
    );
  });
};

setEventForPopups();

profileEditButton.addEventListener("click", openProfilePopup);

popupTypeEditCloseButton.addEventListener("click", function () {
  closePopup(popupTypeEdit);
  resetForm(popupTypeEdit);
});

popupTypeEditSaveButton.addEventListener("click", updateProfile);

profileAddButton.addEventListener("click", function () {
  resetForm(popupTypeAdd);
  openPopup(popupTypeAdd);
});

popupTypeAddCloseButton.addEventListener("click", function () {
  closePopup(popupTypeAdd);
  resetForm(popupTypeAdd);
});

popupTypeAddSaveButton.addEventListener("click", addCard);

popupTypeImageCloseButton.addEventListener("click", function () {
  closePopup(popupTypeImage);
});
