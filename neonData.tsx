/**
 * NeonDijital — Fütüristik React yapılandırma katmanı
 * ilk-mcp-projem için örnek veri dosyası
 *
 * neo-digi projesindeki themeConfig + neonData (ComponentData) mantığını
 * tek merkezde toplar. UI bileşenleri burada değil; meta veri ve tema burada.
 */

// ---------------------------------------------------------------------------
// Tipler
// ---------------------------------------------------------------------------

export type NeonAccent =
  | "cyan"
  | "pink"
  | "purple"
  | "green"
  | "amber"
  | "blue"
  | "orange"
  | "indigo";

export interface NeonAction {
  text: string;
  href: string;
}

export interface NeonNavItem {
  name: string;
  href: string;
  icon?: string;
  color?: string;
  badge?: string;
}

export interface NeonToolCard {
  id: string;
  icon: string;
  color: NeonAccent;
  title: string;
  description: string;
  actionText: string;
  href: string;
  status: "online" | "beta" | "soon";
}

export interface ComponentData {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  category: "ui" | "motion" | "data" | "mcp";
  tags: string[];
  reactCode: string;
  flutterCode: string;
}

export interface NeonMcpTool {
  name: string;
  description: string;
  params: { key: string; type: string; required: boolean }[];
  examplePrompt: string;
}

export interface NeonDataConfig {
  meta: {
    version: string;
    codename: string;
    author: string;
    build: string;
    locale: string;
  };
  palette: typeof neonPalette;
  typography: typeof neonTypography;
  effects: typeof neonEffects;
  site: typeof neonSite;
  mcp: typeof neonMcp;
  bootSequence: string[];
  components: ComponentData[];
}

// ---------------------------------------------------------------------------
// Tema — palet, tipografi, efektler
// ---------------------------------------------------------------------------

export const neonPalette = {
  void: "#020617",
  surface: "#0f172a",
  panel: "#1e293b",
  border: "rgba(34, 211, 238, 0.25)",
  text: {
    primary: "#f8fafc",
    muted: "#94a3b8",
    accent: "#22d3ee",
  },
  neon: {
    cyan: "#22d3ee",
    pink: "#ec4899",
    purple: "#a855f7",
    green: "#4ade80",
    amber: "#fbbf24",
  },
  gradients: {
    hero: "linear-gradient(135deg, #020617 0%, #1e1b4b 50%, #0f172a 100%)",
    card: "linear-gradient(180deg, rgba(34,211,238,0.08) 0%, transparent 100%)",
    cta: "linear-gradient(90deg, #06b6d4, #ec4899)",
    scanline:
      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,211,238,0.03) 2px, rgba(34,211,238,0.03) 4px)",
  },
  glow: {
    cyan: "0 0 20px rgba(34, 211, 238, 0.6)",
    pink: "0 0 24px rgba(236, 72, 153, 0.5)",
    green: "0 0 18px rgba(74, 222, 128, 0.55)",
  },
} as const;

export const neonTypography = {
  display: "'Orbitron', 'Segoe UI', system-ui, sans-serif",
  body: "'Inter', 'Segoe UI', system-ui, sans-serif",
  mono: "'JetBrains Mono', 'Cascadia Code', monospace",
  scale: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "4xl": "2.25rem",
    "6xl": "3.75rem",
  },
  tracking: {
    wide: "0.12em",
    cyber: "0.28em",
  },
} as const;

export const neonEffects = {
  glass: {
    background: "rgba(15, 23, 42, 0.55)",
    backdropBlur: "12px",
    border: "1px solid rgba(255, 255, 255, 0.08)",
  },
  animation: {
    pulse: "neon-pulse 2s ease-in-out infinite",
    glitch: "neon-glitch 0.4s steps(2) infinite",
    scan: "neon-scan 4s linear infinite",
  },
  cssKeyframes: `
    @keyframes neon-pulse {
      0%, 100% { opacity: 1; box-shadow: 0 0 12px rgba(34,211,238,0.4); }
      50% { opacity: 0.85; box-shadow: 0 0 28px rgba(34,211,238,0.75); }
    }
    @keyframes neon-scan {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100%); }
    }
    @keyframes neon-glitch {
      0% { text-shadow: 2px 0 #ec4899, -2px 0 #22d3ee; }
      50% { text-shadow: -2px 0 #ec4899, 2px 0 #22d3ee; }
      100% { text-shadow: 2px 0 #ec4899, -2px 0 #22d3ee; }
    }
  `,
} as const;

// ---------------------------------------------------------------------------
// Site yapılandırması (themeConfig ile uyumlu)
// ---------------------------------------------------------------------------

