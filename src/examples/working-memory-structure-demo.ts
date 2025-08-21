import { Memory } from "@mastra/memory";
import { LibSQLStore, LibSQLVector } from "@mastra/libsql";
import { fastembed } from "@mastra/fastembed";

// ワーキングメモリの構造化例
export const workingMemoryExamples = {
  // 基本的なユーザープロフィール
  basicProfile: `
    <user_profile>
      <personal_info>
        <name>田中太郎</name>
        <age>28</age>
        <location>東京</location>
        <occupation>ソフトウェアエンジニア</occupation>
      </personal_info>
      <preferences>
        <communication_style>技術的で詳細</communication_style>
        <response_length>簡潔</response_length>
        <language>日本語</language>
      </preferences>
    </user_profile>
  `,

  // 詳細なユーザープロフィール
  detailedProfile: `
    <user_profile>
      <personal_info>
        <name>田中太郎</name>
        <age>28</age>
        <location>東京</location>
        <occupation>ソフトウェアエンジニア</occupation>
        <company>Google</company>
        <experience_years>5</experience_years>
      </personal_info>
      <preferences>
        <communication_style>技術的で詳細</communication_style>
        <response_length>簡潔</response_length>
        <language>日本語</language>
        <technical_level>上級者</technical_level>
      </preferences>
      <interests>
        <hobbies>プログラミング、読書、旅行</hobbies>
        <skills>Python、JavaScript、機械学習、React</skills>
        <areas_of_expertise>フルスタック開発、AI/ML</areas_of_expertise>
      </interests>
      <current_context>
        <active_projects>AIチャットボット開発</active_projects>
        <current_goals>プロジェクトのリリース、技術力向上</current_goals>
        <recent_achievements>機械学習モデルの精度向上</recent_achievements>
        <pending_tasks>コードレビュー、ドキュメント作成</pending_tasks>
      </current_context>
    </user_profile>
  `,

  // プロジェクト管理向け
  projectManagement: `
    <project_context>
      <current_project>
        <name>AIチャットボット開発</name>
        <status>進行中</status>
        <deadline>2024年2月15日</deadline>
        <team_size>5人</team_size>
        <technologies>Python、TensorFlow、React、Node.js</technologies>
      </current_project>
      <user_role>
        <title>リードエンジニア</title>
        <responsibilities>アーキテクチャ設計、コードレビュー、チーム指導</responsibilities>
        <expertise_areas>バックエンド、AI/ML、システム設計</expertise_areas>
      </user_role>
      <project_goals>
        <primary>ユーザー体験の向上</primary>
        <secondary>パフォーマンス最適化</secondary>
        <technical>機械学習モデルの精度向上</technical>
      </project_goals>
    </project_context>
  `,

  // 学習・教育向け
  learningContext: `
    <learning_profile>
      <current_studies>
        <subject>機械学習</subject>
        <level>中級から上級</level>
        <focus_areas>深層学習、自然言語処理、コンピュータビジョン</focus_areas>
        <learning_goals>実践的なプロジェクト経験、最新技術の習得</learning_goals>
      </current_studies>
      <learning_preferences>
        <style>実践的、プロジェクトベース</style>
        <pace>中程度</pace>
        <resources>オンラインコース、実践プロジェクト、論文</resources>
        <challenges>理論と実践のバランス、最新技術の追跡</challenges>
      </learning_preferences>
      <progress_tracking>
        <completed_topics>基本的な機械学習アルゴリズム、データ前処理</completed_topics>
        <current_topic>Transformer アーキテクチャ</current_topic>
        <next_steps>BERT、GPTモデルの実装</next_steps>
      </progress_tracking>
    </learning_profile>
  `,
};

// ワーキングメモリの更新プロセスを説明
export function explainWorkingMemoryProcess() {
  console.log("🧠 ワーキングメモリの動作プロセス\n");

  console.log("1️⃣ 初期化");
  console.log("   - エージェントが会話を開始");
  console.log("   - 既存のワーキングメモリを読み込み");
  console.log("   - ユーザーに関する既知の情報を取得\n");

  console.log("2️⃣ 情報の提供");
  console.log("   - ユーザーが新しい情報を提供");
  console.log("   - 例: 「私の名前は田中太郎です」");
  console.log("   - エージェントが情報の重要性を判断\n");

  console.log("3️⃣ ワーキングメモリの更新");
  console.log("   - 重要な情報を構造化して保存");
  console.log("   - 既存の情報と統合");
  console.log("   - マークダウン形式で永続化\n");

  console.log("4️⃣ 後続の会話での活用");
  console.log("   - 新しい会話でワーキングメモリを読み込み");
  console.log("   - 保存された情報を即座に利用");
  console.log("   - パーソナライズされた応答を提供\n");

  console.log("5️⃣ 継続的な更新");
  console.log("   - 新しい情報が提供されるたびに更新");
  console.log("   - 古い情報の修正・削除");
  console.log("   - 情報の整合性を維持\n");
}

// ワーキングメモリの利点を説明
export function explainWorkingMemoryBenefits() {
  console.log("✅ ワーキングメモリの利点\n");

  console.log("🎯 効率性");
  console.log("   - 検索不要で即座にアクセス");
  console.log("   - 構造化された情報で処理が高速");
  console.log("   - 会話履歴の解析が不要\n");

  console.log("🧠 記憶の永続性");
  console.log("   - 会話が変わっても情報を保持");
  console.log("   - スレッド内での継続的な記憶");
  console.log("   - 長期にわたるユーザー理解\n");

  console.log("🎨 パーソナライゼーション");
  console.log("   - ユーザーの好みに合わせた応答");
  console.log("   - 個人的な文脈を考慮");
  console.log("   - 一貫したユーザー体験\n");

  console.log("📊 構造化された情報管理");
  console.log("   - 重要な情報のみを選択的に保存");
  console.log("   - 明確なカテゴリ分け");
  console.log("   - 更新・管理が容易\n");

  console.log("🔄 動的な更新");
  console.log("   - 新しい情報の自動追加");
  console.log("   - 古い情報の修正");
  console.log("   - 情報の整合性維持\n");
}

// 会話履歴との違いを説明
export function explainDifferenceFromConversationHistory() {
  console.log("🔄 会話履歴 vs ワーキングメモリ\n");

  console.log("📝 会話履歴");
  console.log("   - 実際のメッセージの記録");
  console.log("   - 時系列順の保存");
  console.log("   - 生の会話データ");
  console.log("   - 検索・解析が必要");
  console.log("   - 大量のデータ\n");

  console.log("🧠 ワーキングメモリ");
  console.log("   - 重要な情報の要約");
  console.log("   - 構造化された形式");
  console.log("   - 処理済みの情報");
  console.log("   - 直接アクセス可能");
  console.log("   - 効率的なデータ量\n");

  console.log("💡 使い分け");
  console.log("   - 会話履歴: 詳細な過去の会話を参照");
  console.log("   - ワーキングメモリ: ユーザー情報の即座アクセス");
  console.log("   - 組み合わせ: 最適な会話体験\n");
}

// デモ実行
explainWorkingMemoryProcess();
console.log("=".repeat(50));
explainWorkingMemoryBenefits();
console.log("=".repeat(50));
explainDifferenceFromConversationHistory();
