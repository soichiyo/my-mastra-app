import { comprehensiveMemoryAgent } from "../mastra/agents/comprehensive-memory-agent";

async function demonstrateComprehensiveMemory() {
  console.log("🧠 包括的メモリ機能デモ開始\n");

  const userId = "demo-user-comprehensive";
  const threadId = "comprehensive-memory-demo";

  try {
    // 1. 基本情報の提供とワーキングメモリのテスト
    console.log("📝 ステップ1: 基本情報の提供");
    console.log(
      "👤 ユーザー: こんにちは！私は田中太郎です。東京に住んでいて、ソフトウェアエンジニアとして働いています。"
    );

    let response = await comprehensiveMemoryAgent.stream(
      "こんにちは！私は田中太郎です。東京に住んでいて、ソフトウェアエンジニアとして働いています。",
      { resourceId: userId, threadId }
    );

    let responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    // 2. プロジェクト情報の提供
    console.log("📝 ステップ2: プロジェクト情報の提供");
    console.log(
      "👤 ユーザー: 現在、Reactアプリの開発プロジェクトを進めています。締切は来月末で、現在は認証機能を実装中です。"
    );

    response = await comprehensiveMemoryAgent.stream(
      "現在、Reactアプリの開発プロジェクトを進めています。締切は来月末で、現在は認証機能を実装中です。",
      { resourceId: userId, threadId }
    );

    responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    // 3. 技術的な質問（セマンティックリコールのテスト）
    console.log("📝 ステップ3: 技術的な質問");
    console.log(
      "👤 ユーザー: Reactの認証機能でJWTトークンの管理について教えてください。"
    );

    response = await comprehensiveMemoryAgent.stream(
      "Reactの認証機能でJWTトークンの管理について教えてください。",
      { resourceId: userId, threadId }
    );

    responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    // 4. プロジェクトの進捗確認（ワーキングメモリの活用）
    console.log("📝 ステップ4: プロジェクト進捗の確認");
    console.log(
      "👤 ユーザー: 私のReactプロジェクトの進捗状況を教えてください。"
    );

    response = await comprehensiveMemoryAgent.stream(
      "私のReactプロジェクトの進捗状況を教えてください。",
      { resourceId: userId, threadId }
    );

    responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    // 5. 新しいトピックの会話（会話履歴の維持）
    console.log("📝 ステップ5: 新しいトピックの会話");
    console.log(
      "👤 ユーザー: 今日は天気が良くて、散歩に出かけたいと思っています。"
    );

    response = await comprehensiveMemoryAgent.stream(
      "今日は天気が良くて、散歩に出かけたいと思っています。",
      { resourceId: userId, threadId }
    );

    responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    // 6. プロジェクトに戻る（セマンティックリコールとワーキングメモリの組み合わせ）
    console.log("📝 ステップ6: プロジェクトに戻る");
    console.log(
      "👤 ユーザー: さっきのReactプロジェクトの認証機能について、もう少し詳しく教えてください。"
    );

    response = await comprehensiveMemoryAgent.stream(
      "さっきのReactプロジェクトの認証機能について、もう少し詳しく教えてください。",
      { resourceId: userId, threadId }
    );

    responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    // 7. 情報の更新（ワーキングメモリの更新）
    console.log("📝 ステップ7: 情報の更新");
    console.log(
      "👤 ユーザー: プロジェクトの締切が来週に変更になりました。認証機能は完了しました。"
    );

    response = await comprehensiveMemoryAgent.stream(
      "プロジェクトの締切が来週に変更になりました。認証機能は完了しました。",
      { resourceId: userId, threadId }
    );

    responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    // 8. 最終確認（すべてのメモリ機能の統合テスト）
    console.log("📝 ステップ8: 最終確認");
    console.log("👤 ユーザー: 私の現在の状況をまとめて教えてください。");

    response = await comprehensiveMemoryAgent.stream(
      "私の現在の状況をまとめて教えてください。",
      { resourceId: userId, threadId }
    );

    responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    console.log("✅ 包括的メモリ機能デモ完了");
    console.log("\n📊 デモ結果の分析:");
    console.log("- 会話履歴: 現在の会話の流れを維持できましたか？");
    console.log(
      "- セマンティックリコール: 過去の関連情報を適切に取得できましたか？"
    );
    console.log(
      "- ワーキングメモリ: ユーザー情報を正確に記憶・更新できましたか？"
    );
    console.log("- 統合機能: 3つの機能が協調して動作しましたか？");
  } catch (error) {
    console.error("❌ デモ中にエラーが発生しました:", error);
  }
}

// デモ実行
demonstrateComprehensiveMemory();
