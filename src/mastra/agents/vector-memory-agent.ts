import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore, LibSQLVector } from "@mastra/libsql";
import { fastembed } from "@mastra/fastembed";
import { anthropic } from "@ai-sdk/anthropic";

// ベクトルストア機能付きメモリ設定
const vectorMemory = new Memory({
  storage: new LibSQLStore({
    url: "file:../../memory.db", // メインのメモリデータベース
  }),
  vector: new LibSQLVector({
    connectionUrl: "file:../../vector.db", // ベクトルデータベース
  }),
  embedder: fastembed, // ベクトル埋め込み生成器
  options: {
    lastMessages: 20, // 最新20メッセージを保持
    semanticRecall: {
      topK: 8, // セマンティック検索で上位8件を取得
      messageRange: {
        before: 3, // 検索結果の前後3メッセージも含める
        after: 3,
      },
    },
    workingMemory: {
      enabled: true,
      template: `
        <user>
          <name></name>
          <interests></interests>
          <preferences></preferences>
          <conversation_history></conversation_history>
        </user>
      `,
    },
  },
});

// ベクトルストア機能付きエージェント
export const vectorMemoryAgent = new Agent({
  name: "VectorMemoryAgent",
  instructions: `
    あなたは高度なメモリ機能を持つアシスタントです。
    
    機能:
    1. 会話履歴の記憶: 過去の会話を覚えています
    2. セマンティック検索: 意味的に類似した過去の会話を検索できます
    3. ワーキングメモリ: ユーザーの情報を構造化して記憶します
    
    使用方法:
    - ユーザーが情報を教えたら、ワーキングメモリに保存してください
    - 過去の会話について質問されたら、セマンティック検索で関連情報を見つけてください
    - 常に親切で役立つ回答を心がけてください
  `,
  model: anthropic("claude-3-5-sonnet-20241022"),
  memory: vectorMemory,
});
