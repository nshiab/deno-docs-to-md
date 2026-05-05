# deno-docs-to-md

A simple script to transform Deno generated `docs.json` to `llm.md`.

## Usage

You can generate documentation for a single JSR library:

```bash
deno run -A jsr:@nshiab/deno-docs-to-md --jsr=@nshiab/journalism
```

Or merge multiple libraries into a single documentation file. This is useful
when a library extends another one (e.g., `simple-data-analysis` extending
`simple-data-analysis-core`). Note that the order matters: the first library's
title and module documentation will be used, and if symbols with the same name
exist in multiple libraries, the first one encountered will be kept:

```bash
deno run -A jsr:@nshiab/deno-docs-to-md --jsr=@nshiab/simple-data-analysis,@nshiab/simple-data-analysis-core
```

The output will be saved to `llm.md`.

## Maintenance

The library is maintained by [Nael Shiab](http://naelshiab.com/), computational
journalist and senior data producer for [CBC News](https://www.cbc.ca/news).
