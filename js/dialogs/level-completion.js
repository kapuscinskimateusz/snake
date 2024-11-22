import {
  open as openGameBoard,
  close as closeGameBoard,
} from "../game-board/index.js";
import { loadLevels, open as openCampaign } from "../campaign.js";

const levelCompletionDialog = document.querySelector(".level-completion");

const completedLevelSpan = levelCompletionDialog.querySelector(
  ".level-completion__completed-level"
);
const nextLevelBtn = levelCompletionDialog.querySelector(
  ".level-completion__next-level-btn"
);
const backToCampaignBtn = levelCompletionDialog.querySelector(
  ".level-completion__back-to-campaign-btn"
);

let completedLevel = null;

export function open(level) {
  completedLevel = level;
  completedLevelSpan.textContent = level.toString();

  levelCompletionDialog.showModal();

  nextLevelBtn.addEventListener("click", handleNextLevel);
  backToCampaignBtn.addEventListener("click", handleBackToCampaign);
}

export function close() {
  levelCompletionDialog.close();

  completedLevel = null;

  nextLevelBtn.removeEventListener("click", handleNextLevel);
  backToCampaignBtn.removeEventListener("click", handleBackToCampaign);
}

async function handleNextLevel() {
  const levels = await loadLevels();
  const nextLevelObj = levels.find(
    (levelObj) => levelObj.level === completedLevel + 1
  );

  close();

  closeGameBoard();
  openGameBoard(nextLevelObj);
}

function handleBackToCampaign() {
  close();
  closeGameBoard();

  openCampaign();
}
