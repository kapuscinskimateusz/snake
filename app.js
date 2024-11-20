import { changeLanguage } from "./js/i18n.js";
import { open as openMainMenu } from "./js/main-menu.js";

function initializeApp() {
  let language = navigator.language || navigator.userLanguage;
  if (!["pl", "en"].includes(language)) language = "en";

  changeLanguage(language.split("-")[0]);
  openMainMenu();
}

initializeApp();
