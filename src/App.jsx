import { useState } from "react";

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
    producer: { name: "ドメーヌ・ド・ラ・ペピエール", philosophy: "テロワールをそのままボトルへ", since: "1984年", location: "ロワール河口域、ナント近郊", profile: "マルク・オリヴィエが1984年に創業。化学肥料を一切使わず、畑仕事は全て手作業。年間生産量は約8万本と小規模ながら、世界中のナチュラルワイン愛好家から熱狂的な支持を受けている。" }
  },
  {
    id: "petnat", name: "Pét-Nat Rosé", region: "オーヴェルニュ / フランス",
    tags: ["fruity", "effervescent", "floral", "soft", "light", "fresh"],
    description: "発泡性のロゼ。イチゴやバラのような香り。ホワイトエール好きが自然に辿り着く世界。",
    grapes: "ガメイ / グロロ", body: "軽め", color: "ロゼ", price: "¥3,000〜4,500",
    match_reason: "フルーティーで花のような香り。苦みが少なく飲みやすい入門的ナチュラルワイン。",
    affiliate_url: "https://www.rakuten.co.jp/search/pet+nat+rose",
    producer: { name: "ドメーヌ・ボワ・ルカ", philosophy: "デザイナーの目で造るワイン", since: "2009年", location: "オーヴェルニュ火山地帯", profile: "元グラフィックデザイナーが都会を捨てて移住して始めたワイナリー。ラベルデザインも全て自分で手がける。" }
  },
  {
    id: "beaujolais", name: "Beaujolais Nature", region: "ボジョレー / フランス",
    tags: ["fruity", "light", "smooth", "gentle-bitter", "round"],
    description: "チェリーやイチゴのような明るい果実味。一番搾りの「丸さ」が好きな人に合う。",
    grapes: "ガメイ", body: "軽〜中程度", color: "赤", price: "¥3,000〜4,000",
    match_reason: "苦みがやわらかく果実の甘みが前に出る。飲み疲れしない軽やかさが共通。",
    affiliate_url: "https://www.rakuten.co.jp/search/beaujolais+nature",
    producer: { name: "ジャン・フォワヤール", philosophy: "ガメイの可能性を信じ続ける", since: "1981年", location: "ボジョレー、モルゴン村", profile: "ボジョレーのナチュラルワイン運動の父。1980年代に農薬なしでガメイ本来の果実味を引き出す醸造法を独自開発。" }
  },
  {
    id: "alsace-orange", name: "Alsace Pinot Gris Orange", region: "アルザス / フランス",
    tags: ["rich", "complex", "earthy", "umami", "full-body", "texture"],
    description: "皮ごと醸造したオレンジワイン。米の旨みに近い複雑さがある。純米酒が好きな人向け。",
    grapes: "ピノ・グリ", body: "しっかり", color: "オレンジ", price: "¥4,000〜6,000",
    match_reason: "旨みとコクが前に出るスタイル。タンニンが食事と溶け合う。",
    affiliate_url: "https://www.rakuten.co.jp/search/alsace+pinot+gris+orange",
    producer: { name: "ドメーヌ・ルネ・ミュレ", philosophy: "三代続く土地への敬意", since: "1948年", location: "アルザス、ランゲン・グランクリュ", profile: "標高400mの畑を手作業で耕す家族経営。祖父の代から続く農法を守りながらオレンジワインに挑戦。" }
  },
  {
    id: "jura", name: "Jura Savagnin Ouillé", region: "ジュラ / フランス",
    tags: ["oxidative", "nutty", "complex", "amber", "funky"],
    description: "シェリーに似た酸化熟成のニュアンス。古酒・熟成酒の世界観に通じる独特の深み。",
    grapes: "サヴァニャン", body: "中〜重め", color: "白（アンバー）", price: "¥5,000〜8,000",
    match_reason: "熟成由来のナッツや蜂蜜のニュアンスが古酒と共鳴する。",
    affiliate_url: "https://www.rakuten.co.jp/search/jura+savagnin",
    producer: { name: "ドメーヌ・ガネヴァ", philosophy: "50代からのセカンドライフで世界を驚かせた", since: "2000年", location: "ジュラ山脈", profile: "元銀行員が50代で転職してワイン造りを開始。「人生は一度きり」を体現した生産者。" }
  },
  {
    id: "champagne-rm", name: "Champagne RM", region: "シャンパーニュ / フランス",
    tags: ["effervescent", "light", "floral", "fresh", "elegant", "delicate"],
    description: "農家が自ら醸す小規模シャンパン。純米大吟醸の「透明な美しさ」に近い世界観。",
    grapes: "シャルドネ / ピノ・ノワール", body: "軽め", color: "白（発泡）", price: "¥6,000〜10,000",
    match_reason: "繊細な泡と上品な花の香り。雑味がなく洗練された飲み心地が共通。",
    affiliate_url: "https://www.rakuten.co.jp/search/champagne+recoltant",
    producer: { name: "ジャック・セロス", philosophy: "哲学者が造るシャンパン", since: "1988年", location: "コート・デ・ブラン、アヴィズ村", profile: "農家シャンパン（RMスタイル）のパイオニア。毎年限定2万本しか生産しない。" }
  },
  {
    id: "rhone-syrah", name: "Côtes du Rhône Syrah", region: "ローヌ / フランス",
    tags: ["dark", "bold", "intense", "roasty", "creamy"],
    description: "ダークチェリーとスパイス。スタウト好きが「こういうワインもあるのか」と驚く一本。",
    grapes: "シラー", body: "しっかり", color: "赤", price: "¥3,500〜5,000",
    match_reason: "焙煎感と濃厚なボディが黒ビールと同じ方向性。でも果実味が加わる。",
    affiliate_url: "https://www.rakuten.co.jp/search/rhone+syrah+biodynamic",
    producer: { name: "ドメーヌ・グラムノン", philosophy: "ワインへの介入は冒涜である", since: "1978年", location: "ローヌ北部", profile: "酸化防止剤ゼロ、フィルタリングなし。収穫から瓶詰めまで全て重力のみを使う。" }
  },
  {
    id: "bretagne", name: "Bretagne Melon Skin Contact", region: "ブルターニュ / フランス",
    tags: ["acidic", "funky", "complex", "wild", "earthy"],
    description: "酸っぱくて少し野生的。サワーエール・ランビック好きが「やっとワインでこれを見つけた」と言う味。",
    grapes: "ムロン・ド・ブルゴーニュ", body: "中程度", color: "オレンジ", price: "¥3,500〜5,000",
    match_reason: "野生酵母由来のファンキーさと高い酸。発酵の複雑さが共通言語。",
    affiliate_url: "https://www.rakuten.co.jp/search/bretagne+skin+contact",
    producer: { name: "ドメーヌ・ド・ラ・ロシュ・ブランシュ", philosophy: "生物学者が解き明かす発酵の生態系", since: "2011年", location: "ブルターニュ、フィニステール県", profile: "元生物学者が土壌微生物の研究をそのままワイン造りに応用。毎年まったく異なる表情のワインが生まれる。" }
  },
];

