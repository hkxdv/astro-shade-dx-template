import { cpSync } from "node:fs";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import chalk from "chalk";
import ora from "ora";
import type { LinterType } from "../types";

/**
 * Configura el linter en el proyecto
 * @param linterType Tipo de linter
 * @param linterDir Directorio con la configuración del linter
 * @param projectDir Directorio del proyecto
 */
export async function configureLinter(
  linterType: LinterType,
  linterDir: string,
  projectDir: string
): Promise<void> {
  try {
    // Si no se seleccionó ningún linter, salir
    if (linterType === "ninguno") {
      return;
    }

    // A partir de aquí, linterType solo puede ser "biome" o "eslint"
    const actualLinterType = linterType as "biome" | "eslint";

    // Verificar que el directorio del linter existe
    if (!existsSync(linterDir)) {
      // Intentar resolverlo usando rutas absolutas
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const altLinterDir = path.resolve(__dirname, "../../templates/linters", actualLinterType);

      const spinner = ora({
        text: chalk.blue.dim("Buscando configuración de linter en ruta alternativa..."),
        color: "blue",
      }).start();

      if (existsSync(altLinterDir)) {
        spinner.succeed(chalk.blue.dim("Configuración de linter encontrada"));

        // Copiar archivos de configuración del linter desde la ruta alternativa
        const linterFiles = readdirSync(altLinterDir);
        for (const file of linterFiles) {
          cpSync(path.join(altLinterDir, file), path.join(projectDir, file));
        }
      } else {
        spinner.fail(chalk.yellow("No se encontró configuración de linter"));
        return;
      }
    } else {
      // Copiar archivos de configuración del linter desde la ruta original
      const linterFiles = readdirSync(linterDir);
      for (const file of linterFiles) {
        cpSync(path.join(linterDir, file), path.join(projectDir, file));
      }
    }

    // Actualizar package.json para los scripts del linter
    const pkgPath = path.join(projectDir, "package.json");
    if (existsSync(pkgPath)) {
      const updateSpinner = ora({
        text: chalk.blue.dim("Actualizando scripts de package.json..."),
        color: "blue",
      }).start();

      const pkg = await Bun.file(pkgPath).json();

      pkg.devDependencies = pkg.devDependencies || {};
      pkg.scripts = pkg.scripts || {};

      if (actualLinterType === "biome") {
        // Configuración actualizada de Biome
        pkg.devDependencies["@biomejs/biome"] = "1.9.4";

        // Actualizamos también el schema en biome.json para asegurar compatibilidad
        const biomeJsonPath = path.join(projectDir, "biome.json");
        if (existsSync(biomeJsonPath)) {
          try {
            const biomeConfig = await Bun.file(biomeJsonPath).json();
            if (biomeConfig.$schema?.includes("biomejs.dev/schemas/")) {
              biomeConfig.$schema = "https://biomejs.dev/schemas/1.9.4/schema.json";
              await Bun.write(biomeJsonPath, JSON.stringify(biomeConfig, null, 2));
            }
          } catch (_err) {
            updateSpinner.warn(
              chalk.yellow("No se pudo actualizar la versión del schema en biome.json")
            );
          }
        }

        // Configurar scripts
        pkg.scripts["format"] = "biome format --write ./src";
        pkg.scripts["lint"] = "biome lint ./src";
        pkg.scripts["check"] = "biome check ./src";
      } else if (actualLinterType === "eslint") {
        // Dependencias actualizadas para ESLint 9 configuración plana
        pkg.devDependencies["@eslint/js"] = "^9.25.1";
        pkg.devDependencies["typescript-eslint"] = "^8.31.0";
        pkg.devDependencies["@typescript-eslint/eslint-plugin"] = "^6.21.0";
        pkg.devDependencies["@typescript-eslint/parser"] = "^6.21.0";
        pkg.devDependencies["eslint"] = "^9.25.1";
        pkg.devDependencies["eslint-config-prettier"] = "^9.1.0";
        pkg.devDependencies["eslint-plugin-react"] = "^7.37.5";
        pkg.devDependencies["eslint-plugin-react-hooks"] = "^4.6.2";
        pkg.devDependencies["globals"] = "^16.0.0";
        pkg.devDependencies["prettier"] = "3.5.3";
        pkg.devDependencies["prettier-plugin-astro"] = "^0.14.1";
        pkg.devDependencies["prettier-plugin-tailwindcss"] = "^0.6.11";
        pkg.devDependencies["typescript"] = "^5.8.3";

        // Scripts actualizados
        pkg.scripts["format"] = 'prettier --write "src/**/*.{js,jsx,ts,tsx,astro}"';
        pkg.scripts["format:check"] = 'prettier --check "src/**/*.{js,jsx,ts,tsx,astro}"';
        pkg.scripts["format:astro"] = 'prettier --write "src/**/*.astro"';
        pkg.scripts["lint"] = 'eslint --ext .js,.jsx,.ts,.tsx --ignore-pattern "**/*.astro" src';
        pkg.scripts["lint:fix"] =
          'eslint --ext .js,.jsx,.ts,.tsx --ignore-pattern "**/*.astro" src --fix';
        pkg.scripts["lint:report"] =
          'eslint --ext .js,.jsx,.ts,.tsx --ignore-pattern "**/*.astro" src --format html --output-file ./eslint-report.html';
      }

      await Bun.write(pkgPath, JSON.stringify(pkg, null, 2));
      updateSpinner.succeed(chalk.blue.dim("Scripts actualizados correctamente"));
    }
  } catch (error) {
    console.error(
      chalk.red(
        `\nError al configurar el linter: ${error instanceof Error ? error.message : String(error)}`
      )
    );
    process.exit(1);
  }
}
