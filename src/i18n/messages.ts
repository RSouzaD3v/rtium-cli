export const messages = {
    pt: {
      welcome: "✨ Bem-vindo ao Rtium CLI! ✨",
      scrapingStart: "🕷️  Iniciando Web Scraping...",
      scrapingDone: "🏁 Scraping finalizado!",
      invalidUrl: "❌ URL inválida! Verifique e tente novamente.",
      modeAxios: "🚀 Iniciando scraping estático (Axios)...",
      modePuppeteer: "🚀 Iniciando scraping dinâmico (Puppeteer)...",
      invalidMode: "❌ Modo inválido: {{mode}}. Use 'axios' ou 'puppeteer'.",
      configSaved: "✅ Configuração salva!",
      showConfig: "📦 Configuração atual:",
      savedFile: "✅ Arquivo salvo com sucesso:",
  
      // prompts para index.ts
      urlPrompt: "Informe a URL para scraping:",
      modePrompt: "Qual modo de scraping deseja usar?",
      formatPrompt: "Em qual formato deseja salvar o HTML?",
      instructionPrompt: "O que deseja analisar com a IA?",
      analyzeContacts: "Analisar contatos relevantes",
      analyzePrices: "Analisar valores de produtos",
      analyzeSEO: "O que poderia melhorar o SEO e Performance",
      noFlagsWarning: "Nenhuma URL ou instrução fornecida via flags. Iniciando modo interativo...",
  
      // config command
      configDescription: "Gerencia configurações persistentes",
      configSetHelp: "Define uma configuração",
      configShowHelp: "Mostra a configuração atual",
      invalidSetFormat: "❌ Formato inválido. Use --set key=value",
      configUsageHint: "ℹ️ Use --show para ver ou --set key=value para definir."
    },
    en: {
      welcome: "✨ Welcome to Rtium CLI! ✨",
      scrapingStart: "🕷️  Starting Web Scraping...",
      scrapingDone: "🏁 Scraping finished!",
      invalidUrl: "❌ Invalid URL! Please check and try again.",
      modeAxios: "🚀 Starting static scraping (Axios)...",
      modePuppeteer: "🚀 Starting dynamic scraping (Puppeteer)...",
      invalidMode: "❌ Invalid mode: {{mode}}. Use 'axios' or 'puppeteer'.",
      configSaved: "✅ Configuration saved!",
      showConfig: "📦 Current configuration:",
      savedFile: "✅ File saved successfully:",
  
      // prompts for index.ts
      urlPrompt: "Enter the URL for scraping:",
      modePrompt: "Which scraping mode do you want to use?",
      formatPrompt: "In which format do you want to save the HTML?",
      instructionPrompt: "What do you want the AI to analyze?",
      analyzeContacts: "Analyze relevant contacts",
      analyzePrices: "Analyze product prices",
      analyzeSEO: "Suggestions to improve SEO and performance",
      noFlagsWarning: "No URL or instruction provided via flags. Starting interactive mode...",
  
      // config command
      configDescription: "Manages persistent configurations",
      configSetHelp: "Sets a configuration value",
      configShowHelp: "Shows the current configuration",
      invalidSetFormat: "❌ Invalid format. Use --set key=value",
      configUsageHint: "ℹ️ Use --show to view or --set key=value to set."
    }
  };
  