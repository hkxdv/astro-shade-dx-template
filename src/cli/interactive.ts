import path from "node:path";
import chalk from "chalk";
import prompts from "prompts";
import type { ProjectOptions } from "../types";

/**
 * Ejecuta el modo interactivo para configurar el proyecto
 * @param projectName Nombre del proyecto (puede estar vacío)
 * @returns Opciones del proyecto
 */
export async function runInteractiveMode(projectName = ""): Promise<ProjectOptions> {
  console.log(chalk.blue.dim("\nConfigura tu nuevo proyecto Astro:\n"));

  // Usar prompts para una interfaz más moderna
  const response = await prompts(
    [
      {
        type: "text",
        name: "projectName",
        message: "¿Nombre del proyecto?",
        initial: projectName || "mi-proyecto-astro",
        validate: (value) => (value.trim() === "" ? "El nombre del proyecto es requerido" : true),
      },
      {
        type: "select",
        name: "templateType",
        message: "¿Qué tipo de template deseas usar?",
        choices: [
          {
            title: "Demo",
            value: "demo",
            description: "Template completo con todos los componentes",
          },
          { title: "Base", value: "base", description: "Template mínimo con solo lo esencial" },
        ],
        initial: 0,
      },
      {
        type: "select",
        name: "linterType",
        message: "¿Qué linter prefieres?",
        choices: [
          {
            title: "Biome",
            value: "biome",
            description: "Herramienta única, más rápida y moderna",
          },
          {
            title: "ESLint + Prettier",
            value: "eslint",
            description: "Configuración tradicional y extensible",
          },
          {
            title: "Ninguno",
            value: "ninguno",
            description: "Sin linter (puedes configurarlo más tarde)",
          },
        ],
        initial: 0,
      },
      {
        type: "confirm",
        name: "confirmCreate",
        message: "¿Confirmas crear el proyecto con esta configuración?",
        initial: true,
      },
    ],
    {
      onCancel: () => {
        console.log(chalk.yellow("\nOperación cancelada por el usuario."));
        process.exit(0);
      },
    }
  );

  // Verificar confirmación
  if (!response.confirmCreate) {
    console.log(chalk.yellow("\nOperación cancelada por el usuario."));
    process.exit(0);
  }

  const currentDir = process.cwd();
  const projectDir = path.join(currentDir, response.projectName);

  return {
    projectName: response.projectName,
    templateType: response.templateType,
    linterType: response.linterType,
    projectDir,
  };
}
