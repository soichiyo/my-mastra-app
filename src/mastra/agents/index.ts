import { MCPClient } from "@mastra/mcp";
import path from "path";

const mcp = new MCPClient({
  servers: {
    zapier: {
      url: new URL(process.env.ZAPIER_MCP_URL || ""),
    },
    github: {
      url: new URL(process.env.COMPOSIO_MCP_GITHUB || ""),
    },
    hackernews: {
      command: "npx",
      args: ["-y", "@devabdultech/hn-mcp-server"],
    },
    //Filesystemサーバーを追加
    textEditor: {
      command: "pnpx",
      args: [
        `@modelcontextprotocol/server-filesystem`,
        path.join(process.cwd(), "..", "..", "notes"), // relative to output directory
      ],
    },
  },
});

// Initialize MCP tools
const mcpTools = await mcp.getTools();

export { mcp, mcpTools };
