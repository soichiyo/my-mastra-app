import { basicMemoryAgent } from "../mastra/agents/basic-memory-agent";
import { personalAssistantAgent } from "../mastra/agents/personal-assistant-agent";

// 実際のメモリデータベースと接続するアプリケーション例
export class RealMemoryApp {
  private currentAgent: any;
  private currentResourceId: string = "";
  private currentThreadId: string = "";

  constructor(agentType: "basic" | "personal" = "basic") {
    this.currentAgent =
      agentType === "basic" ? basicMemoryAgent : personalAssistantAgent;
  }

  // ユーザーIDの生成
  private generateUserId(email: string): string {
    return `user_${email.replace(/[^a-zA-Z0-9]/g, "_")}`;
  }

  // 会話IDの生成
  private generateThreadId(): string {
    return `conversation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // 新しい会話を開始
  async startConversation(userEmail: string, threadId?: string) {
    this.currentResourceId = this.generateUserId(userEmail);
    this.currentThreadId = threadId || this.generateThreadId();

    console.log(`🚀 新しい会話を開始`);
    console.log(`👤 ユーザーID: ${this.currentResourceId}`);
    console.log(`🧵 スレッドID: ${this.currentThreadId}`);

    return {
      resourceId: this.currentResourceId,
      threadId: this.currentThreadId,
    };
  }

  // メッセージを送信（実際のメモリ機能を使用）
  async sendMessage(message: string, resourceId?: string, threadId?: string) {
    const targetResourceId = resourceId || this.currentResourceId;
    const targetThreadId = threadId || this.currentThreadId;

    if (!targetResourceId || !targetThreadId) {
      throw new Error(
        "会話が開始されていません。startConversation()を先に呼び出してください。"
      );
    }

    try {
      console.log(`📤 メッセージ送信: "${message}"`);
      console.log(
        `🔗 リソースID: ${targetResourceId}, スレッドID: ${targetThreadId}`
      );

      const response = await this.currentAgent.stream(message, {
        resourceId: targetResourceId,
        threadId: targetThreadId,
      });

      console.log(`📥 応答受信完了`);
      return response;
    } catch (error) {
      console.error("❌ メッセージ送信エラー:", error);
      throw error;
    }
  }

  // メモリの状態を確認
  async checkMemoryStatus() {
    console.log(`\n📊 メモリ状態確認`);
    console.log(`👤 現在のユーザーID: ${this.currentResourceId}`);
    console.log(`🧵 現在のスレッドID: ${this.currentThreadId}`);
    console.log(`🤖 使用エージェント: ${this.currentAgent.name || "Unknown"}`);
  }

  // 同じユーザーで新しいスレッドを開始
  async startNewThread() {
    if (!this.currentResourceId) {
      throw new Error("先に会話を開始してください。");
    }

    const newThreadId = this.generateThreadId();
    this.currentThreadId = newThreadId;

    console.log(`🆕 新しいスレッドを開始: ${newThreadId}`);
    return { resourceId: this.currentResourceId, threadId: newThreadId };
  }

  // メモリテストを実行
  async runMemoryTest() {
    console.log("\n🧪 メモリ機能テストを開始します...\n");

    try {
      // 1. 会話開始
      await this.startConversation("test@example.com");

      // 2. 最初のメッセージ（情報を教える）
      console.log("\n--- ステップ1: 情報を教える ---");
      await this.sendMessage(
        "私の名前は田中太郎です。東京に住んでいて、プログラミングが好きです。"
      );

      // 3. 記憶をテスト
      console.log("\n--- ステップ2: 記憶をテスト ---");
      await this.sendMessage(
        "私の名前と住んでいる場所、興味を覚えていますか？"
      );

      // 4. 新しいスレッドでテスト
      console.log("\n--- ステップ3: 新しいスレッドでテスト ---");
      await this.startNewThread();
      await this.sendMessage("私について何か知っていますか？");

      console.log("\n✅ メモリテストが完了しました！");
    } catch (error) {
      console.error("❌ テスト中にエラーが発生:", error);
    }
  }

  // 会話履歴のシミュレーション
  async simulateConversation() {
    console.log("\n💬 会話シミュレーションを開始します...\n");

    try {
      await this.startConversation("user@example.com");

      const messages = [
        "こんにちは！",
        "私の名前は佐藤花子です。",
        "私は大阪出身で、料理が趣味です。",
        "私の名前を覚えていますか？",
        "私の出身地と趣味は何でしたか？",
        "ありがとうございます！",
      ];

      for (let i = 0; i < messages.length; i++) {
        console.log(`\n--- メッセージ ${i + 1}/${messages.length} ---`);
        await this.sendMessage(messages[i]);

        // 少し待機（API制限を避けるため）
        if (i < messages.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }

      console.log("\n✅ 会話シミュレーションが完了しました！");
    } catch (error) {
      console.error("❌ シミュレーション中にエラーが発生:", error);
    }
  }
}

// 使用例
export async function realMemoryExample() {
  console.log("🚀 実際のメモリ機能を使用した例を開始します...\n");

  // BasicMemoryAgentを使用
  const basicApp = new RealMemoryApp("basic");
  await basicApp.runMemoryTest();

  console.log("\n" + "=".repeat(50) + "\n");

  // PersonalAssistantAgentを使用
  const personalApp = new RealMemoryApp("personal");
  await personalApp.simulateConversation();
}

// 個別のテスト関数
export async function testBasicMemory() {
  const app = new RealMemoryApp("basic");
  await app.runMemoryTest();
}

export async function testPersonalAssistant() {
  const app = new RealMemoryApp("personal");
  await app.simulateConversation();
}

// カスタム会話を開始する関数
export async function startCustomConversation(
  userEmail: string,
  agentType: "basic" | "personal" = "basic"
) {
  const app = new RealMemoryApp(agentType);
  const { resourceId, threadId } = await app.startConversation(userEmail);

  console.log(`\n💡 カスタム会話が開始されました！`);
  console.log(`📝 使用例:`);
  console.log(
    `await app.sendMessage("こんにちは！", "${resourceId}", "${threadId}");`
  );

  return { app, resourceId, threadId };
}
