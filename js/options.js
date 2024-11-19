import { open as openMainMenu } from "./main-menu.js";
import { changeLanguage } from "./i18n.js";

const optionsView = document.getElementById("options-view");

const optionsForm = document.getElementById("options-form");
const backBtn = optionsView.querySelector(".back-btn");

export function open() {
  optionsView.classList.remove("hidden");

  optionsForm.addEventListener("change", handleLanguage);
  backBtn.addEventListener("click", handleBack);
}

export function close() {
  optionsView.classList.add("hidden");

  optionsForm.removeEventListener("change", handleLanguage);
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
