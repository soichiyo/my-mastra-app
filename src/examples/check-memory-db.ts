import { execSync } from "child_process";
import fs from "fs";

// メモリデータベースを確認するシンプルなツール
export class MemoryDatabaseChecker {
  private dbPath = "memory.db";

  // データベースファイルの存在確認
  checkDatabaseExists() {
    console.log("🔍 メモリデータベースの存在確認...");

    if (fs.existsSync(this.dbPath)) {
      console.log("✅ データベースファイルが見つかりました:", this.dbPath);
      const stats = fs.statSync(this.dbPath);
      console.log(`📊 ファイルサイズ: ${(stats.size / 1024).toFixed(2)} KB`);
      return true;
    } else {
      console.log("❌ データベースファイルが見つかりません:", this.dbPath);
      return false;
    }
  }

  // テーブル一覧を表示
  showTables() {
    console.log("\n📋 データベース内のテーブル一覧:");

    try {
      const result = execSync(`sqlite3 ${this.dbPath} ".tables"`, {
        encoding: "utf8",
      });
      const tables = result
        .trim()
        .split(/\s+/)
        .filter((table) => table.length > 0);

      if (tables.length === 0) {
        console.log("📭 テーブルが見つかりませんでした。");
        return [];
      }

      tables.forEach((table) => {
        console.log(`  - ${table}`);
      });

      return tables;
    } catch (error) {
      console.error("❌ テーブル一覧取得エラー:", error);
      return [];
    }
  }

  // 各テーブルのレコード数を表示
  showTableCounts(tables: string[]) {
    console.log("\n📊 各テーブルのレコード数:");

    tables.forEach((table) => {
      try {
        const result = execSync(
          `sqlite3 ${this.dbPath} "SELECT COUNT(*) FROM ${table};"`,
          { encoding: "utf8" }
        );
        const count = result.trim();
        console.log(`  📊 ${table}: ${count} レコード`);
      } catch (error) {
        console.log(`  ❌ ${table}: エラー (テーブルが存在しない可能性)`);
      }
    });
  }

  // メッセージテーブルの内容を表示
  showMessages(limit: number = 10) {
    console.log(`\n💬 最新のメッセージ (最大${limit}件):`);

    try {
      const result = execSync(
        `sqlite3 ${this.dbPath} "SELECT resource_id, thread_id, role, substr(content, 1, 50) as content_preview, created_at FROM messages ORDER BY created_at DESC LIMIT ${limit};"`,
        { encoding: "utf8" }
      );

      if (!result.trim()) {
        console.log("📭 メッセージが見つかりませんでした。");
        return;
      }

      const lines = result.trim().split("\n");
      lines.forEach((line) => {
        const [resourceId, threadId, role, content, createdAt] =
          line.split("|");
        console.log(
          `  👤 ${resourceId} | 🧵 ${threadId} | ${role}: ${content}... | 📅 ${createdAt}`
        );
      });
    } catch (error) {
      console.error("❌ メッセージ取得エラー:", error);
    }
  }

  // ワーキングメモリテーブルの内容を表示
  showWorkingMemory(limit: number = 5) {
    console.log(`\n🧠 ワーキングメモリ (最大${limit}件):`);

    try {
      const result = execSync(
        `sqlite3 ${this.dbPath} "SELECT resource_id, substr(data, 1, 100) as data_preview, updated_at FROM working_memory ORDER BY updated_at DESC LIMIT ${limit};"`,
        { encoding: "utf8" }
      );

      if (!result.trim()) {
        console.log("📭 ワーキングメモリが見つかりませんでした。");
        return;
      }

      const lines = result.trim().split("\n");
      lines.forEach((line) => {
        const [resourceId, data, updatedAt] = line.split("|");
        console.log(`  👤 ${resourceId} | 📄 ${data}... | 🔄 ${updatedAt}`);
      });
    } catch (error) {
      console.error("❌ ワーキングメモリ取得エラー:", error);
    }
  }

  // 特定のユーザーのデータを表示
  showUserData(resourceId: string) {
    console.log(`\n👤 ユーザー "${resourceId}" のデータ:`);

    try {
      // メッセージ数
      const messageCount = execSync(
        `sqlite3 ${this.dbPath} "SELECT COUNT(*) FROM messages WHERE resource_id = '${resourceId}';"`,
        { encoding: "utf8" }
      ).trim();

      console.log(`  💬 メッセージ数: ${messageCount}`);

      // ワーキングメモリ
      const workingMemory = execSync(
        `sqlite3 ${this.dbPath} "SELECT data FROM working_memory WHERE resource_id = '${resourceId}';"`,
        { encoding: "utf8" }
      ).trim();

      if (workingMemory) {
        console.log(`  🧠 ワーキングメモリ: ${workingMemory}`);
      } else {
        console.log(`  🧠 ワーキングメモリ: なし`);
      }

      // 最新のメッセージ
      const latestMessage = execSync(
        `sqlite3 ${this.dbPath} "SELECT role, substr(content, 1, 50) as content_preview, created_at FROM messages WHERE resource_id = '${resourceId}' ORDER BY created_at DESC LIMIT 1;"`,
        { encoding: "utf8" }
      ).trim();

      if (latestMessage) {
        const [role, content, createdAt] = latestMessage.split("|");
        console.log(
          `  📝 最新メッセージ: ${role}: ${content}... | 📅 ${createdAt}`
        );
      }
    } catch (error) {
      console.error("❌ ユーザーデータ取得エラー:", error);
    }
  }

  // データベースの完全な状態を表示
  showFullStatus() {
    console.log("🔍 メモリデータベースの完全な状態を確認中...\n");

    // 1. データベースの存在確認
    if (!this.checkDatabaseExists()) {
      return;
    }

    // 2. テーブル一覧
    const tables = this.showTables();

    // 3. レコード数
    this.showTableCounts(tables);

    // 4. 最新のメッセージ
    this.showMessages();

    // 5. ワーキングメモリ
    this.showWorkingMemory();

    console.log("\n✅ データベース状態確認完了！");
  }
}

// 使用例
export async function checkMemoryDatabase() {
  const checker = new MemoryDatabaseChecker();
  checker.showFullStatus();
}

// 個別の確認関数
export async function checkDatabaseExists() {
  const checker = new MemoryDatabaseChecker();
  return checker.checkDatabaseExists();
}

export async function showDatabaseTables() {
  const checker = new MemoryDatabaseChecker();
  const tables = checker.showTables();
  checker.showTableCounts(tables);
}

export async function showLatestMessages(limit: number = 10) {
  const checker = new MemoryDatabaseChecker();
  checker.showMessages(limit);
}

export async function showWorkingMemories(limit: number = 5) {
  const checker = new MemoryDatabaseChecker();
  checker.showWorkingMemory(limit);
}

export async function showUserData(resourceId: string) {
  const checker = new MemoryDatabaseChecker();
  checker.showUserData(resourceId);
}
