import { anthropic } from "@ai-sdk/anthropic";

async function directAnthropicTest() {
  console.log("🔍 直接Anthropic APIテスト開始\n");
  try {
    console.log("📝 ステップ1: モデルの初期化");
    const model = anthropic("claude-3-5-sonnet-20241022");
    console.log("モデル:", model);
    console.log("");

    console.log("📝 ステップ2: 直接API呼び出し");
    console.log("👤 ユーザー: Hello");

    // 直接モデルを使用してストリーミング
    const stream = await model.doStream("Hello");
    console.log("🤖 ストリームの型:", typeof stream);
    console.log("🤖 ストリームの内容:", stream);

    let responseText = "";
    let chunkCount = 0;

    try {
      for await (const chunk of stream.textStream) {
        responseText += chunk;
        chunkCount++;
        console.log(`📦 チャンク ${chunkCount}: "${chunk}"`);
      }
    } catch (streamError) {
      console.error("❌ ストリーム処理中にエラー:", streamError);
    }

    console.log("🤖 最終的なテキスト応答:", responseText);
    console.log("📊 チャンク数:", chunkCount);
  } catch (error: any) {
    console.error("❌ エラーが発生しました:", error);
    console.error("エラーの詳細:", error.message);
    console.error("エラーのスタック:", error.stack);
  }
}

directAnthropicTest();
