import { open as openMainMenu } from "./main-menu.js";
import { changeLanguage } from "./i18n.js";

const options = document.querySelector(".options");
const languageFieldset = document.querySelector(".options__language");
const backBtn = document.querySelector(".options__back-btn");

export function open() {
  options.classList.remove("hidden");

  languageFieldset.addEventListener("change", handleLanguage);
  backBtn.addEventListener("click", handleBack);
}

export function close() {
  options.classList.add("hidden");

  languageFieldset.removeEventListener("change", handleLanguage);
  backBtn.removeEventListener("click", handleBack);
}

function handleLanguage(event) {
  if (!event.target.matches('input[type="radio"]')) return;

  changeLanguage(event.target.value);
}

function handleBack() {
  close();
  openMainMenu();
}
