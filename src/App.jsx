import { useState } from "react";

// ============================================================
// DATA
// ============================================================

const BEER_OPTIONS = [
  { id: "sapporo", name: "サッポロ黒ラベル", tags: ["crisp", "light", "clean", "mild-bitter"] },
  { id: "asahi", name: "アサヒ スーパードライ", tags: ["dry", "sharp", "clean", "effervescent"] },
  { id: "kirin", name: "キリン一番搾り", tags: ["smooth", "malt", "gentle-bitter", "round"] },
  { id: "yebisu", name: "ヱビスビール", tags: ["rich", "malt", "full-body", "complex"] },
  { id: "white-ale", name: "ホワイトエール系", tags: ["fruity", "citrus", "floral", "soft"] },
  { id: "ipa", name: "クラフトIPA", tags: ["hoppy", "bitter", "aromatic", "bold"] },
  { id: "stout", name: "スタウト・黒ビール", tags: ["roasty", "dark", "creamy", "intense"] },
  { id: "sour", name: "サワーエール・ランビック", tags: ["acidic", "funky", "complex", "wild"] },
];

const SAKE_OPTIONS = [
  { id: "junmai-daiginjo", name: "純米大吟醸", tags: ["floral", "fruity", "elegant", "delicate"] },
  { id: "junmai", name: "純米酒", tags: ["umami", "rich", "earthy", "full-body"] },
  { id: "nigori", name: "にごり酒", tags: ["creamy", "sweet", "texture", "round"] },
  { id: "koshu", name: "古酒・熟成酒", tags: ["oxidative", "nutty", "complex", "amber"] },
  { id: "kimoto", name: "生酛・山廃", tags: ["funky", "wild", "acidic", "complex"] },
  { id: "happoshu", name: "発泡清酒・スパークリング", tags: ["light", "effervescent", "fresh", "clean"] },
];

