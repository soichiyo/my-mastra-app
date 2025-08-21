import { config } from "dotenv";
import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore, LibSQLVector } from "@mastra/libsql";
import { fastembed } from "@mastra/fastembed";
import { anthropic } from "@ai-sdk/anthropic";

// .envファイルを読み込み
config();

// 包括的なメモリ設定を作成
const comprehensiveMemory = new Memory({
  storage: new LibSQLStore({
    url: "file:../../memory.db", // .mastra/outputディレクトリからの相対パス
  }),
  vector: new LibSQLVector({
    connectionUrl: "file:../../vector.db", // .mastra/outputディレクトリからの相対パス
  }),
  embedder: fastembed,
  options: {
    // 会話履歴設定
    lastMessages: 20, // 最新20メッセージをコンテキストに含める

    // セマンティックリコール設定
    semanticRecall: {
      topK: 3, // 最も類似した3メッセージを取得
      messageRange: {
        before: 2, // 各マッチの前2メッセージを含める
        after: 1, // 各マッチの後1メッセージを含める
      },
    },

    // ワーキングメモリ設定
    workingMemory: {
      enabled: true,
      template: `
# ユーザープロフィール

## 個人情報
- 名前:
- 場所:
- タイムゾーン:
- 職業:

## 好み
- コミュニケーションスタイル:
- 興味のあるトピック:
- 学習目標:

## プロジェクト情報
- 現在のプロジェクト:
  - [プロジェクト1]:
    - 締切:
    - ステータス:
  - [プロジェクト2]:
    - 締切:
    - ステータス:

## セッション状態
- 現在のトピック:
- 未解決の質問:
- アクションアイテム:
      `,
    },
  },
});

export const comprehensiveMemoryAgent = new Agent({
  name: "ComprehensiveMemoryAgent",
  instructions: `
    あなたは包括的なメモリ機能を持つ高度なアシスタントです。
    会話履歴、セマンティックリコール、ワーキングメモリを組み合わせて、
    パーソナライズされた効率的なサポートを提供します。
    
    メモリ機能の使用方法：
    
    1. 会話履歴（Conversation History）
       - 最新20メッセージを常にコンテキストに保持
       - 現在の会話の流れを理解し、一貫した応答を提供
       - 短期的な文脈を維持
    
    2. セマンティックリコール（Semantic Recall）
       - 過去の会話から意味的に類似した内容を検索
       - 関連する情報を自動的に取得して文脈を構築
       - 長期的な記憶を活用した詳細な回答を提供
    
    3. ワーキングメモリ（Working Memory）
       - ユーザーの基本情報、好み、プロジェクト状況を構造化して保存
       - パーソナライズされた応答の提供
       - 継続的な学習と適応
    
    応答のガイドライン：
    - 会話履歴を活用して現在の文脈を理解
    - セマンティックリコールで関連する過去の情報を検索
    - ワーキングメモリの情報を活用してパーソナライズ
    - 情報が更新されたら適切にメモリを更新
    - 既知の情報について質問する前にメモリを参照
    
    特徴：
    - 短期的・長期的な記憶の組み合わせ
    - 意味的な関連性に基づく情報検索
    - 構造化されたユーザー情報の管理
    - 継続的な学習と適応
    - パーソナライズされた一貫したサポート
  `,
  model: anthropic("claude-3-5-sonnet-20241022"),
  memory: comprehensiveMemory,
});
