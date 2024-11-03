import { translate } from "../i18n.js";
import { startGame } from "../game.js";
import { close as closeCampaign } from "../campaign.js";

const levelDialog = document.getElementById("level-dialog");
const dialogTitle = levelDialog.querySelector(".level-dialog__title");
const dialogDescription = levelDialog.querySelector(
  ".level-dialog__description"
);
const startBtn = levelDialog.querySelector(".level-dialog__start-btn");
const closeBtn = levelDialog.querySelector(".level-dialog__close-btn");

export function open(levelObj) {
  updateLevelInformation(levelObj);

  levelDialog.showModal();

  startBtn.addEventListener("click", handleStart);
  closeBtn.addEventListener("click", close);
}

export function close() {
  levelDialog.close();

  startBtn.removeEventListener("click", handleStart);
  closeBtn.removeEventListener("click", close);
}

function updateLevelInformation(levelObj) {
  dialogTitle.textContent = translate("level") + ` ${levelObj.level}`;
  // TODO - translate
  dialogDescription.textContent = `Cel: Zdobądź ${levelObj.targetScore} punktów.`;
}

function handleStart() {
  close();
  closeCampaign();

  startGame();
}
