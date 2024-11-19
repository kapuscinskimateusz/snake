import { currentLanguage, translate } from "../i18n.js";
import { close as closeCampaign } from "../campaign.js";
import { open as openGameBoard } from "../game-board/index.js";

const levelDialog = document.querySelector(".campaign-view__level-dialog");

const dialogTitle = levelDialog.querySelector(".dialog__title");
const closeBtn = levelDialog.querySelector(".dialog__close-btn");
const dialogBody = levelDialog.querySelector(".dialog__body");
const startLevelBtn = levelDialog.querySelector(".campaign-view__start-btn");
const cancelBtn = levelDialog.querySelector(".dialog__cancel-btn");

let currentLevelObj = null;

export function open(levelObj) {
  currentLevelObj = levelObj;
  updateTexts(levelObj);

  levelDialog.showModal();

  closeBtn.addEventListener("click", close);
  startLevelBtn.addEventListener("click", handleStartLevel);
  cancelBtn.addEventListener("click", close);
}

export function close() {
  levelDialog.close();

  closeBtn.removeEventListener("click", close);
  startLevelBtn.removeEventListener("click", handleStartLevel);
  cancelBtn.removeEventListener("click", close);
}

function updateTexts(levelObj) {
  dialogTitle.textContent = translate("level") + ` ${levelObj.level}`;
  dialogBody.textContent =
    translate("goal") + `: ${levelObj.description[currentLanguage]}`;
}

function handleStartLevel() {
  close();
  closeCampaign();

  openGameBoard(currentLevelObj);
}
