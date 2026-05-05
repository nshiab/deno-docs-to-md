# deno-docs-to-md

Transform Deno documentation into a single `llm.md` file, perfect for providing
context to LLMs. It automatically combines local source code documentation with
optional secondary libraries from JSR.

## Usage

This tool is designed to be run within a library repository. It requires a
`./src/index.ts` file to exist.

### Basic Usage (Local Only)

Generate documentation for your local library:

```bash
deno run -A jsr:@nshiab/deno-docs-to-md
```

### Including Secondary Libraries (JSR)

You can specify one or more secondary libraries to merge into your documentation
using the `--jsr` flag. This is useful when your library depends on or extends
others:

```bash
deno run -A jsr:@nshiab/deno-docs-to-md --jsr=@nshiab/simple-data-analysis-core
```

Multiple libraries can be comma-separated:

```bash
deno run -A jsr:@nshiab/deno-docs-to-md --jsr=@std/assert,@std/path
```

The tool will use the local library's title and module documentation (from
`./src/index.ts`) as the primary heading. Subsequent symbols from JSR libraries
will be appended.

The output is always saved to `llm.md`.

## Requirements

- [Deno](https://deno.com/) installed.
- A `./src/index.ts` file in the current directory.

## Maintenance

The library is maintained by [Nael Shiab](http://naelshiab.com/), computational
journalist and senior data producer for [CBC News](https://www.cbc.ca/news).
