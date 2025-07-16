import axios from "axios";
import fs from "fs";
import path from "path";
import { GenerateContent } from "../llm/gemini";

/**
 * Faz scraping de uma página e gera análise com Gemini
 * @param url URL alvo
 * @param format extensão para salvar HTML (ex: html ou txt)
 * @param instruction instrução customizada para o Gemini
 */
export const WebScraping = async (url: string, format: string, instruction: string) => {
  console.log("\n🕷️  Iniciando Web Scraping...");

  try {
    // 1️⃣ Requisição HTTP com headers realistas
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': '*/*'
      },
      timeout: 10000
    });

    const htmlContent = response.data;
    console.log("✅ HTML recebido com sucesso!");

    // 2️⃣ Prompt para Gemini
    const prompt = `
Você é um assistente especializado em análise de páginas web.

Recebeu o HTML completo de uma página. Sua tarefa é analisar e explicar de forma clara para um humano o que essa página contém.

Instruções adicionais fornecidas:
${instruction}

HTML da página:
${htmlContent}
`;

    console.log("\n🤖 Enviando para o Gemini...");
    const analysis = await GenerateContent(prompt);

    // 3️⃣ Salvar arquivos
    const outputHtmlPath = path.resolve(process.cwd(), `scraped.${format}`);
    const outputAnalysisPath = path.resolve(process.cwd(), `analysis.md`);

    fs.writeFileSync(outputHtmlPath, htmlContent, "utf8");
    fs.writeFileSync(outputAnalysisPath, analysis as string, "utf8");

    console.log(`\n✅ Arquivos salvos com sucesso:`);
    console.log(`- HTML: ${outputHtmlPath}`);
    console.log(`- Análise: ${outputAnalysisPath}`);
  } catch (error) {
    console.error("\n❌ Erro durante o scraping:", error);
  } finally {
    console.log("\n🏁 Scraping finalizado!");
  }
};
