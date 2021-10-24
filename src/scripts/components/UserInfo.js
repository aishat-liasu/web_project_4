import { popupFieldTitle, popupFieldSubtitle } from "../utils/utils";

export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }
  getUserInfo() {
    popupFieldTitle.value = this._nameElement.textContent;
    popupFieldSubtitle.value = this._jobElement.textContent;
    /*     return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    }; */
  }
  setUserInfo() {
    this._nameElement.textContent = popupFieldTitle.value;
    this._jobElement.textContent = popupFieldSubtitle.value;
  }
}
