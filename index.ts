import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "node:fs/promises";
import path from "node:path";

const server = new McpServer({
  name: "aykan-dosya-ajani",
  version: "1.2.0",
});

// 1. Dosya oluştur veya güncelle
server.tool(
  "dosya_olustur",
  "Belirtilen klasör yolunda, verilen içerikle yeni bir dosya oluşturur veya var olanı günceller.",
  {
    klasorYolu: z.string(),
    dosyaAdi: z.string(),
    icerik: z.string()
  },
  async ({ klasorYolu, dosyaAdi, icerik }) => {
    try {
      await fs.mkdir(klasorYolu, { recursive: true });
      const tamYol = path.join(klasorYolu, dosyaAdi);
      await fs.writeFile(tamYol, icerik, "utf-8");
      return {
        content: [{ type: "text", text: `Başarılı! Dosya oluşturuldu: ${tamYol}` }],
      };
    } catch (error: unknown) {
      const hataMesaji = error instanceof Error ? error.message : String(error);
      return { content: [{ type: "text", text: `Hata: ${hataMesaji}` }], isError: true };
    }
  }
);

// 2. Dosya oku
server.tool(
  "dosya_oku",
  "Belirtilen dosyanın içeriğini okur ve döndürür.",
  {
    dosyaYolu: z.string().describe("Okunacak dosyanın tam yolu")
  },
  async ({ dosyaYolu }) => {
    try {
      const icerik = await fs.readFile(dosyaYolu, "utf-8");
      return {
        content: [{ type: "text", text: `Dosya içeriği:\n\n${icerik}` }],
      };
    } catch (error: unknown) {
      const hataMesaji = error instanceof Error ? error.message : String(error);
      return { content: [{ type: "text", text: `Hata: ${hataMesaji}` }], isError: true };
    }
  }
);

// 3. Klasör listele
server.tool(
  "klasor_listele",
  "Belirtilen klasördeki tüm dosya ve klasörleri listeler.",
  {
    klasorYolu: z.string().describe("Listelenecek klasörün tam yolu")
  },
  async ({ klasorYolu }) => {
    try {
      const ogeler = await fs.readdir(klasorYolu, { withFileTypes: true });
      const liste = ogeler.map(oge => {
        const tip = oge.isDirectory() ? "📁" : "📄";
        return `${tip} ${oge.name}`;
      }).join("\n");
      return {
        content: [{ type: "text", text: `${klasorYolu} içeriği:\n\n${liste}` }],
      };
    } catch (error: unknown) {
      const hataMesaji = error instanceof Error ? error.message : String(error);
      return { content: [{ type: "text", text: `Hata: ${hataMesaji}` }], isError: true };
    }
  }
);

// 4. Kod dosyası oluştur
server.tool(
  "kod_dosyasi_olustur",
  "Belirtilen programlama dilinde, verilen açıklamaya göre kod yazar ve dosyaya kaydeder.",
  {
    klasorYolu: z.string().describe("Kaydedilecek klasör yolu"),
    dosyaAdi: z.string().describe("Dosya adı (örn: index.ts, app.py)"),
    programlamaDili: z.string().describe("Programlama dili (örn: typescript, python, javascript)"),
    aciklama: z.string().describe("Kodun ne yapması gerektiğinin açıklaması"),
    kod: z.string().describe("Yazılacak kod içeriği")
  },
  async ({ klasorYolu, dosyaAdi, programlamaDili, aciklama, kod }) => {
    try {
      await fs.mkdir(klasorYolu, { recursive: true });
      const tamYol = path.join(klasorYolu, dosyaAdi);
      const baslik = `// Dil: ${programlamaDili}\n// Açıklama: ${aciklama}\n// Oluşturulma: ${new Date().toLocaleString("tr-TR")}\n\n`;
      await fs.writeFile(tamYol, baslik + kod, "utf-8");
      return {
        content: [{ type: "text", text: `Kod dosyası oluşturuldu: ${tamYol}` }],
      };
    } catch (error: unknown) {
      const hataMesaji = error instanceof Error ? error.message : String(error);
      return { content: [{ type: "text", text: `Hata: ${hataMesaji}` }], isError: true };
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);