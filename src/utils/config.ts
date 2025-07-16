import fs from "fs";
import os from "os";
import path from "path";

// 📌 Caminho global (home do usuário)
const GLOBAL_CONFIG_PATH = path.join(os.homedir(), ".rtiumrc.json");

// 📌 Caminho local (diretório atual)
const LOCAL_CONFIG_PATH = path.join(process.cwd(), ".rtiumrc.json");

// 📌 Interface para tipos
export interface RtiumConfig {
  outputDir?: string;
  defaultMode?: string;
  defaultFormat?: string;
  lang?: string;
}

// ✅ Carrega config (local > global)
export function loadConfig(): RtiumConfig {
  // 1️⃣ Prioridade para o local
  if (fs.existsSync(LOCAL_CONFIG_PATH)) {
    try {
      const content = fs.readFileSync(LOCAL_CONFIG_PATH, "utf8");
      return JSON.parse(content);
    } catch {
      console.error("❌ Erro ao ler configuração local.");
    }
  }

  // 2️⃣ Fallback para global
  if (fs.existsSync(GLOBAL_CONFIG_PATH)) {
    try {
      const content = fs.readFileSync(GLOBAL_CONFIG_PATH, "utf8");
      return JSON.parse(content);
    } catch {
      console.error("❌ Erro ao ler configuração global.");
    }
  }

  // 3️⃣ Nenhum arquivo encontrado
  return {};
}

// ✅ Salva config (no mesmo lugar em que existir)
export function saveConfig(newConfig: Partial<RtiumConfig>): void {
  let targetPath = GLOBAL_CONFIG_PATH;

  // Se já tem local, salva local
  if (fs.existsSync(LOCAL_CONFIG_PATH)) {
    targetPath = LOCAL_CONFIG_PATH;
  }

  const existing = loadConfig();
  const merged = { ...existing, ...newConfig };

  fs.writeFileSync(targetPath, JSON.stringify(merged, null, 2), "utf8");
}

// ✅ Mostra config no terminal
export function showConfig(): void {
  const config = loadConfig();
  console.log("📦 Configuração atual:");
  console.log(JSON.stringify(config, null, 2));
}
