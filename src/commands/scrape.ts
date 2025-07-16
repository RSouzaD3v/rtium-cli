import chalk from "chalk";
import { WebScraping } from "../actions/WebScraping";
import { WebScrapingPuppeteer } from "../actions/WebScrapingPuppeteer";
import { loadConfig } from "../utils/config";
import { t } from "../utils/i18n";

interface ScrapeOptions {
  url: string;
  mode?: string;
  format?: string;
  instruction: string;
}

export async function runScrapeCommand(options: ScrapeOptions) {
  const { url, mode, format, instruction } = options;
  const userConfig = loadConfig();

  const finalMode = mode || userConfig.defaultMode || "axios";
  const finalFormat = format || userConfig.defaultFormat || "html";
  const finalOutputDir = userConfig.outputDir;

  console.log(chalk.cyanBright("\n" + t("welcome") + "\n"));
  console.log(chalk.gray(`→ Mode: ${finalMode}`));
  console.log(chalk.gray(`→ Format: ${finalFormat}`));
  if (finalOutputDir) {
    console.log(chalk.gray(`→ OutputDir: ${finalOutputDir}`));
  }

  if (finalMode === "axios") {
    console.log(chalk.blue(t("modeAxios")));
    await WebScraping(url, finalFormat, instruction, finalOutputDir);
  } else if (finalMode === "puppeteer") {
    console.log(chalk.blue(t("modePuppeteer")));
    await WebScrapingPuppeteer(url, finalFormat, instruction, finalOutputDir);
  } else {
    console.error(chalk.red(t("invalidMode", undefined, { mode: finalMode })));
    process.exit(1);
  }
}
