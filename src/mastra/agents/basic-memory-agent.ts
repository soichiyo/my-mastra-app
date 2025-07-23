import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";
import { anthropic } from "@ai-sdk/anthropic";

// Create a basic memory instance with conversation history
const memory = new Memory({
  storage: new LibSQLStore({
    url: "file:../../basic-memory.db", // relative path from the `.mastra/output` directory
  }),
  options: {
    lastMessages: 15, // Include the last 15 messages in context
  },
});

// Create an agent with memory
export const basicMemoryAgent = new Agent({
  name: "BasicMemoryAgent",
  instructions: `
    You are a helpful assistant with memory capabilities.
    You can remember previous conversations and user preferences.
    When a user shares information about themselves, acknowledge it and remember it for future reference.
    If asked about something mentioned earlier in the conversation, recall it accurately.
  `,
  model: anthropic("claude-3-5-sonnet-20241022"),
  memory: memory,
});
