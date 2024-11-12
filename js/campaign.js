import { open as openMainMenu } from "./main-menu.js";
import { open as openGameBoard } from "./game-board/index.js";

const campaign = document.querySelector(".campaign");
const backBtn = document.querySelector(".campaign__back-btn");

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

function handleBack() {
  close();
  openMainMenu();
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
    levelBtn.classList.add("campaign__level-btn");
    levelBtn.textContent = level.level;
    levelBtn.addEventListener("click", () => handleStartLevel(level));
    levelBtn.disabled = !isLevelUnlocked(level.level);
    levelGrid.appendChild(levelBtn);
  });
}

function isLevelUnlocked(level) {
  const lastUnlockedLevel = +localStorage.getItem("lastUnlockedLevel") || 1;

  return level <= lastUnlockedLevel;
}

function handleStartLevel(level) {
  close();
  openGameBoard(level);
}
