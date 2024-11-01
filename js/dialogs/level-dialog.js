import { translate } from "../i18n.js";

const levelDialog = document.getElementById("level-dialog");

const title = levelDialog.querySelector(".level-dialog__title");

// BUTTONS
const closeBtn = levelDialog.querySelector(".level-dialog__close-btn");

export function open(level) {
  updateTitle(level);
  levelDialog.showModal();

  closeBtn.addEventListener("click", close);
}

export function close() {
  levelDialog.close();

  closeBtn.removeEventListener("click", close);
}

function updateTitle(level) {
  title.textContent = translate("level") + ` ${level}`;
}
