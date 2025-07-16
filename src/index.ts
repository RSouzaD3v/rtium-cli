#!/usr/bin/env node
import inquirer from "inquirer";
import { WebScraping } from "./actions/WebScraping";
import { WebScrapingPuppeteer } from "./actions/WebScrapingPuppeteer";

async function main() {
  console.log('✨ Bem-vindo ao meu Ranetium Saas CLI! ✨\n');

  const answersMain = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "O que iremos fazer?",
      choices: ["web-scraping"]
    }
  ]);
  
  switch (answersMain.choice) {
    case "web-scraping":

      const scrapingAnswers = await inquirer.prompt([
        {
          type: "input",
          name: "url",
          message: "Informe a URL para scraping:"
        },
        {
          type: "list",
          name: "mode",
          message: "Qual modo de scraping deseja usar?",
          choices: ["Estático (Axios)", "Dinâmico (Puppeteer)"]
        },
        {
          type: "list",
          name: "format",
          message: "Em qual formato deseja salvar o HTML renderizado?",
          choices: ["html", "md", "txt"]
        },
        {
          type: "checkbox",
          name: "instructions",
          message: "O que deseja analisar com a IA?",
          choices: [
            "Analisar contatos relevantes",
            "Analisar valores de produtos",
            "O que poderia melhorar o SEO e Performance"
          ]
        }
      ]);

      // Convert checkbox array to string
      const instructionsText = scrapingAnswers.instructions.join(" / ");

      // Escolha entre Axios ou Puppeteer
      if (scrapingAnswers.mode === "Estático (Axios)") {
        console.log("\n🚀 Iniciando Web Scraping Estático (Axios)...");
        await WebScraping(scrapingAnswers.url, scrapingAnswers.format, instructionsText);
      } else {
        console.log("\n🚀 Iniciando Web Scraping Dinâmico (Puppeteer)...");
        await WebScrapingPuppeteer(scrapingAnswers.url, scrapingAnswers.format, instructionsText);
      }

      break;

    default:
      console.log("\n👋 Finalizando o CLI");
      break;
  }
}

main();
