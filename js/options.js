import { currentLanguage, changeLanguage } from "./i18n.js";
import { open as openMainMenu } from "./main-menu.js";

const optionsView = document.querySelector(".options-view");

const optionsForm = optionsView.querySelector(".options-view__form");
const backBtn = optionsView.querySelector(".options-view__back-btn");

export function open() {
  initLanguage();
  optionsView.classList.remove("hidden");

  optionsForm.addEventListener("change", handleLanguage);
  backBtn.addEventListener("click", handleBack);
}

export function close() {
  optionsView.classList.add("hidden");

  optionsForm.removeEventListener("change", handleLanguage);
  backBtn.removeEventListener("click", handleBack);
}

function initLanguage() {
  const matchingLanguageRadio = optionsForm.querySelector(
    `input[type="radio"][value="${currentLanguage}"]`
  );

  matchingLanguageRadio.checked = true;
}

function handleLanguage(event) {
  if (!event.target.matches('input[type="radio"]')) return;

  changeLanguage(event.target.value);
}

function handleBack() {
  close();
  openMainMenu();
}
