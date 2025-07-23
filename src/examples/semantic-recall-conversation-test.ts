import { customSemanticAgent } from "../mastra/agents/custom-semantic-agent";

async function testSemanticRecallConversation() {
  console.log("🤖 セマンティックリコール会話テスト開始\n");

  const userId = "test-user-123";
  const threadId = "semantic-test-thread";

  try {
    // 1. 仕事のプロジェクトについて話す
    console.log("👤 ユーザー: Let's talk about my work project first");
    let response = await customSemanticAgent.stream(
      "Let's talk about my work project first",
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

    // 2. プロジェクトの詳細
    console.log("👤 ユーザー: I'm working on a new website for a client");
    response = await customSemanticAgent.stream(
      "I'm working on a new website for a client",
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

    // 3. 締切について
    console.log("👤 ユーザー: The deadline is in two weeks");
    response = await customSemanticAgent.stream(
      "The deadline is in two weeks",
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

    // 4. トピックを変更 - 旅行について
    console.log(
      "👤 ユーザー: Now let's switch topics. I'm also planning a vacation"
    );
    response = await customSemanticAgent.stream(
      "Now let's switch topics. I'm also planning a vacation",
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

    // 5. 旅行先
    console.log("👤 ユーザー: I'll be visiting Japan next month");
    response = await customSemanticAgent.stream(
      "I'll be visiting Japan next month",
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

    // 6. 滞在都市
    console.log("👤 ユーザー: I'll be staying in Tokyo and Kyoto");
    response = await customSemanticAgent.stream(
      "I'll be staying in Tokyo and Kyoto",
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

    // 7. 別のトピック - ギター
    console.log(
      "👤 ユーザー: Let's talk about something else. I'm learning to play guitar"
    );
    response = await customSemanticAgent.stream(
      "Let's talk about something else. I'm learning to play guitar",
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

    // 8. 練習時間
    console.log("👤 ユーザー: I practice for 30 minutes every day");
    response = await customSemanticAgent.stream(
      "I practice for 30 minutes every day",
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

    // 9. セマンティックリコールテスト - プロジェクトの締切を思い出す
    console.log("🔍 セマンティックリコールテスト");
    console.log(
      "👤 ユーザー: Can you remind me about my work project deadline?"
    );
    response = await customSemanticAgent.stream(
      "Can you remind me about my work project deadline?",
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

    // 10. 追加テスト - 旅行について思い出す
    console.log("🔍 追加セマンティックリコールテスト");
    console.log("👤 ユーザー: What about my vacation plans?");
    response = await customSemanticAgent.stream(
      "What about my vacation plans?",
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

    console.log("✅ セマンティックリコールテスト完了");
    console.log("\n📊 テスト結果:");
    console.log("- エージェントは複数のトピックを記憶できましたか？");
    console.log("- 過去の会話から関連情報を正確に思い出せましたか？");
    console.log("- セマンティックリコールが正常に動作しましたか？");
  } catch (error) {
    console.error("❌ テスト中にエラーが発生しました:", error);
  }
}

// テスト実行
testSemanticRecallConversation();