export const neonSite = {
  title: "NeonDijital",
  tagline: "Geleceği kodlayan dijital atölye",
  footerText: "© 2025-2026 NeonDijital · ilk-mcp-projem örnek yapılandırması",
  statusLine: "Sistem v12.2 · MCP Kanalı Aktif",
  navigation: [
    { name: "Ana Sayfa", href: "/" },
    { name: "NeonLab", href: "/neon-lab", icon: "beaker", color: "text-pink-400" },
    { name: "Araçlar", href: "/tools", icon: "wrench" },
    { name: "MCP Demo", href: "/mcp", icon: "terminal", badge: "YENİ" },
    { name: "Blog", href: "/blog" },
    { name: "İletişim", href: "/iletisim" },
  ] satisfies NeonNavItem[],
  hero: {
    status: "▸ aykan-dosya-ajani · stdio bağlantısı hazır",
    title: "Geleceği Kodluyorum",
    subtitle:
      "Model Context Protocol ile yerel dosya ajanınızı yapay zekaya bağlayın. NeonDijital estetiği, üretim hazır React veri katmanı.",
    primaryAction: { text: "NeonLab'ı Aç", href: "/neon-lab" },
    secondaryAction: { text: "MCP Sunucusunu Başlat", href: "#mcp-start" },
  },
  promotion: {
    tag: "İLK MCP PROJESİ",
    title: "Dosya Ajanı Çevrimiçi",
    description:
      "Cursor içinden klasör yolu, dosya adı ve içerik göndererek diske anında dosya oluşturun. Tüm işlem yerel Node.js üzerinde çalışır.",
    action: { text: "dosya_olustur Aracını Dene", href: "#tool-dosya-olustur" },
  },
  techStack: {
    tag: "Fütüristik Altyapı",
    title: "TEKNOLOJİ VE GÜVEN",
    description:
      "MCP SDK, TypeScript, Zod doğrulama ve NeonDijital tasarım token'ları tek pakette.",
    cards: [
      {
        title: "MCP Stdio Transport",
        description:
          "@modelcontextprotocol/sdk ile Cursor ve Claude Desktop'a doğrudan araç sunumu.",
      },
      {
        title: "Tip Güvenli Parametreler",
        description: "Zod şemaları ile klasorYolu, dosyaAdi ve icerik alanları doğrulanır.",
      },
      {
        title: "Neon Veri Katmanı",
        description:
          "Bu dosya (neonData.tsx) tema, site ve bileşen kataloğunu merkezi olarak taşır.",
      },
    ],
  },
  tools: {
    tag: "Geliştirici Araç Seti",
    title: "Hayat Kurtaran Geliştirici Araçları",
    description: "NeonDijital araç vitrininden seçilmiş örnek kartlar.",
    list: [
      {
        id: "flutter-gen",
        icon: "smartphone",
        color: "cyan",
        title: "Flutter Asset Generator",
        description:
          "Tek tıkla ikon ve splash görsellerini mipmap / Assets.xcassets yapısıyla ZIP olarak indirin.",
        actionText: "Aracı Başlat",
        href: "/tools/flutter-generator",
        status: "online",
      },
      {
        id: "glass-gen",
        icon: "layers",
        color: "blue",
        title: "Glassmorphism Generator",
        description: "Modern CSS buzlu cam efektlerini saniyeler içinde üretin ve kopyalayın.",
        actionText: "Efekt Oluştur",
        href: "/tools/glass-generator",
        status: "online",
      },
      {
        id: "regex-lab",
        icon: "fingerprint",
        color: "pink",
        title: "Neon Regex Laboratuvarı",
        description: "Eşleşmeleri neon ışıklarla görselleştirin; canlı test paneli.",
        actionText: "Laboratuvara Gir",
        href: "/tools/regex-lab",
        status: "beta",
      },
      {
        id: "mcp-file",
        icon: "file-code",
        color: "green",
        title: "MCP Dosya Oluşturucu",
        description:
          "Bu projedeki dosya_olustur aracı — yapay zeka klasörünüze güvenli UTF-8 yazımı yapar.",
        actionText: "Sunucuyu Çalıştır: npm start",
        href: "/mcp",
        status: "online",
      },
    ] satisfies NeonToolCard[],
  },
  socials: [
    { name: "Github", href: "https://github.com", icon: "github" },
    { name: "Linkedin", href: "https://linkedin.com", icon: "linkedin" },
    { name: "Twitter", href: "https://twitter.com", icon: "twitter" },
  ],
} as const;

// ---------------------------------------------------------------------------
// MCP sunucu meta verisi (ilk-mcp-projem / index.ts ile uyumlu)
// ---------------------------------------------------------------------------

