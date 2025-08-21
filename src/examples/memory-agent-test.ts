import { memoryAgent } from "../mastra/agents/memory-agent";

async function testMemoryAgent() {
  console.log("🧠 MemoryAgent ワーキングメモリテスト開始\n");

  const userId = "test-user-memory-agent";
  const threadId = "memory-agent-test-thread";

  try {
    // 1. 初期情報の提供
    console.log(
      "👤 ユーザー: こんにちは！私の名前は佐藤花子です。大阪に住んでいて、デザイナーとして働いています。"
    );
    let response = await memoryAgent.stream(
      "こんにちは！私の名前は佐藤花子です。大阪に住んでいて、デザイナーとして働いています。",
      {
        resourceId: userId,
        threadId,
      }
    );

    let responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    // 2. 好みの情報提供
    console.log(
      "👤 ユーザー: 私は視覚的な説明が好きで、具体的な例を交えた回答を好みます。"
    );
    response = await memoryAgent.stream(
      "私は視覚的な説明が好きで、具体的な例を交えた回答を好みます。",
      {
        resourceId: userId,
        threadId,
      }
    );

    responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    // 3. 興味の情報提供
    console.log(
      "👤 ユーザー: 趣味は写真撮影と旅行です。特にUI/UXデザインに興味があります。"
    );
    response = await memoryAgent.stream(
      "趣味は写真撮影と旅行です。特にUI/UXデザインに興味があります。",
      {
        resourceId: userId,
        threadId,
      }
    );

    responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    // 4. ワーキングメモリのテスト - 個人情報の確認
    console.log("🔍 ワーキングメモリテスト1: 個人情報の確認");
    console.log(
      "👤 ユーザー: 私の名前を覚えていますか？どこに住んでいますか？"
    );
    response = await memoryAgent.stream(
      "私の名前を覚えていますか？どこに住んでいますか？",
      {
        resourceId: userId,
        threadId,
      }
    );

    responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    // 5. ワーキングメモリのテスト - 好みの確認
    console.log("🔍 ワーキングメモリテスト2: 好みの確認");
    console.log(
      "👤 ユーザー: 私の好みを覚えていますか？どのような説明スタイルを好みますか？"
    );
    response = await memoryAgent.stream(
      "私の好みを覚えていますか？どのような説明スタイルを好みますか？",
      {
        resourceId: userId,
        threadId,
      }
    );

    responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    // 6. ワーキングメモリのテスト - 興味の確認
    console.log("🔍 ワーキングメモリテスト3: 興味の確認");
    console.log("👤 ユーザー: 私の趣味や興味について教えてください。");
    response = await memoryAgent.stream(
      "私の趣味や興味について教えてください。",
      {
        resourceId: userId,
        threadId,
      }
    );

    responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    // 7. パーソナライゼーションのテスト
    console.log("🎨 パーソナライゼーションテスト");
    console.log("👤 ユーザー: デザインについて教えてください。");
    response = await memoryAgent.stream("デザインについて教えてください。", {
      resourceId: userId,
      threadId,
    });

    responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    // 8. 情報の更新テスト
    console.log("🔄 情報更新テスト");
    console.log(
      "👤 ユーザー: 実は、最近フリーランスのデザイナーになりました。"
    );
    response = await memoryAgent.stream(
      "実は、最近フリーランスのデザイナーになりました。",
      {
        resourceId: userId,
        threadId,
      }
    );

    responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    // 9. 更新された情報の確認
    console.log("🔍 更新された情報の確認");
    console.log("👤 ユーザー: 現在どのような働き方をしていますか？");
    response = await memoryAgent.stream(
      "現在どのような働き方をしていますか？",
      {
        resourceId: userId,
        threadId,
      }
    );

    responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    console.log("✅ MemoryAgent ワーキングメモリテスト完了");
    console.log("\n📊 テスト結果:");
    console.log("- ユーザー情報が正しく記憶されましたか？");
    console.log("- 好みや興味が適切に保存されましたか？");
    console.log("- パーソナライズされた応答が提供されましたか？");
    console.log("- 情報の更新が正常に動作しましたか？");
    console.log("- 既知の情報について質問しませんでしたか？");
  } catch (error) {
    console.error("❌ テスト中にエラーが発生しました:", error);
  }
}

// テスト実行
testMemoryAgent();
