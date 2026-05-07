// api/wine-search.js
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  const APP_ID       = (process.env.RAKUTEN_APP_ID || "").trim();
  const ACCESS_KEY   = (process.env.RAKUTEN_ACCESS_KEY || "").trim();
  const AFFILIATE_ID = (process.env.RAKUTEN_AFFILIATE_ID || "").trim();
  const { tags, month } = req.query;

  if (!APP_ID) {
    return res.status(500).json({ error: "RAKUTEN_APP_ID not configured" });
  }

  // タグ→キーワード
  const TAG_KEYWORDS = {
    earthy:"ナチュラルワイン 赤", funky:"自然派ワイン", mineral:"ナチュラルワイン 白",
    oxidative:"オレンジワイン", aged:"ナチュラルワイン 熟成", amber:"オレンジワイン",
    petnat:"ペットナット", effervescent:"ペットナット", fruity:"ナチュラルワイン",
    floral:"自然派ワイン 白", crisp:"ナチュラルワイン 白", bold:"ナチュラルワイン 赤",
    wild:"自然派ワイン", natural:"ナチュラルワイン", organic:"オーガニックワイン",
  };

  const m = parseInt(month) || new Date().getMonth() + 1;
  let kw = "ナチュラルワイン";
  if ([3,4,5].includes(m))   kw = "ナチュラルワイン";
  if ([6,7,8].includes(m))   kw = "ナチュラルワイン";
  if ([9,10,11].includes(m)) kw = "ナチュラルワイン";
  if ([12,1,2].includes(m))  kw = "ナチュラルワイン";

  if (tags) {
    const t = tags.split(",")[0];
    if (TAG_KEYWORDS[t]) kw = TAG_KEYWORDS[t];
  }

  // 最小限のパラメータのみ使用
const params = new URLSearchParams({
  applicationId: APP_ID,
  accessKey:     ACCESS_KEY, // ← この1行を忘れずに追加！
  keyword:       kw,
  hits:          "12",
  formatVersion: "2",
});

  // アフィリエイトIDがあれば追加
  if (AFFILIATE_ID) params.set("affiliateId", AFFILIATE_ID);

  const url = `https://openapi.rakuten.co.jp/services/api/IchibaItem/Search/v2?${params}`;
  
  try {
    const r = await fetch(url);
    const text = await r.text();

    if (!r.ok) {
      // エラー詳細をログに出す
      console.error("Rakuten error status:", r.status, text.slice(0, 300));
      return res.status(200).json({
        items: [], keyword: kw, error_detail: text.slice(0, 200), status: r.status
      });
    }

    const data = JSON.parse(text);
    if (data.error) {
      return res.status(200).json({ items: [], keyword: kw, rakuten_error: data.error });
    }

    const items = (data.Items || []).slice(0, 12).map(item => {
      const i = item.Item || item;
      return {
        name:        i.itemName || "",
        price:       i.itemPrice || 0,
        priceStr:    `¥${(i.itemPrice || 0).toLocaleString()}`,
        shop:        i.shopName || "",
        imageUrl:    (i.mediumImageUrls?.[0]?.imageUrl) || "",
        itemUrl:     i.affiliateUrl || i.itemUrl || "",
        reviewAvg:   i.reviewAverage || 0,
        reviewCount: i.reviewCount || 0,
      };
    });

    return res.status(200).json({ items, keyword: kw, total: data.count || 0 });

  } catch (err) {
    console.error("Fetch error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
