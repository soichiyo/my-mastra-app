import { basicMemoryAgent } from "../mastra/agents/basic-memory-agent";

// メモリを使用したアプリケーションの例
export class MemoryAppExample {
  // ユーザーIDの生成
  private generateUserId(email: string): string {
    return `user_${email.replace(/[^a-zA-Z0-9]/g, "_")}`;
  }

  // 会話IDの生成
  private generateThreadId(): string {
    return `conversation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // 新しい会話を開始
  async startConversation(userEmail: string) {
    const resourceId = this.generateUserId(userEmail);
    const threadId = this.generateThreadId();

    console.log(`Starting conversation for user: ${resourceId}`);
    console.log(`Thread ID: ${threadId}`);

    return { resourceId, threadId };
  }

  // メッセージを送信
  async sendMessage(message: string, resourceId: string, threadId: string) {
    try {
      const response = await basicMemoryAgent.stream(message, {
        resourceId,
        threadId,
      });

      return response;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }

  // 会話履歴を取得
  async getConversationHistory(resourceId: string, threadId: string) {
    // メモリから会話履歴を取得する例
    // 実際の実装では、memory.query()を使用
    console.log(`Getting history for ${resourceId}, thread: ${threadId}`);
  }
}

// 使用例
export async function exampleUsage() {
  const app = new MemoryAppExample();

  // 1. 新しい会話を開始
  const { resourceId, threadId } =
    await app.startConversation("alice@example.com");

  // 2. メッセージを送信
  await app.sendMessage("Hello, my name is Alice.", resourceId, threadId);

  // 3. 続きのメッセージ（同じスレッドで）
  await app.sendMessage("What's my name?", resourceId, threadId);

  // 4. 新しい会話を開始（同じユーザー、異なるスレッド）
  const { threadId: newThreadId } =
    await app.startConversation("alice@example.com");
  await app.sendMessage("This is a new conversation.", resourceId, newThreadId);
}
