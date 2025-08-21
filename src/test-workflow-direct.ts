// src/test-workflow-direct.ts
import { contentWorkflow } from "./mastra/workflows/content-workflow";

async function testWorkflowDirect() {
  console.log("🚀 Testing workflow directly...\n");

  try {
    // Create a run instance directly from the workflow
    const run = contentWorkflow.createRun();

    // Execute with test data
    const result = await run.start({
      inputData: {
        content:
          "Climate change is one of the most pressing challenges of our time, requiring immediate action from governments, businesses, and individuals worldwide.",
        type: "blog",
      },
    });

    if (result.status === "success") {
      console.log("✅ Success!");
      console.log(
        "📝 Content:",
        result.result.content.substring(0, 50) + "..."
      );
      console.log("📊 Word count:", result.result.wordCount);
      console.log(
        "📊 Reading time:",
        result.result.metadata.readingTime,
        "minutes"
      );
      console.log("🎯 Difficulty:", result.result.metadata.difficulty);
      console.log("📅 Processed at:", result.result.metadata.processedAt);
    } else {
      console.log("❌ Workflow failed:", result.error);
    }
  } catch (error) {
    console.error("❌ Error:", (error as Error).message);
  }
}

// Run the test
testWorkflowDirect();
