/**
 * Funciones para manejar el tema (oscuro/claro) de la aplicación
 * @module theme
 */

/**
 * Obtener la preferencia de tema del usuario
 * @returns {("dark"|"light")} El tema preferido del usuario
 */
export function getThemePreference(): "dark" | "light" {
  if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
    return localStorage.getItem("theme") as "dark" | "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Aplicar tema a documento HTML
 * @param {("dark"|"light"|"system")} theme - El tema a aplicar
 */
export function applyTheme(theme: "dark" | "light" | "system"): void {
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  document.documentElement.classList[isDark ? "add" : "remove"]("dark");
}

/**
 * Configurar observador para cambios de tema
 * Establece un MutationObserver para detectar cambios en la clase 'dark'
 * y guardar la preferencia en localStorage
 */
export function setupThemeObserver(): void {
  if (typeof localStorage !== "undefined") {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }
}
