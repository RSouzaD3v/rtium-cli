#!/usr/bin/env node
import { Command } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import { runScrapeCommand } from "./commands/scrape";
import { loadConfig, saveConfig, showConfig } from "./utils/config";
import { t } from "./utils/i18n";

const program = new Command();

// ⚡ pega config salvo
const userConfig = loadConfig();

// ⚡ detecta --lang global
program
  .name("rtium-cli")
  .description("🟣 Rtium SaaS CLI - Scraping com IA")
  .version("1.0.0")
  .option("--lang <lang>", "Escolhe o idioma (pt|en)");

// ➜ Comando scrape
program
  .command("scrape")
  .description("Faz scraping de uma página e gera análise com IA")
  .option("--url <url>", t("urlPrompt"))
  .option("--mode <mode>", t("modePrompt"), "axios")
  .option("--format <format>", t("formatPrompt"), "html")
  .option("--instruction <instruction>", t("instructionPrompt"))
  .action(async (options) => {
    // ➜ resolve idioma
    const lang = options.lang || userConfig.lang || "pt";

    // ⚡ FLAGS diretas
    if (options.url && options.instruction) {
      await runScrapeCommand({ ...options });
    } else {
      // ⚡ Modo interativo
      console.log(chalk.yellow(`\n⚡ ${t("noFlagsWarning", lang)}\n`));
      console.log(chalk.cyanBright(t("welcome", lang)));
      console.log(chalk.magenta(`
        ██████╗  █████╗ ███╗   ██╗███████╗████████╗██╗██╗   ██╗███╗   ███╗
        ██╔══██╗██╔══██╗████╗  ██║██╔════╝╚══██╔══╝██║██║   ██║████╗ ████║
        ██████╔╝███████║██╔██╗ ██║█████╗     ██║   ██║██║   ██║██╔████╔██║
        ██╔══██╗██╔══██║██║╚██╗██║██╔══╝     ██║   ██║██║   ██║██║╚██╔╝██║
        ██║  ██║██║  ██║██║ ╚████║███████╗   ██║   ██║╚██████╔╝██║ ╚═╝ ██║
        ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝     ╚═╝
    `));

      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "url",
          message: t("urlPrompt", lang)
        },
        {
          type: "list",
          name: "mode",
          message: t("modePrompt", lang),
          choices: ["axios", "puppeteer"]
        },
        {
          type: "list",
          name: "format",
          message: t("formatPrompt", lang),
          choices: ["html", "md", "txt"]
        },
        {
          type: "checkbox",
          name: "instructions",
          message: t("instructionPrompt", lang),
          choices: [
            t("analyzeContacts", lang),
            t("analyzePrices", lang),
            t("analyzeSEO", lang)
          ]
        }
      ]);

      const instructionsText = answers.instructions.join(" / ");

      await runScrapeCommand({
        url: answers.url,
        mode: answers.mode,
        format: answers.format,
        instruction: instructionsText
      });
    }
  });

// ➜ Comando config
program
  .command("config")
  .description(t("configDescription"))
  .option("--set <key=value>", t("configSetHelp"))
  .option("--show", t("configShowHelp"))
  .action((options) => {
    if (options.show) {
      showConfig();
    } else if (options.set) {
      const [key, value] = options.set.split("=");
      if (!key || value === undefined) {
        console.error(chalk.red(t("invalidSetFormat")));
        return;
      }
      saveConfig({ [key]: value });
      console.log(chalk.green(`${t("configSaved")} ${key}=${value}`));
    } else {
      console.log(chalk.gray(t("configUsageHint")));
    }
  });

program.parse();
