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
  console.log(
    `${colors.green}${colors.bright}🤖 Iniciando modo interactivo...${colors.reset}\n`
  );

  // Preguntar nombre del proyecto si no se proporcionó
  const finalProjectName =
    projectName ||
    (await promptUser("Nombre del proyecto", "mi-proyecto-astro"));

  // Preguntar tipo de template
  const templateOptions = [
    "demo (template completo con todos los componentes)",
    "base (template mínimo con lo esencial)",
  ];
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

  // Mostrar resumen y confirmar
  console.log(`\n${colors.green}${colors.bright}📋 Resumen:${colors.reset}`);
  console.log(
    `${colors.white}   • Nombre:${colors.reset} ${colors.bright}${finalProjectName}${colors.reset}`
  );
  console.log(
    `${colors.white}   • Template:${colors.reset} ${colors.bright}${templateType}${colors.reset}`
  );
  console.log(
    `${colors.white}   • Linter:${colors.reset} ${colors.bright}${linterType}${colors.reset}\n`
  );

  const confirmCreate = await promptConfirm("¿Deseas crear este proyecto?");
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