const TYPE_MAP = [
  {
    tags: ["funky", "wild", "acidic", "complex"],
    type: "発酵の哲学者", en: "THE FERMENTATION PHILOSOPHER", emoji: "🧪",
    color: ["#2a1200", "#5C2E00"], accent: "#FF6B35",
    desc: "複雑さの中に真実を見出す。自然の力を信じる醸造家と魂が共鳴する。",
    wine: "オレンジワイン / ペットナット", trait: "直感型・探求型・こだわり派",
  },
  {
    tags: ["crisp", "clean", "mineral", "light", "fresh", "dry", "sharp", "mild-bitter"],
    type: "透明感の追求者", en: "THE CLARITY SEEKER", emoji: "💎",
    color: ["#0a1f35", "#1a3a5c"], accent: "#7EC8E3",
    desc: "雑味のない美しさを知っている。ミネラルと透明感が命のナチュラルワインに辿り着く。",
    wine: "ミネラル系白ワイン / シャブリ", trait: "完璧主義・審美眼あり・洗練された感性",
  },
  {
    tags: ["fruity", "floral", "soft", "effervescent", "delicate", "elegant", "citrus"],
    type: "泡と花の詩人", en: "THE SPARKLING POET", emoji: "🌸",
    color: ["#2D0A28", "#6B2D5E"], accent: "#F48FB1",
    desc: "軽やかさの中に深みを見つける詩人。発泡系のナチュラルワインが新しい世界を開く。",
    wine: "ペットナット / 農家シャンパン", trait: "感受性豊か・美意識高い・共感力強い",
  },
  {
    tags: ["rich", "full-body", "complex", "bold", "intense", "roasty", "dark", "malt"],
    type: "深淵の探検家", en: "THE DEPTH EXPLORER", emoji: "🌑",
    color: ["#100800", "#2D1400"], accent: "#C4922A",
    desc: "表面では飽き足らず、深みへと潜っていく。ボディのしっかりした赤で新しい深淵に出会う。",
    wine: "力強い赤 / オレンジワイン", trait: "本質追求型・集中力高い・直感的",
  },
  {
    tags: ["umami", "earthy", "round", "smooth", "gentle-bitter"],
    type: "大地の記憶人", en: "THE TERROIR KEEPER", emoji: "🌱",
    color: ["#0D1A08", "#2D4A1E"], accent: "#A8D5A2",
    desc: "土地の記憶を舌で読む人。テロワールを大切にする生産者のワインと波長が合う。",
    wine: "ボジョレー系軽い赤 / 自然派白", trait: "安定志向・深い共感・長期的視点",
  },
  {
    tags: ["oxidative", "nutty", "amber", "creamy", "texture", "sweet"],
    type: "時間の収集家", en: "THE TIME COLLECTOR", emoji: "⏳",
    color: ["#1A0E04", "#3D2B1F"], accent: "#D4A56A",
    desc: "時間が育てたものの価値を知っている。熟成オレンジワインで魂が震える。",
    wine: "ジュラのヴァン・ジョーヌ / 熟成オレンジ", trait: "忍耐力・審美眼・歴史感覚",
  },
];

