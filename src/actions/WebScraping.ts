import axios from "axios";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import { GenerateContent } from "../llm/gemini";

/**
 * Limita o tamanho do HTML antes de enviar para o LLM.
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
 * Faz scraping estático de uma página via Axios e gera análise com Gemini.
 *
 * @param url - URL alvo
 * @param format - Extensão para salvar o HTML (ex.: html ou txt)
 * @param instruction - Instrução customizada para o Gemini
 * @param outputDir - Pasta para salvar os arquivos (opcional)
 */
export async function WebScraping(
  url: string,
  format: string,
  instruction: string,
  outputDir?: string
) {
  console.log(chalk.cyanBright("\n🕷️  Iniciando Web Scraping com Axios (modo estático)...\n"));

  if (!isValidUrl(url)) {
    console.error(chalk.red("❌ URL inválida! Verifique e tente novamente."));
    process.exit(1);
  }

  const targetDir = outputDir || process.cwd();

  try {
    // 1️⃣ Requisição HTTP com headers realistas
    console.log(chalk.blueBright(`🌐 Requisitando: ${chalk.underline(url)}`));
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': '*/*'
      },
      timeout: 10000
    });

    const htmlContent = response.data;
    console.log(chalk.green("✅ HTML recebido com sucesso!"));

    // 2️⃣ Preparar prompt para Gemini
    const safeHtml = truncateHtml(htmlContent);
    const prompt = `
Você é um assistente especializado em análise de páginas web.

Recebeu o HTML completo de uma página. Sua tarefa é analisar e explicar de forma clara e resumida para um humano o que essa página contém.

Instruções adicionais fornecidas:
${instruction}

HTML da página:
${safeHtml}
`;

    console.log(chalk.yellowBright("\n🤖 Enviando conteúdo para o Gemini para análise...\n"));
    const analysis = await GenerateContent(prompt);

    // 3️⃣ Salvar arquivos com timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const outputHtmlPath = path.join(targetDir, `scraped-${timestamp}.${format}`);
    const outputAnalysisPath = path.join(targetDir, `analysis-${timestamp}.md`);

    fs.writeFileSync(outputHtmlPath, htmlContent, "utf8");
    fs.writeFileSync(outputAnalysisPath, analysis as string, "utf8");

    console.log(chalk.greenBright("\n✅ Arquivos salvos com sucesso:"));
    console.log(chalk.white(`- HTML bruto: ${chalk.underline(outputHtmlPath)}`));
    console.log(chalk.white(`- Análise gerada: ${chalk.underline(outputAnalysisPath)}\n`));
  } catch (error) {
    console.error(chalk.redBright("\n❌ Erro durante o scraping:"), (error as Error).message);
  } finally {
    console.log(chalk.cyanBright("\n🏁 Scraping com Axios finalizado!\n"));
  }
}