const WINE_DB = [
  {
    id: "muscadet", name: "Muscadet sur Lie", region: "ロワール / フランス",
    tags: ["crisp", "clean", "mineral", "effervescent", "light", "fresh"],
    description: "牡蠣に合わせるような、塩気のあるミネラル感。スーパードライが好きな人にまず勧めたい一本。",
    grapes: "ムロン・ド・ブルゴーニュ", body: "軽め", color: "白", price: "¥2,500〜3,500",
    match_reason: "ドライで切れのある後味が共通。炭酸の清涼感も近い。",
    affiliate_url: "https://www.rakuten.co.jp/search/muscadet",
    producer: { name: "ドメーヌ・ド・ラ・ペピエール", philosophy: "テロワールをそのままボトルへ", since: "1984年", location: "ロワール河口域、ナント近郊", profile: "マルク・オリヴィエが1984年に創業。化学肥料を一切使わず、畑仕事は全て手作業。「ワインは畑が作るもの」という哲学のもと、セラーでの介入を最小限に抑える。年間生産量は約8万本と小規模ながら、世界中のナチュラルワイン愛好家から熱狂的な支持を受けている。" }
  },
  {
    id: "petnat", name: "Pét-Nat Rosé", region: "オーヴェルニュ / フランス",
    tags: ["fruity", "effervescent", "floral", "soft", "light", "fresh"],
    description: "発泡性のロゼ。イチゴやバラのような香り。ホワイトエール好きが自然に辿り着く世界。",
    grapes: "ガメイ / グロロ", body: "軽め", color: "ロゼ", price: "¥3,000〜4,500",
    match_reason: "フルーティーで花のような香り。苦みが少なく飲みやすい入門的ナチュラルワイン。",
    affiliate_url: "https://www.rakuten.co.jp/search/pet+nat+rose",
    producer: { name: "ドメーヌ・ボワ・ルカ", philosophy: "デザイナーの目で造るワイン", since: "2009年", location: "オーヴェルニュ火山地帯", profile: "元グラフィックデザイナーのセバスチャン・リフォーが、都会の生活を捨ててオーヴェルニュの火山地帯に移住して始めたワイナリー。ラベルデザインも全て自分で手がけ、アートとしてのワインを体現している。" }
  },
  {
    id: "beaujolais", name: "Beaujolais Nature", region: "ボジョレー / フランス",
    tags: ["fruity", "light", "smooth", "gentle-bitter", "round"],
    description: "チェリーやイチゴのような明るい果実味。一番搾りの「丸さ」が好きな人に合う。",
    grapes: "ガメイ", body: "軽〜中程度", color: "赤", price: "¥3,000〜4,000",
    match_reason: "苦みがやわらかく果実の甘みが前に出る。飲み疲れしない軽やかさが共通。",
    affiliate_url: "https://www.rakuten.co.jp/search/beaujolais+nature",
    producer: { name: "ジャン・フォワヤール", philosophy: "ガメイの可能性を信じ続ける", since: "1981年", location: "ボジョレー、モルゴン村", profile: "ボジョレーのナチュラルワイン運動の父と呼ばれる伝説的生産者。1980年代、農薬が当たり前だった時代にガメイ本来の果実味を引き出す醸造法を独自に開発。今では世界中の若い生産者が彼の畑を聖地のように訪れる。" }
  },
  {
    id: "alsace-orange", name: "Alsace Pinot Gris Orange", region: "アルザス / フランス",
    tags: ["rich", "complex", "earthy", "umami", "full-body", "texture"],
    description: "皮ごと醸造したオレンジワイン。米の旨みに近い複雑さがある。純米酒が好きな人向け。",
    grapes: "ピノ・グリ", body: "しっかり", color: "オレンジ", price: "¥4,000〜6,000",
    match_reason: "旨みとコクが前に出るスタイル。タンニンが食事と溶け合う。",
    affiliate_url: "https://www.rakuten.co.jp/search/alsace+pinot+gris+orange",
    producer: { name: "ドメーヌ・ルネ・ミュレ", philosophy: "三代続く土地への敬意", since: "1948年", location: "アルザス、ランゲン・グランクリュ", profile: "アルザスの急斜面、標高400mの畑を手作業で耕す家族経営のワイナリー。祖父の代から続く農法を守りながら、現当主のトーマスがオレンジワインという新しい表現に挑戦している。" }
  },
  {
    id: "jura", name: "Jura Savagnin Ouillé", region: "ジュラ / フランス",
    tags: ["oxidative", "nutty", "complex", "amber", "funky"],
    description: "シェリーに似た酸化熟成のニュアンス。古酒・熟成酒の世界観に通じる独特の深み。",
    grapes: "サヴァニャン", body: "中〜重め", color: "白（アンバー）", price: "¥5,000〜8,000",
    match_reason: "熟成由来のナッツや蜂蜜のニュアンスが古酒と共鳴する。",
    affiliate_url: "https://www.rakuten.co.jp/search/jura+savagnin",
    producer: { name: "ドメーヌ・ガネヴァ", philosophy: "50代からのセカンドライフで世界を驚かせた", since: "2000年", location: "ジュラ山脈", profile: "元銀行員のジャン=フランソワ・ガネヴァが50代で転職し、ジュラの山奥でワイン造りを始めた異色の経歴を持つ。「人生は一度きり、好きなことをやれ」という言葉通り、誰も真似できない独自スタイルを確立。" }
  },
  {
    id: "champagne-rm", name: "Champagne RM", region: "シャンパーニュ / フランス",
    tags: ["effervescent", "light", "floral", "fresh", "elegant", "delicate"],
    description: "農家が自ら醸す小規模シャンパン。純米大吟醸の「透明な美しさ」に近い世界観。",
    grapes: "シャルドネ / ピノ・ノワール", body: "軽め", color: "白（発泡）", price: "¥6,000〜10,000",
    match_reason: "繊細な泡と上品な花の香り。雑味がなく洗練された飲み心地が共通。",
    affiliate_url: "https://www.rakuten.co.jp/search/champagne+recoltant",
    producer: { name: "ジャック・セロス", philosophy: "哲学者が造るシャンパン", since: "1988年", location: "コート・デ・ブラン、アヴィズ村", profile: "「シャンパーニュ界の革命児」と呼ばれるアンセルム・セロスが率いる家族経営のドメーヌ。農家シャンパン（RMスタイル）のパイオニアとして、毎年限定2万本しか生産しない。" }
  },
  {
    id: "rhone-syrah", name: "Côtes du Rhône Syrah", region: "ローヌ / フランス",
    tags: ["dark", "bold", "intense", "roasty", "creamy"],
    description: "ダークチェリーとスパイス。スタウト好きが「こういうワインもあるのか」と驚く一本。",
    grapes: "シラー", body: "しっかり", color: "赤", price: "¥3,500〜5,000",
    match_reason: "焙煎感と濃厚なボディが黒ビールと同じ方向性。でも果実味が加わる。",
    affiliate_url: "https://www.rakuten.co.jp/search/rhone+syrah+biodynamic",
    producer: { name: "ドメーヌ・グラムノン", philosophy: "ワインへの介入は冒涜である", since: "1978年", location: "ローヌ北部、コルナス近郊", profile: "「ワインに手を加えるのは冒涜だ」という過激なポリシーで知られる。酸化防止剤ゼロ、フィルタリングなし。収穫から瓶詰めまで全て重力のみを使う。" }
  },
  {
    id: "auvergne", name: "Auvergne Gamay Volcanic", region: "オーヴェルニュ / フランス",
    tags: ["earthy", "bold", "mineral", "wild", "acidic"],
    description: "火山性土壌由来のスモーキーさと高い酸。生酛・山廃のような野生酵母感がある。",
    grapes: "ガメイ", body: "中程度", color: "赤", price: "¥4,000〜5,500",
    match_reason: "酵母由来の複雑な香りと骨格のある酸が、山廃系の飲み心地と近い。",
    affiliate_url: "https://www.rakuten.co.jp/search/auvergne+gamay",
    producer: { name: "パトリック・ブージュ", philosophy: "火山の力をボトルに閉じ込める", since: "1993年", location: "オーヴェルニュ、標高600m", profile: "30年以上ガメイを造り続ける孤高の生産者。標高600mの火山性土壌の畑は全て手摘みで収穫し、野生酵母だけで発酵させる。「機械には畑の気持ちがわからない」というポリシーで知られる。" }
  },
  {
    id: "bretagne", name: "Bretagne Melon Skin Contact", region: "ブルターニュ / フランス",
    tags: ["acidic", "funky", "complex", "wild", "earthy"],
    description: "酸っぱくて少し野生的。サワーエール・ランビック好きが「やっとワインでこれを見つけた」と言う味。",
    grapes: "ムロン・ド・ブルゴーニュ", body: "中程度", color: "オレンジ", price: "¥3,500〜5,000",
    match_reason: "野生酵母由来のファンキーさと高い酸。発酵の複雑さが共通言語。",
    affiliate_url: "https://www.rakuten.co.jp/search/bretagne+skin+contact",
    producer: { name: "ドメーヌ・ド・ラ・ロシュ・ブランシュ", philosophy: "生物学者が解き明かす発酵の生態系", since: "2011年", location: "ブルターニュ、フィニステール県", profile: "元生物学者のマリー＝クレールが大西洋岸の崖の上にある畑で造る。土壌微生物の研究をそのままワイン造りに応用し、「発酵は生態系だ」という哲学のもと毎年まったく異なる表情のワインが生まれる。" }
  },
];

