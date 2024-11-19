import { currentLanguage, translate } from "../i18n.js";
import { close as closeCampaign } from "../campaign.js";
import { open as openGameBoard } from "../game-board/index.js";

const levelDialog = document.querySelector(".campaign-view__level-dialog");

const dialogTitle = levelDialog.querySelector(".dialog__title");
const dialogBody = levelDialog.querySelector(".dialog__body");
const closeBtn = levelDialog.querySelector(".dialog__close-btn");
const cancelBtn = levelDialog.querySelector(".dialog__cancel-btn");
const startBtn = levelDialog.querySelector(".campaign-view__start-btn");

let currentLevelObj = null;

export function open(levelObj) {
  currentLevelObj = levelObj;
  updateTexts(levelObj);

  levelDialog.showModal();

  closeBtn.addEventListener("click", close);
  cancelBtn.addEventListener("click", close);
  startBtn.addEventListener("click", handleStart);
}

export function close() {
  currentLevelObj = null;

  levelDialog.close();

  closeBtn.removeEventListener("click", close);
  cancelBtn.removeEventListener("click", close);
  startBtn.removeEventListener("click", handleStart);
}

function updateTexts(levelObj) {
  dialogTitle.textContent = translate("level") + ` ${levelObj.level}`;
  dialogBody.textContent =
    translate("goal") + `: ${levelObj.description[currentLanguage]}`;
}

function handleStart() {
  const levelObj = currentLevelObj;

  close();
  closeCampaign();

  openGameBoard(levelObj);
}
