import { open as openMainMenu } from "./main-menu.js";
import { open as openLevelSelection } from "./dialogs/level-selection.js";

const campaignView = document.querySelector(".campaign-view");

const backBtn = campaignView.querySelector(".campaign-view__back-btn");

export async function open() {
  campaignView.classList.remove("hidden");

  const levels = await loadLevels();
  displayLevels(levels);

  backBtn.addEventListener("click", handleBack);
}

export function close() {
  campaignView.classList.add("hidden");

  backBtn.removeEventListener("click", handleBack);
}

function handleBack() {
  close();
  openMainMenu();
}

export async function loadLevels() {
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
  const levelGrid = campaignView.querySelector(".campaign-view__level-grid");
  levelGrid.innerHTML = "";

  levels.forEach((level) => {
    const levelBtn = document.createElement("button");
    levelBtn.classList.add("campaign-view__level-btn");
    levelBtn.textContent = level.level;
    levelBtn.addEventListener("click", () => handleLevel(level));
    levelBtn.disabled = !isLevelUnlocked(level.level);
    levelGrid.appendChild(levelBtn);
  });
}

function isLevelUnlocked(level) {
  const lastUnlockedLevel = +localStorage.getItem("lastUnlockedLevel") || 1;

  return level <= lastUnlockedLevel;
}

export function unlockLevel(level) {
  const lastUnlockedLevel = +localStorage.getItem("lastUnlockedLevel") || 1;

  if (level > lastUnlockedLevel) {
    localStorage.setItem("lastUnlockedLevel", `${level}`);
  }
}

function handleLevel(level) {
  openLevelSelection(level);
}
