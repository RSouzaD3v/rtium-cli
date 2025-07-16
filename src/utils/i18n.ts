import { messages } from "../i18n/messages";
import { loadConfig } from "./config";

/**
 * Traduz uma chave para o idioma definido, com suporte a interpolação.
 * @param key chave da mensagem
 * @param langOverride força idioma específico
 * @param vars variáveis para substituir {{placeholder}}
 */
export function t(
  key: string,
  langOverride?: string,
  vars?: Record<string, string>
): string {
  const config = loadConfig();
  const lang = langOverride || config.lang || "pt";

  let text = messages[lang]?.[key] || messages["pt"][key] || key;

  if (vars) {
    for (const [varKey, varValue] of Object.entries(vars)) {
      text = text.replace(`{{${varKey}}}`, varValue);
    }
  }

  return text;
}
