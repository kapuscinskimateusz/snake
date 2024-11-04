import { translate } from "../i18n.js";
import { close as closeCampaign } from "../campaign.js";
import { startGame } from "../game.js";

const levelDialog = document.getElementById("level-dialog");
const startBtn = levelDialog.querySelector(".level-dialog__start-btn");
const closeBtn = levelDialog.querySelector(".level-dialog__close-btn");

let currentLevelObj = null;

export function open(levelObj) {
  updateLevelInformation(levelObj);
  levelDialog.showModal();

  currentLevelObj = levelObj;

  startBtn.addEventListener("click", handleStart);
  closeBtn.addEventListener("click", close);
}

export function close() {
  levelDialog.close();

  currentLevelObj = null;

  startBtn.removeEventListener("click", handleStart);
  closeBtn.removeEventListener("click", close);
}

function updateLevelInformation(levelObj) {
  const titleEl = levelDialog.querySelector(".level-dialog__title");
  const descriptionEl = levelDialog.querySelector(".level-dialog__description");

  titleEl.textContent = translate("level") + ` ${levelObj.level}`;
  descriptionEl.textContent = "TODO";
}

function handleStart() {
  const levelObj = currentLevelObj;
  close();
  closeCampaign();

  startGame(levelObj);
}
