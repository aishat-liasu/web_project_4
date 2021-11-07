export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  //display user's data in the form
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }
  //add new data to the page
  setUserInfo({ profileName, profileJob, profileAvatar }) {
    this._nameElement.textContent = profileName;
    this._jobElement.textContent = profileJob;
    this._avatarElement.style.backgroundImage = `url(${profileAvatar})`;
  }
}
