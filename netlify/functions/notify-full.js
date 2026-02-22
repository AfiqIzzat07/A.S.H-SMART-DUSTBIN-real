// notify-full.js
import fetch from "node-fetch"; // if using Node 18+, you can skip this

export const handler = async (event, context) => {
  // Firebase RTDB POST from ESP32 sets /dustbin/notifyFull = true
  // We'll use a Firebase webhook or periodically check the value from ESP
  const TELEGRAM_BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  const message = "🚨 Block A Dustbin is FULL!\nCheck dashboard: https://smartdustbin-ash.netlify.app/";

  try {
    // Send Telegram message
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message })
    });

    const data = await res.json();
    console.log("Telegram sent:", data);

    // Reset notifyFull flag in Firebase (optional: do this via ESP or separate webhook)
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data })
    };
  } catch (err) {
    console.error("Telegram send error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
};
