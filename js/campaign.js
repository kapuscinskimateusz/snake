import { open as openMainMenu } from "../main-menu.js";
import { open as openLevelDialog } from "./dialogs/level-dialog.js";

const campaign = document.getElementById("campaign");
const levelBtns = campaign.querySelector(".campaign__levels");

// BUTTONS
const backBtn = campaign.querySelector(".campaign__back-btn");

export function open() {
  campaign.classList.remove("hidden");

  backBtn.addEventListener("click", handleBack);
  levelBtns.addEventListener("click", handleLevel);
}

export function close() {
  campaign.classList.add("hidden");

  backBtn.removeEventListener("click", handleBack);
}

function handleBack() {
  close();
  openMainMenu();
}

function handleLevel(event) {
  const level = event.target
    .closest(".campaign__level")
    .getAttribute("data-level");

  openLevelDialog(level);
}
