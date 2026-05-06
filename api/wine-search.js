// api/wine-search.js
// Vercel Serverless Function — 楽天API経由でナチュラルワインを検索

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  const { keyword, tags, month } = req.query;

  const APP_ID       = process.env.RAKUTEN_APP_ID;
  const AFFILIATE_ID = process.env.RAKUTEN_AFFILIATE_ID;

  if (!APP_ID) {
    return res.status(500).json({ error: "RAKUTEN_APP_ID not configured" });
  }

  // タグから検索キーワードを生成
  const TAG_TO_KEYWORD = {
    earthy:       "ナチュラルワイン 土",
    funky:        "ナチュラルワイン ビオ 野性味",
    mineral:      "ナチュラルワイン ミネラル",
    oxidative:    "ナチュラルワイン オレンジワイン 酸化",
    aged:         "ナチュラルワイン 熟成",
    amber:        "アンバーワイン オレンジワイン",
    petnat:       "ペットナット 微発泡 自然派",
    effervescent: "ペットナット スパークリング 自然派",
    fruity:       "ナチュラルワイン フルーティ",
    floral:       "ナチュラルワイン 花 アロマ",
    crisp:        "ナチュラルワイン 白 すっきり",
    bold:         "ナチュラルワイン 赤 フルボディ",
    complex:      "ナチュラルワイン 複雑",
    fresh:        "ナチュラルワイン フレッシュ 白",
    light:        "ナチュラルワイン 軽い 赤",
    umami:        "ナチュラルワイン 旨味 赤",
    nutty:        "ジュラ ナチュラルワイン",
    saline:       "ナチュラルワイン ミネラル 塩",
  };

  // 季節キーワード
  const currentMonth = parseInt(month) || new Date().getMonth() + 1;
  const SEASON_KEYWORDS = {
    spring: [3, 4, 5],
    summer: [6, 7, 8],
    autumn: [9, 10, 11],
    winter: [12, 1, 2],
  };
  let seasonKeyword = "ナチュラルワイン";
  if (SEASON_KEYWORDS.spring.includes(currentMonth)) seasonKeyword = "ナチュラルワイン 白 軽い";
  if (SEASON_KEYWORDS.summer.includes(currentMonth)) seasonKeyword = "ペットナット ナチュラルワイン 爽やか";
  if (SEASON_KEYWORDS.autumn.includes(currentMonth)) seasonKeyword = "ナチュラルワイン ボジョレー 赤";
  if (SEASON_KEYWORDS.winter.includes(currentMonth)) seasonKeyword = "ナチュラルワイン 熟成 オレンジ";

  // キーワード決定
  let searchKeyword = keyword || seasonKeyword;
  if (tags) {
    const tagList = tags.split(",").filter(Boolean);
    const tagKeyword = TAG_TO_KEYWORD[tagList[0]] || "ナチュラルワイン";
    searchKeyword = tagKeyword;
  }

  try {
    const params = new URLSearchParams({
      applicationId: APP_ID,
      ...(AFFILIATE_ID && { affiliateId: AFFILIATE_ID }),
      keyword:       searchKeyword,
      hits:          "12",
      page:          "1",
      availability:  "1",           // 在庫あり商品のみ
      sort:          "-reviewCount", // レビュー数順
      format:        "json",
      formatVersion: "2",
      // ワインカテゴリ絞り込み（楽天ジャンルID: 酒・飲料）
      genreId:       "410978",
    });

    const url = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?${params}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Rakuten API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.Items || data.Items.length === 0) {
      // フォールバック: ジャンル絞り込みなしで再検索
      const params2 = new URLSearchParams({
        applicationId: APP_ID,
        ...(AFFILIATE_ID && { affiliateId: AFFILIATE_ID }),
        keyword:       "ナチュラルワイン 自然派",
        hits:          "12",
        availability:  "1",
        sort:          "-reviewCount",
        format:        "json",
        formatVersion: "2",
      });
      const res2 = await fetch(`https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?${params2}`);
      const data2 = await res2.json();
      return res.status(200).json({
        items: formatItems(data2.Items || [], AFFILIATE_ID),
        keyword: "ナチュラルワイン 自然派",
        month: currentMonth,
        total: data2.count || 0,
      });
    }

    return res.status(200).json({
      items: formatItems(data.Items, AFFILIATE_ID),
      keyword: searchKeyword,
      month: currentMonth,
      total: data.count || 0,
    });

  } catch (err) {
    console.error("Rakuten API error:", err);
    return res.status(500).json({ error: err.message });
  }
}

function formatItems(items, affiliateId) {
  return items.slice(0, 12).map(item => {
    const i = item.Item || item;
    return {
      name:       i.itemName || "",
      price:      i.itemPrice || 0,
      priceStr:   `¥${(i.itemPrice || 0).toLocaleString()}`,
      shop:       i.shopName || "",
      imageUrl:   i.mediumImageUrls?.[0]?.imageUrl || i.smallImageUrls?.[0]?.imageUrl || "",
      itemUrl:    i.affiliateUrl || i.itemUrl || "",
      reviewAvg:  i.reviewAverage || 0,
      reviewCount:i.reviewCount || 0,
      catchCopy:  i.catchcopy || "",
    };
  });
}
