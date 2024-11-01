let translations = {};
let currentLanguage = "en";

const languageSelect = document.getElementById("language");

languageSelect.addEventListener("change", (event) => {
  changeLanguage(event.target.value);
});

export async function changeLanguage(language) {
  await loadTranslation(language);

  currentLanguage = language;
  updateTexts();
}

export function translate(key) {
  return translations[key] || key;
}

async function loadTranslation(language) {
  try {
    const response = await fetch(`../locales/${language}.json`);
    if (!response.ok) throw new Error("Nie udało się załadować tłumaczeń.");

    translations = await response.json();
  } catch (err) {
    console.error(err);
  }
}

function updateTexts() {
  const elements = document.querySelectorAll("[data-translate-key]");

  elements.forEach((el) => {
    const key = el.getAttribute("data-translate-key");
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });
}
