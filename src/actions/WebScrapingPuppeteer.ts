import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import chalk from "chalk";
import { GenerateContent } from "../llm/gemini";

/**
 * Limita o tamanho do HTML antes de enviar para o LLM.
 * Evita custos excessivos e prompts muito grandes.
 */
function truncateHtml(html: string, maxLength = 15000): string {
  return html.length > maxLength ? html.slice(0, maxLength) : html;
}

/**
 * Valida se uma string é uma URL válida.
 */
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Faz scraping dinâmico de uma página usando Puppeteer e envia para o Gemini.
 *
 * @param url - URL alvo para scraping
 * @param format - Formato para salvar o HTML (ex.: html ou txt)
 * @param instruction - Instrução personalizada para a análise do Gemini
 * @param outputDir - Pasta onde salvar os arquivos (opcional)
 */
export async function WebScrapingPuppeteer(
  url: string,
  format: string,
  instruction: string,
  outputDir?: string
) {
  console.log(chalk.cyanBright("\n🕷️  Iniciando Web Scraping com Puppeteer (renderização completa)...\n"));

  if (!isValidUrl(url)) {
    console.error(chalk.red("❌ URL inválida! Verifique e tente novamente."));
    process.exit(1);
  }

  let browser: any | null = null;
  const targetDir = outputDir || process.cwd();

  try {
    // 1️⃣ Lançar navegador
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    console.log(chalk.blueBright(`🌐 Acessando: ${chalk.underline(url)}`));
    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
    console.log(chalk.green("✅ Página totalmente carregada e renderizada!"));

    // 2️⃣ Extrair HTML renderizado
    const htmlContent = await page.content();
    const safeHtml = truncateHtml(htmlContent);

    // 3️⃣ Preparar prompt para o Gemini
    const prompt = `
Você é um assistente especializado em análise de páginas web.

Recebeu o HTML renderizado de uma página. Sua tarefa é analisar e explicar de forma clara e resumida para um humano o que essa página contém.

Instruções adicionais fornecidas:
${instruction}

HTML da página:
${safeHtml}
`;

    console.log(chalk.yellowBright("\n🤖 Enviando conteúdo para o Gemini para análise...\n"));
    const analysis = await GenerateContent(prompt);

    // 4️⃣ Salvar os arquivos com timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const outputHtmlPath = path.join(targetDir, `scraped-${timestamp}.${format}`);
    const outputAnalysisPath = path.join(targetDir, `analysis-${timestamp}.md`);

    fs.writeFileSync(outputHtmlPath, htmlContent, "utf8");
    fs.writeFileSync(outputAnalysisPath, analysis as string, "utf8");

    console.log(chalk.greenBright("\n✅ Arquivos salvos com sucesso:"));
    console.log(chalk.white(`- HTML renderizado: ${chalk.underline(outputHtmlPath)}`));
    console.log(chalk.white(`- Análise gerada: ${chalk.underline(outputAnalysisPath)}\n`));
  } catch (error) {
    console.error(chalk.redBright("\n❌ Erro durante o scraping com Puppeteer:"), (error as Error).message);
  } finally {
    if (browser) {
      await browser.close();
    }
    console.log(chalk.cyanBright("\n🏁 Scraping com Puppeteer finalizado!\n"));
  }
}
