// 環境変数の確認テスト
async function envCheckTest() {
  console.log("🔍 環境変数確認テスト開始\n");

  try {
    console.log("📝 ステップ1: 環境変数の確認");

    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;
    const zapierUrl = process.env.ZAPIER_MCP_URL;
    const composioUrl = process.env.COMPOSIO_MCP_GITHUB;

    console.log(
      "ANTHROPIC_API_KEY:",
      anthropicKey ? `${anthropicKey.substring(0, 20)}...` : "未設定"
    );
    console.log(
      "OPENAI_API_KEY:",
      openaiKey ? `${openaiKey.substring(0, 20)}...` : "未設定"
    );
    console.log("ZAPIER_MCP_URL:", zapierUrl ? "設定済み" : "未設定");
    console.log("COMPOSIO_MCP_GITHUB:", composioUrl ? "設定済み" : "未設定");
    console.log("");

    console.log("📝 ステップ2: APIキーの形式確認");

    if (anthropicKey) {
      console.log(
        "Anthropic APIキーの形式:",
        anthropicKey.startsWith("sk-ant-") ? "✅ 正しい形式" : "❌ 不正な形式"
      );
      console.log("Anthropic APIキーの長さ:", anthropicKey.length);
    }

    if (openaiKey) {
      console.log(
        "OpenAI APIキーの形式:",
        openaiKey.startsWith("sk-") ? "✅ 正しい形式" : "❌ 不正な形式"
      );
      console.log("OpenAI APIキーの長さ:", openaiKey.length);
    }
    console.log("");

    console.log("📝 ステップ3: 環境変数の読み込み状況");
    console.log("process.env.NODE_ENV:", process.env.NODE_ENV);
    console.log("process.env.PWD:", process.env.PWD);
    console.log("");
  } catch (error: any) {
    console.error("❌ エラーが発生しました:", error);
    console.error("エラーの詳細:", error.message);
  }
}

// テスト実行
envCheckTest();
