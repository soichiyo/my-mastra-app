import { testMemoryFeatures, exampleUsage } from "./frontend-memory-example";

// コンソールでメモリ機能をテスト
async function runMemoryTest() {
  console.log("🚀 メモリ機能テストを開始します...");

  try {
    // 基本的な使用例を実行
    await exampleUsage();

    console.log("\n" + "=".repeat(50) + "\n");

    // 詳細なメモリ機能テストを実行
    await testMemoryFeatures();

    console.log("\n✅ テストが完了しました！");
  } catch (error) {
    console.error("❌ テスト中にエラーが発生しました:", error);
  }
}

// テストを実行
runMemoryTest();
