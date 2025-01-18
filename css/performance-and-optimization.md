# CSS performance & Optimization tips

- @import is slow, don't use it.
Replace `@import url("imported.css");` with `<link rel="stylesheet" href="imported.css">` (or if you can't remove @import - use `<link rel="preload" href="imported.css" as="style">`). Inside scss - use `@use`, `@forward` instead of `@import`.
