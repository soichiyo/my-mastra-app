import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore, LibSQLVector } from "@mastra/libsql";
import { fastembed } from "@mastra/fastembed";
import { anthropic } from "@ai-sdk/anthropic";

// パーソナルアシスタント用のワーキングメモリ設定
const personalAssistantMemory = new Memory({
  storage: new LibSQLStore({
    url: "file:../../memory.db",
  }),
  vector: new LibSQLVector({
    connectionUrl: "file:../../vector.db",
  }),
  embedder: fastembed,
  options: {
    lastMessages: 25,
    semanticRecall: {
      topK: 4,
      messageRange: {
        before: 2,
        after: 1,
      },
    },
    workingMemory: {
      enabled: true,
      template: `
# パーソナルアシスタントプロフィール

## 基本情報
- 名前:
- 場所:
- タイムゾーン:
- 職業:
- 会社:

## 好みと習慣
- コミュニケーションスタイル: [フォーマル/カジュアル]
- 技術レベル: [初心者/中級者/上級者]
- 回答の詳細度: [簡潔/詳細]
- 言語: [日本語/英語/その他]
- 興味・趣味:
- 好きなトピック:

## スケジュールと習慣
- 通常の起床時間:
- 通常の就寝時間:
- 仕事時間:
- 休憩時間:
- 定期的な活動:

## 現在の状況
- アクティブなプロジェクト:
- 現在の目標:
- 最近の成果:
- 未完了のタスク:
- 優先度の高い事項:

## サポート履歴
- 過去にサポートした内容:
- 成功した解決策:
- 好評だった提案:
- 避けるべきアプローチ:

## 会話状態
- 現在のトピック:
- 未解決の質問:
- フォローアップが必要な事項:
- 会話の文脈:
      `,
    },
  },
});

export const personalAssistantMemoryAgent = new Agent({
  name: "PersonalAssistantMemory",
  instructions: `
    あなたは高度なワーキングメモリ機能を持つパーソナルアシスタントです。
    ユーザーの好み、習慣、状況を記憶し、パーソナライズされたサポートを提供します。
    
    ワーキングメモリの使用方法：
    
    1. 基本情報の管理
       - ユーザーの名前、場所、職業などの基本情報を記録
       - 情報が更新されたら、古い情報を新しい情報で置き換え
    
    2. 好みと習慣の学習
       - コミュニケーションスタイル、技術レベル、興味を記録
       - ユーザーの反応から好みを学習し、応答スタイルを調整
    
    3. スケジュールと習慣の追跡
       - ユーザーの生活パターン、仕事時間、習慣を記録
       - スケジュール管理やリマインダーの提案に活用
    
    4. 現在の状況の把握
       - アクティブなプロジェクト、目標、タスクを追跡
       - 優先度の高い事項を把握し、適切なサポートを提供
    
    5. サポート履歴の活用
       - 過去の成功事例や好評だった提案を記録
       - 同様の状況で効果的なサポートを提供
    
    応答のガイドライン：
    - ユーザーが既に提供した情報について質問する前に、ワーキングメモリを参照
    - 記憶した好みに合わせて応答スタイルを調整
    - 技術レベルに応じた説明の詳細度を調整
    - 過去の成功事例を参考に、効果的な提案を行う
    - ユーザーの習慣やスケジュールを考慮したアドバイスを提供
    
    特徴：
    - 継続的な学習と適応
    - パーソナライズされたサポート
    - 効率的な情報管理
    - 一貫したユーザー体験
  `,
  model: anthropic("claude-3-5-sonnet-20241022"),
  memory: personalAssistantMemory,
});
