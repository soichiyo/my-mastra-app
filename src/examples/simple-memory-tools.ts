import { basicMemoryAgent } from "../mastra/agents/basic-memory-agent";
import { personalAssistantAgent } from "../mastra/agents/personal-assistant-agent";

// シンプルなメモリツール
export class SimpleMemoryTools {
  private agent: any;

  constructor(agentType: "basic" | "personal" = "basic") {
    this.agent =
      agentType === "basic" ? basicMemoryAgent : personalAssistantAgent;
  }

  // メモリ機能をテスト
  async testMemory(resourceId: string, threadId: string) {
    console.log("🧪 メモリ機能テストを開始します...\n");

    try {
      // 1. 情報を教える
      console.log("📝 ステップ1: 情報を教える");
      await this.agent.stream(
        "私の名前は田中太郎です。東京に住んでいて、プログラミングが好きです。",
        {
          resourceId,
          threadId,
        }
      );

      console.log("✅ 情報を記憶しました\n");

      // 2. 記憶をテスト
      console.log("🧠 ステップ2: 記憶をテスト");
      await this.agent.stream(
        "私の名前と住んでいる場所、興味を覚えていますか？",
        {
          resourceId,
          threadId,
        }
      );

      console.log("✅ 記憶テスト完了\n");

      // 3. 新しいスレッドでテスト
      console.log("🆕 ステップ3: 新しいスレッドでテスト");
      const newThreadId = `conversation_${Date.now()}_new`;
      await this.agent.stream("私について何か知っていますか？", {
        resourceId,
        threadId: newThreadId,
      });

      console.log("✅ 新しいスレッドテスト完了\n");
    } catch (error) {
      console.error("❌ テスト中にエラーが発生:", error);
    }
  }

  // 会話をシミュレート
  async simulateConversation(resourceId: string, threadId: string) {
    console.log("💬 会話シミュレーションを開始します...\n");

    const messages = [
      "こんにちは！",
      "私の名前は佐藤花子です。",
      "私は大阪出身で、料理が趣味です。",
      "私の名前を覚えていますか？",
      "私の出身地と趣味は何でしたか？",
      "ありがとうございます！",
    ];

    try {
      for (let i = 0; i < messages.length; i++) {
        console.log(
          `📤 メッセージ ${i + 1}/${messages.length}: "${messages[i]}"`
        );

        await this.agent.stream(messages[i], {
          resourceId,
          threadId,
        });

        console.log(`✅ メッセージ ${i + 1} 完了\n`);

        // API制限を避けるため少し待機
        if (i < messages.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }

      console.log("🎉 会話シミュレーションが完了しました！");
    } catch (error) {
      console.error("❌ シミュレーション中にエラーが発生:", error);
    }
  }

  // カスタムメッセージを送信
  async sendCustomMessage(
    message: string,
    resourceId: string,
    threadId: string
  ) {
    console.log(`📤 カスタムメッセージを送信: "${message}"`);

    try {
      const response = await this.agent.stream(message, {
        resourceId,
        threadId,
      });

      console.log("✅ メッセージ送信完了");
      return response;
    } catch (error) {
      console.error("❌ メッセージ送信エラー:", error);
      throw error;
    }
  }

  // 複数のスレッドでテスト
  async testMultipleThreads(resourceId: string) {
    console.log("🧵 複数スレッドテストを開始します...\n");

    const threads = [
      { id: `thread_${Date.now()}_1`, topic: "仕事について" },
      { id: `thread_${Date.now()}_2`, topic: "趣味について" },
      { id: `thread_${Date.now()}_3`, topic: "家族について" },
    ];

    try {
      for (const thread of threads) {
        console.log(`\n--- スレッド: ${thread.topic} ---`);

        await this.agent.stream(`私は${thread.topic}話したいです。`, {
          resourceId,
          threadId: thread.id,
        });

        await this.agent.stream(
          `このスレッドでは何について話していましたか？`,
          {
            resourceId,
            threadId: thread.id,
          }
        );

        console.log(`✅ ${thread.topic} スレッド完了`);

        // スレッド間で少し待機
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }

      console.log("\n🎉 複数スレッドテストが完了しました！");
    } catch (error) {
      console.error("❌ 複数スレッドテスト中にエラーが発生:", error);
    }
  }
}

// 使用例
export async function simpleMemoryExample() {
  console.log("🚀 シンプルメモリツールの使用例\n");

  const resourceId = "user_test_example";
  const threadId = `conversation_${Date.now()}`;

  // BasicMemoryAgentでテスト
  console.log("🤖 BasicMemoryAgentでテスト");
  const basicTools = new SimpleMemoryTools("basic");
  await basicTools.testMemory(resourceId, threadId);

  console.log("\n" + "=".repeat(50) + "\n");

  // PersonalAssistantAgentでテスト
  console.log("🤖 PersonalAssistantAgentでテスト");
  const personalTools = new SimpleMemoryTools("personal");
  await personalTools.simulateConversation(resourceId, `personal_${threadId}`);
}

// 個別のテスト関数
export async function testBasicMemory() {
  const tools = new SimpleMemoryTools("basic");
  const resourceId = "user_basic_test";
  const threadId = `basic_${Date.now()}`;

  await tools.testMemory(resourceId, threadId);
}

export async function testPersonalAssistant() {
  const tools = new SimpleMemoryTools("personal");
  const resourceId = "user_personal_test";
  const threadId = `personal_${Date.now()}`;

  await tools.simulateConversation(resourceId, threadId);
}

export async function testMultipleThreads() {
  const tools = new SimpleMemoryTools("basic");
  const resourceId = "user_multithread_test";

  await tools.testMultipleThreads(resourceId);
}

// カスタム会話を開始
export async function startCustomConversation(
  userEmail: string,
  agentType: "basic" | "personal" = "basic"
) {
  const tools = new SimpleMemoryTools(agentType);
  const resourceId = `user_${userEmail.replace(/[^a-zA-Z0-9]/g, "_")}`;
  const threadId = `conversation_${Date.now()}`;

  console.log(`\n💡 カスタム会話が開始されました！`);
  console.log(`👤 ユーザーID: ${resourceId}`);
  console.log(`🧵 スレッドID: ${threadId}`);
  console.log(`🤖 エージェント: ${agentType}`);
  console.log(`\n📝 使用例:`);
  console.log(
    `await tools.sendCustomMessage("こんにちは！", "${resourceId}", "${threadId}");`
  );

  return { tools, resourceId, threadId };
}