export const neonMcp = {
  server: {
    name: "aykan-dosya-ajani",
    version: "1.1.0",
    transport: "stdio",
    description: "Profesyonel MCP Dosya Yönetim Sunucusu",
  },
  tools: [
    {
      name: "dosya_olustur",
      description:
        "Belirtilen klasör yolunda, verilen içerikle yeni bir dosya oluşturur veya var olanı günceller.",
      params: [
        { key: "klasorYolu", type: "string", required: true },
        { key: "dosyaAdi", type: "string", required: true },
        { key: "icerik", type: "string", required: true },
      ],
      examplePrompt:
        'C:/Users/Asus/Desktop/ilk-mcp-projem klasöründe hello.txt oluştur, içine "NeonDijital MCP" yaz.',
    },
    {
      name: "aykani_selamla",
      description: "Kullanıcıyı fütüristik bir dille selamlar (Aykan-MCP sunucusu).",
      params: [{ key: "isim", type: "string", required: true }],
      examplePrompt: "Aykan'ı selamla, isim olarak Aykan kullan.",
    },
  ] satisfies NeonMcpTool[],
  paths: {
    projectRoot: "C:/Users/Asus/Desktop/ilk-mcp-projem",
    configFile: "neonData.tsx",
    entry: "index.ts",
  },
} as const;

export const bootSequence = [
  "NEON_CORE BAŞLATILIYOR...",
  "MCP STDIO KANALI AÇILIYOR...",
  "neonData.tsx YÜKLENDİ...",
  "ZOD ŞEMALARI DOĞRULANDI...",
  "ERİŞİM İZNİ VERİLDİ.",
] as const;

// ---------------------------------------------------------------------------
// NeonLab bileşen kataloğu (örnek — neo-digi ComponentData yapısı)
// ---------------------------------------------------------------------------

