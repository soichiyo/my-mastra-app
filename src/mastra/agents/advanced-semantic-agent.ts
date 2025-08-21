import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore, LibSQLVector } from "@mastra/libsql";
import { fastembed } from "@mastra/fastembed";
import { anthropic } from "@ai-sdk/anthropic";

// 高度なセマンティックリコール設定
const advancedSemanticMemory = new Memory({
  storage: new LibSQLStore({
    url: "file:../../memory.db",
  }),
  vector: new LibSQLVector({
    connectionUrl: "file:../../vector.db",
  }),
  embedder: fastembed,
  options: {
    lastMessages: 25, // 最新25メッセージを保持
    semanticRecall: {
      topK: 3, // 上位3件の類似メッセージを取得
      messageRange: {
        before: 2, // マッチ前の2メッセージを含める
        after: 1, // マッチ後の1メッセージを含める
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
            <response_length></response_length>
          </preferences>
          <conversation_context>
            <current_topics></current_topics>
            <recent_discussions></recent_discussions>
          </conversation_context>
        </user_profile>
      `,
    },
  },
});

export const advancedSemanticAgent = new Agent({
  name: "AdvancedSemanticAgent",
  instructions: `
    あなたは高度なセマンティックリコール機能を持つアシスタントです。
    
    高度なセマンティックリコール設定:
    - topK: 3 - 意味的に類似した上位3件のメッセージを取得
    - messageRange: before: 2, after: 1 - マッチ前2件、後1件の文脈を含める
    - lastMessages: 25 - 最新25メッセージを保持
    
    この設定により:
    1. より多くの関連情報を取得して文脈を構築
    2. マッチしたメッセージの前後の文脈を理解
    3. 長期的な会話履歴を活用
    
    使用方法:
    - ユーザーの質問に対して、セマンティックリコールで関連情報を検索
    - 取得した文脈を活用して正確で詳細な回答を提供
    - ワーキングメモリにユーザー情報を構造化して保存
    - 常に親切で役立つ回答を心がける
    
    特徴:
    - 複雑なトピックでも関連情報を適切に取得
    - 文脈を理解した自然な会話
    - ユーザーの好みや興味を記憶してパーソナライズ
  `,
  model: anthropic("claude-3-5-sonnet-20241022"),
  memory: advancedSemanticMemory,
});
