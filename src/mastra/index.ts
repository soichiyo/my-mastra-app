import { Mastra } from "@mastra/core/mastra";
import { PinoLogger } from "@mastra/loggers";
import { LibSQLStore } from "@mastra/libsql";
import { weatherWorkflow } from "./workflows/weather-workflow";
import { weatherAgent } from "./agents/weather-agent";
import { financialAgent } from "./agents/financial-agent";
import { personalAssistantAgent } from "./agents/personal-assistant-agent";
import { basicMemoryAgent } from "./agents/basic-memory-agent";
import { vectorMemoryAgent } from "./agents/vector-memory-agent";
import { customSemanticAgent } from "./agents/custom-semantic-agent";

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: {
    weatherAgent,
    financialAgent,
    personalAssistantAgent,
    basicMemoryAgent,
    vectorMemoryAgent,
    customSemanticAgent,
  },
  storage: new LibSQLStore({
    // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
});
