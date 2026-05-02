export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { senderName, recipientName, answers, wineType, recommendedWine } = req.body;

  const html = `
    <h2>🍷 tsugi - 新しいギフト診断結果</h2>
    <p><strong>送った人：</strong>${senderName}</p>
    <p><strong>相手の名前：</strong>${recipientName || "未入力"}</p>
    <hr>
    <h3>診断結果</h3>
    <p><strong>ワインタイプ：</strong>${wineType}</p>
    <p><strong>おすすめワイン：</strong>${recommendedWine}</p>
    <hr>
    <h3>回答内容</h3>
    <ul>
      ${answers.map(a => `<li><strong>${a.question}</strong>：${a.answer}</li>`).join("")}
    </ul>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "tsugi <onboarding@resend.dev>",
        to: process.env.NOTIFY_EMAIL,
        subject: `🍷 ${recipientName || "あの人"}の診断結果が届きました`,
        html,
      }),
    });

    if (!response.ok) throw new Error("Failed to send email");
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}