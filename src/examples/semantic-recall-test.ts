import { vectorMemoryAgent } from "../mastra/agents/vector-memory-agent";

// セマンティックリコール機能のテスト
async function testSemanticRecall() {
  console.log("🧠 セマンティックリコール機能をテストします...\n");

  const resourceId = "user_semantic_test";
  const threadId = `conversation_${Date.now()}`;

  try {
    // ステップ1: 様々なトピックについて話す
    console.log("📝 ステップ1: 様々なトピックについて話す");

    const topics = [
      "私は東京に住んでいて、プログラミングが好きです。特にPythonを使っています。",
      "先週、新しいプロジェクトを始めました。機械学習を使った画像認識システムです。",
      "趣味は写真撮影で、特に風景写真を撮るのが好きです。",
      "仕事ではWebアプリケーションの開発をしています。ReactとNode.jsを使っています。",
      "家族は妻と子供が2人います。子供たちは学校でプログラミングを習っています。",
    ];

    for (let i = 0; i < topics.length; i++) {
      console.log(`\n--- トピック ${i + 1}/${topics.length} ---`);
      console.log(`メッセージ: ${topics[i]}`);

      await vectorMemoryAgent.stream(topics[i], {
        resourceId,
        threadId,
      });

      console.log("✅ メッセージ送信完了");

      // API制限を避けるため少し待機
      if (i < topics.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    console.log("\n" + "=".repeat(50) + "\n");

    // ステップ2: セマンティックリコールをテスト
    console.log("🔍 ステップ2: セマンティックリコールをテスト");

    const queries = [
      "私の趣味について教えてください",
      "家族について何か覚えていますか？",
      "仕事で使っている技術について話してください",
      "先週始めたプロジェクトについて詳しく教えてください",
      "住んでいる場所と興味について覚えていますか？",
    ];

    for (let i = 0; i < queries.length; i++) {
      console.log(`\n--- クエリ ${i + 1}/${queries.length} ---`);
      console.log(`質問: ${queries[i]}`);

      await vectorMemoryAgent.stream(queries[i], {
        resourceId,
        threadId,
      });

      console.log("✅ セマンティックリコール完了");

      // API制限を避けるため少し待機
      if (i < queries.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }

    console.log("\n🎉 セマンティックリコールテストが完了しました！");
    console.log("\n💡 結果の確認:");
    console.log("- エージェントが過去の会話から関連情報を正しく取得できたか");
    console.log("- 意味的に類似した内容を検索できたか");
    console.log("- 文脈を理解して適切に回答できたか");
  } catch (error) {
    console.error("❌ テスト中にエラーが発生:", error);
  }
}

// 個別のセマンティックリコールテスト
async function testSpecificSemanticRecall() {
  console.log("🎯 特定のセマンティックリコールテスト\n");

  const resourceId = "user_specific_test";
  const threadId = `specific_${Date.now()}`;

  try {
    // プロジェクトについて話す
    console.log("📝 プロジェクトについて話す");
    await vectorMemoryAgent.stream(
      "私は新しいAIチャットボットプロジェクトを始めました。自然言語処理を使っています。",
      {
        resourceId,
        threadId,
      }
    );

    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 技術スタックについて話す
    console.log("📝 技術スタックについて話す");
    await vectorMemoryAgent.stream(
      "プロジェクトではPython、TensorFlow、FastAPIを使っています。",
      {
        resourceId,
        threadId,
      }
    );

    await new Promise((resolve) => setTimeout(resolve, 2000));

    // セマンティックリコールでプロジェクト情報を取得
    console.log("🔍 プロジェクトについて質問");
    await vectorMemoryAgent.stream(
      "私のプロジェクトで使っている技術について教えてください",
      {
        resourceId,
        threadId,
      }
    );

    console.log("\n✅ 特定のセマンティックリコールテスト完了");
  } catch (error) {
    console.error("❌ テスト中にエラーが発生:", error);
  }
}

// テストを実行
testSemanticRecall();

export { testSemanticRecall, testSpecificSemanticRecall };
