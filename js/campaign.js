import { translate } from "./i18n.js";
import { open as openLevelDialog } from "./dialogs/level-dialog.js";
import { open as openMainMenu } from "../main-menu.js";

const campaign = document.getElementById("campaign");
const backBtn = campaign.querySelector(".campaign__back-btn");

export async function open() {
  campaign.classList.remove("hidden");

  const levels = await loadLevels();
  displayLevels(levels);

  backBtn.addEventListener("click", handleBack);
}

export function close() {
  campaign.classList.add("hidden");

  backBtn.removeEventListener("click", handleBack);
}

async function loadLevels() {
  try {
    const response = await fetch("levels.json");
    if (!response.ok) {
      throw new Error("Nie udało się załadować poziomów");
    }

    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

function displayLevels(levels) {
  const levelGrid = campaign.querySelector(".campaign__level-grid");
  levelGrid.innerHTML = "";

  levels.forEach((level) => {
    const levelBtn = document.createElement("button");
    levelBtn.classList.add("campaign__level");
    levelBtn.textContent =
      translate("level") +
      ` ${level.level}` +
      ` ${isLevelUnlocked(level.level) ? "🔓" : "🔒"}`;
    levelBtn.addEventListener("click", () => openLevelDialog(level));
    levelBtn.disabled = !isLevelUnlocked(level.level);

    levelGrid.appendChild(levelBtn);
  });
}

function isLevelUnlocked(level) {
  const lastUnlockedLevel = +localStorage.getItem("lastUnlockedLevel") || 1;

  return level <= lastUnlockedLevel;
}

function handleBack() {
  close();
  openMainMenu();
}
