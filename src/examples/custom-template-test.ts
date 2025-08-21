import { customTemplateAgent } from "../mastra/agents/custom-template-agent";

async function testCustomTemplateWorkingMemory() {
  console.log("🧠 カスタムテンプレートワーキングメモリテスト開始\n");

  const userId = "test-user-custom-template";
  const threadId = "custom-template-test-thread";

  try {
    // 1. 個人情報の提供
    console.log("👤 ユーザー: Hi, my name is Jordan");
    let response = await customTemplateAgent.stream("Hi, my name is Jordan", {
      resourceId: userId,
      threadId,
    });

    let responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    // 2. 場所の情報提供
    console.log("👤 ユーザー: I live in Toronto, Canada");
    response = await customTemplateAgent.stream("I live in Toronto, Canada", {
      resourceId: userId,
      threadId,
    });

    responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    // 3. コミュニケーションスタイルの好み
    console.log("👤 ユーザー: I prefer casual communication");
    response = await customTemplateAgent.stream(
      "I prefer casual communication",
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

    // 4. 興味の情報提供
    console.log(
      "👤 ユーザー: I'm interested in artificial intelligence and music production"
    );
    response = await customTemplateAgent.stream(
      "I'm interested in artificial intelligence and music production",
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

    // 5. ワーキングメモリのテスト - 記憶された情報の確認
    console.log("🔍 ワーキングメモリテスト1: 記憶された情報の確認");
    console.log("👤 ユーザー: What do you know about me so far?");
    response = await customTemplateAgent.stream(
      "What do you know about me so far?",
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

    // 6. 新しいトピックでの会話
    console.log("🔄 新しいトピックでの会話");
    console.log("👤 ユーザー: Let's talk about the latest AI developments");
    response = await customTemplateAgent.stream(
      "Let's talk about the latest AI developments",
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

    // 7. AIについての会話を続ける
    console.log(
      "👤 ユーザー: What are the most exciting developments in AI this year?"
    );
    response = await customTemplateAgent.stream(
      "What are the most exciting developments in AI this year?",
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

    // 8. 音楽制作について話す
    console.log(
      "👤 ユーザー: Now let's talk about music production. What software do you recommend?"
    );
    response = await customTemplateAgent.stream(
      "Now let's talk about music production. What software do you recommend?",
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

    // 9. ワーキングメモリの永続性テスト
    console.log("🔍 ワーキングメモリの永続性テスト");
    console.log("👤 ユーザー: What was my name again and where do I live?");
    response = await customTemplateAgent.stream(
      "What was my name again and where do I live?",
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

    // 10. 好みの確認テスト
    console.log("🔍 好みの確認テスト");
    console.log("👤 ユーザー: What communication style do I prefer?");
    response = await customTemplateAgent.stream(
      "What communication style do I prefer?",
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

    // 11. 興味の確認テスト
    console.log("🔍 興味の確認テスト");
    console.log("👤 ユーザー: What are my main interests?");
    response = await customTemplateAgent.stream("What are my main interests?", {
      resourceId: userId,
      threadId,
    });

    responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    console.log("✅ カスタムテンプレートワーキングメモリテスト完了");
    console.log("\n📊 テスト結果:");
    console.log("- 個人情報が正しく記憶されましたか？");
    console.log("- 好みや興味が適切に保存されましたか？");
    console.log("- 新しいトピックの会話後も情報が保持されましたか？");
    console.log("- パーソナライズされた応答が提供されましたか？");
    console.log("- カスタムテンプレートが正常に機能しましたか？");
  } catch (error) {
    console.error("❌ テスト中にエラーが発生しました:", error);
  }
}

// テスト実行
testCustomTemplateWorkingMemory();
