export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  //display user's data in the form
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }
  //add new data to the page
  setUserInfo({ profileName, profileJob }) {
    console.log(profileName, profileJob);
    this._nameElement.textContent = profileName;
    this._jobElement.textContent = profileJob;
  }
}