const TYPE_MAP = [
  {
    tags: ["funky", "wild", "acidic", "complex"],
    type: "発酵の哲学者", en: "THE FERMENTATION PHILOSOPHER", emoji: "🧪",
    color: ["#2a1200", "#5C2E00"], accent: "#FF6B35",
    desc: "複雑さの中に真実を見出す。自然の力を信じる醸造家と魂が共鳴する。",
    wine: "オレンジワイン / ペットナット", trait: "直感型・探求型・こだわり派",
    gift_message: "この人には「答えのないワイン」を。飲むたびに違う表情を見せるナチュラルワインが、きっと好奇心を刺激するはず。",
  },
  {
    tags: ["crisp", "clean", "mineral", "light", "fresh", "dry", "sharp", "mild-bitter"],
    type: "透明感の追求者", en: "THE CLARITY SEEKER", emoji: "💎",
    color: ["#0a1f35", "#1a3a5c"], accent: "#7EC8E3",
    desc: "雑味のない美しさを知っている。ミネラルと透明感が命のナチュラルワインに辿り着く。",
    wine: "ミネラル系白ワイン / シャブリ", trait: "完璧主義・審美眼あり・洗練された感性",
    gift_message: "この人には「余計なものが何もない」ワインを。すっきりとした余韻がその人の美意識にきっと刺さる。",
  },
  {
    tags: ["fruity", "floral", "soft", "effervescent", "delicate", "elegant", "citrus"],
    type: "泡と花の詩人", en: "THE SPARKLING POET", emoji: "🌸",
    color: ["#2D0A28", "#6B2D5E"], accent: "#F48FB1",
    desc: "軽やかさの中に深みを見つける詩人。発泡系のナチュラルワインが新しい世界を開く。",
    wine: "ペットナット / 農家シャンパン", trait: "感受性豊か・美意識高い・共感力強い",
    gift_message: "この人には「飲む前から楽しい」ワインを。泡が開く瞬間の香りで、もう笑顔になれるはず。",
  },
  {
    tags: ["rich", "full-body", "complex", "bold", "intense", "roasty", "dark", "malt"],
    type: "深淵の探検家", en: "THE DEPTH EXPLORER", emoji: "🌑",
    color: ["#100800", "#2D1400"], accent: "#C4922A",
    desc: "表面では飽き足らず、深みへと潜っていく。ボディのしっかりした赤で新しい深淵に出会う。",
    wine: "力強い赤 / オレンジワイン", trait: "本質追求型・集中力高い・直感的",
    gift_message: "この人には「一口で黙らせる」ワインを。飲んだ瞬間に言葉を失う、そんな存在感のある一本を。",
  },
  {
    tags: ["umami", "earthy", "round", "smooth", "gentle-bitter"],
    type: "大地の記憶人", en: "THE TERROIR KEEPER", emoji: "🌱",
    color: ["#0D1A08", "#2D4A1E"], accent: "#A8D5A2",
    desc: "土地の記憶を舌で読む人。テロワールを大切にする生産者のワインと波長が合う。",
    wine: "ボジョレー系軽い赤 / 自然派白", trait: "安定志向・深い共感・長期的視点",
    gift_message: "この人には「畑の空気ごと届く」ワインを。生産者の顔が見えるナチュラルワインが、きっと心に残る。",
  },
  {
    tags: ["oxidative", "nutty", "amber", "creamy", "texture", "sweet"],
    type: "時間の収集家", en: "THE TIME COLLECTOR", emoji: "⏳",
    color: ["#1A0E04", "#3D2B1F"], accent: "#D4A56A",
    desc: "時間が育てたものの価値を知っている。熟成オレンジワインで魂が震える。",
    wine: "ジュラのヴァン・ジョーヌ / 熟成オレンジ", trait: "忍耐力・審美眼・歴史感覚",
    gift_message: "この人には「時間をかけた」ワインを。熟成した深みが、その人の感性にじわじわと響くはず。",
  },
];

