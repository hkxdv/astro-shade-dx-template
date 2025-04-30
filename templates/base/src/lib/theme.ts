/**
 * Función para aplicar un tema específico a la aplicación
 * @param theme Tema a aplicar: 'light', 'dark' o 'system'
 */
export function applyTheme(theme: 'light' | 'dark' | 'system'): void {
  const root = document.documentElement;
  const isDark = 
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  // Aplicar la clase 'dark' al elemento HTML
  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  // Almacenar la preferencia en localStorage
  localStorage.setItem('theme', theme);
}

/**
 * Función para inicializar el tema de la aplicación
 * basado en la preferencia guardada o el tema del sistema
 */
export function initTheme(): void {
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
  
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    // Si no hay tema guardado, usar el tema del sistema
    applyTheme('system');
  }
} 