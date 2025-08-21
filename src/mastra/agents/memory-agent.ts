import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore, LibSQLVector } from "@mastra/libsql";
import { fastembed } from "@mastra/fastembed";
import { anthropic } from "@ai-sdk/anthropic";

// ワーキングメモリ機能を備えたメモリ設定
const memory = new Memory({
  storage: new LibSQLStore({
    url: "file:../../memory.db", // .mastra/outputディレクトリからの相対パス
  }), // メッセージ履歴のストレージ
  vector: new LibSQLVector({
    connectionUrl: "file:../../vector.db", // .mastra/outputディレクトリからの相対パス
  }), // セマンティック検索用のベクトルデータベース
  embedder: fastembed, // メッセージ埋め込み用のエンベッダー
  options: {
    lastMessages: 20, // 最新20メッセージを保持
    semanticRecall: {
      topK: 3, // 上位3件の類似メッセージを取得
      messageRange: {
        before: 2, // マッチ前の2メッセージを含める
        after: 1, // マッチ後の1メッセージを含める
      },
    },
    workingMemory: {
      enabled: true, // ワーキングメモリを有効化
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
        </user_profile>
      `,
    },
  },
});

// 設定されたメモリを持つエージェントを作成
export const memoryAgent = new Agent({
  name: "MemoryAgent",
  instructions: `
    あなたは高度なメモリ機能を持つアシスタントです。
    過去の会話とユーザーの好みを記憶できます。
    
    重要: ユーザーに関する永続的な情報を保存するためのワーキングメモリにアクセスできます。
    ユーザーについて重要なことを学んだら、ワーキングメモリを更新してください。
    これには以下が含まれます：
    - 名前
    - 場所
    - 好み
    - 興味
    - 会話をパーソナライズするのに役立つその他の関連情報
    
    ユーザーが既に提供した情報について質問する前に、常にワーキングメモリを参照してください。
    ワーキングメモリの情報を使用して、パーソナライズされた応答を提供してください。
    
    ワーキングメモリの使用方法：
    1. ユーザーが新しい情報を提供したら、適切なカテゴリに保存
    2. 会話中にワーキングメモリの情報を活用
    3. ユーザーの好みに合わせて応答スタイルを調整
    4. 既知の情報について質問しない
    
    特徴：
    - パーソナライズされた応答
    - 継続的な文脈理解
    - 効率的な情報管理
    - ユーザー体験の向上
  `,
  model: anthropic("claude-3-5-sonnet-20241022"),
  memory: memory,
});
