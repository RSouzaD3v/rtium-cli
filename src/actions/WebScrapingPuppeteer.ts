import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import { GenerateContent } from "../llm/gemini";

/**
 * Faz scraping dinâmico de uma página usando Puppeteer e envia para o Gemini.
 *
 * @param url URL alvo para scraping
 * @param format Formato para salvar o HTML (ex: html ou txt)
 * @param instruction Instrução personalizada para a análise do Gemini
 */
export const WebScrapingPuppeteer = async (
  url: string,
  format: string,
  instruction: string
) => {
  console.log("\n🕷️  Iniciando Web Scraping com Puppeteer (renderização completa)...");

  try {
    // 1️⃣ Lançar navegador
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    console.log(`🌐 Acessando ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

    console.log("✅ Página totalmente carregada e renderizada!");

    // 2️⃣ Extrair HTML renderizado
    const htmlContent = await page.content();

    // 3️⃣ Fechar navegador
    await browser.close();

    // 4️⃣ Preparar prompt para o Gemini
    const prompt = `
Você é um assistente especializado em análise de páginas web.

Recebeu o HTML renderizado de uma página. Sua tarefa é analisar e explicar de forma clara e resumida para um humano o que essa página contém.

Instruções adicionais fornecidas:
${instruction}

HTML da página:
${htmlContent}
`;

    console.log("\n🤖 Enviando para o Gemini para análise...");
    const analysis = await GenerateContent(prompt);

    // 5️⃣ Salvar os arquivos
    const outputHtmlPath = path.resolve(process.cwd(), `scraped.${format}`);
    const outputAnalysisPath = path.resolve(process.cwd(), `analysis.md`);

    fs.writeFileSync(outputHtmlPath, htmlContent, "utf8");
    fs.writeFileSync(outputAnalysisPath, analysis as string, "utf8");

    console.log(`\n✅ Arquivos salvos com sucesso:`);
    console.log(`- HTML renderizado: ${outputHtmlPath}`);
    console.log(`- Análise gerada: ${outputAnalysisPath}`);
  } catch (error) {
    console.error("\n❌ Erro durante o scraping com Puppeteer:", error);
  } finally {
    console.log("\n🏁 Scraping com Puppeteer finalizado!");
  }
};
