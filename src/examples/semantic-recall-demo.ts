import { vectorMemoryAgent } from "../mastra/agents/vector-memory-agent";

// セマンティックリコールの動作デモ
async function semanticRecallDemo() {
  console.log("🔍 セマンティックリコールの動作デモ\n");

  const resourceId = "user_demo";
  const threadId = `demo_${Date.now()}`;

  try {
    // ステップ1: 初期情報の提供
    console.log("📝 ステップ1: 初期情報の提供");
    console.log("ユーザーが様々な情報を提供します...\n");

    const initialInfo = [
      "私は田中太郎です。東京の渋谷区に住んでいます。",
      "趣味はプログラミングで、特にPythonとJavaScriptを使っています。",
      "仕事ではWebアプリケーションの開発をしています。",
      "家族は妻と子供が2人いて、子供たちは小学生です。",
      "最近、機械学習を使った画像認識プロジェクトを始めました。",
    ];

    for (let i = 0; i < initialInfo.length; i++) {
      console.log(`情報 ${i + 1}: ${initialInfo[i]}`);
      await vectorMemoryAgent.stream(initialInfo[i], {
        resourceId,
        threadId,
      });
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    console.log("\n" + "=".repeat(60) + "\n");

    // ステップ2: セマンティックリコールのテスト
    console.log("🔍 ステップ2: セマンティックリコールのテスト");
    console.log("異なる表現で同じ情報を質問します...\n");

    const queries = [
      {
        question: "私の名前は何ですか？",
        expected: "田中太郎",
        explanation: "直接的な名前の質問",
      },
      {
        question: "どこに住んでいますか？",
        expected: "東京の渋谷区",
        explanation: "住んでいる場所の質問",
      },
      {
        question: "何が好きですか？",
        expected: "プログラミング",
        explanation: "趣味についての質問",
      },
      {
        question: "仕事は何をしていますか？",
        expected: "Webアプリケーション開発",
        explanation: "仕事についての質問",
      },
      {
        question: "家族構成はどうですか？",
        expected: "妻と子供2人",
        explanation: "家族についての質問",
      },
      {
        question: "最近何か新しいことを始めましたか？",
        expected: "機械学習プロジェクト",
        explanation: "最近の活動についての質問",
      },
    ];

    for (let i = 0; i < queries.length; i++) {
      const query = queries[i];
      console.log(`質問 ${i + 1}: ${query.question}`);
      console.log(`期待される情報: ${query.expected}`);
      console.log(`説明: ${query.explanation}`);

      await vectorMemoryAgent.stream(query.question, {
        resourceId,
        threadId,
      });

      console.log("✅ セマンティックリコール完了\n");
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }

    console.log("\n" + "=".repeat(60) + "\n");

    // ステップ3: 類似表現でのテスト
    console.log("🔄 ステップ3: 類似表現でのテスト");
    console.log("同じ情報を異なる表現で質問します...\n");

    const similarQueries = [
      {
        original: "趣味は何ですか？",
        similar: "何を楽しんでいますか？",
        explanation: "同じ意味を異なる表現で質問",
      },
      {
        original: "家族は何人ですか？",
        similar: "家には誰がいますか？",
        explanation: "家族構成を異なる表現で質問",
      },
      {
        original: "仕事は何ですか？",
        similar: "どのようなお仕事をされていますか？",
        explanation: "職業を異なる表現で質問",
      },
    ];

    for (let i = 0; i < similarQueries.length; i++) {
      const query = similarQueries[i];
      console.log(`類似質問 ${i + 1}:`);
      console.log(`  元の質問: ${query.original}`);
      console.log(`  類似質問: ${query.similar}`);
      console.log(`  説明: ${query.explanation}`);

      await vectorMemoryAgent.stream(query.similar, {
        resourceId,
        threadId,
      });

      console.log("✅ 類似表現でのセマンティックリコール完了\n");
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }

    console.log("\n🎉 セマンティックリコールデモが完了しました！");
    console.log("\n💡 デモで確認できたこと:");
    console.log("1. ベクトル埋め込みによる意味的検索");
    console.log("2. 異なる表現での同じ情報の取得");
    console.log("3. 過去の会話からの関連情報の検索");
    console.log("4. 文脈を理解した適切な回答");
  } catch (error) {
    console.error("❌ デモ中にエラーが発生:", error);
  }
}

// ベクトル埋め込みの概念説明
function explainVectorEmbeddings() {
  console.log("🧠 ベクトル埋め込みの概念\n");

  console.log("ベクトル埋め込みとは:");
  console.log("- テキストを数値ベクトルに変換する技術");
  console.log("- 意味的に類似したテキストは類似したベクトルを持つ");
  console.log("- 高次元空間でテキストの意味を表現");

  console.log("\n例:");
  console.log("'猫' → [0.2, 0.8, 0.1, ...]");
  console.log("'ネコ' → [0.2, 0.8, 0.1, ...] (類似)");
  console.log("'犬' → [0.8, 0.2, 0.1, ...] (異なる)");

  console.log("\nセマンティックリコールでの活用:");
  console.log("1. ユーザーの質問をベクトル化");
  console.log("2. 過去のメッセージのベクトルと比較");
  console.log("3. 最も類似したベクトルを持つメッセージを取得");
  console.log("4. 関連情報をコンテキストに追加");
}

// デモを実行
semanticRecallDemo();

export { semanticRecallDemo, explainVectorEmbeddings };
