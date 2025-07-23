import { basicMemoryAgent } from "../mastra/agents/basic-memory-agent";

// メッセージの型定義
interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// フロントエンドでのメモリ処理例（TypeScript版）
export class MemoryChatApp {
  private messages: Message[] = [];
  private resourceId: string;
  private threadId: string;

  constructor(
    resourceId: string = "user_123",
    threadId: string = "conversation_456"
  ) {
    this.resourceId = resourceId;
    this.threadId = threadId;
  }

  // メッセージ送信処理
  async sendMessage(content: string): Promise<Message> {
    if (!content.trim()) {
      throw new Error("メッセージが空です");
    }

    const userMessage: Message = {
      role: "user",
      content,
      timestamp: new Date(),
    };

    // メッセージを追加
    this.messages.push(userMessage);

    try {
      // 最新のメッセージのみをエージェントに送信
      const response = await basicMemoryAgent.stream(content, {
        resourceId: this.resourceId,
        threadId: this.threadId,
      });

      const assistantMessage: Message = {
        role: "assistant",
        content:
          typeof response === "string"
            ? response
            : "応答を生成できませんでした",
        timestamp: new Date(),
      };

      // アシスタントの応答を追加
      this.messages.push(assistantMessage);
      return assistantMessage;
    } catch (error) {
      console.error("メッセージ送信エラー:", error);

      const errorMessage: Message = {
        role: "assistant",
        content: "申し訳ありません。エラーが発生しました。",
        timestamp: new Date(),
      };

      this.messages.push(errorMessage);
      return errorMessage;
    }
  }

  // メッセージ履歴を取得
  getMessages(): Message[] {
    return [...this.messages];
  }

  // 会話をクリア
  clearMessages(): void {
    this.messages = [];
  }

  // ユーザー情報を取得
  getInfo(): { resourceId: string; threadId: string; messageCount: number } {
    return {
      resourceId: this.resourceId,
      threadId: this.threadId,
      messageCount: this.messages.length,
    };
  }
}

// 使用例
export async function exampleUsage() {
  console.log("=== メモリ機能付きチャットの例 ===");

  // チャットアプリを作成
  const chatApp = new MemoryChatApp("user_alice", "conversation_123");

  // メッセージを送信
  console.log("1. 最初のメッセージを送信...");
  await chatApp.sendMessage("こんにちは！私の名前は田中太郎です。");

  console.log("2. 続きのメッセージを送信...");
  await chatApp.sendMessage(
    "プログラミングが好きで、特にPythonを使っています。"
  );

  console.log("3. 記憶をテスト...");
  await chatApp.sendMessage("私の名前と興味を覚えていますか？");

  // メッセージ履歴を表示
  console.log("\n=== 会話履歴 ===");
  const messages = chatApp.getMessages();
  messages.forEach((msg, index) => {
    console.log(`${index + 1}. [${msg.role}] ${msg.content}`);
  });

  // アプリ情報を表示
  const info = chatApp.getInfo();
  console.log("\n=== アプリ情報 ===");
  console.log(`ユーザーID: ${info.resourceId}`);
  console.log(`スレッドID: ${info.threadId}`);
  console.log(`メッセージ数: ${info.messageCount}`);
}

// メモリ機能のテスト関数
export async function testMemoryFeatures() {
  console.log("=== メモリ機能テスト ===");

  const chatApp = new MemoryChatApp("test_user", "test_conversation");

  // テスト1: 基本的な記憶
  console.log("\n--- テスト1: 基本的な記憶 ---");
  await chatApp.sendMessage("私の名前は田中太郎です");
  await chatApp.sendMessage("私の名前を覚えていますか？");

  // テスト2: 詳細情報の記憶
  console.log("\n--- テスト2: 詳細情報の記憶 ---");
  await chatApp.sendMessage("私は東京に住んでいて、IT企業で働いています");
  await chatApp.sendMessage("私について覚えていることを教えてください");

  // テスト3: 会話の継続性
  console.log("\n--- テスト3: 会話の継続性 ---");
  await chatApp.sendMessage("今日の天気はどうですか？");
  await chatApp.sendMessage("先ほど何について話しましたか？");

  console.log("\n=== テスト完了 ===");
  const messages = chatApp.getMessages();
  console.log(`総メッセージ数: ${messages.length}`);
}
