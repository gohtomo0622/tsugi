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

  const TAG_KEYWORDS = {
    earthy:"natural wine red", funky:"natural wine bio", mineral:"natural wine white",
    oxidative:"orange wine", aged:"natural wine aged", amber:"orange wine amber",
    petnat:"petnat sparkling", effervescent:"petnat wine", fruity:"natural wine fruity",
    floral:"natural wine floral", crisp:"natural wine dry", bold:"natural wine full body",
    wild:"natural wine", natural:"natural wine", organic:"organic wine",
  };

  const m = parseInt(month) || new Date().getMonth() + 1;
  let kw = "natural wine";
  if ([3,4,5].includes(m))   kw = "natural wine white";
  if ([6,7,8].includes(m))   kw = "petnat natural wine";
  if ([9,10,11].includes(m)) kw = "natural wine red";
  if ([12,1,2].includes(m))  kw = "orange wine natural";

  if (tags) {
    const t = tags.split(",")[0];
    if (TAG_KEYWORDS[t]) kw = TAG_KEYWORDS[t];
  }

  const params = new URLSearchParams({
    applicationId: APP_ID,
    accessKey:     ACCESS_KEY,
    keyword:       kw,
    hits:          "12",
    formatVersion: "2",
  });

  if (AFFILIATE_ID) params.set("affiliateId", AFFILIATE_ID);

  const url = "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?" + params;

  try {
    const r = await fetch(url);
    const text = await r.text();

    if (!r.ok) {
      console.error("Rakuten error:", r.status, text.slice(0, 300));
      return res.status(200).json({ items: [], keyword: kw, error_detail: text.slice(0, 300), status: r.status });
    }

    const data = JSON.parse(text);
    if (data.error) {
      return res.status(200).json({ items: [], keyword: kw, rakuten_error: data.error });
    }

    const rawItems = data.Items || [];
    const items = rawItems.slice(0, 12).map(item => {
      const i = item.Item || item;
      return {
        name:        i.itemName || "",
        price:       i.itemPrice || 0,
        priceStr:    "Y" + (i.itemPrice || 0).toLocaleString(),
        shop:        i.shopName || "",
        imageUrl:    i.mediumImageUrls?.[0]?.imageUrl || "",
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