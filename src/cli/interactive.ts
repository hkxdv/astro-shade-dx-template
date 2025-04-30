import path from "path";
import { LinterType, ProjectOptions, TemplateType } from "../types";
import { colors } from "../utils/colors";
import { promptConfirm, promptSelect, promptUser } from "../utils/readline";

/**
 * Ejecuta el modo interactivo para configurar el proyecto
 * @param projectName Nombre del proyecto (puede estar vacío)
 * @returns Opciones del proyecto
 */
export async function runInteractiveMode(
  projectName: string = ""
): Promise<ProjectOptions> {
  // Preguntar nombre del proyecto si no se proporcionó
  const finalProjectName =
    projectName ||
    (await promptUser("Nombre del proyecto", "mi-proyecto-astro"));

  // Preguntar tipo de template
  const templateOptions = ["demo", "base"];
  const templateAnswer = await promptSelect(
    "Elige el tipo de template:",
    templateOptions
  );
  const templateType: TemplateType = templateAnswer.startsWith("demo")
    ? "demo"
    : "base";

  // Preguntar tipo de linter
  const linterOptions = ["Ninguno", "ESLint + Prettier", "Biome"];
  const linterAnswer = await promptSelect(
    "Elige el tipo de linter:",
    linterOptions
  );

  let linterType: LinterType;
  if (linterAnswer === "ESLint + Prettier") {
    linterType = "eslint";
  } else if (linterAnswer === "Biome") {
    linterType = "biome";
  } else {
    linterType = "ninguno";
  }

  const confirmCreate = await promptConfirm("\n¿Deseas crear este proyecto?");
  if (!confirmCreate) {
    console.log(
      `\n${colors.yellow}Operación cancelada por el usuario.${colors.reset}`
    );
    process.exit(0);
  }

  const currentDir = process.cwd();
  const projectDir = path.join(currentDir, finalProjectName);

  return {
    projectName: finalProjectName,
    templateType,
    linterType,
    projectDir,
  };
}