const COLOR_MAP = {
  "白": "#d4c89a", "赤": "#8b2635", "ロゼ": "#d4807a",
  "オレンジ": "#c47830", "白（発泡）": "#b8c878", "白（アンバー）": "#c4922a",
};

function scoreWine(selected, wine) {
  const allTags = selected.flatMap(s => s.tags);
  return wine.tags.filter(t => allTags.includes(t)).length;
}

function detectType(selected) {
  const allTags = selected.flatMap(s => s.tags);
  return [...TYPE_MAP]
    .map(t => ({ ...t, score: t.tags.filter(tag => allTags.includes(tag)).length }))
    .sort((a, b) => b.score - a.score)[0];
}

// ============================================================
// MAIN APP
// ============================================================

export default function App() {
  const [screen, setScreen] = useState("home"); // home | finder | diagnosis | gift
  const resetAll = () => setScreen("home");

  return (
    <div style={{ minHeight: "100vh", background: "#080604", color: "#e8e0d0", fontFamily: "'Georgia', serif" }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:0.4;transform:scale(0.95)} 50%{opacity:1;transform:scale(1.05)} }
      `}</style>

      {/* GLOBAL HEADER */}
      <div style={{ borderBottom: "1px solid #1a1610", padding: "20px 24px 16px", background: "#0a0806" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={resetAll} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.35em", color: "#5a4d3a", textTransform: "uppercase" }}>tsugi</div>
            <div style={{ fontSize: 13, color: "#c4922a", fontStyle: "italic" }}>次の一杯へ</div>
          </button>
          {screen !== "home" && (
            <button onClick={resetAll} style={{ fontSize: 11, color: "#4a3d2a", background: "none", border: "none", cursor: "pointer" }}>
              ← ホーム
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px 56px" }}>
        {screen === "home" && <HomeScreen onSelect={setScreen} />}
        {screen === "finder" && <FinderScreen onHome={resetAll} />}
        {screen === "diagnosis" && <DiagnosisScreen mode="self" onHome={resetAll} />}
        {screen === "gift" && <DiagnosisScreen mode="gift" onHome={resetAll} />}
      </div>
    </div>
  );
}

// ============================================================
// HOME SCREEN
// ============================================================

function HomeScreen({ onSelect }) {
  return (
    <div style={{ paddingTop: 32, animation: "fadeUp 0.4s ease" }}>
      <h1 style={{ fontSize: "clamp(22px,5vw,30px)", fontWeight: 400, margin: "0 0 8px", color: "#f0e8d8", lineHeight: 1.3 }}>
        あなたの「いつもの一杯」から<br />
        <span style={{ color: "#c4922a", fontStyle: "italic" }}>ナチュラルワイン</span>を見つける
      </h1>
      <p style={{ fontSize: 13, color: "#4a3d2a", lineHeight: 1.7, marginBottom: 36 }}>
        普段のビール・日本酒から、あなたに合うナチュラルワインと<br />生産者のストーリーを提案します。
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <HomeCard
          emoji="🍷" accent="#c4922a"
          title="ワインを探す"
          sub="普段のビール・日本酒からナチュラルワインをレコメンド。生産者ストーリーつき。"
          onClick={() => onSelect("finder")}
        />
        <HomeCard
          emoji="🔮" accent="#9B7EC8"
          title="自分のワインタイプ診断"
          sub="あなたの飲み方からワイン人格を診断。シェアしたくなるカードを生成。"
          onClick={() => onSelect("diagnosis")}
        />
        <HomeCard
          emoji="🎁" accent="#c47898"
          title="あの人へのワインを選ぶ"
          sub="相手の好みからぴったりのナチュラルワインを診断。ギフトカードとして送れる。"
          onClick={() => onSelect("gift")}
        />
      </div>
    </div>
  );
}

function HomeCard({ emoji, title, sub, onClick, accent }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "100%", padding: "20px 20px", textAlign: "left",
        background: hov ? "#141210" : "#0e0c09",
        border: `1px solid ${hov ? accent + "66" : "#2a2520"}`,
        borderRadius: 6, cursor: "pointer",
        display: "flex", alignItems: "center", gap: 16,
        transition: "all 0.2s",
        boxShadow: hov ? `0 0 24px ${accent}18` : "none",
      }}
    >
      <span style={{ fontSize: 28, flexShrink: 0 }}>{emoji}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, color: hov ? accent : "#e8e0d0", marginBottom: 4, transition: "color 0.2s" }}>{title}</div>
        <div style={{ fontSize: 12, color: "#5a4d3a", lineHeight: 1.5 }}>{sub}</div>
      </div>
      <span style={{ fontSize: 14, color: accent, opacity: hov ? 1 : 0.3, transition: "opacity 0.2s", flexShrink: 0 }}>→</span>
    </button>
  );
}

// ============================================================
// FINDER SCREEN
// ============================================================

function FinderScreen({ onHome }) {
  const [selected, setSelected] = useState([]);
  const [step, setStep] = useState("select");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedbacks, setFeedbacks] = useState({});

  const toggle = (item) => setSelected(prev =>
    prev.find(s => s.id === item.id) ? prev.filter(s => s.id !== item.id) : [...prev, item]
  );

  const findWines = async () => {
    if (!selected.length) return;
    setLoading(true);
    setStep("results");
    const scored = WINE_DB.map(w => ({ ...w, score: scoreWine(selected, w) }))
      .filter(w => w.score > 0).sort((a, b) => b.score - a.score).slice(0, 4);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1000,
          messages: [{ role: "user", content: `ナチュラルワインのソムリエとして、日本語で2〜3文の親しみやすいコメントを書いてください。\n好みのお酒: ${selected.map(s => s.name).join("、")}\nおすすめ1位: ${scored[0]?.name} (${scored[0]?.producer?.name})\n生産者の哲学: 「${scored[0]?.producer?.philosophy}」\nテイストの共通点と生産者ストーリーを絡めて、専門用語なしで。` }]
        })
      });
      const data = await res.json();
      setResults({ wines: scored, comment: data.content?.[0]?.text || "" });
    } catch { setResults({ wines: scored, comment: "" }); }
    setLoading(false);
  };

  if (step === "results" && loading) return (
    <div style={{ textAlign: "center", padding: "80px 0" }}>
      <div style={{ fontSize: 32, animation: "pulse 1.5s infinite" }}>🍷</div>
      <div style={{ fontSize: 13, color: "#6b5d4a", marginTop: 16, letterSpacing: "0.1em" }}>テイストと生産者を照合中...</div>
    </div>
  );

  if (step === "results" && results) return (
    <div style={{ paddingTop: 24, animation: "fadeUp 0.4s ease" }}>
      {results.comment && (
        <div style={{ background: "#1a1410", border: "1px solid #3a3025", borderLeft: "3px solid #c4922a", borderRadius: 4, padding: "16px 18px", marginBottom: 24, fontSize: 13, lineHeight: 1.8, color: "#c8b898", fontStyle: "italic" }}>
          🍷 {results.comment}
        </div>
      )}
      <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#4a3d2a", marginBottom: 14, textTransform: "uppercase" }}>
        おすすめ — {results.wines.length}本
      </div>
      {results.wines.map((wine, i) => (
        <WineCard key={wine.id} wine={wine} rank={i + 1} feedback={feedbacks[wine.id]}
          onFeedback={(id, val) => setFeedbacks(p => ({ ...p, [id]: val }))} />
      ))}
      <button onClick={() => { setSelected([]); setStep("select"); setResults(null); setFeedbacks({}); }}
        style={{ marginTop: 16, width: "100%", padding: "12px", background: "transparent", border: "1px solid #2a2520", color: "#5a4d3a", borderRadius: 4, fontSize: 13, fontFamily: "inherit", cursor: "pointer" }}>
        ← 選び直す
      </button>
    </div>
  );

  return (
    <div style={{ paddingTop: 24, animation: "fadeUp 0.4s ease" }}>
      <div style={{ fontSize: 13, color: "#8b7355", marginBottom: 24 }}>普段よく飲むものを選んでください（複数OK）</div>
      <SelectSection title="🍺 ビール">
        {BEER_OPTIONS.map(item => <Chip key={item.id} item={item} selected={!!selected.find(s => s.id === item.id)} onToggle={toggle} accent="#c4922a" />)}
      </SelectSection>
      <SelectSection title="🍶 日本酒">
        {SAKE_OPTIONS.map(item => <Chip key={item.id} item={item} selected={!!selected.find(s => s.id === item.id)} onToggle={toggle} accent="#c4922a" />)}
      </SelectSection>
      {selected.length > 0 && (
        <div style={{ fontSize: 11, color: "#5a4d3a", marginBottom: 14 }}>選択中: {selected.map(s => s.name).join("、")}</div>
      )}
      <button onClick={findWines} disabled={!selected.length}
        style={{ width: "100%", padding: "15px", background: selected.length ? "linear-gradient(135deg,#c4922a,#8B6914)" : "#1a1410", color: selected.length ? "#0e0c09" : "#3a3025", border: "none", borderRadius: 4, fontSize: 14, fontFamily: "inherit", cursor: selected.length ? "pointer" : "not-allowed", letterSpacing: "0.06em", transition: "all 0.2s" }}>
        ナチュラルワインを探す →
      </button>
    </div>
  );
}

// ============================================================
// WINE CARD
// ============================================================

function WineCard({ wine, rank, feedback, onFeedback }) {
  const [storyOpen, setStoryOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const barColor = COLOR_MAP[wine.color] || "#c4922a";
  const fbOpts = [
    { val: "hit", label: "ドンピシャ 🎯", color: "#4a8a4a" },
    { val: "ok", label: "まあまあ 🤔", color: "#8a7a3a" },
    { val: "miss", label: "違う 😅", color: "#8a3a3a" },
  ];
  const shareText = `🍷 ${wine.name}\n📍 ${wine.region}\n\n${wine.description}\n\n生産者: ${wine.producer?.name}\n「${wine.producer?.philosophy}」\n\n#tsugi #ナチュラルワイン`;

  return (
    <div style={{ background: "#141210", border: "1px solid #2a2520", borderRadius: 4, marginBottom: 14, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: barColor }} />
      <div style={{ padding: "16px 16px 14px", paddingLeft: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 9, color: "#4a3d2a", letterSpacing: "0.15em", marginBottom: 3 }}>#{rank} · {wine.color} · {wine.body}</div>
            <div style={{ fontSize: 16, color: "#f0e8d8", marginBottom: 2 }}>{wine.name}</div>
            <div style={{ fontSize: 11, color: "#7a6a50" }}>{wine.region} · {wine.grapes}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5, flexShrink: 0 }}>
            <div style={{ fontSize: 11, color: "#c4922a", background: "#1f1a14", padding: "3px 8px", borderRadius: 2 }}>{wine.price}</div>
            <a href={wine.affiliate_url} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 11, color: "#0e0c09", background: "#c4922a", padding: "4px 10px", borderRadius: 2, textDecoration: "none" }}>
              購入する →
            </a>
          </div>
        </div>
        <p style={{ fontSize: 13, color: "#9a8870", lineHeight: 1.7, margin: "10px 0 6px" }}>{wine.description}</p>
        <div style={{ fontSize: 11, color: "#4a3d2a", borderTop: "1px solid #1e1c18", paddingTop: 8, marginBottom: 12 }}>💡 {wine.match_reason}</div>

        {/* Producer story */}
        {wine.producer && (
          <div style={{ marginBottom: 12 }}>
            <button onClick={() => setStoryOpen(!storyOpen)}
              style={{ display: "flex", alignItems: "center", gap: 8, background: storyOpen ? "#1a1410" : "transparent", border: "1px solid #2a2520", borderRadius: 3, padding: "7px 12px", cursor: "pointer", width: "100%", transition: "all 0.2s" }}>
              <span style={{ fontSize: 13 }}>🧑‍🌾</span>
              <div style={{ flex: 1, textAlign: "left" }}>
                <div style={{ fontSize: 10, color: "#c4922a" }}>生産者のストーリー</div>
                <div style={{ fontSize: 11, color: "#7a6a50" }}>{wine.producer.name}</div>
              </div>
              <span style={{ fontSize: 10, color: "#4a3d2a" }}>{storyOpen ? "▲" : "▼"}</span>
            </button>
            {storyOpen && (
              <div style={{ background: "#0e0c09", border: "1px solid #2a2520", borderTop: "none", borderRadius: "0 0 3px 3px", padding: "14px 14px 12px", animation: "fadeUp 0.2s ease" }}>
                <div style={{ fontSize: 10, color: "#c4922a", border: "1px solid #3a3025", borderRadius: 2, display: "inline-block", padding: "2px 8px", marginBottom: 8, fontStyle: "italic" }}>
                  「{wine.producer.philosophy}」
                </div>
                <p style={{ fontSize: 12, color: "#9a8870", lineHeight: 1.8, margin: "0 0 10px" }}>{wine.producer.profile}</p>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 10 }}>
                  <div><div style={{ fontSize: 9, color: "#4a3d2a", letterSpacing: "0.1em", textTransform: "uppercase" }}>創業</div><div style={{ fontSize: 11, color: "#7a6a50" }}>{wine.producer.since}</div></div>
                  <div><div style={{ fontSize: 9, color: "#4a3d2a", letterSpacing: "0.1em", textTransform: "uppercase" }}>場所</div><div style={{ fontSize: 11, color: "#7a6a50" }}>{wine.producer.location}</div></div>
                </div>
                <button onClick={() => { navigator.clipboard?.writeText(shareText); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  style={{ fontSize: 11, padding: "5px 12px", background: copied ? "#2a3a2a" : "transparent", border: `1px solid ${copied ? "#4a8a4a" : "#2a2520"}`, color: copied ? "#4a8a4a" : "#5a4d3a", borderRadius: 2, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>
                  {copied ? "✓ コピーしました" : "📋 このワインをシェア"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Feedback */}
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, color: "#3a3025", marginRight: 4 }}>このすすめは？</span>
          {fbOpts.map(opt => (
            <button key={opt.val} onClick={() => onFeedback(wine.id, opt.val)}
              style={{ fontSize: 11, padding: "3px 9px", borderRadius: 2, cursor: "pointer", border: `1px solid ${feedback === opt.val ? opt.color : "#2a2520"}`, background: feedback === opt.val ? opt.color + "33" : "transparent", color: feedback === opt.val ? opt.color : "#4a3d2a", fontFamily: "inherit", transition: "all 0.15s" }}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// DIAGNOSIS SCREEN (self & gift)
// ============================================================

function DiagnosisScreen({ mode, onHome }) {
  const isGift = mode === "gift";
  const accent = isGift ? "#c47898" : "#9B7EC8";
  const [recipientName, setRecipientName] = useState("");
  const [selected, setSelected] = useState([]);
  const [step, setStep] = useState("select");
  const [result, setResult] = useState(null);
  const [aiComment, setAiComment] = useState("");

  const toggle = (item) => setSelected(prev =>
    prev.find(s => s.id === item.id) ? prev.filter(s => s.id !== item.id) : [...prev, item]
  );

  const target = isGift && recipientName ? `${recipientName}さん` : isGift ? "あの人" : "あなた";

  const diagnose = async () => {
    if (!selected.length) return;
    setStep("loading");
    const type = detectType(selected);
    setResult(type);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 300,
          messages: [{ role: "user", content: isGift
            ? `ナチュラルワインギフト診断です。贈る相手: ${target}。選んだお酒: ${selected.map(s => s.name).join("、")}。診断タイプ: 「${type.type}」。「${target}には〜」という書き出しで、贈り物として2文だけ詩的に。`
            : `ナチュラルワイン診断です。選んだお酒: ${selected.map(s => s.name).join("、")}。診断タイプ: 「${type.type}」。「あなたは〜」という書き出しで、ナチュラルワインへの入口として背中を押す2文を詩的にかっこよく。`
          }]
        })
      });
      const data = await res.json();
      setAiComment(data.content?.[0]?.text || "");
    } catch { setAiComment(""); }
    setStep("result");
  };

  const shareText = result
    ? isGift
      ? `🎁 ${target}のナチュラルワインタイプは「${result.type}」\n${result.en}\n\n${aiComment || result.gift_message}\n\nおすすめ: ${result.wine}\n\n#tsugi #ナチュラルワイン診断 #ワインギフト`
      : `🔮 私のナチュラルワインタイプは「${result.type}」\n${result.en}\n\n${aiComment || result.desc}\n\nおすすめ: ${result.wine}\n\n#tsugi #ナチュラルワイン診断`
    : "";

  if (step === "loading") return (
    <div style={{ textAlign: "center", padding: "80px 0" }}>
      <div style={{ fontSize: 36, animation: "pulse 1.5s infinite" }}>{isGift ? "🎁" : "🔮"}</div>
      <div style={{ fontSize: 13, color: "#6b5d4a", marginTop: 16, letterSpacing: "0.12em" }}>{target}のワインタイプを解析中...</div>
    </div>
  );

  if (step === "result" && result) return (
    <div style={{ paddingTop: 24, animation: "fadeUp 0.5s ease" }}>
      {/* Card */}
      <div style={{ background: `linear-gradient(145deg, ${result.color[0]}, ${result.color[1]})`, borderRadius: 12, padding: "36px 26px", marginBottom: 18, position: "relative", overflow: "hidden", boxShadow: `0 0 60px ${result.accent}33` }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 80% 20%, ${result.accent}22 0%, transparent 60%)`, pointerEvents: "none" }} />
        <div style={{ fontSize: 9, letterSpacing: "0.3em", color: result.accent, textTransform: "uppercase", marginBottom: 18, opacity: 0.8 }}>
          {isGift ? `tsugi · Gift for ${target}` : "tsugi · Wine Personality"}
        </div>
        {isGift && (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(0,0,0,0.3)", borderRadius: 20, padding: "4px 12px", marginBottom: 14, border: `1px solid ${result.accent}44` }}>
            <span style={{ fontSize: 11 }}>🎁</span>
            <span style={{ fontSize: 11, color: result.accent }}>{recipientName ? `${recipientName}さんへ` : "あの人へ"}</span>
          </div>
        )}
        <div style={{ fontSize: 44, marginBottom: 12, lineHeight: 1 }}>{result.emoji}</div>
        <div style={{ fontSize: "clamp(22px,5vw,32px)", fontWeight: 400, color: "#fff", lineHeight: 1.1, marginBottom: 5, textShadow: `0 0 40px ${result.accent}88` }}>
          {target}は{result.type}
        </div>
        <div style={{ fontSize: 10, letterSpacing: "0.2em", color: result.accent, marginBottom: 20, opacity: 0.85 }}>{result.en}</div>
        <div style={{ width: 36, height: 1, background: result.accent, opacity: 0.4, marginBottom: 16 }} />
        <p style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,0.85)", margin: "0 0 18px", fontStyle: "italic" }}>
          {aiComment || (isGift ? result.gift_message : result.desc)}
        </p>
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 16 }}>
          {result.trait.split("・").map(t => (
            <span key={t} style={{ fontSize: 10, padding: "3px 10px", border: `1px solid ${result.accent}55`, borderRadius: 20, color: result.accent }}>{t}</span>
          ))}
        </div>
        <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 6, padding: "10px 14px", borderLeft: `3px solid ${result.accent}` }}>
          <div style={{ fontSize: 9, color: result.accent, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 3 }}>
            {isGift ? "贈るべきナチュラルワイン" : "おすすめワイン"}
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.9)" }}>{result.wine}</div>
        </div>
        <div style={{ marginTop: 20, fontSize: 9, color: "rgba(255,255,255,0.12)", letterSpacing: "0.2em" }}>tsugi.wine</div>
      </div>

      {/* Share */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={() => navigator.clipboard?.writeText(shareText)}
          style={{ flex: 1, padding: "12px", background: "#141210", border: "1px solid #2a2520", color: accent, borderRadius: 4, fontSize: 12, fontFamily: "inherit", cursor: "pointer" }}>
          📋 コピー
        </button>
        <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer"
          style={{ flex: 1, padding: "12px", background: "#141210", border: "1px solid #2a2520", color: "#7a9ec4", borderRadius: 4, fontSize: 12, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
          𝕏 でシェア
        </a>
      </div>
      <div style={{ background: "#0a0806", border: "1px solid #1a1610", borderRadius: 4, padding: "12px 14px", marginBottom: 18, fontSize: 11, color: "#3a3025", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
        {shareText}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => { setSelected([]); setStep("select"); setResult(null); setAiComment(""); }}
          style={{ flex: 1, padding: "11px", background: "transparent", border: `1px solid ${accent}44`, color: accent, borderRadius: 4, fontSize: 12, fontFamily: "inherit", cursor: "pointer" }}>
          {isGift ? "別の人を診断 🎁" : "もう一度 🔮"}
        </button>
        <button onClick={onHome}
          style={{ flex: 1, padding: "11px", background: "transparent", border: "1px solid #2a2520", color: "#4a3d2a", borderRadius: 4, fontSize: 12, fontFamily: "inherit", cursor: "pointer" }}>
          ← ホーム
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop: 24, animation: "fadeUp 0.4s ease" }}>
      {isGift && (
        <div style={{ background: "#1a1410", border: "1px solid #3a2025", borderLeft: `3px solid ${accent}`, borderRadius: 4, padding: "14px 16px", marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: accent, marginBottom: 6 }}>🎁 ギフト診断モード</div>
          <input value={recipientName} onChange={e => setRecipientName(e.target.value)} placeholder="贈る相手の名前（任意）例：田中さん"
            style={{ width: "100%", padding: "9px 12px", background: "#0e0c09", border: "1px solid #2a2520", borderRadius: 3, color: "#e8e0d0", fontSize: 12, fontFamily: "inherit", boxSizing: "border-box", outline: "none" }} />
        </div>
      )}
      <div style={{ fontSize: 12, color: "#6b5d4a", marginBottom: 20 }}>
        {isGift ? `${target}がよく飲むものを選んでください` : "あなたがよく飲むものを選んでください"}
      </div>
      <SelectSection title="🍺 ビール">
        {BEER_OPTIONS.map(item => <Chip key={item.id} item={item} selected={!!selected.find(s => s.id === item.id)} onToggle={toggle} accent={accent} />)}
      </SelectSection>
      <SelectSection title="🍶 日本酒">
        {SAKE_OPTIONS.map(item => <Chip key={item.id} item={item} selected={!!selected.find(s => s.id === item.id)} onToggle={toggle} accent={accent} />)}
      </SelectSection>
      {selected.length > 0 && (
        <div style={{ fontSize: 11, color: "#4a3d2a", marginBottom: 14 }}>{selected.map(s => s.name).join(" · ")}</div>
      )}
      <button onClick={diagnose} disabled={!selected.length}
        style={{ width: "100%", padding: "15px", background: selected.length ? `linear-gradient(135deg, ${accent}, ${accent}99)` : "#1a1410", color: selected.length ? "#fff" : "#3a3025", border: "none", borderRadius: 4, fontSize: 14, fontFamily: "inherit", cursor: selected.length ? "pointer" : "not-allowed", letterSpacing: "0.08em", fontWeight: 600, transition: "all 0.2s" }}>
        {isGift ? "診断する 🎁" : "診断する 🔮"}
      </button>
    </div>
  );
}

// ============================================================
// SHARED COMPONENTS
// ============================================================

function SelectSection({ title, children }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ fontSize: 12, color: "#a09070", marginBottom: 10 }}>{title}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>{children}</div>
    </div>
  );
}

function Chip({ item, selected, onToggle, accent }) {
  return (
    <button onClick={() => onToggle(item)}
      style={{ padding: "7px 12px", background: selected ? accent + "28" : "#141210", color: selected ? accent : "#7a6a50", border: `1px solid ${selected ? accent : "#2a2520"}`, borderRadius: 2, fontSize: 12, fontFamily: "inherit", cursor: "pointer", transition: "all 0.15s", fontWeight: selected ? 600 : 400 }}>
      {item.name}
    </button>
  );
}