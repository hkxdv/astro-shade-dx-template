import * as React from "react";

/**
 * Hook para detectar media queries
 * @param query La media query a evaluar (ej: '(max-width: 768px)')
 * @returns Boolean que indica si la media query coincide
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Verificar si estamos en un entorno con window (cliente)
    if (typeof window === "undefined") {
      return;
    }

    // Verificar inicialmente
    const media = window.matchMedia(query);
    setMatches(media.matches);

    // Función para actualizar el estado cuando cambia la media query
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Añadir listener
    media.addEventListener("change", listener);

    // Limpieza al desmontar
    return () => {
      media.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
}
