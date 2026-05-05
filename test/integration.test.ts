import { assertEquals } from "@std/assert";
import * as fs from "node:fs";
import * as path from "node:path";

Deno.test("generate mixed docs (local + JSR)", async () => {
  const tempDir = await Deno.makeTempDir();
  const originalCwd = Deno.cwd();
  const outputDir = path.join(originalCwd, "test", "output");
  const testOutputFile = path.join(outputDir, "mixed-local-jsr.test.md");

  // Ensure output directory exists
  await Deno.mkdir(outputDir, { recursive: true });

  try {
    // Setup dummy project structure
    await Deno.mkdir(path.join(tempDir, "src"), { recursive: true });
    const localContent =
      '/** @module Local Library\n * This is a local library.\n */\n\n/** A local function */\nexport function localFn() { return "hello"; }';
    await Deno.writeTextFile(path.join(tempDir, "src/index.ts"), localContent);

    const mainPath = path.join(originalCwd, "main.ts");

    const command = new Deno.Command(Deno.execPath(), {
      args: ["run", "-A", mainPath, "--jsr=@nshiab/simple-data-analysis-core"],
      cwd: tempDir,
    });

    const { success, stderr } = await command.output();

    if (!success) {
      console.error(new TextDecoder().decode(stderr));
    }

    assertEquals(success, true, "Execution should be successful");

    const mdPath = path.join(tempDir, "llm.md");
    const mdExists = fs.existsSync(mdPath);
    assertEquals(mdExists, true, "llm.md should be generated");

    if (mdExists) {
      const content = await Deno.readTextFile(mdPath);

      // Save to test/output for inspection
      await Deno.writeTextFile(testOutputFile, content);
      console.log(`Test output saved to ${testOutputFile}`);

      // Check for local content
      assertEquals(
        content.includes("# Local Library"),
        true,
        "Should contain local title",
      );
      assertEquals(
        content.includes("localFn"),
        true,
        "Should contain local function",
      );

      // Check for JSR content
      assertEquals(
        content.toLowerCase().includes("data"),
        true,
        "Should contain some JSR content (data)",
      );
    }
  } finally {
    await Deno.remove(tempDir, { recursive: true });
  }
});

Deno.test("throw error if src/index.ts is missing", async () => {
  const tempDir = await Deno.makeTempDir();
  const originalCwd = Deno.cwd();

  try {
    const mainPath = path.join(originalCwd, "main.ts");

    const command = new Deno.Command(Deno.execPath(), {
      args: ["run", "-A", mainPath],
      cwd: tempDir,
    });

    const { success, stderr } = await command.output();
    const errorOutput = new TextDecoder().decode(stderr);

    assertEquals(success, false, "Execution should fail");
    assertEquals(
      errorOutput.includes(
        "Error: Local entrypoint not found at ./src/index.ts",
      ),
      true,
      "Should show correct error message",
    );
  } finally {
    await Deno.remove(tempDir, { recursive: true });
  }
});
