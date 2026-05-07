warning: in the working copy of 'api/wine-search.js', LF will be replaced by CRLF the next time Git touches it
[1mdiff --git a/api/wine-search.js b/api/wine-search.js[m
[1mindex d59ae94..80851df 100644[m
[1m--- a/api/wine-search.js[m
[1m+++ b/api/wine-search.js[m
[36m@@ -1,137 +1,86 @@[m
 // api/wine-search.js[m
[31m-// Vercel Serverless Function — 楽天API経由でナチュラルワインを検索[m
[31m-[m
 export default async function handler(req, res) {[m
[31m-  // CORS[m
   res.setHeader("Access-Control-Allow-Origin", "*");[m
   res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");[m
   if (req.method === "OPTIONS") return res.status(200).end();[m
 [m
[31m-  const { keyword, tags, month } = req.query;[m
[31m-[m
[31m-  const APP_ID       = process.env.RAKUTEN_APP_ID;[m
[31m-  const AFFILIATE_ID = process.env.RAKUTEN_AFFILIATE_ID;[m
[32m+[m[32m  const APP_ID       = (process.env.RAKUTEN_APP_ID || "").trim();[m
[32m+[m[32m  const AFFILIATE_ID = (process.env.RAKUTEN_AFFILIATE_ID || "").trim();[m
[32m+[m[32m  const { tags, month } = req.query;[m
 [m
   if (!APP_ID) {[m
     return res.status(500).json({ error: "RAKUTEN_APP_ID not configured" });[m
   }[m
 [m
[31m-  // タグから検索キーワードを生成[m
[31m-  const TAG_TO_KEYWORD = {[m
[31m-    earthy:       "ナチュラルワイン 土",[m
[31m-    funky:        "ナチュラルワイン ビオ 野性味",[m
[31m-    mineral:      "ナチュラルワイン ミネラル",[m
[31m-    oxidative:    "ナチュラルワイン オレンジワイン 酸化",[m
[31m-    aged:         "ナチュラルワイン 熟成",[m
[31m-    amber:        "アンバーワイン オレンジワイン",[m
[31m-    petnat:       "ペットナット 微発泡 自然派",[m
[31m-    effervescent: "ペットナット スパークリング 自然派",[m
[31m-    fruity:       "ナチュラルワイン フルーティ",[m
[31m-    floral:       "ナチュラルワイン 花 アロマ",[m
[31m-    crisp:        "ナチュラルワイン 白 すっきり",[m
[31m-    bold:         "ナチュラルワイン 赤 フルボディ",[m
[31m-    complex:      "ナチュラルワイン 複雑",[m
[31m-    fresh:        "ナチュラルワイン フレッシュ 白",[m
[31m-    light:        "ナチュラルワイン 軽い 赤",[m
[31m-    umami:        "ナチュラルワイン 旨味 赤",[m
[31m-    nutty:        "ジュラ ナチュラルワイン",[m
[31m-    saline:       "ナチュラルワイン ミネラル 塩",[m
[32m+[m[32m  // タグ→キーワード[m
[32m+[m[32m  const TAG_KEYWORDS = {[m
[32m+[m[32m    earthy:"ナチュラルワイン 赤", funky:"自然派ワイン", mineral:"ナチュラルワイン 白",[m
[32m+[m[32m    oxidative:"オレンジワイン", aged:"ナチュラルワイン 熟成", amber:"オレンジワイン",[m
[32m+[m[32m    petnat:"ペットナット", effervescent:"ペットナット", fruity:"ナチュラルワイン",[m
[32m+[m[32m    floral:"自然派ワイン 白", crisp:"ナチュラルワイン 白", bold:"ナチュラルワイン 赤",[m
[32m+[m[32m    wild:"自然派ワイン", natural:"ナチュラルワイン", organic:"オーガニックワイン",[m
   };[m
 [m
[31m-  // 季節キーワード[m
[31m-  const currentMonth = parseInt(month) || new Date().getMonth() + 1;[m
[31m-  const SEASON_KEYWORDS = {[m
[31m-    spring: [3, 4, 5],[m
[31m-    summer: [6, 7, 8],[m
[31m-    autumn: [9, 10, 11],[m
[31m-    winter: [12, 1, 2],[m
[31m-  };[m
[31m-  let seasonKeyword = "ナチュラルワイン";[m
[31m-  if (SEASON_KEYWORDS.spring.includes(currentMonth)) seasonKeyword = "ナチュラルワイン 白 軽い";[m
[31m-  if (SEASON_KEYWORDS.summer.includes(currentMonth)) seasonKeyword = "ペットナット ナチュラルワイン 爽やか";[m
[31m-  if (SEASON_KEYWORDS.autumn.includes(currentMonth)) seasonKeyword = "ナチュラルワイン ボジョレー 赤";[m
[31m-  if (SEASON_KEYWORDS.winter.includes(currentMonth)) seasonKeyword = "ナチュラルワイン 熟成 オレンジ";[m
[32m+[m[32m  const m = parseInt(month) || new Date().getMonth() + 1;[m
[32m+[m[32m  let kw = "ナチュラルワイン";[m
[32m+[m[32m  if ([3,4,5].includes(m))   kw = "ナチュラルワイン 白ワイン";[m
[32m+[m[32m  if ([6,7,8].includes(m))   kw = "ペットナット 自然派ワイン";[m
[32m+[m[32m  if ([9,10,11].includes(m)) kw = "ナチュラルワイン 赤ワイン";[m
[32m+[m[32m  if ([12,1,2].includes(m))  kw = "オレンジワイン 自然派";[m
 [m
[31m-  // キーワード決定[m
[31m-  let searchKeyword = keyword || seasonKeyword;[m
   if (tags) {[m
[31m-    const tagList = tags.split(",").filter(Boolean);[m
[31m-    const tagKeyword = TAG_TO_KEYWORD[tagList[0]] || "ナチュラルワイン";[m
[31m-    searchKeyword = tagKeyword;[m
[32m+[m[32m    const t = tags.split(",")[0];[m
[32m+[m[32m    if (TAG_KEYWORDS[t]) kw = TAG_KEYWORDS[t];[m
   }[m
 [m
[31m-  try {[m
[31m-    const params = new URLSearchParams({[m
[31m-      applicationId: APP_ID,[m
[31m-      ...(AFFILIATE_ID && { affiliateId: AFFILIATE_ID }),[m
[31m-      keyword:       searchKeyword,[m
[31m-      hits:          "12",[m
[31m-      page:          "1",[m
[31m-      availability:  "1",           // 在庫あり商品のみ[m
[31m-      sort:          "-reviewCount", // レビュー数順[m
[31m-      format:        "json",[m
[31m-      formatVersion: "2",[m
[31m-      // ワインカテゴリ絞り込み（楽天ジャンルID: 酒・飲料）[m
[31m-      genreId:       "410978",[m
[31m-    });[m
[32m+[m[32m  // 最小限のパラメータのみ使用[m
[32m+[m[32m  const params = new URLSearchParams({[m
[32m+[m[32m    applicationId:  APP_ID,[m
[32m+[m[32m    keyword:        kw,[m
[32m+[m[32m    hits:           "12",[m
[32m+[m[32m    formatVersion:  "2",[m
[32m+[m[32m  });[m
 [m
[31m-    const url = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?${params}`;[m
[31m-    const response = await fetch(url);[m
[32m+[m[32m  // アフィリエイトIDがあれば追加[m
[32m+[m[32m  if (AFFILIATE_ID) params.set("affiliateId", AFFILIATE_ID);[m
 [m
[31m-    if (!response.ok) {[m
[31m-      throw new Error(`Rakuten API error: ${response.status}`);[m
[31m-    }[m
[32m+[m[32m  const url = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?${params}`;[m
 [m
[31m-    const data = await response.json();[m
[32m+[m[32m  try {[m
[32m+[m[32m    const r = await fetch(url);[m
[32m+[m[32m    const text = await r.text();[m
 [m
[31m-    if (!data.Items || data.Items.length === 0) {[m
[31m-      // フォールバック: ジャンル絞り込みなしで再検索[m
[31m-      const params2 = new URLSearchParams({[m
[31m-        applicationId: APP_ID,[m
[31m-        ...(AFFILIATE_ID && { affiliateId: AFFILIATE_ID }),[m
[31m-        keyword:       "ナチュラルワイン 自然派",[m
[31m-        hits:          "12",[m
[31m-        availability:  "1",[m
[31m-        sort:          "-reviewCount",[m
[31m-        format:        "json",[m
[31m-        formatVersion: "2",[m
[31m-      });[m
[31m-      const res2 = await fetch(`https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?${params2}`);[m
[31m-      const data2 = await res2.json();[m
[32m+[m[32m    if (!r.ok) {[m
[32m+[m[32m      // エラー詳細をログに出す[m
[32m+[m[32m      console.error("Rakuten error status:", r.status, text.slice(0, 300));[m
       return res.status(200).json({[m
[31m-        items: formatItems(data2.Items || [], AFFILIATE_ID),[m
[31m-        keyword: "ナチュラルワイン 自然派",[m
[31m-        month: currentMonth,[m
[31m-        total: data2.count || 0,[m
[32m+[m[32m        items: [], keyword: kw, error_detail: text.slice(0, 200), status: r.status[m
       });[m
     }[m
 [m
[31m-    return res.status(200).json({[m
[31m-      items: formatItems(data.Items, AFFILIATE_ID),[m
[31m-      keyword: searchKeyword,[m
[31m-      month: currentMonth,[m
[31m-      total: data.count || 0,[m
[32m+[m[32m    const data = JSON.parse(text);[m
[32m+[m[32m    if (data.error) {[m
[32m+[m[32m      return res.status(200).json({ items: [], keyword: kw, rakuten_error: data.error });[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    const items = (data.Items || []).slice(0, 12).map(item => {[m
[32m+[m[32m      const i = item.Item || item;[m
[32m+[m[32m      return {[m
[32m+[m[32m        name:        i.itemName || "",[m
[32m+[m[32m        price:       i.itemPrice || 0,[m
[32m+[m[32m        priceStr:    `¥${(i.itemPrice || 0).toLocaleString()}`,[m
[32m+[m[32m        shop:        i.shopName || "",[m
[32m+[m[32m        imageUrl:    (i.mediumImageUrls?.[0]?.imageUrl) || "",[m
[32m+[m[32m        itemUrl:     i.affiliateUrl || i.itemUrl || "",[m
[32m+[m[32m        reviewAvg:   i.reviewAverage || 0,[m
[32m+[m[32m        reviewCount: i.reviewCount || 0,[m
[32m+[m[32m      };[m
     });[m
 [m
[32m+[m[32m    return res.status(200).json({ items, keyword: kw, total: data.count || 0 });[m
[32m+[m
   } catch (err) {[m
[31m-    console.error("Rakuten API error:", err);[m
[32m+[m[32m    console.error("Fetch error:", err.message);[m
     return res.status(500).json({ error: err.message });[m
   }[m
 }[m
[31m-[m
[31m-function formatItems(items, affiliateId) {[m
[31m-  return items.slice(0, 12).map(item => {[m
[31m-    const i = item.Item || item;[m
[31m-    return {[m
[31m-      name:       i.itemName || "",[m
[31m-      price:      i.itemPrice || 0,[m
[31m-      priceStr:   `¥${(i.itemPrice || 0).toLocaleString()}`,[m
[31m-      shop:       i.shopName || "",[m
[31m-      imageUrl:   i.mediumImageUrls?.[0]?.imageUrl || i.smallImageUrls?.[0]?.imageUrl || "",[m
[31m-      itemUrl:    i.affiliateUrl || i.itemUrl || "",[m
[31m-      reviewAvg:  i.reviewAverage || 0,[m
[31m-      reviewCount:i.reviewCount || 0,[m
[31m-      catchCopy:  i.catchcopy || "",[m
[31m-    };[m
[31m-  });[m
[31m-}[m
