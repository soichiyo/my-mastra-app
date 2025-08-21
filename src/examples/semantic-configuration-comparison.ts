import { Memory } from "@mastra/memory";
import { LibSQLStore, LibSQLVector } from "@mastra/libsql";
import { fastembed } from "@mastra/fastembed";

// 設定パターン1: 高精度重視（少ないメッセージ、狭い文脈）
export const highPrecisionMemory = new Memory({
  storage: new LibSQLStore({
    url: "file:../../memory.db",
  }),
  vector: new LibSQLVector({
    connectionUrl: "file:../../vector.db",
  }),
  embedder: fastembed,
  options: {
    lastMessages: 15,
    semanticRecall: {
      topK: 2, // 少ないメッセージで高精度
      messageRange: {
        before: 1, // 狭い文脈
        after: 1,
      },
    },
  },
});

// 設定パターン2: バランス型（中程度のメッセージ、適度な文脈）
export const balancedMemory = new Memory({
  storage: new LibSQLStore({
    url: "file:../../memory.db",
  }),
  vector: new LibSQLVector({
    connectionUrl: "file:../../vector.db",
  }),
  embedder: fastembed,
  options: {
    lastMessages: 20,
    semanticRecall: {
      topK: 3, // 中程度のメッセージ
      messageRange: {
        before: 2, // 適度な文脈
        after: 1,
      },
    },
  },
});

// 設定パターン3: 高文脈重視（多くのメッセージ、広い文脈）
export const highContextMemory = new Memory({
  storage: new LibSQLStore({
    url: "file:../../memory.db",
  }),
  vector: new LibSQLVector({
    connectionUrl: "file:../../vector.db",
  }),
  embedder: fastembed,
  options: {
    lastMessages: 30,
    semanticRecall: {
      topK: 5, // 多くのメッセージ
      messageRange: {
        before: 3, // 広い文脈
        after: 2,
      },
    },
  },
});

// 設定パターン4: カスタム設定（特定のユースケース向け）
export const customMemory = new Memory({
  storage: new LibSQLStore({
    url: "file:../../memory.db",
  }),
  vector: new LibSQLVector({
    connectionUrl: "file:../../vector.db",
  }),
  embedder: fastembed,
  options: {
    lastMessages: 40, // 長期的な記憶
    semanticRecall: {
      topK: 4, // 複数の関連情報を取得
      messageRange: {
        before: 2, // 前の文脈を重視
        after: 1, // 後の文脈は少なめ
      },
    },
  },
});

// 設定の説明
export const configurationGuide = {
  highPrecision: {
    name: "高精度重視設定",
    description: "最も関連性の高い情報のみを取得",
    useCase: "簡潔な回答が必要な場合、特定の情報を素早く取得したい場合",
    pros: ["高速", "関連性が高い", "ノイズが少ない"],
    cons: ["文脈が不足する可能性", "複雑な質問には不十分"],
  },
  balanced: {
    name: "バランス型設定",
    description: "精度と文脈のバランスを取った設定",
    useCase: "一般的な会話、日常的なタスク",
    pros: ["バランスが良い", "汎用性が高い", "安定した性能"],
    cons: ["特定の用途には最適化されていない"],
  },
  highContext: {
    name: "高文脈重視設定",
    description: "豊富な文脈情報を取得",
    useCase: "複雑な会話、詳細な分析が必要な場合",
    pros: ["文脈が豊富", "複雑な質問に対応", "詳細な回答"],
    cons: ["処理時間が長い", "ノイズが増える可能性"],
  },
  custom: {
    name: "カスタム設定",
    description: "特定のユースケースに最適化",
    useCase: "長期的なプロジェクト、専門的なタスク",
    pros: ["特定用途に最適化", "柔軟性が高い"],
    cons: ["設定が複雑", "調整が必要"],
  },
};

// 設定選択のガイド
export function selectConfiguration(useCase: string) {
  switch (useCase.toLowerCase()) {
    case "quick":
    case "fast":
    case "simple":
      return {
        memory: highPrecisionMemory,
        guide: configurationGuide.highPrecision,
      };

    case "general":
    case "daily":
    case "chat":
      return {
        memory: balancedMemory,
        guide: configurationGuide.balanced,
      };

    case "complex":
    case "detailed":
    case "analysis":
      return {
        memory: highContextMemory,
        guide: configurationGuide.highContext,
      };

    case "custom":
    case "specific":
    case "project":
      return {
        memory: customMemory,
        guide: configurationGuide.custom,
      };

    default:
      return {
        memory: balancedMemory,
        guide: configurationGuide.balanced,
      };
  }
}

// 設定の比較表示
export function printConfigurationComparison() {
  console.log("🔧 セマンティックリコール設定比較\n");

  Object.entries(configurationGuide).forEach(([key, config]) => {
    console.log(`📋 ${config.name}`);
    console.log(`   説明: ${config.description}`);
    console.log(`   用途: ${config.useCase}`);
    console.log(`   ✅ メリット: ${config.pros.join(", ")}`);
    console.log(`   ⚠️  デメリット: ${config.cons.join(", ")}`);
    console.log("");
  });
}
