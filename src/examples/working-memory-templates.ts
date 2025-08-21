// 用途別ワーキングメモリテンプレート例

export const workingMemoryTemplates = {
  // 1. 基本的なユーザーサポート向け
  basicSupport: `
# ユーザーサポートプロフィール

## 基本情報
- 名前:
- 連絡先:
- タイムゾーン:

## サポート履歴
- 過去の問題:
- 解決済みの課題:
- 現在の問題:

## 好み
- コミュニケーションスタイル:
- 技術レベル:
- 回答の詳細度:

## 現在の状況
- 使用中の製品:
- 発生している問題:
- 緊急度:
  `,

  // 2. 教育・学習向け
  education: `
# 学習者プロフィール

## 基本情報
- 名前:
- 年齢:
- 学習レベル:

## 学習状況
- 現在学習中の科目:
- 学習目標:
- 学習スタイル:
- 理解度:

## 進捗管理
- 完了したトピック:
- 現在のトピック:
- 次のステップ:
- 課題や困難:

## 学習履歴
- 過去の学習内容:
- 得意分野:
- 苦手分野:
- 学習時間:
  `,

  // 3. プロジェクト管理向け
  projectManagement: `
# プロジェクト管理プロフィール

## プロジェクト情報
- プロジェクト名:
- ステータス:
- 開始日:
- 締切:
- 優先度:

## チーム情報
- チームサイズ:
- 役割:
- 責任範囲:
- 連絡先:

## 技術情報
- 使用技術:
- 開発環境:
- 依存関係:
- 制約事項:

## 進捗管理
- 完了したタスク:
- 進行中のタスク:
- 未完了のタスク:
- リスク要因:
- マイルストーン:
  `,

  // 4. カスタマーサクセス向け
  customerSuccess: `
# カスタマーサクセスプロフィール

## 顧客情報
- 会社名:
- 業界:
- 規模:
- 担当者:

## 製品使用状況
- 使用中の製品:
- 導入日:
- 使用頻度:
- 主要ユーザー:

## 目標と成果
- ビジネス目標:
- 期待する成果:
- 達成した成果:
- ROI:

## サポート履歴
- 過去のサポート案件:
- 解決済みの問題:
- 現在の課題:
- 満足度:
  `,

  // 5. 研究・開発向け
  researchDevelopment: `
# 研究開発プロフィール

## 研究情報
- 研究分野:
- 専門領域:
- 現在の研究テーマ:
- 研究目標:

## 技術情報
- 使用技術:
- 実験環境:
- データソース:
- 分析手法:

## 進捗管理
- 完了した実験:
- 進行中の実験:
- 次のステップ:
- 課題や困難:

## 成果と発表
- 研究成果:
- 発表論文:
- 特許:
- 今後の計画:
  `,

  // 6. ヘルスケア向け
  healthcare: `
# ヘルスケアプロフィール

## 基本情報
- 名前:
- 年齢:
- 性別:
- 連絡先:

## 健康情報
- 既往歴:
- 現在の症状:
- 服用中の薬:
- アレルギー:

## 生活習慣
- 運動習慣:
- 食事習慣:
- 睡眠パターン:
- ストレスレベル:

## 医療履歴
- 過去の診察:
- 検査結果:
- 治療履歴:
- フォローアップ予定:
  `,
};

// テンプレート選択のガイド
export function selectTemplate(useCase: string) {
  switch (useCase.toLowerCase()) {
    case "support":
    case "customer_service":
      return {
        template: workingMemoryTemplates.basicSupport,
        description: "基本的なユーザーサポート向けテンプレート",
        features: ["基本情報", "サポート履歴", "好み", "現在の状況"],
      };

    case "education":
    case "learning":
      return {
        template: workingMemoryTemplates.education,
        description: "教育・学習向けテンプレート",
        features: ["基本情報", "学習状況", "進捗管理", "学習履歴"],
      };

    case "project":
    case "management":
      return {
        template: workingMemoryTemplates.projectManagement,
        description: "プロジェクト管理向けテンプレート",
        features: ["プロジェクト情報", "チーム情報", "技術情報", "進捗管理"],
      };

    case "customer_success":
    case "success":
      return {
        template: workingMemoryTemplates.customerSuccess,
        description: "カスタマーサクセス向けテンプレート",
        features: ["顧客情報", "製品使用状況", "目標と成果", "サポート履歴"],
      };

    case "research":
    case "development":
      return {
        template: workingMemoryTemplates.researchDevelopment,
        description: "研究・開発向けテンプレート",
        features: ["研究情報", "技術情報", "進捗管理", "成果と発表"],
      };

    case "healthcare":
    case "health":
      return {
        template: workingMemoryTemplates.healthcare,
        description: "ヘルスケア向けテンプレート",
        features: ["基本情報", "健康情報", "生活習慣", "医療履歴"],
      };

    default:
      return {
        template: workingMemoryTemplates.basicSupport,
        description: "デフォルトの基本サポートテンプレート",
        features: ["基本情報", "サポート履歴", "好み", "現在の状況"],
      };
  }
}

// テンプレートの比較表示
export function printTemplateComparison() {
  console.log("📋 用途別ワーキングメモリテンプレート比較\n");

  Object.entries(workingMemoryTemplates).forEach(([key, template]) => {
    const useCase = key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
    console.log(`🔹 ${useCase}`);
    console.log(`   用途: ${getUseCaseDescription(key)}`);
    console.log(`   特徴: ${getTemplateFeatures(key).join(", ")}`);
    console.log("");
  });
}

function getUseCaseDescription(key: string): string {
  const descriptions: Record<string, string> = {
    basicSupport: "基本的なユーザーサポート",
    education: "教育・学習支援",
    projectManagement: "プロジェクト管理",
    customerSuccess: "カスタマーサクセス",
    researchDevelopment: "研究・開発支援",
    healthcare: "ヘルスケア支援",
  };
  return descriptions[key] || "一般的な用途";
}

function getTemplateFeatures(key: string): string[] {
  const features: Record<string, string[]> = {
    basicSupport: ["基本情報", "サポート履歴", "好み", "現在の状況"],
    education: ["基本情報", "学習状況", "進捗管理", "学習履歴"],
    projectManagement: [
      "プロジェクト情報",
      "チーム情報",
      "技術情報",
      "進捗管理",
    ],
    customerSuccess: ["顧客情報", "製品使用状況", "目標と成果", "サポート履歴"],
    researchDevelopment: ["研究情報", "技術情報", "進捗管理", "成果と発表"],
    healthcare: ["基本情報", "健康情報", "生活習慣", "医療履歴"],
  };
  return features[key] || ["基本情報", "好み", "現在の状況"];
}

// デモ実行
printTemplateComparison();
