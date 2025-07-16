# 🟣 Rtium CLI

✨ A Node.js CLI for **web scraping** any page and generating an **intelligent summary using Google Gemini**.  
Perfect for developers, researchers, or anyone who wants to quickly understand the content of an HTML page.

👉 **GitHub Repository:** [RSouzaD3v/rtium-cli](https://github.com/RSouzaD3v/rtium-cli)

---

## 🚀 Features

✅ Scrape any URL and save the HTML locally  
✅ Use Google Gemini to analyze and summarize the content  
✅ Interactive CLI with friendly prompts **or** direct use with flags  
✅ Supports `.env` or inline environment variables

---

## 📦 Installation

### ✅ Global installation (recommended)

Clone the repository or install directly from npm (when published):

```bash
git clone https://github.com/RSouzaD3v/rtium-cli
cd rtium-cli
npm install -g .
````

Or via npm:

```bash
npm install -g rtium-cli
```

Then run:

```bash
rtium-cli
```

---

### ✅ Using NPX (without installing globally)

```bash
npx rtium-cli
```

---

## ⚙️ Setting your API key

**Rtium CLI** uses the **Google Gemini** API.
You'll need to provide your API key to authenticate.

There are **two ways**:

---

### 1️⃣ Using a .env file

Create a **.env** file in the root of the project or the folder where you run the command:

```bash
GEMINI_API_KEY=YOUR_GOOGLE_API_KEY
```

Then run:

```bash
rtium-cli
```

or

```bash
npx rtium-cli
```

---

### 2️⃣ Using inline environment variable

To run without a .env file:

```bash
GEMINI_API_KEY="YOUR_GOOGLE_API_KEY" rtium-cli
```

or

```bash
GEMINI_API_KEY="YOUR_GOOGLE_API_KEY" npx rtium-cli
```

---

## 🧭 How it works

✅ When you run the command, the CLI will ask:

```bash
? Which URL do you want to scrape?
```

✅ Then it will:

* Download the page's HTML
* Save it as `scraped.html`, `.txt`, or `.md` in the current directory
* Send the content to Gemini
* Display or save an **AI-generated human-friendly summary**

---

## ✅ Real example

```bash
npx rtium-cli

✨ Welcome to Rtium CLI! ✨

? Which URL do you want to scrape? https://example.com

🕷️  Performing Web Scraping...
✅ HTML saved at ./scraped.html

🤖 Sending to Gemini...

📋 Gemini's Analysis:
This page is a corporate website with contact sections and services...
```

---

## ⚡ Using flags

To run without interactive prompts:

```bash
rtium-cli scrape --url=https://example.com --mode=axios --format=html --instruction="Analyze contacts and SEO"
```

---

## 🛡️ Security

⚠️ **Never commit your .env file to public repositories!**
This CLI is configured to *ignore* .env files when publishing to npm (via `.npmignore`).

---

## 📎 Important Links

* 🔗 **GitHub Repository:** [https://github.com/RSouzaD3v/rtium-cli](https://github.com/RSouzaD3v/rtium-cli)

---

## 📝 License

MIT License © Rafael F. Souza

<img src="https://www.ranetium.com/logo.png" alt="Ranetium's Logo">


_________________________


# 🟣 Rtium CLI

✨ Um CLI em Node.js para fazer **web scraping** de qualquer página e gerar um **resumo inteligente com Google Gemini**.  
Ideal para desenvolvedores, pesquisadores ou curiosos que querem entender rapidamente o conteúdo de uma página HTML.

👉 **Repositório no GitHub:** [RSouzaD3v/rtium-cli](https://github.com/RSouzaD3v/rtium-cli)

---

## 🚀 Features

✅ Faz scraping de uma URL e salva o HTML localmente  
✅ Usa Google Gemini para analisar e resumir o conteúdo  
✅ CLI interativo com prompts amigáveis **ou** uso direto com flags  
✅ Suporte a `.env` ou variável de ambiente no terminal

---

## 📦 Instalação

### ✅ Instalação global (recomendada)

```bash
npm install -g rtium-cli
````

Depois basta rodar:

```bash
rtium-cli
```

---

### ✅ Uso via NPX (sem instalar globalmente)

```bash
npx rtium-cli
```

---

## ⚙️ Configuração da chave de API

O **Rtium CLI** usa a API do **Google Gemini**.
Você precisa fornecer sua chave para autenticação.

Existem **duas maneiras**:

---

### 1️⃣ Usando .env

Crie um arquivo **.env** na raiz do projeto ou da pasta onde rodar o comando:

```bash
GEMINI_API_KEY=YOUR_GOOGLE_API_KEY
```

Depois rode normalmente:

```bash
rtium-cli
```

ou

```bash
npx rtium-cli
```

---

### 2️⃣ Usando variável de ambiente inline

Para rodar sem arquivo .env:

```bash
GEMINI_API_KEY="YOUR_GOOGLE_API_KEY" rtium-cli
```

ou

```bash
GEMINI_API_KEY="YOUR_GOOGLE_API_KEY" npx rtium-cli
```

---

## 🧭 Como usar

✅ Ao rodar o comando, o CLI vai perguntar:

```bash
? Qual URL você quer fazer scraping?
```

✅ Em seguida, ele vai:

* Baixar o HTML da página
* Salvar como `scraped.html`, `.txt` ou `.md` no diretório atual
* Enviar o conteúdo para o Gemini
* Exibir ou salvar um **resumo amigável** gerado pela IA

---

## ✅ Exemplo real

```bash
npx rtium-cli

✨ Bem-vindo ao Rtium CLI! ✨

? Qual URL você quer fazer scraping? https://example.com

🕷️  Fazendo Web Scraping...
✅ HTML salvo em ./scraped.html

🤖 Enviando para Gemini...

📋 Análise do Gemini:
Esta página é um site institucional com seções de contato e serviços...
```

---

## ⚡ Uso com flags

Para rodar sem prompts interativos:

```bash
rtium-cli scrape --url=https://example.com --mode=axios --format=html --instruction="Analise contatos e SEO"
```

---

## 🛡️ Segurança

⚠️ **Nunca inclua sua chave .env em repositórios públicos!**
Este CLI está configurado para *ignorar* arquivos .env ao publicar no npm (via `.npmignore`).

---

## 📝 Licença

MIT License © Rafael F. Souza

<img src="https://www.ranetium.com/logo.png" alt="Ranetium's Logo">