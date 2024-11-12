import { changeLanguage } from "./js/i18n.js";
import { open as openMainMenu } from "./js/main-menu.js";

function initializeApp() {
  const language = navigator.language || navigator.userLanguage || "en";

  changeLanguage(language.split("-")[0]);
  openMainMenu();
}

initializeApp();
