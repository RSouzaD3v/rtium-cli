# Rtium CLI

✨ Um CLI Node.js para fazer **web scraping** de qualquer página e gerar um **resumo inteligente com Google Gemini**. Ideal para desenvolvedores, pesquisadores ou curiosos que querem entender rapidamente o conteúdo de uma página HTML.

---

## 🚀 Features

✅ Faz scraping de uma URL e salva o HTML localmente  
✅ Usa Google Gemini para analisar e resumir o conteúdo  
✅ CLI interativo com prompts amigáveis  
✅ Suporte a `.env` ou variável de ambiente no terminal

---

## 📦 Instalação

### Instalação global (recomendado)

```

npm install -g rtium-cli

```

Depois basta rodar:

```

rtium-cli

```

---

### Uso via NPX

Sem instalar nada global:

```

npx rtium-cli

```

---

## ⚙️ Configuração da chave de API

O rtium CLI usa a API do **Google Gemini**.  
Você precisa fornecer sua chave.

Existem duas maneiras:

---

### ✅ 1️⃣ Usando .env

Crie um arquivo `.env` na raiz onde rodar o comando:

```

GEMINI\_API\_KEY=YOUR\_GOOGLE\_API\_KEY

```

Depois rode normalmente:

```

rtium-cli

```
ou
```

npx rtium-cli

```

---

### ✅ 2️⃣ Usando variável inline

Para rodar sem .env:

```

GEMINI\_API\_KEY="YOUR\_GOOGLE\_API\_KEY" rtium-cli

```

ou

```

GEMINI\_API\_KEY="YOUR\_GOOGLE\_API\_KEY" npx rtium-cli

```

---

## 🧭 Como usar

1️⃣ Ao rodar o comando, o CLI vai pedir a **URL** da página que você quer fazer scraping.

```

? Qual URL você quer fazer scraping?

```

2️⃣ Ele vai:

✅ Baixar o HTML da página  
✅ Salvar como `scraped.html` no diretório atual  
✅ Enviar o conteúdo para o Gemini  
✅ Exibir um **resumo amigável** no terminal

---

## ✅ Exemplo real

```

npx rtium-cli

✨ Bem-vindo ao rtium Saas CLI! ✨

? Qual URL você quer fazer scraping? [https://example.com](https://example.com)

🕷️  Fazendo Web Scraping...
✅ HTML salvo em /meu/projeto/scraped.html

🤖 Enviando para Gemini...

📋 Análise do Gemini:
Esta página é um site institucional com seções de contato e serviços...

```

---

## 🛡️ Segurança

**⚠️ Nunca inclua sua chave .env no versionamento ou repositórios públicos.**  
Esse CLI está preparado para *não subir* arquivos .env no npm (graças ao .npmignore).

---

## 📝 Licença

MIT License © Rafael