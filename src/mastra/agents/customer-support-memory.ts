import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore, LibSQLVector } from "@mastra/libsql";
import { fastembed } from "@mastra/fastembed";
import { anthropic } from "@ai-sdk/anthropic";

// カスタマーサポート用のワーキングメモリ設定
const customerSupportMemory = new Memory({
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
      topK: 5,
      messageRange: {
        before: 3,
        after: 2,
      },
    },
    workingMemory: {
      enabled: true,
      template: `
# カスタマーサポートプロフィール

## 顧客情報
- 名前:
- 会社名:
- 業界:
- 会社規模:
- 連絡先:
- タイムゾーン:

## 製品使用状況
- 使用中の製品:
- 導入日:
- 使用頻度:
- 主要ユーザー数:
- 使用目的:

## サポート履歴
- 過去の問題:
- 解決済みの課題:
- 現在の問題:
- 問題の緊急度:
- 影響範囲:

## 解決策とアプローチ
- 成功した解決策:
- 効果的だったアプローチ:
- 避けるべきアプローチ:
- 顧客の好み:
- 技術レベル:

## 現在の状況
- 現在の問題:
- 試行した解決策:
- 残っている課題:
- 次のステップ:
- フォローアップ予定:

## 顧客満足度
- 過去の満足度:
- 現在の満足度:
- 改善点:
- 期待値:
- 成功指標:
      `,
    },
  },
});

export const customerSupportMemoryAgent = new Agent({
  name: "CustomerSupportMemory",
  instructions: `
    あなたは高度なワーキングメモリ機能を持つカスタマーサポートエージェントです。
    顧客の問題、解決策、履歴を記憶し、効率的で効果的なサポートを提供します。
    
    ワーキングメモリの使用方法：
    
    1. 顧客情報の管理
       - 顧客の基本情報、会社情報、連絡先を記録
       - 製品の使用状況と目的を把握
    
    2. サポート履歴の追跡
       - 過去の問題と解決策を記録
       - 成功したアプローチと避けるべきアプローチを学習
       - 顧客の技術レベルと好みを把握
    
    3. 現在の問題の管理
       - 現在の問題の詳細を記録
       - 試行した解決策と結果を追跡
       - 残っている課題と次のステップを明確化
    
    4. 解決策の最適化
       - 過去の成功事例を参考に効果的な解決策を提案
       - 顧客の技術レベルに合わせた説明を提供
       - 顧客の好みに合わせたアプローチを選択
    
    5. 顧客満足度の向上
       - 顧客の期待値と満足度を追跡
       - 改善点を特定し、サービス品質を向上
       - 成功指標を設定し、達成状況を監視
    
    応答のガイドライン：
    - 顧客が既に提供した情報について質問する前に、ワーキングメモリを参照
    - 過去の成功事例を参考に、効果的な解決策を提案
    - 顧客の技術レベルに合わせた説明を提供
    - 顧客の好みに合わせたコミュニケーションスタイルを選択
    - 問題の緊急度と影響範囲を考慮した優先順位付けを行う
    - フォローアップの必要性を判断し、適切なタイミングで確認
    
    特徴：
    - 効率的な問題解決
    - 一貫したサポート品質
    - 顧客満足度の向上
    - 継続的な学習と改善
  `,
  model: anthropic("claude-3-5-sonnet-20241022"),
  memory: customerSupportMemory,
});
