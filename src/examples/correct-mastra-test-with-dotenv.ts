import { config } from "dotenv";
import { Agent } from "@mastra/core/agent";
import { anthropic } from "@ai-sdk/anthropic";

// .envファイルを読み込み
config();

// 正しい設定でエージェントを作成
const correctAgent = new Agent({
  name: "CorrectAgent",
  instructions: "You are a helpful assistant.",
  model: anthropic("claude-3-5-sonnet-20241022"),
});

async function correctMastraTestWithDotenv() {
  console.log("🧪 dotenvを使用した正しいMastraテスト開始\n");
  try {
    console.log("📝 ステップ1: 環境変数の確認");
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    console.log(
      "ANTHROPIC_API_KEY:",
      anthropicKey ? `${anthropicKey.substring(0, 20)}...` : "未設定"
    );
    console.log("");

    console.log("📝 ステップ2: エージェントの初期化確認");
    console.log("エージェント名:", correctAgent.name);
    console.log("モデル:", correctAgent.model);
    console.log("");

    console.log("📝 ステップ3: generate()メソッドを使用したテスト");
    console.log("👤 ユーザー: Hello");

    // Mastraのクイックスタート例に基づいてgenerate()メソッドを使用
    const result = await correctAgent.generate("Hello");

    console.log("🤖 結果の型:", typeof result);
    console.log("🤖 結果のプロパティ:", Object.keys(result));

    if (result && "text" in result) {
      console.log("✅ textプロパティが見つかりました");
      console.log("🤖 エージェントの応答:", result.text);
    } else {
      console.log("❌ textプロパティが見つかりません");
      console.log("🤖 結果の内容:", result);
    }
  } catch (error: any) {
    console.error("❌ エラーが発生しました:", error);
    console.error("エラーの詳細:", error.message);
    console.error("エラーのスタック:", error.stack);
  }
}

correctMastraTestWithDotenv();
