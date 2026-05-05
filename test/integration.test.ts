import { assertEquals } from "@std/assert";
import * as fs from "node:fs";

Deno.test("generate docs for @nshiab/simple-data-analysis", async () => {
  const lib = "@nshiab/simple-data-analysis";
  const outputMd = "test/output/simple-data-analysis.test.md";

  // Clean up previous test runs
  if (fs.existsSync(outputMd)) await Deno.remove(outputMd);

  const command = new Deno.Command(Deno.execPath(), {
    args: ["run", "-A", "main.ts", `--jsr=${lib}`],
  });

  const { success, stderr } = await command.output();

  if (!success) {
    const errorBody = new TextDecoder().decode(stderr);
    console.error(errorBody);
  }

  assertEquals(success, true, "Execution should be successful");

  const mdExists = fs.existsSync("llm.md");
  assertEquals(mdExists, true, "llm.md should be generated");

  if (mdExists) {
    await Deno.rename("llm.md", outputMd);
  }
});

Deno.test("generate docs for @nshiab/journalism", async () => {
  const lib = "@nshiab/journalism";
  const outputMd = "test/output/journalism.test.md";

  // Clean up previous test runs
  if (fs.existsSync(outputMd)) await Deno.remove(outputMd);

  const command = new Deno.Command(Deno.execPath(), {
    args: ["run", "-A", "main.ts", `--jsr=${lib}`],
  });

  const { success, stderr } = await command.output();

  if (!success) {
    const errorBody = new TextDecoder().decode(stderr);
    console.error(errorBody);
  }

  assertEquals(success, true, "Execution should be successful");

  const mdExists = fs.existsSync("llm.md");
  assertEquals(mdExists, true, "llm.md should be generated");

  if (mdExists) {
    await Deno.rename("llm.md", outputMd);
  }
});
