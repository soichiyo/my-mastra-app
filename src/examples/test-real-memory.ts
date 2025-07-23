// 実際のメモリ機能をテストするファイル
import { basicMemoryAgent } from "../mastra/agents/basic-memory-agent";

async function testRealMemory() {
  console.log("🧪 実際のメモリ機能をテストします...\n");

  const resourceId = "user_real_test";
  const threadId = `conversation_${Date.now()}`;

  try {
    // 1. 情報を教える
    console.log("📝 ステップ1: 情報を教える");
    console.log(
      "メッセージ: 私の名前は田中太郎です。東京に住んでいて、プログラミングが好きです。"
    );

    await basicMemoryAgent.stream(
      "私の名前は田中太郎です。東京に住んでいて、プログラミングが好きです。",
      {
        resourceId,
        threadId,
      }
    );

    console.log("✅ 情報を記憶しました\n");

    // 2. 記憶をテスト
    console.log("🧠 ステップ2: 記憶をテスト");
    console.log("メッセージ: 私の名前と住んでいる場所、興味を覚えていますか？");

    await basicMemoryAgent.stream(
      "私の名前と住んでいる場所、興味を覚えていますか？",
      {
        resourceId,
        threadId,
      }
    );

    console.log("✅ 記憶テスト完了\n");

    // 3. 新しいスレッドでテスト
    console.log("🆕 ステップ3: 新しいスレッドでテスト");
    const newThreadId = `conversation_${Date.now()}_new`;
    console.log("メッセージ: 私について何か知っていますか？");

    await basicMemoryAgent.stream("私について何か知っていますか？", {
      resourceId,
      threadId: newThreadId,
    });

    console.log("✅ 新しいスレッドテスト完了\n");

    console.log("🎉 実際のメモリ機能テストが完了しました！");
  } catch (error) {
    console.error("❌ テスト中にエラーが発生:", error);
  }
}

// テストを実行
testRealMemory();