export const neonComponents: ComponentData[] = [
  {
    id: "liquid-btn",
    title: "Liquid Neon Button",
    description: "Sıvı animasyonlu aksiyon butonu.",
    icon: "zap",
    color: "text-cyan-400",
    category: "ui",
    tags: ["button", "hover", "tailwind"],
    reactCode: `<button className="relative px-8 py-4 font-bold text-white rounded-full overflow-hidden group bg-slate-800 border border-slate-700">
  <span className="relative z-10 group-hover:text-slate-900 transition-colors">HOVER ME</span>
  <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
</button>`,
    flutterCode: `ElevatedButton(
  style: ElevatedButton.styleFrom(backgroundColor: Colors.cyan),
  onPressed: () {},
  child: const Text('HOVER ME'),
)`,
  },
  {
    id: "glass-card",
    title: "Glassmorphism Card",
    description: "Derinlik hissi veren buzlu cam kartı.",
    icon: "credit-card",
    color: "text-purple-400",
    category: "ui",
    tags: ["card", "glass", "backdrop"],
    reactCode: `<div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 p-6">
  <span className="font-mono text-white/80 tracking-widest">**** 4242</span>
</div>`,
    flutterCode: `BackdropFilter(
  filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
  child: Container(color: Colors.white.withOpacity(0.1)),
)`,
  },
  {
    id: "cyber-input",
    title: "Cyberpunk Input",
    description: "Neon alt çizgili glitch input.",
    icon: "terminal",
    color: "text-pink-400",
    category: "ui",
    tags: ["form", "input", "focus"],
    reactCode: `<div className="relative group">
  <input className="w-full bg-slate-900 text-white px-4 py-3 rounded-lg" placeholder="Enter Matrix..." />
  <div className="absolute bottom-0 left-0 h-0.5 bg-cyan-400 w-0 group-focus-within:w-full transition-all" />
</div>`,
    flutterCode: `TextField(
  decoration: InputDecoration(
    filled: true,
    fillColor: Colors.grey[900],
    focusedBorder: UnderlineInputBorder(borderSide: BorderSide(color: Colors.cyanAccent)),
  ),
)`,
  },
  {
    id: "plasma-toggle",
    title: "Plasma Toggle",
    description: "Aktif olduğunda yeşil neon yayan switch.",
    icon: "toggle-left",
    color: "text-green-400",
    category: "motion",
    tags: ["switch", "framer-motion", "spring"],
    reactCode: `const [on, setOn] = useState(false);
<div onClick={() => setOn(!on)} className={\`w-20 h-10 rounded-full border-2 \${on ? 'border-green-500 justify-end' : 'border-slate-700'}\`}>
  <motion.div layout className="h-7 w-7 rounded-full bg-green-400" />
</div>`,
    flutterCode: `Switch(value: isOn, onChanged: (v) => setState(() => isOn = v), activeColor: Colors.greenAccent)`,
  },
  {
    id: "quantum-loader",
    title: "Quantum Loader",
    description: "Çift halkalı nükleer yükleme animasyonu.",
    icon: "activity",
    color: "text-yellow-400",
    category: "motion",
    tags: ["loader", "spinner", "framer"],
    reactCode: `<div className="relative w-32 h-32">
  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
    className="absolute inset-0 border-2 border-dashed border-cyan-500/30 rounded-full" />
  <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
    className="absolute inset-2 border-t-pink-500 rounded-full border-[3px]" />
</div>`,
    flutterCode: `Stack(
  alignment: Alignment.center,
  children: [
    CircularProgressIndicator(color: Colors.cyan),
    SizedBox(width: 40, height: 40, child: CircularProgressIndicator(color: Colors.pink)),
  ],
)`,
  },
  {
    id: "hud-card",
    title: "Sci-Fi HUD Card",
    description: "Köşe bracket'lı bilim kurgu veri kartı.",
    icon: "gauge",
    color: "text-cyan-300",
    category: "data",
    tags: ["hud", "dashboard", "stats"],
    reactCode: `<div className="relative p-6 bg-slate-900/80 border border-cyan-500/30 font-mono">
  <span className="text-[10px] text-cyan-500/70">SYS_LOAD</span>
  <p className="text-3xl font-bold text-white">87.4%</p>
  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
</div>`,
    flutterCode: `Container(
  padding: const EdgeInsets.all(24),
  decoration: BoxDecoration(
    color: Colors.black87,
    border: Border.all(color: Colors.cyan.withOpacity(0.3)),
  ),
  child: const Text('87.4%', style: TextStyle(fontSize: 28, color: Colors.white)),
)`,
  },
  {
    id: "mcp-status-panel",
    title: "MCP Status Panel",
    description: "Sunucu adı, sürüm ve araç listesini gösteren durum paneli.",
    icon: "cpu",
    color: "text-green-400",
    category: "mcp",
    tags: ["mcp", "config", "stdio"],
    reactCode: `{neonMcp.server.name} v{neonMcp.server.version}
<ul>{neonMcp.tools.map(t => <li key={t.name}>{t.name}</li>)}</ul>`,
    flutterCode: `Column(
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [
    Text('aykan-dosya-ajani v1.1.0'),
    ...tools.map((t) => ListTile(title: Text(t.name))),
  ],
)`,
  },
  {
    id: "neural-canvas",
    title: "Neural Particle Network",
    description: "Canvas tabanlı, fareyle etkileşimli parçacık ağı.",
    icon: "share-2",
    color: "text-cyan-400",
    category: "motion",
    tags: ["canvas", "particles", "physics"],
    reactCode: `const canvasRef = useRef<HTMLCanvasElement>(null);
useEffect(() => {
  const ctx = canvasRef.current?.getContext('2d');
  // requestAnimationFrame döngüsü: parçacık + çizgi çizimi
}, []);
<canvas ref={canvasRef} className="w-full h-64 bg-slate-950" />`,
    flutterCode: `CustomPaint(
  painter: ParticleNetworkPainter(particles: particles),
  size: const Size(double.infinity, 256),
)`,
  },
];

// ---------------------------------------------------------------------------
// Birleşik dışa aktarım
// ---------------------------------------------------------------------------

export const neonData: NeonDataConfig = {
  meta: {
    version: "1.1.0",
    codename: "NEON_CORE",
    author: "Aykan Kömürcü",
    build: "ilk-mcp-projem",
    locale: "tr-TR",
  },
  palette: neonPalette,
  typography: neonTypography,
  effects: neonEffects,
  site: neonSite,
  mcp: neonMcp,
  bootSequence: [...bootSequence],
  components: neonComponents,
};

/** NeonLab sayfalama ve filtre için yardımcı */
export const getComponentsByCategory = (
  category: ComponentData["category"],
): ComponentData[] => neonComponents.filter((c) => c.category === category);

/** Tema rengini Tailwind sınıfına çevir */
export const accentToTailwind = (accent: NeonAccent): string => {
  const map: Record<NeonAccent, string> = {
    cyan: "text-cyan-400 border-cyan-500/30",
    pink: "text-pink-400 border-pink-500/30",
    purple: "text-purple-400 border-purple-500/30",
    green: "text-green-400 border-green-500/30",
    amber: "text-amber-400 border-amber-500/30",
    blue: "text-blue-400 border-blue-500/30",
    orange: "text-orange-400 border-orange-500/30",
    indigo: "text-indigo-400 border-indigo-500/30",
  };
  return map[accent];
};

export default neonData;
