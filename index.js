import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "node:fs/promises";
import path from "node:path";
// 1. Yeni bir MCP Sunucusu örneği başlatıyoruz
const server = new McpServer({
    name: "aykan-dosya-ajani",
    version: "1.1.0",
});
// 2. Yapay zekaya dosya yönetim aracı tanımlıyoruz
server.tool("dosya_olustur", "Belirtilen klasör yolunda, verilen içerikle yeni bir dosya oluşturur veya var olanı günceller.", {
    klasorYolu: z.string(),
    dosyaAdi: z.string(),
    icerik: z.string()
}, async ({ klasorYolu, dosyaAdi, icerik }) => {
    try {
        // Klasör yoksa hiyerarşik olarak oluşturulmasını sağlıyoruz
        await fs.mkdir(klasorYolu, { recursive: true });
        // Güvenli işletim sistemi yol birleştirmesi
        const tamYol = path.join(klasorYolu, dosyaAdi);
        // Dosyayı diske UTF-8 formatında güvenli bir şekilde yazıyoruz
        await fs.writeFile(tamYol, icerik, "utf-8");
        return {
            content: [{ type: "text", text: `Başarılı! Dosya şu adreste oluşturuldu: ${tamYol}` }],
        };
    }
    catch (error) {
        const hataMesaji = error instanceof Error ? error.message : String(error);
        return {
            content: [{ type: "text", text: `Hata oluştu: ${hataMesaji}` }],
            isError: true
        };
    }
});
// 3. Sunucuyu girdi/çıktı kanalına bağlıyoruz
const transport = new StdioServerTransport();
await server.connect(transport);
