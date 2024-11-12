let translations = {};
let currentLanguage = null;

export async function changeLanguage(language) {
  await loadTranslations(language);

  currentLanguage = language;
  updateTexts();
}

async function loadTranslations(language) {
  try {
    const response = await fetch(`/locales/${language}.json`);
    if (!response.ok) throw new Error("Nie udało się załadować tłumaczeń");

    translations = await response.json();
  } catch (err) {
    console.error(err);
  }
}

function updateTexts() {
  const elements = document.querySelectorAll("[data-translate-key");

  elements.forEach((el) => {
    const key = el.getAttribute("data-translate-key");
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });
}
