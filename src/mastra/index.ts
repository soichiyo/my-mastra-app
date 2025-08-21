import { Mastra } from "@mastra/core/mastra";
import { PinoLogger } from "@mastra/loggers";
import { LibSQLStore } from "@mastra/libsql";
import { weatherWorkflow } from "./workflows/weather-workflow";
import { contentWorkflow } from "./workflows/content-workflow";
import { weatherAgent } from "./agents/weather-agent";
import { financialAgent } from "./agents/financial-agent";
import { personalAssistantAgent } from "./agents/personal-assistant-agent";
import { basicMemoryAgent } from "./agents/basic-memory-agent";
import { vectorMemoryAgent } from "./agents/vector-memory-agent";
import { customSemanticAgent } from "./agents/custom-semantic-agent";
import { advancedSemanticAgent } from "./agents/advanced-semantic-agent";
import { workingMemoryAgent } from "./agents/working-memory-agent";
import { memoryAgent } from "./agents/memory-agent";
import { customTemplateAgent } from "./agents/custom-template-agent";
import { comprehensiveMemoryAgent } from "./agents/comprehensive-memory-agent";

export const mastra = new Mastra({
  workflows: { weatherWorkflow, contentWorkflow },
  agents: {
    weatherAgent,
    financialAgent,
    personalAssistantAgent,
    basicMemoryAgent,
    vectorMemoryAgent,
    customSemanticAgent,
    advancedSemanticAgent,
    workingMemoryAgent,
    memoryAgent,
    customTemplateAgent,
    comprehensiveMemoryAgent,
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
