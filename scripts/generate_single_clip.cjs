const { GoogleGenAI } = require("@google/genai");
const fs = require("fs");
const { execSync } = require("child_process");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function generate(key, fileBase, text) {
  const pcmPath = `/tmp/${key}.pcm`;
  const mp3Path = `public/audio/${fileBase}.mp3`;
  const altMp3Path = `public/audio/${key.replace('_', '')}.mp3`;

  for (let attempt = 1; attempt <= 6; attempt++) {
    try {
      console.log(`[${key}] Attempt ${attempt} generating "${text.slice(0, 30)}..."`);
      const res = await ai.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ parts: [{ text }] }],
        config: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: "Kore" }
            }
          }
        }
      });
      const data = res.candidates[0].content.parts[0].inlineData.data;
      const buffer = Buffer.from(data, "base64");
      fs.writeFileSync(pcmPath, buffer);
      execSync(`ffmpeg -y -f s16le -ar 24000 -ac 1 -i "${pcmPath}" -b:a 192k "${mp3Path}"`);
      execSync(`cp "${mp3Path}" "${altMp3Path}"`);
      console.log(`[${key}] SUCCESS! Saved to ${mp3Path} and ${altMp3Path}`);
      return true;
    } catch (err) {
      console.log(`[${key}] Attempt ${attempt} error:`, err.message || err);
      const waitTime = attempt * 2500;
      console.log(`[${key}] Waiting ${waitTime}ms before retry...`);
      await sleep(waitTime);
    }
  }
  return false;
}

const args = process.argv.slice(2);
if (args.length >= 3) {
  const [key, fileBase, text] = args;
  generate(key, fileBase, text).then((ok) => {
    process.exit(ok ? 0 : 1);
  });
} else {
  console.log("Usage: node generate_single_clip.cjs <KEY> <FILE_BASE> <TEXT>");
  process.exit(1);
}
