import { changeLanguage } from "./js/i18n.js";
import { startGame } from "./js/game.js";

const mainMenu = document.getElementById("main-menu");

const campaignBtn = document.getElementById("campaign-btn");
const optionsBtn = mainMenu.querySelector(".options-btn");
const aboutBtn = document.getElementById("about-btn");
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
  optionsBtn.removeEventListener("click", handleOptions);
  aboutBtn.removeEventListener("click", handleAbout);
  exitBtn.removeEventListener("click", handleExit);
}

function handleCampaign() {
  close();
  startGame();
}

function handleOptions() {
  alert("Options");
}

function handleAbout() {
  alert("About");
}

function handleExit() {
  window.close();
}

function addEventListeners() {
  campaignBtn.addEventListener("click", handleCampaign);
  optionsBtn.addEventListener("click", handleOptions);
  aboutBtn.addEventListener("click", handleAbout);
  exitBtn.addEventListener("click", handleExit);
}
