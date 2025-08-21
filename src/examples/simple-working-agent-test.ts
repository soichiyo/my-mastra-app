// src/examples/simple-working-agent-test.ts
import { Agent } from "@mastra/core/agent";
import { anthropic } from "@ai-sdk/anthropic";

const simpleAgent = new Agent({
  name: "SimpleAgent",
  instructions: "あなたは親切なアシスタントです。日本語で回答してください。",
  model: anthropic("claude-3-5-sonnet-20241022"),
});

async function simpleWorkingAgentTest() {
  console.log("🧪 シンプルエージェントテスト開始\n");

  try {
    console.log("📝 基本的な応答テスト");
    console.log("👤 ユーザー: こんにちは");

    const response = await simpleAgent.stream("こんにちは");

    if (response && "textStream" in response) {
      let responseText = "";
      for await (const chunk of response.textStream) {
        responseText += chunk;
      }
      console.log("🤖 エージェントのテキスト応答:", responseText);
    } else {
      console.log("❌ textStreamプロパティが見つかりません");
    }
  } catch (error: any) {
    console.error("❌ エラーが発生しました:", error);
  }
}

simpleWorkingAgentTest();
