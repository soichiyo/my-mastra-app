import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore, LibSQLVector } from "@mastra/libsql";
import { fastembed } from "@mastra/fastembed";
import { anthropic } from "@ai-sdk/anthropic";

// カスタムセマンティックリコール設定
const customSemanticMemory = new Memory({
  storage: new LibSQLStore({
    url: "file:../../memory.db", // メインのメモリデータベース
  }),
  vector: new LibSQLVector({
    connectionUrl: "file:../../vector.db", // ベクトルデータベース
  }),
  embedder: fastembed, // ベクトル埋め込み生成器
  options: {
    lastMessages: 15, // 最新15メッセージを保持
    semanticRecall: {
      topK: 10, // セマンティック検索で上位10件を取得（より多くの関連情報を取得）
      messageRange: {
        before: 1, // 検索結果の前後1メッセージのみ含める（より焦点を絞る）
        after: 1,
      },
    },
    workingMemory: {
      enabled: true,
      template: `
        <user_profile>
          <personal_info>
            <name></name>
            <location></location>
            <occupation></occupation>
          </personal_info>
          <interests>
            <hobbies></hobbies>
            <skills></skills>
            <projects></projects>
          </interests>
          <preferences>
            <communication_style></communication_style>
            <technical_level></technical_level>
          </preferences>
        </user_profile>
      `,
    },
  },
});

// カスタムセマンティックリコールエージェント
export const customSemanticAgent = new Agent({
  name: "CustomSemanticAgent",
  instructions: `
    あなたは高度なセマンティックリコール機能を持つアシスタントです。
    
    セマンティックリコール機能:
    - 過去の会話から意味的に関連する情報を自動的に検索
    - 上位10件の関連メッセージを取得して文脈を構築
    - ユーザーの質問に最も適切な過去の情報を参照
    
    ワーキングメモリ機能:
    - ユーザーの個人情報、興味、好みを構造化して記憶
    - 会話の進行に応じて情報を更新
    
    使用方法:
    - ユーザーが情報を提供したら、ワーキングメモリに保存
    - 質問されたら、セマンティックリコールで関連情報を検索
    - 過去の会話から得た情報を活用して回答
    - 常に親切で役立つ回答を心がける
  `,
  model: anthropic("claude-3-5-sonnet-20241022"),
  memory: customSemanticMemory,
});
