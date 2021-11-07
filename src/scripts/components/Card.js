export default class Card {
  constructor({
    data,
    templateSelector,
    handleClick,
    handleDelete,
    likeCard,
    unlikeCard,
    userId,
  }) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._owner = data.owner;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleClick = handleClick;
    this._handleDelete = handleDelete;
    this._handleLikeCard = likeCard;
    this._handleUnlikeCard = unlikeCard;
  }

  _getPlaceElement() {
    const placeElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".place")
      .cloneNode(true);
    return placeElement;
  }

  _getPlaceDetails() {
    this._place = this._getPlaceElement();
    this._placeTitle = this._place.querySelector(".place__title");
    this._placeImage = this._place.querySelector(".place__image");
    this._placeLikeButton = this._place.querySelector(".place__love-button");
    this._placeLikeCount = this._place.querySelector(".place__love-count");
    this._placeDeleteButton = this._place.querySelector(
      ".place__delete-button"
    );

    if (this._owner._id !== this._userId) {
      this._placeDeleteButton.classList.add("hidden");
    }

    if (this._likes.some((item) => item._id === this._userId)) {
      this._placeLikeButton.classList.add("place__love-button_active");
    }
    this._placeLikeCount.textContent = this._likes.length;
    this._placeTitle.textContent = this._name;
    this._placeImage.src = this._link;
    this._placeImage.alt = `${this._name} picture`;
  }

  _likeCard() {
    if (this._placeLikeButton.classList.contains("place__love-button_active")) {
      this._handleUnlikeCard(this._cardId)
        .then((result) => {
          this._placeLikeCount.textContent = result.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
      this._placeLikeButton.classList.remove("place__love-button_active");
    } else {
      this._handleLikeCard(this._cardId)
        .then((result) => {
          this._placeLikeCount.textContent = result.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
      this._placeLikeButton.classList.add("place__love-button_active");
    }
  }

  _removeCard = () => {
    const placeToBeDeleted = this._placeDeleteButton.closest(".place");
    placeToBeDeleted.remove();
  };

  _setEventListeners() {
    this._placeLikeButton.addEventListener("click", () => {
      this._likeCard();
    });

    //shows the confirm popup when its delete icon is clicked
    this._placeDeleteButton.addEventListener("click", () => {
      this._handleDelete(this._cardId, this._removeCard);
    });

    //fills the popup with the image clicked
    //and its location, then it reveals the popup
    this._placeImage.addEventListener("click", () => {
      this._handleClick();
    });
  }

  generateCard() {
    this._getPlaceDetails();
    this._setEventListeners();
    return this._place;
  }
}
