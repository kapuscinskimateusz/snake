import { open as openCampaign } from "./campaign.js";
import { open as openOptions } from "./options.js";

const mainMenu = document.querySelector(".main-menu");
const campaignBtn = document.querySelector(".main-menu__campaign-btn");
const optionsBtn = document.querySelector(".main-menu__options-btn");
const exitBtn = document.querySelector(".main-menu__exit-btn");

export function open() {
  mainMenu.classList.remove("hidden");

  campaignBtn.addEventListener("click", handleCampaign);
  optionsBtn.addEventListener("click", handleOptions);
  exitBtn.addEventListener("click", handleExit);
}

export function close() {
  mainMenu.classList.add("hidden");

  campaignBtn.removeEventListener("click", handleCampaign);
  optionsBtn.removeEventListener("click", handleOptions);
  exitBtn.removeEventListener("click", handleExit);
}

function handleCampaign() {
  close();
  openCampaign();
}

function handleOptions() {
  close();
  openOptions();
}

function handleExit() {
  window.close();
}
