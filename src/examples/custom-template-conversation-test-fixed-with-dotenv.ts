import { config } from "dotenv";
import { customTemplateAgent } from "../mastra/agents/custom-template-agent";

// .envファイルを読み込み
config();

async function testCustomTemplateConversationFixedWithDotenv() {
  console.log(
    "🧠 dotenvを使用した修正版カスタムテンプレートエージェント会話テスト開始\n"
  );
  const userId = "test-user-custom-template";
  const threadId = "custom-template-conversation-test";

  try {
    console.log("📝 ステップ1: 環境変数の確認");
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    console.log(
      "ANTHROPIC_API_KEY:",
      anthropicKey ? `${anthropicKey.substring(0, 20)}...` : "未設定"
    );
    console.log("");

    console.log("📝 ステップ2: 個人情報の提供");
    console.log(
      "👤 ユーザー: 私の名前は田中太郎です。プログラミングが好きで、特にPythonをよく使います。"
    );

    const response1 = await customTemplateAgent.generate(
      "私の名前は田中太郎です。プログラミングが好きで、特にPythonをよく使います。",
      {
        resourceId: userId,
        threadId: threadId,
      }
    );

    console.log("🤖 エージェント:", response1.text);
    console.log("");

    console.log("📝 ステップ3: 新しいトピックの議論");
    console.log("👤 ユーザー: 今日は天気が良いですね。");

    const response2 = await customTemplateAgent.generate(
      "今日は天気が良いですね。",
      {
        resourceId: userId,
        threadId: threadId,
      }
    );

    console.log("🤖 エージェント:", response2.text);
    console.log("");

    console.log("📝 ステップ4: 個人情報の確認");
    console.log("👤 ユーザー: 私の名前を覚えていますか？何が好きでしたか？");

    const response3 = await customTemplateAgent.generate(
      "私の名前を覚えていますか？何が好きでしたか？",
      {
        resourceId: userId,
        threadId: threadId,
      }
    );

    console.log("🤖 エージェント:", response3.text);
    console.log("");

    console.log("✅ テスト完了！");
  } catch (error: any) {
    console.error("❌ エラーが発生しました:", error);
    console.error("エラーの詳細:", error.message);
  }
}

testCustomTemplateConversationFixedWithDotenv();
