import { open as openLevelDialog } from "./dialogs/level-dialog.js";
import { open as openMainMenu } from "../main-menu.js";

const campaign = document.getElementById("campaign");
const levelGrid = campaign.querySelector(".campaign__level-grid");
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

function clearLevelGrid() {
  levelGrid.textContent = "";
}

function displayLevels(levels) {
  clearLevelGrid();

  levels.forEach((level) => {
    const levelDiv = document.createElement("div");
    levelDiv.classList.add("campaign__level");
    levelDiv.textContent = `Poziom ${level.level}`;
    levelDiv.addEventListener("click", () => openLevelDialog(level));

    levelGrid.appendChild(levelDiv);
  });
}

function handleBack() {
  close();
  openMainMenu();
}