// ギフト診断の質問リスト
const GIFT_QUESTIONS = [
  {
    id: "drink",
    question: "普段よく飲むお酒は？",
    emoji: "🍺",
    options: [
      { label: "ビール（スッキリ系）", tags: ["crisp", "light", "clean"] },
      { label: "ビール（濃い・クラフト系）", tags: ["rich", "bold", "complex"] },
      { label: "日本酒（フルーティー）", tags: ["floral", "fruity", "delicate"] },
      { label: "日本酒（旨み・どっしり）", tags: ["umami", "earthy", "full-body"] },
      { label: "あまり飲まない", tags: ["light", "soft", "fresh"] },
    ]
  },
  {
    id: "coffee",
    question: "コーヒーはどう飲む？",
    emoji: "☕",
    options: [
      { label: "ブラック派", tags: ["dry", "crisp", "mild-bitter"] },
      { label: "ラテ・カフェオレ派", tags: ["creamy", "round", "smooth"] },
      { label: "甘めが好き", tags: ["sweet", "fruity", "soft"] },
      { label: "浅煎り・酸味が好き", tags: ["acidic", "floral", "fresh"] },
      { label: "コーヒーを飲まない", tags: ["light", "effervescent"] },
    ]
  },
  {
    id: "food",
    question: "好きな食べ物のジャンルは？",
    emoji: "🍽️",
    options: [
      { label: "和食・繊細な料理", tags: ["delicate", "clean", "mineral"] },
      { label: "肉料理・がっつり系", tags: ["bold", "full-body", "intense"] },
      { label: "エスニック・スパイシー", tags: ["funky", "wild", "aromatic"] },
      { label: "チーズ・発酵食品", tags: ["complex", "oxidative", "nutty"] },
      { label: "フルーツ・さっぱり系", tags: ["fruity", "effervescent", "floral"] },
    ]
  },
  {
    id: "personality",
    question: "自分の性格に近いのは？",
    emoji: "🪞",
    options: [
      { label: "計画的・しっかり者", tags: ["crisp", "clean", "mineral"] },
      { label: "好奇心旺盛・新しもの好き", tags: ["funky", "complex", "wild"] },
      { label: "感受性豊か・芸術が好き", tags: ["floral", "elegant", "delicate"] },
      { label: "どっしり・安定志向", tags: ["round", "smooth", "earthy"] },
      { label: "情熱的・直感で動く", tags: ["bold", "intense", "roasty"] },
    ]
  },
  {
    id: "weekend",
    question: "休日の過ごし方は？",
    emoji: "🌿",
    options: [
      { label: "家でゆっくり読書・映画", tags: ["round", "smooth", "texture"] },
      { label: "アウトドア・自然の中へ", tags: ["earthy", "mineral", "fresh"] },
      { label: "カフェや街を散策", tags: ["light", "fruity", "effervescent"] },
      { label: "友人と食事・飲み会", tags: ["rich", "complex", "full-body"] },
      { label: "一人でアート・音楽", tags: ["oxidative", "amber", "nutty"] },
    ]
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

function detectType(tagList) {
  return [...TYPE_MAP]
    .map(t => ({ ...t, score: t.tags.filter(tag => tagList.includes(tag)).length }))
    .sort((a, b) => b.score - a.score)[0];
}

function encodeData(data) {
  try { return "TG-" + btoa(encodeURIComponent(JSON.stringify(data))); }
  catch { return null; }
}

function decodeData(code) {
  try { return JSON.parse(decodeURIComponent(atob(code.replace(/^TG-/, "")))); }
  catch { return null; }
}

// ============================================================
// MAIN
// ============================================================

export default function App() {
  const [screen, setScreen] = useState("home");
  const [requestData, setRequestData] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: "#080604", color: "#e8e0d0", fontFamily: "'Georgia', serif" }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:0.4;transform:scale(0.95)} 50%{opacity:1;transform:scale(1.05)} }
        * { box-sizing: border-box; }
        input, textarea, button { font-family: 'Georgia', serif; }
      `}</style>

      <div style={{ borderBottom: "1px solid #141210", padding: "16px 24px", background: "#0a0806", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => { setScreen("home"); setRequestData(null); }}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left" }}>
            <div style={{ fontSize: 9, letterSpacing: "0.4em", color: "#3a3025", textTransform: "uppercase" }}>tsugi</div>
            <div style={{ fontSize: 11, color: "#c4922a", fontStyle: "italic" }}>次の一杯へ</div>
          </button>
          {screen !== "home" && (
            <button onClick={() => { setScreen("home"); setRequestData(null); }}
              style={{ fontSize: 11, color: "#3a3025", background: "none", border: "none", cursor: "pointer" }}>
              ← ホーム
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 20px 64px" }}>
        {screen === "home" && <HomeScreen onSelect={setScreen} onCodeEntered={(d) => { setRequestData(d); setScreen("recipient"); }} />}
        {screen === "finder" && <FinderScreen onHome={() => setScreen("home")} />}
        {screen === "diagnosis" && <DiagnosisScreen mode="self" onHome={() => setScreen("home")} />}
        {screen === "gift" && <DiagnosisScreen mode="gift" onHome={() => setScreen("home")} />}
        {screen === "sender" && <SenderScreen onHome={() => setScreen("home")} />}
        {screen === "recipient" && <RecipientScreen requestData={requestData} onHome={() => { setScreen("home"); setRequestData(null); }} />}
      </div>
    </div>
  );
}

// ============================================================
// HOME
// ============================================================

function HomeScreen({ onSelect, onCodeEntered }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const trimmed = code.trim();
    if (!trimmed.startsWith("TG-")) { setError("コードは「TG-」で始まる形式です。"); return; }
    const data = decodeData(trimmed);
    if (!data) { setError("コードを読み取れませんでした。正確にコピーされているか確認してください。"); return; }
    onCodeEntered(data);
  };

  return (
    <div style={{ paddingTop: 32, animation: "fadeUp 0.4s ease" }}>
      <div style={{ fontSize: 10, letterSpacing: "0.3em", color: "#4a3d2a", textTransform: "uppercase", marginBottom: 10 }}>
        Natural Wine Platform
      </div>
      <h1 style={{ fontSize: "clamp(20px,5vw,28px)", fontWeight: 400, margin: "0 0 8px", color: "#f0e8d8", lineHeight: 1.3 }}>
        あなたの「いつもの一杯」から<br />
        <span style={{ color: "#c4922a", fontStyle: "italic" }}>ナチュラルワイン</span>を見つける
      </h1>
      <p style={{ fontSize: 13, color: "#4a3d2a", lineHeight: 1.8, marginBottom: 32 }}>
        普段のビール・日本酒から提案。生産者のストーリーつき。
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
        {[
          { emoji: "🍷", title: "ワインを探す", sub: "普段のお酒からナチュラルワインをレコメンド", accent: "#c4922a", key: "finder" },
          { emoji: "🔮", title: "自分のワインタイプ診断", sub: "あなたのワイン人格を診断してシェア", accent: "#9B7EC8", key: "diagnosis" },
          { emoji: "🎁", title: "あの人へのワインを選ぶ（診断リクエスト）", sub: "相手に診断してもらって結果をメールで受け取る", accent: "#c47898", key: "sender" },
        ].map(item => (
          <HomeCard key={item.key} {...item} onClick={() => onSelect(item.key)} />
        ))}
      </div>

      <div style={{ background: "#0e0c09", border: "1px solid #2a2520", borderRadius: 8, padding: "20px" }}>
        <div style={{ fontSize: 12, color: "#6b5d4a", marginBottom: 12 }}>📩 診断リクエストを受け取った方</div>
        <textarea value={code} onChange={e => { setCode(e.target.value); setError(""); }}
          placeholder="TG-から始まるコードを貼り付け" rows={2}
          style={{ width: "100%", padding: "10px 12px", background: "#141210", border: `1px solid ${error ? "#8a3a3a" : "#2a2520"}`, borderRadius: 4, color: "#e8e0d0", fontSize: 12, fontFamily: "monospace", outline: "none", resize: "none", marginBottom: 8 }} />
        {error && <div style={{ fontSize: 11, color: "#8a3a3a", marginBottom: 8 }}>{error}</div>}
        <button onClick={handleSubmit} disabled={!code.trim()}
          style={{ width: "100%", padding: "11px", background: code.trim() ? "linear-gradient(135deg,#c47898,#8B4560)" : "#1a1410", color: code.trim() ? "#fff" : "#3a3025", border: "none", borderRadius: 4, fontSize: 13, cursor: code.trim() ? "pointer" : "not-allowed", fontWeight: 600, transition: "all 0.2s" }}>
          診断を開く →
        </button>
      </div>
    </div>
  );
}

function HomeCard({ emoji, title, sub, onClick, accent }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ width: "100%", padding: "18px 20px", textAlign: "left", background: hov ? "#141210" : "#0e0c09", border: `1px solid ${hov ? accent + "66" : "#2a2520"}`, borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 14, transition: "all 0.2s", boxShadow: hov ? `0 0 24px ${accent}18` : "none" }}>
      <span style={{ fontSize: 26, flexShrink: 0 }}>{emoji}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, color: hov ? accent : "#e8e0d0", marginBottom: 3, transition: "color 0.2s" }}>{title}</div>
        <div style={{ fontSize: 11, color: "#5a4d3a", lineHeight: 1.5 }}>{sub}</div>
      </div>
      <span style={{ fontSize: 13, color: accent, opacity: hov ? 1 : 0.3, flexShrink: 0 }}>→</span>
    </button>
  );
}

// ============================================================
// FINDER
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
    setLoading(true); setStep("results");
    const scored = WINE_DB.map(w => ({ ...w, score: scoreWine(selected, w) }))
      .filter(w => w.score > 0).sort((a, b) => b.score - a.score).slice(0, 4);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000,
          messages: [{ role: "user", content: `ナチュラルワインのソムリエとして2〜3文のコメントを日本語で。好みのお酒: ${selected.map(s => s.name).join("、")}。おすすめ1位: ${scored[0]?.name} (${scored[0]?.producer?.name})。生産者哲学:「${scored[0]?.producer?.philosophy}」。専門用語なしで親しみやすく。` }] })
      });
      const data = await res.json();
      setResults({ wines: scored, comment: data.content?.[0]?.text || "" });
    } catch { setResults({ wines: scored, comment: "" }); }
    setLoading(false);
  };

  if (step === "results" && loading) return (
    <div style={{ textAlign: "center", padding: "80px 0" }}>
      <div style={{ fontSize: 32, animation: "pulse 1.5s infinite" }}>🍷</div>
      <div style={{ fontSize: 13, color: "#6b5d4a", marginTop: 16 }}>テイストを照合中...</div>
    </div>
  );

  if (step === "results" && results) return (
    <div style={{ paddingTop: 24, animation: "fadeUp 0.4s ease" }}>
      {results.comment && (
        <div style={{ background: "#1a1410", border: "1px solid #3a3025", borderLeft: "3px solid #c4922a", borderRadius: 4, padding: "16px 18px", marginBottom: 24, fontSize: 13, lineHeight: 1.8, color: "#c8b898", fontStyle: "italic" }}>
          🍷 {results.comment}
        </div>
      )}
      <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#4a3d2a", marginBottom: 14, textTransform: "uppercase" }}>おすすめ — {results.wines.length}本</div>
      {results.wines.map((wine, i) => (
        <WineCard key={wine.id} wine={wine} rank={i + 1} feedback={feedbacks[wine.id]}
          onFeedback={(id, val) => setFeedbacks(p => ({ ...p, [id]: val }))} />
      ))}
      <button onClick={() => { setSelected([]); setStep("select"); setResults(null); }}
        style={{ marginTop: 16, width: "100%", padding: "12px", background: "transparent", border: "1px solid #2a2520", color: "#5a4d3a", borderRadius: 4, fontSize: 13, cursor: "pointer" }}>
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
      {selected.length > 0 && <div style={{ fontSize: 11, color: "#5a4d3a", marginBottom: 14 }}>選択中: {selected.map(s => s.name).join("、")}</div>}
      <button onClick={findWines} disabled={!selected.length}
        style={{ width: "100%", padding: "15px", background: selected.length ? "linear-gradient(135deg,#c4922a,#8B6914)" : "#1a1410", color: selected.length ? "#0e0c09" : "#3a3025", border: "none", borderRadius: 4, fontSize: 14, cursor: selected.length ? "pointer" : "not-allowed", letterSpacing: "0.06em", transition: "all 0.2s" }}>
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
  const barColor = COLOR_MAP[wine.color] || "#c4922a";
  const fbOpts = [
    { val: "hit", label: "ドンピシャ 🎯", color: "#4a8a4a" },
    { val: "ok", label: "まあまあ 🤔", color: "#8a7a3a" },
    { val: "miss", label: "違う 😅", color: "#8a3a3a" },
  ];
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
              <div style={{ background: "#0e0c09", border: "1px solid #2a2520", borderTop: "none", borderRadius: "0 0 3px 3px", padding: "14px", animation: "fadeUp 0.2s ease" }}>
                <div style={{ fontSize: 10, color: "#c4922a", border: "1px solid #3a3025", borderRadius: 2, display: "inline-block", padding: "2px 8px", marginBottom: 8, fontStyle: "italic" }}>「{wine.producer.philosophy}」</div>
                <p style={{ fontSize: 12, color: "#9a8870", lineHeight: 1.8, margin: "0 0 10px" }}>{wine.producer.profile}</p>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <div><div style={{ fontSize: 9, color: "#4a3d2a", textTransform: "uppercase" }}>創業</div><div style={{ fontSize: 11, color: "#7a6a50" }}>{wine.producer.since}</div></div>
                  <div><div style={{ fontSize: 9, color: "#4a3d2a", textTransform: "uppercase" }}>場所</div><div style={{ fontSize: 11, color: "#7a6a50" }}>{wine.producer.location}</div></div>
                </div>
              </div>
            )}
          </div>
        )}
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
// DIAGNOSIS (self & gift preview)
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
    const allTags = selected.flatMap(s => s.tags);
    const type = detectType(allTags);
    setResult(type);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 300,
          messages: [{ role: "user", content: `ナチュラルワイン診断。選んだお酒: ${selected.map(s => s.name).join("、")}。タイプ:「${type.type}」。「${target}は〜」で2文、詩的に。` }] })
      });
      const data = await res.json();
      setAiComment(data.content?.[0]?.text || "");
    } catch { setAiComment(""); }
    setStep("result");
  };

  const shareText = result ? `🔮 ${target}のナチュラルワインタイプは「${result.type}」\n${result.en}\n\n${aiComment || result.desc}\n\nおすすめ: ${result.wine}\n\n#tsugi #ナチュラルワイン診断` : "";

  if (step === "loading") return <LoadingScreen emoji={isGift ? "🎁" : "🔮"} text={`${target}のワインタイプを解析中...`} />;

  if (step === "result" && result) return (
    <div style={{ paddingTop: 24, animation: "fadeUp 0.5s ease" }}>
      <ResultCard result={result} target={target} comment={aiComment} />
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <button onClick={() => navigator.clipboard?.writeText(shareText)}
          style={{ flex: 1, padding: "12px", background: "#141210", border: "1px solid #2a2520", color: accent, borderRadius: 4, fontSize: 12, cursor: "pointer" }}>
          📋 コピー
        </button>
        <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer"
          style={{ flex: 1, padding: "12px", background: "#141210", border: "1px solid #2a2520", color: "#7a9ec4", borderRadius: 4, fontSize: 12, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
          𝕏 でシェア
        </a>
      </div>
      <div style={{ background: "#0a0806", border: "1px solid #1a1610", borderRadius: 4, padding: "12px", marginBottom: 16, fontSize: 11, color: "#3a3025", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{shareText}</div>
      <button onClick={() => { setSelected([]); setStep("select"); setResult(null); setAiComment(""); }}
        style={{ width: "100%", padding: "11px", background: "transparent", border: "1px solid #2a2520", color: "#4a3d2a", borderRadius: 4, fontSize: 12, cursor: "pointer" }}>
        もう一度診断
      </button>
    </div>
  );

  return (
    <div style={{ paddingTop: 24, animation: "fadeUp 0.4s ease" }}>
      {isGift && (
        <div style={{ background: "#1a1410", border: `1px solid #3a2025`, borderLeft: `3px solid ${accent}`, borderRadius: 4, padding: "14px 16px", marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: accent, marginBottom: 6 }}>🎁 ギフト診断モード</div>
          <input value={recipientName} onChange={e => setRecipientName(e.target.value)} placeholder="贈る相手の名前（任意）"
            style={{ width: "100%", padding: "9px 12px", background: "#0e0c09", border: "1px solid #2a2520", borderRadius: 3, color: "#e8e0d0", fontSize: 12, outline: "none" }} />
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
      {selected.length > 0 && <div style={{ fontSize: 11, color: "#4a3d2a", marginBottom: 14 }}>{selected.map(s => s.name).join(" · ")}</div>}
      <button onClick={diagnose} disabled={!selected.length}
        style={{ width: "100%", padding: "15px", background: selected.length ? `linear-gradient(135deg, ${accent}, ${accent}99)` : "#1a1410", color: selected.length ? "#fff" : "#3a3025", border: "none", borderRadius: 4, fontSize: 14, cursor: selected.length ? "pointer" : "not-allowed", fontWeight: 600, letterSpacing: "0.08em", transition: "all 0.2s" }}>
        診断する {isGift ? "🎁" : "🔮"}
      </button>
    </div>
  );
}

// ============================================================
// SENDER — generate request code
// ============================================================

function SenderScreen({ onHome }) {
  const [senderName, setSenderName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState("");
  const [notifyEmail, setNotifyEmail] = useState("");
  const [step, setStep] = useState("form");
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);

  const createCode = () => {
    const data = { senderName: senderName.trim() || "友人", recipientName: recipientName.trim(), message: message.trim(), notifyEmail: notifyEmail.trim() };
    const encoded = encodeData(data);
    if (!encoded) return;
    setCode(encoded);
    setStep("done");
  };

  const shareText = `🍷 ${senderName || "友人"}からナチュラルワイン診断リクエストが届いています！\n\n${message ? `「${message}」\n\n` : ""}tsugi（https://tsugi-two.vercel.app）を開いて以下のコードを貼り付けてください👇\n\n${code}\n\n#tsugi #ナチュラルワイン`;

  if (step === "done") return (
    <div style={{ paddingTop: 28, animation: "fadeUp 0.4s ease" }}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 36, marginBottom: 10 }}>🎉</div>
        <div style={{ fontSize: 17, color: "#f0e8d8", marginBottom: 6 }}>リクエスト完成！</div>
        <div style={{ fontSize: 12, color: "#5a4d3a" }}>{recipientName ? `${recipientName}さんに` : "相手に"}コードを送りましょう</div>
      </div>
      <div style={{ background: "linear-gradient(135deg,#1a0f08,#2a1a10)", border: "1px solid #c47898", borderRadius: 10, padding: "22px 20px", textAlign: "center", marginBottom: 18, boxShadow: "0 0 40px #c4789820" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.3em", color: "#c47898", textTransform: "uppercase", marginBottom: 10 }}>診断コード</div>
        <div style={{ fontSize: 11, color: "#c8b898", fontFamily: "monospace", wordBreak: "break-all", lineHeight: 1.6, background: "#0e0c09", borderRadius: 4, padding: "10px 12px", border: "1px solid #2a2520", marginBottom: 10 }}>{code}</div>
        {notifyEmail && <div style={{ fontSize: 11, color: "#5a4d3a" }}>結果は {notifyEmail} に届きます</div>}
      </div>
      <button onClick={() => { navigator.clipboard?.writeText(shareText); setCopied(true); setTimeout(() => setCopied(false), 2500); }}
        style={{ width: "100%", padding: "13px", marginBottom: 10, background: copied ? "#1a2a1a" : "linear-gradient(135deg,#c47898,#8B4560)", color: copied ? "#4a8a4a" : "#fff", border: `1px solid ${copied ? "#4a8a4a" : "transparent"}`, borderRadius: 4, fontSize: 13, cursor: "pointer", fontWeight: 600, transition: "all 0.3s" }}>
        {copied ? "✓ コピーしました！LINEで送ろう" : "📋 コードをコピーしてLINEで送る"}
      </button>
      <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer"
        style={{ display: "block", padding: "13px", background: "#141210", border: "1px solid #2a2520", color: "#7a9ec4", borderRadius: 4, fontSize: 12, textDecoration: "none", textAlign: "center", marginBottom: 20 }}>
        𝕏 でシェア
      </a>
      <div style={{ background: "#0a0806", border: "1px solid #1a1610", borderRadius: 4, padding: "14px", marginBottom: 20, fontSize: 11, color: "#3a3025", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{shareText}</div>
      <button onClick={() => { setStep("form"); setSenderName(""); setRecipientName(""); setMessage(""); setNotifyEmail(""); setCode(""); }}
        style={{ width: "100%", padding: "11px", background: "transparent", border: "1px solid #2a2520", color: "#4a3d2a", borderRadius: 4, fontSize: 12, cursor: "pointer" }}>
        別の人に送る
      </button>
    </div>
  );

  return (
    <div style={{ paddingTop: 28, animation: "fadeUp 0.4s ease" }}>
      <div style={{ fontSize: 11, color: "#c47898", letterSpacing: "0.1em", marginBottom: 6 }}>🎁 診断リクエストを作成</div>
      <p style={{ fontSize: 12, color: "#5a4d3a", lineHeight: 1.7, marginBottom: 24 }}>
        コードを生成して相手に送ります。相手が5つの質問に答えると、あなたのメールに診断結果が届きます。相手には結果は見えません。
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
        <Field label="あなたの名前" required>
          <input value={senderName} onChange={e => setSenderName(e.target.value)} placeholder="例：Genki" style={inputStyle} />
        </Field>
        <Field label="相手の名前（任意）">
          <input value={recipientName} onChange={e => setRecipientName(e.target.value)} placeholder="例：田中さん" style={inputStyle} />
        </Field>
        <Field label="メッセージ（任意）">
          <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="例：今度一緒にナチュラルワイン飲もう！" rows={2}
            style={{ ...inputStyle, resize: "none", lineHeight: 1.6 }} />
        </Field>
        <Field label="結果を受け取るメールアドレス" required>
          <input value={notifyEmail} onChange={e => setNotifyEmail(e.target.value)} placeholder="例：your@email.com" type="email" style={inputStyle} />
        </Field>
      </div>
      <button onClick={createCode} disabled={!senderName.trim() || !notifyEmail.trim()}
        style={{ width: "100%", padding: "15px", background: (senderName.trim() && notifyEmail.trim()) ? "linear-gradient(135deg,#c47898,#8B4560)" : "#1a1410", color: (senderName.trim() && notifyEmail.trim()) ? "#fff" : "#3a3025", border: "none", borderRadius: 4, fontSize: 14, cursor: (senderName.trim() && notifyEmail.trim()) ? "pointer" : "not-allowed", fontWeight: 600, letterSpacing: "0.08em", transition: "all 0.2s" }}>
        コードを生成する 🎁
      </button>
      {(!senderName.trim() || !notifyEmail.trim()) && (
        <div style={{ fontSize: 11, color: "#4a3d2a", marginTop: 8, textAlign: "center" }}>※ 名前とメールアドレスを入力してください</div>
      )}
    </div>
  );
}

// ============================================================
// RECIPIENT — step-by-step quiz, result hidden
// ============================================================

function RecipientScreen({ requestData, onHome }) {
  const [questionIndex, setQuestionIndex] = useState(-1); // -1 = welcome
  const [answers, setAnswers] = useState([]);
  const [step, setStep] = useState("welcome"); // welcome | quiz | sending | done
  const [selected, setSelected] = useState(null);

  const from = requestData?.senderName || "友人";
  const name = requestData?.recipientName || "あなた";
  const totalQ = GIFT_QUESTIONS.length;
  const currentQ = GIFT_QUESTIONS[questionIndex];

  const startQuiz = () => { setQuestionIndex(0); setStep("quiz"); };

  const selectOption = (option) => setSelected(option);

  const nextQuestion = async () => {
    if (!selected) return;
    const newAnswers = [...answers, { question: currentQ.question, answer: selected.label, tags: selected.tags }];
    setAnswers(newAnswers);
    setSelected(null);

    if (questionIndex < totalQ - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      // 全問回答完了 → 診断してメール送信
      setStep("sending");
      const allTags = newAnswers.flatMap(a => a.tags);
      const type = detectType(allTags);
      const topWine = WINE_DB.map(w => ({ ...w, score: w.tags.filter(t => allTags.includes(t)).length }))
        .sort((a, b) => b.score - a.score)[0];

      try {
        await fetch("/api/notify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            senderName: from,
            recipientName: name,
            notifyEmail: requestData?.notifyEmail,
            answers: newAnswers,
            wineType: type.type,
            wineEmoji: type.emoji,
            wineEn: type.en,
            trait: type.trait,
            recommendedWine: topWine?.name || type.wine,
            wineRegion: topWine?.region || "",
            wineDesc: topWine?.description || type.desc,
          }),
        });
      } catch (e) { console.error(e); }
      setStep("done");
    }
  };

  if (step === "welcome") return (
    <div style={{ paddingTop: 32, animation: "fadeUp 0.5s ease" }}>
      <div style={{ background: "linear-gradient(145deg,#1a0a14,#2d1020)", border: "1px solid #c47898", borderRadius: 12, padding: "32px 24px", textAlign: "center", marginBottom: 24, boxShadow: "0 0 50px #c4789830", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 50% 30%, #c4789818 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ fontSize: 40, marginBottom: 14 }}>💌</div>
        <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#c47898", textTransform: "uppercase", marginBottom: 10 }}>診断リクエスト</div>
        <div style={{ fontSize: 20, color: "#f0e8d8", marginBottom: 4 }}>{from}さんから</div>
        {requestData?.recipientName && <div style={{ fontSize: 14, color: "#c8b898", marginBottom: 12 }}>{name}へ</div>}
        {requestData?.message && (
          <div style={{ fontSize: 13, color: "#8a7060", fontStyle: "italic", lineHeight: 1.7, margin: "14px 0", padding: "12px 16px", background: "rgba(0,0,0,0.2)", borderRadius: 6, borderLeft: "2px solid #c47898" }}>
            「{requestData.message}」
          </div>
        )}
        <div style={{ fontSize: 12, color: "#5a4d3a", lineHeight: 1.7, marginTop: 12 }}>
          5つの質問に答えるだけ。<br />あなたにぴったりのナチュラルワインが見つかります。
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20 }}>
        {GIFT_QUESTIONS.map((q, i) => (
          <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", background: "#1a1410", border: "1px solid #2a2520", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>
            {q.emoji}
          </div>
        ))}
      </div>
      <button onClick={startQuiz}
        style={{ width: "100%", padding: "15px", background: "linear-gradient(135deg,#c47898,#8B4560)", color: "#fff", border: "none", borderRadius: 4, fontSize: 14, cursor: "pointer", fontWeight: 600, letterSpacing: "0.08em" }}>
        診断を始める →
      </button>
    </div>
  );

  if (step === "quiz" && currentQ) return (
    <div style={{ paddingTop: 28, animation: "fadeUp 0.3s ease" }}>
      {/* Progress */}
      <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
        {GIFT_QUESTIONS.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= questionIndex ? "#c47898" : "#2a2520", transition: "background 0.3s" }} />
        ))}
      </div>
      <div style={{ fontSize: 10, color: "#5a4d3a", letterSpacing: "0.1em", marginBottom: 8 }}>
        質問 {questionIndex + 1} / {totalQ}
      </div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 28, marginBottom: 10 }}>{currentQ.emoji}</div>
        <div style={{ fontSize: 18, color: "#f0e8d8", lineHeight: 1.4 }}>{currentQ.question}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {currentQ.options.map((opt, i) => (
          <button key={i} onClick={() => selectOption(opt)}
            style={{ padding: "14px 16px", textAlign: "left", background: selected?.label === opt.label ? "#2a1020" : "#0e0c09", border: `1px solid ${selected?.label === opt.label ? "#c47898" : "#2a2520"}`, borderRadius: 6, cursor: "pointer", fontSize: 13, color: selected?.label === opt.label ? "#f0e8d8" : "#8a7a60", transition: "all 0.15s" }}>
            {opt.label}
          </button>
        ))}
      </div>
      <button onClick={nextQuestion} disabled={!selected}
        style={{ width: "100%", padding: "14px", background: selected ? "linear-gradient(135deg,#c47898,#8B4560)" : "#1a1410", color: selected ? "#fff" : "#3a3025", border: "none", borderRadius: 4, fontSize: 14, cursor: selected ? "pointer" : "not-allowed", fontWeight: 600, transition: "all 0.2s" }}>
        {questionIndex < totalQ - 1 ? "次へ →" : "診断完了 →"}
      </button>
    </div>
  );

  if (step === "sending") return <LoadingScreen emoji="🍷" text="診断結果を送信中..." />;

  if (step === "done") return (
    <div style={{ paddingTop: 32, textAlign: "center", animation: "fadeUp 0.5s ease" }}>
      <div style={{ fontSize: 48, marginBottom: 20 }}>🍷</div>
      <div style={{ fontSize: 20, color: "#f0e8d8", marginBottom: 12 }}>ありがとうございました！</div>
      <div style={{ fontSize: 14, color: "#8a7060", lineHeight: 1.8, marginBottom: 32 }}>
        あなたの答えは{from}さんに届きました。<br />
        きっと素敵なナチュラルワインが見つかるはず。🌿
      </div>
      <div style={{ background: "#1a1410", border: "1px solid #2a2520", borderRadius: 8, padding: "20px", marginBottom: 24, fontSize: 13, color: "#6b5d4a", lineHeight: 1.7 }}>
        ナチュラルワインが気になったら<br />
        tsugiで自分のワインタイプも診断してみて
      </div>
      <button onClick={onHome}
        style={{ width: "100%", padding: "13px", background: "linear-gradient(135deg,#c4922a,#8B6914)", color: "#0e0c09", border: "none", borderRadius: 4, fontSize: 13, cursor: "pointer", fontWeight: 600 }}>
        tsugiで自分も診断してみる →
      </button>
    </div>
  );

  return null;
}

