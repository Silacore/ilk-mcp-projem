import express from "express";
import cors from "cors";
import { spawn } from "child_process";
import { createInterface } from "readline";
import path from "path";
import os from "os";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DESKTOP = path.join(os.homedir(), "Desktop");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let mcpProcess = null;
let messageId = 1;
const pendingRequests = new Map();

function startMCP() {
  mcpProcess = spawn("node", [path.join(__dirname, "dist/index.js")], {
    env: { ...process.env },
    stdio: ["pipe", "pipe", "pipe"],
  });

  const rl = createInterface({ input: mcpProcess.stdout });
  rl.on("line", (line) => {
    try {
      const msg = JSON.parse(line);
      if (msg.id && pendingRequests.has(msg.id)) {
        const { resolve } = pendingRequests.get(msg.id);
        pendingRequests.delete(msg.id);
        resolve(msg);
      }
    } catch { }
  });

  mcpProcess.stderr.on("data", (d) => console.error("MCP:", d.toString()));
  mcpProcess.on("close", () => {
    console.log("MCP kapandı, yeniden başlatılıyor...");
    setTimeout(startMCP, 1000);
  });

  console.log("MCP sunucu başlatıldı");
}

function callMCP(method, params) {
  return new Promise((resolve, reject) => {
    const id = messageId++;
    pendingRequests.set(id, { resolve, reject });
    const msg = JSON.stringify({ jsonrpc: "2.0", id, method, params }) + "\n";
    mcpProcess.stdin.write(msg);
    setTimeout(() => {
      if (pendingRequests.has(id)) {
        pendingRequests.delete(id);
        reject(new Error("Zaman aşımı"));
      }
    }, 15000);
  });
}

app.get("/api/debug", async (req, res) => {
  const result = await callMCP("tools/call", {
    name: "web_ara",
    arguments: { sorgu: "test", sonucSayisi: 1 }
  });
  res.json(result);
});

app.get("/api/tools", async (req, res) => {
  try {
    const result = await callMCP("tools/list", {});
    res.json(result.result.tools);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  const tools = await callMCP("tools/list", {});
  const toolList = tools.result.tools;

  const groqTools = toolList.map((t) => ({
    type: "function",
    function: {
      name: t.name,
      description: t.description,
      parameters: t.inputSchema,
    },
  }));

  const systemPrompt = `Sen yardımcı bir AI ajanısın. SADECE Türkçe konuş. Görevleri yerine getirmek için tool'ları kullan. Elindeki tool'lar: ${toolList.map((t) => t.name).join(", ")}. Kullanıcının Desktop yolu: ${DESKTOP}. Dosya işlemlerinde bu yolu kullan. Tool sonuçlarını kullanıcıya AYNEN ve TAMAMEN göster. "Yukarıda listelendi" veya "sonuçlar gösterildi" gibi ifadeler KULLANMA. Tool'dan gelen metni direkt yaz. Eğer bir tool çağrısı yaparsan, sonucu bekle ve ardından kullanıcıya sonucu göster. Kullanıcıya sadece tool sonuçlarını göster, tool çağrısı yaptığını söyleme.`;

  const messages = [
    { role: "system", content: systemPrompt },
    ...(history || []),
    { role: "user", content: message },
  ];

  try {
    console.log("Groq isteği gönderiliyor...");
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages,
        tools: groqTools,
        tool_choice: "auto",
        max_tokens: 2048,
      }),
    });

    const groqData = await groqRes.json();
    console.log("Groq yanıtı:", JSON.stringify(groqData).slice(0, 500));
    const choice = groqData.choices[0];
    console.log("finish_reason:", choice.finish_reason);
    console.log("message:", JSON.stringify(choice.message));
    if (choice.finish_reason === "tool_calls") {
      const toolCalls = choice.message.tool_calls;
      const toolResults = [];

      for (const tc of toolCalls) {
        console.log("Tool çağrısı:", tc.function.name, tc.function.arguments);
        const args = JSON.parse(tc.function.arguments);
        const result = await callMCP("tools/call", {
          name: tc.function.name,
          arguments: args,
        });
        console.log("MCP sonucu:", JSON.stringify(result));
        toolResults.push({
          toolName: tc.function.name,
          toolCallId: tc.id,
          result: result.result?.content?.[0]?.text ?? result.error?.message ?? JSON.stringify(result),
        });
      }

      const followUpMessages = [
        ...messages,
        choice.message,
        ...toolResults.map((tr) => ({
          role: "tool",
          tool_call_id: tr.toolCallId,
          content: tr.result,
        })),
      ];

      const followUp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: followUpMessages,
          max_tokens: 2048,
        }),
      });

      const followUpData = await followUp.json();
      res.json({
        reply: followUpData.choices[0].message.content,
        toolsUsed: toolResults.map((tr) => tr.toolName),
      });
    } else {
      res.json({
        reply: choice.message.content,
        toolsUsed: [],
      });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

startMCP();
app.listen(3000, () => {
  console.log("Arayüz hazır: http://localhost:3000");
});