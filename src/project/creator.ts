import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import chalk from "chalk";
import ora from "ora";
import type { LinterType, ProjectOptions, TemplateType } from "../types";
import { copyDirSync } from "../utils/fs";
import { configureLinter } from "./linter";

/**
 * Muestra el mensaje final con instrucciones
 * @param projectName Nombre del proyecto
 * @param templateType Tipo de template
 * @param linterType Tipo de linter
 */
export function showFinalMessage(
  projectName: string,
  _templateType: TemplateType,
  linterType: LinterType
): void {
  console.log(chalk.white("\n✨ Proyecto creado con éxito ✨"));

  console.log(chalk.blue.dim("\nPasos a seguir:"));
  console.log(`   ${chalk.dim("1.")} ${chalk.blue(`cd ${projectName}`)}`);
  console.log(`   ${chalk.dim("2.")} ${chalk.blue("bun i")}`);
  console.log(`   ${chalk.dim("3.")} ${chalk.blue("bun dev")}`);

  console.log(
    `${chalk.magenta.dim("\nTu aplicación estará disponible en:")} ${chalk.underline("http://localhost:4321")}`
  );

  // Mostrar información del linter solo si se ha configurado uno
  if (linterType !== "ninguno") {
    console.log(
      `   ${chalk.green("✓")} ${
        linterType === "biome" ? "Biome" : "ESLint + Prettier"
      } para linting y formateo`
    );
  } else {
    console.log(
      `   ${chalk.yellow("•")} Sin linter configurado ${chalk.gray("(puedes añadirlo más tarde)")}`
    );
  }

  console.log(chalk.white("\nGracias por usar Astro Shade DX Template! 💙\n"));
}

/**
 * Crea un nuevo proyecto con las opciones especificadas
 * @param options Opciones del proyecto
 */
export async function createProject(options: ProjectOptions): Promise<void> {
  const { projectName, templateType, linterType, projectDir } = options;

  try {
    // Verificar si el directorio ya existe
    if (existsSync(projectDir)) {
      console.error(chalk.red(`\nError: El directorio "${projectName}" ya existe`));
      process.exit(1);
    }

    // Crear directorio del proyecto
    const dirSpinner = ora({
      text: chalk.blue(`\nCreando directorio "${projectName}"...`),
      color: "blue",
    }).start();

    mkdirSync(projectDir, { recursive: true });
    dirSpinner.succeed(chalk.blue("Directorio creado"));

    // Definir rutas de directorios usando fileURLToPath para manejarlas dinámicamente
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    let templatesDir: string | undefined;

    // Primero intentar encontrar la carpeta en la ubicación del paquete instalado
    const pkgPath = path.join(__dirname, "../..");
    // Si estamos en un paquete instalado (publicado en npm)
    if (existsSync(path.join(pkgPath, "package.json"))) {
      templatesDir = path.join(pkgPath, "templates");
    }

    // Si estamos en desarrollo local
    if (!templatesDir || !existsSync(templatesDir)) {
      // Buscar en ubicaciones alternativas
      const possiblePaths = [
        path.resolve(__dirname, "../../templates"),
        path.resolve(process.cwd(), "templates"),
        path.resolve(__dirname, "../templates"),
      ];

      for (const possiblePath of possiblePaths) {
        if (existsSync(possiblePath)) {
          templatesDir = possiblePath;
          break;
        }
      }
    }

    const templateDir = path.join(templatesDir || "", templateType);
    const linterDir =
      linterType !== "ninguno" ? path.join(templatesDir || "", "linters", linterType) : "";

    // Mostrar información del proyecto que se va a crear
    console.log(chalk.blue.dim("\nResumen del proyecto:"));
    console.log(`   ${chalk.dim("•")} Nombre: ${chalk.white(projectName)}`);
    console.log(
      `   ${chalk.dim("•")} Template: ${chalk.white(templateType)} ${chalk.gray(
        templateType === "demo" ? "(completo)" : "(básico)"
      )}`
    );
    console.log(`   ${chalk.dim("•")} Linter: ${chalk.white(linterType)}`);
    console.log(`   ${chalk.dim("•")} Ubicación: ${chalk.gray(projectDir)}\n`);

    // Verificar que el directorio del template existe
    if (!existsSync(templateDir)) {
      console.error(chalk.red("Error: El directorio del template no existe"));
      process.exit(1);
    }

    // Copiar template
    const templateSpinner = ora({
      text: chalk.blue("Copiando archivos del template..."),
      color: "blue",
    }).start();

    // Pausa para mejor UX
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Copiar el template
    copyDirSync(templateDir, projectDir);
    templateSpinner.succeed(chalk.blue("Template copiado"));

    // Configurar linter si es necesario
    if (linterType !== "ninguno") {
      const linterSpinner = ora({
        text: chalk.blue(`Configurando ${linterType}...`),
        color: "blue",
      }).start();

      await configureLinter(linterType, linterDir, projectDir);
      linterSpinner.succeed(chalk.blue(`${linterType} configurado`));
    }

    // Mostrar mensaje final
    showFinalMessage(projectName, templateType, linterType);
  } catch (error) {
    console.error(
      chalk.red(
        `Error al crear el proyecto: ${error instanceof Error ? error.message : String(error)}`
      )
    );
    process.exit(1);
  }
}
