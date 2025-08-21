import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore, LibSQLVector } from "@mastra/libsql";
import { fastembed } from "@mastra/fastembed";
import { anthropic } from "@ai-sdk/anthropic";

// ワーキングメモリを活用したメモリ設定
const workingMemoryConfig = new Memory({
  storage: new LibSQLStore({
    url: "file:../../memory.db",
  }),
  vector: new LibSQLVector({
    connectionUrl: "file:../../vector.db",
  }),
  embedder: fastembed,
  options: {
    lastMessages: 20, // 最新20メッセージを保持
    semanticRecall: {
      topK: 3,
      messageRange: {
        before: 2,
        after: 1,
      },
    },
    workingMemory: {
      enabled: true,
      // ワーキングメモリのテンプレート
      template: `
        <user_profile>
          <personal_info>
            <name></name>
            <age></age>
            <location></location>
            <occupation></occupation>
            <company></company>
          </personal_info>
          <preferences>
            <communication_style></communication_style>
            <technical_level></technical_level>
            <response_length></response_length>
            <language_preference></language_preference>
          </preferences>
          <interests>
            <hobbies></hobbies>
            <skills></skills>
            <areas_of_expertise></areas_of_expertise>
          </interests>
          <current_context>
            <active_projects></active_projects>
            <current_goals></current_goals>
            <recent_achievements></recent_achievements>
            <pending_tasks></pending_tasks>
          </current_context>
          <conversation_state>
            <current_topic></current_topic>
            <open_questions></open_questions>
            <discussion_history></discussion_history>
          </conversation_state>
        </user_profile>
      `,
    },
  },
});

export const workingMemoryAgent = new Agent({
  name: "WorkingMemoryAgent",
  instructions: `
    あなたはワーキングメモリを活用した高度なアシスタントです。
    
    ワーキングメモリ機能:
    1. ユーザーの個人情報を構造化して記憶
    2. 好みや興味を継続的に保持
    3. 現在のコンテキストを追跡
    4. 会話の状態を管理
    
    使用方法:
    - ユーザーが情報を提供したら、ワーキングメモリに保存
    - 会話中にワーキングメモリの情報を活用
    - ユーザーの好みに合わせて応答スタイルを調整
    - 現在のコンテキストを考慮した回答を提供
    
    記憶する情報:
    - 個人情報: 名前、年齢、場所、職業
    - 好み: コミュニケーションスタイル、技術レベル、回答の長さ
    - 興味: 趣味、スキル、専門分野
    - 現在の状況: アクティブなプロジェクト、目標、未完了タスク
    - 会話状態: 現在のトピック、未解決の質問
    
    特徴:
    - パーソナライズされた応答
    - 継続的な文脈理解
    - ユーザーの好みへの適応
    - 効率的な情報管理
  `,
  model: anthropic("claude-3-5-sonnet-20241022"),
  memory: workingMemoryConfig,
});
