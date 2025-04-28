export type TemplateType = "demo" | "base";
export type LinterType = "biome" | "eslint" | "ninguno";

/**
 * Opciones del proyecto
 */
export interface ProjectOptions {
  projectName: string;
  templateType: TemplateType;
  linterType: LinterType;
  projectDir: string;
}

/**
 * Flags de la línea de comandos
 */
export interface CLIFlags {
  empty: boolean;
  demo: boolean;
  biome: boolean;
  eslint: boolean;
  linter: boolean;
  help: boolean;
  interactive: boolean;
  noColor: boolean;
}
