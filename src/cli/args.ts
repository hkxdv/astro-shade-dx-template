import { CLIFlags } from "../types";

/**
 * Parsea los argumentos de la línea de comandos
 * @returns Objeto con flags y nombre del proyecto
 */
export function parseArguments(): { flags: CLIFlags; projectName: string } {
  const args = Bun.argv;

  // Detectar el modo de ejecución
  // Si se ejecuta con bunx o bun create, los argumentos empiezan en posición 2
  // Si se ejecuta directamente con bun create-template.ts, empiezan en 3
  const isDirectExecution =
    args[0].endsWith("bun") &&
    (args[1].endsWith("create-template.ts") || args[1].endsWith("index.ts"));
  const isBunxOrBunCreate =
    args[0].includes("bun") &&
    (args[1].includes("bunx") || args[1].includes("create"));

  const startPos = isDirectExecution ? 2 : isBunxOrBunCreate ? 3 : 2;
  const argProjectName = args[startPos] || "";

  // Comprobar flags
  const flags: CLIFlags = {
    empty: args.includes("--empty"),
    demo: args.includes("--demo") || !args.includes("--empty"),
    biome: args.includes("--biome"),
    eslint: args.includes("--eslint"),
    linter: args.includes("--biome") || args.includes("--eslint"),
    help: args.includes("--help") || args.includes("-h"),
    noColor: args.includes("--no-color"),
    interactive: args.length <= startPos, // Modo interactivo si no hay argumentos adicionales
  };

  return { flags, projectName: argProjectName };
}
