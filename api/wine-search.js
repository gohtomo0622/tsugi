// api/wine-search.js
// 楽天 OpenAPI v2 対応版

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  const APP_ID       = (process.env.RAKUTEN_APP_ID    || "").trim();
  const ACCESS_KEY   = (process.env.RAKUTEN_ACCESS_KEY || "").trim();
  const AFFILIATE_ID = (process.env.RAKUTEN_AFFILIATE_ID || "").trim();
  const { tags, month } = req.query;

  if (!APP_ID) {
    return res.status(500).json({ error: "RAKUTEN_APP_ID not configured" });
  }

  // タグ→キーワード変換
  const TAG_KEYWORDS = {
    earthy:       "ナチュラルワイン 赤",
    funky:        "自然派ワイン ビオ",
    mineral:      "ナチュラルワイン 白",
    oxidative:    "オレンジワイン",
    aged:         "ナチュラルワイン 熟成",
    amber:        "オレンジワイン アンバー",
    petnat:       "ペットナット",
    effervescent: "ペットナット 微発泡",
    fruity:       "ナチュラルワイン フルーティ",
    floral:       "自然派ワイン 白 華やか",
    crisp:        "ナチュラルワイン 白 辛口",
    bold:         "ナチュラルワイン 赤 フルボディ",
    wild:         "自然派ワイン",
    natural:      "ナチュラルワイン",
    organic:      "オーガニックワイン",
    complex:      "ナチュラルワイン 複雑",
    light:        "ナチュラルワイン 軽口",
    umami:        "自然派ワイン 赤",
  };

  // 季節キーワード
  const m = parseInt(month) || new Date().getMonth() + 1;
  let kw = "ナチュラルワイン";
  if ([3,4,5].includes(m))   kw = "ナチュラルワイン 白";
  if ([6,7,8].includes(m))   kw = "ペットナット 自然派";
  if ([9,10,11].includes(m)) kw = "ナチュラルワイン 赤";
  if ([12,1,2].includes(m))  kw = "オレンジワイン 自然派";

  if (tags) {
    const t = tags.split(",")[0];
    if (TAG_KEYWORDS[t]) kw = TAG_KEYWORDS[t];
  }

  // OpenAPI v2 エンドポイント
  const params = new URLSearchParams({
    applicationId: APP_ID,
    accessKey:     ACCESS_KEY,
    keyword:       kw,
    hits:          "12",
    formatVersion: "2",
  });

  if (AFFILIATE_ID) params.set("affiliateId", AFFILIATE_ID);

  const url = `https://openapi.rakuten.co.jp/v2/market/item/search?${params}`;

  try {
    const r = await fetch(url, {
      headers: { "Accept": "application/json" },
    });
    const text = await r.text();

    if (!r.ok) {
      console.error("Rakuten OpenAPI error:", r.status, text.slice(0, 300));
      return res.status(200).json({
        items: [],
        keyword: kw,
        error_detail: text.slice(0, 300),
        status: r.status,
      });
    }

    const data = JSON.parse(text);

    // OpenAPI v2: 小文字フィールド対応（items または Items）
    const rawItems = data.items || data.Items || [];

    if (rawItems.length === 0) {
      return res.status(200).json({ items: [], keyword: kw, total: 0 });
    }

    const items = rawItems.slice(0, 12).map(item => {
      const i = item.item || item.Item || item;
      return {
        name:        i.itemName    || i.name        || "",
        price:       i.itemPrice   || i.price       || 0,
        priceStr:    `¥${(i.itemPrice || i.price || 0).toLocaleString()}`,
        shop:        i.shopName    || i.shop        || "",
        imageUrl:    i.mediumImageUrls?.[0]?.imageUrl
                  || i.imageUrl
                  || i.images?.[0]
                  || "",
        itemUrl:     i.affiliateUrl || i.itemUrl    || i.url || "",
        reviewAvg:   i.reviewAverage || i.rating    || 0,
        reviewCount: i.reviewCount   || i.reviews   || 0,
      };
    });

    return res.status(200).json({
      items,
      keyword: kw,
      total: data.count || data.total || rawItems.length,
    });

  } catch (err) {
    console.error("Fetch error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
