import { MCPClient } from "@mastra/mcp";

const mcp = new MCPClient({
  servers: {
    zapier: {
      url: new URL(process.env.ZAPIER_MCP_URL || ""),
    },
  },
});

// Initialize MCP tools
const mcpTools = await mcp.getTools();

export { mcp, mcpTools };
