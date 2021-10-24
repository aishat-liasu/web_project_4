import Popup from "./Popup.js";

import { popupImage, popupImageLocation } from "../utils/utils.js";

export default class PopupWithImage extends Popup {
  constructor({ name, link }, popupSelector) {
    super(popupSelector);
    this._name = name;
    this._link = link;
  }

  open() {
    super.open();
    popupImage.src = this._link;
    popupImage.alt = `${this._name} picture`;
    popupImageLocation.textContent = this._name;
  }
}