// ============================================================
// SHARED
// ============================================================

function ResultCard({ result, target, comment }) {
  return (
    <div style={{ background: `linear-gradient(145deg,${result.color[0]},${result.color[1]})`, borderRadius: 12, padding: "36px 24px", marginBottom: 18, position: "relative", overflow: "hidden", boxShadow: `0 0 60px ${result.accent}33` }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 80% 20%, ${result.accent}22 0%, transparent 60%)`, pointerEvents: "none" }} />
      <div style={{ fontSize: 9, letterSpacing: "0.3em", color: result.accent, textTransform: "uppercase", marginBottom: 16, opacity: 0.8 }}>tsugi · Wine Personality</div>
      <div style={{ fontSize: 44, marginBottom: 12, lineHeight: 1 }}>{result.emoji}</div>
      <div style={{ fontSize: "clamp(20px,5vw,30px)", fontWeight: 400, color: "#fff", lineHeight: 1.1, marginBottom: 5, textShadow: `0 0 40px ${result.accent}88` }}>{target}は{result.type}</div>
      <div style={{ fontSize: 10, letterSpacing: "0.2em", color: result.accent, marginBottom: 20, opacity: 0.85 }}>{result.en}</div>
      <div style={{ width: 36, height: 1, background: result.accent, opacity: 0.4, marginBottom: 16 }} />
      <p style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,0.85)", margin: "0 0 18px", fontStyle: "italic" }}>{comment || result.desc}</p>
      <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 16 }}>
        {result.trait.split("・").map(t => <span key={t} style={{ fontSize: 10, padding: "3px 10px", border: `1px solid ${result.accent}55`, borderRadius: 20, color: result.accent }}>{t}</span>)}
      </div>
      <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 6, padding: "10px 14px", borderLeft: `3px solid ${result.accent}` }}>
        <div style={{ fontSize: 9, color: result.accent, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 3 }}>おすすめワイン</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.9)" }}>{result.wine}</div>
      </div>
      <div style={{ marginTop: 20, fontSize: 9, color: "rgba(255,255,255,0.12)", letterSpacing: "0.2em" }}>tsugi.wine</div>
    </div>
  );
}

function LoadingScreen({ emoji, text }) {
  return (
    <div style={{ textAlign: "center", padding: "80px 0" }}>
      <div style={{ fontSize: 36, animation: "pulse 1.5s infinite" }}>{emoji}</div>
      <div style={{ fontSize: 13, color: "#6b5d4a", marginTop: 16 }}>{text}</div>
    </div>
  );
}

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
      style={{ padding: "7px 12px", background: selected ? accent + "28" : "#141210", color: selected ? accent : "#7a6a50", border: `1px solid ${selected ? accent : "#2a2520"}`, borderRadius: 2, fontSize: 12, cursor: "pointer", transition: "all 0.15s", fontWeight: selected ? 600 : 400 }}>
      {item.name}
    </button>
  );
}

const inputStyle = { width: "100%", padding: "10px 12px", background: "#141210", border: "1px solid #2a2520", borderRadius: 4, color: "#e8e0d0", fontSize: 13, outline: "none" };

function Field({ label, required, children }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: "#6b5d4a", marginBottom: 6 }}>{label}{required && <span style={{ color: "#c47898", marginLeft: 4 }}>*</span>}</div>
      {children}
    </div>
  );
}
