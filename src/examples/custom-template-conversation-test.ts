import { customTemplateAgent } from "../mastra/agents/custom-template-agent";

async function testCustomTemplateConversation() {
  console.log("🧠 カスタムテンプレートエージェント会話テスト開始\n");

  const userId = "test-user-custom-template";
  const threadId = "custom-template-conversation-test";

  try {
    // 1. 基本情報の提供
    console.log("📝 ステップ1: 基本情報の提供");
    console.log(
      "👤 ユーザー: こんにちは！私は佐藤花子です。大阪に住んでいて、デザイナーとして働いています。"
    );

    let response = await customTemplateAgent.stream(
      "こんにちは！私は佐藤花子です。大阪に住んでいて、デザイナーとして働いています。",
      { resourceId: userId, threadId }
    );

    let responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    // 2. 好みと興味の提供
    console.log("📝 ステップ2: 好みと興味の提供");
    console.log(
      "👤 ユーザー: 私はミニマルデザインが好きで、UI/UXデザインを専門にしています。技術的には中級レベルで、Figmaをよく使います。"
    );

    response = await customTemplateAgent.stream(
      "私はミニマルデザインが好きで、UI/UXデザインを専門にしています。技術的には中級レベルで、Figmaをよく使います。",
      { resourceId: userId, threadId }
    );

    responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    // 3. 現在のプロジェクト情報
    console.log("📝 ステップ3: 現在のプロジェクト情報");
    console.log(
      "👤 ユーザー: 現在、ECサイトのリニューアルプロジェクトを進めています。締切は2週間後で、現在はワイヤーフレームの作成中です。"
    );

    response = await customTemplateAgent.stream(
      "現在、ECサイトのリニューアルプロジェクトを進めています。締切は2週間後で、現在はワイヤーフレームの作成中です。",
      { resourceId: userId, threadId }
    );

    responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    // 4. デザインに関する質問
    console.log("📝 ステップ4: デザインに関する質問");
    console.log(
      "👤 ユーザー: ミニマルデザインでECサイトを作る際のベストプラクティスを教えてください。"
    );

    response = await customTemplateAgent.stream(
      "ミニマルデザインでECサイトを作る際のベストプラクティスを教えてください。",
      { resourceId: userId, threadId }
    );

    responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    // 5. プロジェクトの進捗確認
    console.log("📝 ステップ5: プロジェクトの進捗確認");
    console.log(
      "👤 ユーザー: 私の現在のプロジェクトの進捗状況を教えてください。"
    );

    response = await customTemplateAgent.stream(
      "私の現在のプロジェクトの進捗状況を教えてください。",
      { resourceId: userId, threadId }
    );

    responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    // 6. 新しいトピックの会話
    console.log("📝 ステップ6: 新しいトピックの会話");
    console.log(
      "👤 ユーザー: 今日は雨が降っていて、家で映画を見ようと思っています。"
    );

    response = await customTemplateAgent.stream(
      "今日は雨が降っていて、家で映画を見ようと思っています。",
      { resourceId: userId, threadId }
    );

    responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    // 7. プロジェクトに戻る
    console.log("📝 ステップ7: プロジェクトに戻る");
    console.log(
      "👤 ユーザー: さっきのECサイトプロジェクトについて、ワイヤーフレームの次のステップを教えてください。"
    );

    response = await customTemplateAgent.stream(
      "さっきのECサイトプロジェクトについて、ワイヤーフレームの次のステップを教えてください。",
      { resourceId: userId, threadId }
    );

    responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    // 8. 情報の更新
    console.log("📝 ステップ8: 情報の更新");
    console.log(
      "👤 ユーザー: プロジェクトの締切が1週間後に変更になりました。ワイヤーフレームは完了しました。"
    );

    response = await customTemplateAgent.stream(
      "プロジェクトの締切が1週間後に変更になりました。ワイヤーフレームは完了しました。",
      { resourceId: userId, threadId }
    );

    responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    // 9. 個人情報の確認
    console.log("📝 ステップ9: 個人情報の確認");
    console.log("👤 ユーザー: 私の名前と職業を覚えていますか？");

    response = await customTemplateAgent.stream(
      "私の名前と職業を覚えていますか？",
      { resourceId: userId, threadId }
    );

    responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    // 10. 好みの確認
    console.log("📝 ステップ10: 好みの確認");
    console.log("👤 ユーザー: 私のデザインの好みは何でしたか？");

    response = await customTemplateAgent.stream(
      "私のデザインの好みは何でしたか？",
      { resourceId: userId, threadId }
    );

    responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    // 11. 現在の状況の総合確認
    console.log("📝 ステップ11: 現在の状況の総合確認");
    console.log("👤 ユーザー: 私の現在の状況をまとめて教えてください。");

    response = await customTemplateAgent.stream(
      "私の現在の状況をまとめて教えてください。",
      { resourceId: userId, threadId }
    );

    responseText = "";
    for await (const chunk of response.textStream) {
      responseText += chunk;
    }
    console.log("🤖 エージェント:", responseText);
    console.log("");

    console.log("✅ カスタムテンプレートエージェント会話テスト完了");
    console.log("\n📊 テスト結果の分析:");
    console.log("- 基本情報の記憶: 名前、職業、場所を正確に記憶できましたか？");
    console.log(
      "- 好みの学習: デザインの好みや技術レベルを適切に記録できましたか？"
    );
    console.log(
      "- プロジェクト追跡: プロジェクトの進捗と締切を正確に追跡できましたか？"
    );
    console.log(
      "- 情報の更新: 締切の変更や進捗の更新を適切に反映できましたか？"
    );
    console.log(
      "- 文脈の維持: 新しいトピックの後もプロジェクト情報を保持できましたか？"
    );
    console.log(
      "- パーソナライゼーション: 記憶した情報を活用したパーソナライズされた応答を提供できましたか？"
    );
  } catch (error) {
    console.error("❌ テスト中にエラーが発生しました:", error);
  }
}

// テスト実行
testCustomTemplateConversation();
