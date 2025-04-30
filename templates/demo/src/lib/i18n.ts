/**
 * Funciones para manejar el idioma de la aplicación
 * @module i18n
 */

/**
 * Tipo que representa los idiomas soportados por la aplicación
 * @typedef {("es"|"en")} Language
 */
export type Language = "es" | "en";

/**
 * Obtener el idioma preferido del usuario
 * @returns {Language} El idioma preferido del usuario
 */
export function getLanguagePreference(): Language {
  if (typeof localStorage !== "undefined" && localStorage.getItem("language")) {
    return localStorage.getItem("language") as Language;
  }
  
  // Detectar el idioma del navegador
  const browserLang = navigator.language.split("-")[0];
  return browserLang === "es" ? "es" : "en";
}

/**
 * Aplicar idioma a documento HTML
 * @param {Language} lang - El idioma a aplicar
 */
export function applyLanguage(lang: Language): void {
  document.documentElement.setAttribute("lang", lang);
  localStorage.setItem("language", lang);
  
  // Disparar evento personalizado para que los componentes puedan reaccionar
  document.dispatchEvent(new CustomEvent("languagechange", { detail: { language: lang } }));
}

/**
 * Configurar idioma inicial de la aplicación
 * Detecta el idioma preferido y lo aplica al documento
 */
export function setupLanguage(): void {
  const language = getLanguagePreference();
  applyLanguage(language);
} 