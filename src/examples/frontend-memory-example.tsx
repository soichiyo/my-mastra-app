import React, { useState, useEffect } from "react";
import { basicMemoryAgent } from "../mastra/agents/basic-memory-agent";

// メッセージの型定義
interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// フロントエンドでのメモリ処理例
export function MemoryChatApp() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ユーザーIDとスレッドID（実際のアプリでは認証システムから取得）
  const resourceId = "user_123";
  const threadId = "conversation_456";

  // メッセージ送信処理
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    // UIにユーザーメッセージを追加
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // 最新のメッセージのみをエージェントに送信
      const response = await basicMemoryAgent.stream(input, {
        resourceId,
        threadId,
      });

      const assistantMessage: Message = {
        role: "assistant",
        content: (await response.text) || "応答を生成できませんでした",
        timestamp: new Date(),
      };

      // UIにアシスタントの応答を追加
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("メッセージ送信エラー:", error);

      const errorMessage: Message = {
        role: "assistant",
        content: "申し訳ありません。エラーが発生しました。",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  // Enterキーでメッセージ送信
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-app">
      <div className="chat-header">
        <h2>メモリ機能付きチャット</h2>
        <div className="chat-info">
          <span>ユーザーID: {resourceId}</span>
          <span>スレッドID: {threadId}</span>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role === "user" ? "user" : "assistant"}`}
          >
            <div className="message-content">
              <strong>
                {message.role === "user" ? "あなた" : "アシスタント"}:
              </strong>
              <p>{message.content}</p>
            </div>
            <div className="message-timestamp">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="message assistant">
            <div className="message-content">
              <strong>アシスタント:</strong>
              <p>考え中...</p>
            </div>
          </div>
        )}
      </div>

      <div className="chat-input">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="メッセージを入力してください..."
          disabled={isLoading}
          rows={3}
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? "送信中..." : "送信"}
        </button>
      </div>

      <div className="chat-tips">
        <h4>💡 メモリ機能のテスト</h4>
        <ul>
          <li>「私の名前は田中です」と入力</li>
          <li>「私の名前を覚えていますか？」と質問</li>
          <li>エージェントが名前を記憶しているか確認</li>
        </ul>
      </div>
    </div>
  );
}

// スタイル（CSS-in-JS風）
export const chatStyles = `
  .chat-app {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  .chat-header {
    background: #f5f5f5;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .chat-info {
    display: flex;
    gap: 20px;
    font-size: 12px;
    color: #666;
  }

  .chat-messages {
    height: 400px;
    overflow-y: auto;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
  }

  .message {
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 8px;
  }

  .message.user {
    background: #e3f2fd;
    margin-left: 20%;
  }

  .message.assistant {
    background: #f5f5f5;
    margin-right: 20%;
  }

  .message-timestamp {
    font-size: 11px;
    color: #999;
    margin-top: 5px;
  }

  .chat-input {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .chat-input textarea {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: vertical;
  }

  .chat-input button {
    padding: 10px 20px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .chat-input button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  .chat-tips {
    background: #fff3cd;
    border: 1px solid #ffeaa7;
    border-radius: 8px;
    padding: 15px;
  }

  .chat-tips ul {
    margin: 10px 0;
    padding-left: 20px;
  }
`;
