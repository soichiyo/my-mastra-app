import { workingMemoryAgent } from "../mastra/agents/working-memory-agent";

async function testWorkingMemory() {
  console.log("🧠 ワーキングメモリテスト開始\n");

  const userId = "test-user-working-memory";
  const threadId = "working-memory-test-thread";

  try {
    // 1. ユーザー情報の提供
    console.log(
      "👤 ユーザー: 私の名前は田中太郎です。東京に住んでいて、ソフトウェアエンジニアとして働いています。"
    );
    let response = await workingMemoryAgent.stream(
      "私の名前は田中太郎です。東京に住んでいて、ソフトウェアエンジニアとして働いています。",
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
      "👤 ユーザー: 私は技術的な話が好きで、詳細な説明を好みます。回答は簡潔にしてください。"
    );
    response = await workingMemoryAgent.stream(
      "私は技術的な話が好きで、詳細な説明を好みます。回答は簡潔にしてください。",
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
      "👤 ユーザー: 趣味はプログラミングと読書です。特にPythonと機械学習に興味があります。"
    );
    response = await workingMemoryAgent.stream(
      "趣味はプログラミングと読書です。特にPythonと機械学習に興味があります。",
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

    // 4. 現在のプロジェクト情報
    console.log(
      "👤 ユーザー: 現在、AIチャットボットの開発プロジェクトを進めています。来月にリリース予定です。"
    );
    response = await workingMemoryAgent.stream(
      "現在、AIチャットボットの開発プロジェクトを進めています。来月にリリース予定です。",
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

    // 5. ワーキングメモリのテスト - 個人情報の確認
    console.log("🔍 ワーキングメモリテスト1: 個人情報の確認");
    console.log(
      "👤 ユーザー: 私の名前を覚えていますか？どこに住んでいますか？"
    );
    response = await workingMemoryAgent.stream(
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

    // 6. ワーキングメモリのテスト - 好みの確認
    console.log("🔍 ワーキングメモリテスト2: 好みの確認");
    console.log(
      "👤 ユーザー: 私の好みを覚えていますか？どのような回答スタイルを好みますか？"
    );
    response = await workingMemoryAgent.stream(
      "私の好みを覚えていますか？どのような回答スタイルを好みますか？",
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

    // 7. ワーキングメモリのテスト - 興味の確認
    console.log("🔍 ワーキングメモリテスト3: 興味の確認");
    console.log("👤 ユーザー: 私の趣味や興味について教えてください。");
    response = await workingMemoryAgent.stream(
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

    // 8. ワーキングメモリのテスト - プロジェクト情報の確認
    console.log("🔍 ワーキングメモリテスト4: プロジェクト情報の確認");
    console.log(
      "👤 ユーザー: 現在取り組んでいるプロジェクトについて教えてください。"
    );
    response = await workingMemoryAgent.stream(
      "現在取り組んでいるプロジェクトについて教えてください。",
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

    // 9. 情報の更新テスト
    console.log("🔄 ワーキングメモリ更新テスト");
    console.log(
      "👤 ユーザー: 実は、会社を転職して、今はGoogleで働いています。"
    );
    response = await workingMemoryAgent.stream(
      "実は、会社を転職して、今はGoogleで働いています。",
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

    // 10. 更新された情報の確認
    console.log("🔍 更新された情報の確認");
    console.log("👤 ユーザー: 現在どこで働いていますか？");
    response = await workingMemoryAgent.stream("現在どこで働いていますか？", {
      resourceId: userId,
      threadId,
    });

    responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    console.log("✅ ワーキングメモリテスト完了");
    console.log("\n📊 テスト結果:");
    console.log("- ユーザー情報が正しく記憶されましたか？");
    console.log("- 好みや興味が適切に保存されましたか？");
    console.log("- 情報の更新が正常に動作しましたか？");
    console.log("- パーソナライズされた応答が提供されましたか？");
  } catch (error) {
    console.error("❌ テスト中にエラーが発生しました:", error);
  }
}

// テスト実行
testWorkingMemory();
