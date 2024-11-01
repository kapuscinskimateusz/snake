import { changeLanguage } from "./js/i18n.js";
import { open as openCampaign } from "./js/campaign.js";

const mainMenu = document.getElementById("main-menu");

// BUTTONS
const campaignBtn = document.getElementById("campaign-btn");
const exitBtn = document.getElementById("exit-btn");

changeLanguage("pl");
addEventListeners();

export function open() {
  mainMenu.classList.remove("hidden");

  addEventListeners();
}

export function close() {
  mainMenu.classList.add("hidden");

  campaignBtn.removeEventListener("click", handleCampaign);
  exitBtn.removeEventListener("click", handleExit);
}

function addEventListeners() {
  campaignBtn.addEventListener("click", handleCampaign);
  exitBtn.addEventListener("click", handleExit);
}

function handleCampaign() {
  close();
  openCampaign();
}

function handleExit() {
  window.close();
}
