# JS runtime & engine

## JS Engine

- JS engine is a program that executes JS code. It consists of:
  - Memory Heap (stores vars, objects, etc)
  - Call Stack (records where in the program we are)
  - Web APIs (timers, AJAX, DOM, promises)
  - Event Loop (monitors msg queue and call stack)

Popular JS engines:

- V8 (Chrome, Node.js)
- SpiderMonkey (Firefox)
- Chakra (Edge)
- JavaScriptCore (Safari)

### V8 JavaScript Engine

V8 is the most popular JS engine, used in Chrome and Node.js. It compiles JS code to machine code, which is faster than interpreting.

- [V8 GitHub](https://github.com/v8/v8)
- [V8 Docs](https://v8.dev/docs)

V8 has 2 compilers:

- Full Compiler (optimizes code) nam
- Ignition (interprets code)

#### Ignition Interpreter

![Ignition interpreter](https://v8.dev/_img/ignition-interpreter/ignition-pipeline.png)
