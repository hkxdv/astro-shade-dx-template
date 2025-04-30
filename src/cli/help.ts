import { colors } from "../utils/colors";

/**
 * Muestra la ayuda del CLI
 */
export function showHelp(): void {
  const cmd = colors.colorize(
    "bunx @hkxdv/astro-shade-dx-template",
    colors.cyan
  );
  const projectArg = colors.colorize("<nombre-proyecto>", colors.green);
  const optionsArg = colors.colorize("[opciones]", colors.dim);

  console.log(`
  ${cmd} ${projectArg} ${optionsArg}

${colors.colorize("OPCIONES:", colors.yellow + colors.bright)}
  ${colors.colorize("--demo", colors.green)}     ${
    colors.bright
  }Usar el template completo con todos los componentes${colors.reset} ${
    colors.dim
  }(predeterminado)${colors.reset}
  ${colors.colorize("--empty", colors.green)}    ${
    colors.bright
  }Usar el template mínimo con solo lo esencial${colors.reset}
  ${colors.colorize("--eslint", colors.green)}   ${
    colors.bright
  }Configurar ESLint + Prettier${colors.reset}
  ${colors.colorize("--biome", colors.green)}    ${
    colors.bright
  }Configurar Biome como alternativa a ESLint${colors.reset}
  ${colors.colorize("--no-color", colors.green)} ${
    colors.bright
  }Desactivar colores en la salida${colors.reset}
  ${colors.colorize("--help", colors.green)}     ${
    colors.bright
  }Muestra esta ayuda${colors.reset}

${colors.colorize("EJEMPLOS:", colors.yellow + colors.bright)}
  ${cmd} ${colors.colorize("mi-proyecto", colors.green)}
  ${cmd} ${colors.colorize("mi-proyecto", colors.green)} ${
    colors.dim
  }--empty --biome${colors.reset}
  ${cmd} ${colors.colorize("mi-proyecto", colors.green)} ${
    colors.dim
  }--demo --eslint${colors.reset}

${colors.colorize(
  "NOTA:",
  colors.white + colors.bright
)} Por defecto, no se configura ningún linter a menos que se especifique con --eslint o --biome.
`);
}
