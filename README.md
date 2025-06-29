# diflow-js
Dependency-injected flows for browser &amp; Node

diflow-js is a tiny (< 1 kB gzipped) TypeScript library that lets you write generator-based “flows” once and plug them into any runtime—React, Vue, NestJS, Lambda, a test runner—while keeping every side-effect and model behind explicit adapters that you register through dependency-injection.

```javascript
import { createFlowContext, defineFlow, defineAdapter } from 'diflow-js';
```
## Why you might like it	/ What it gives you

Same domain code on client & server	Write one generator, reuse it in SSR or an HTTP controller.

All mutations are visible in reviews	Adapters subscribe with ctx.on(trigger, …) — grep the trigger, see every effect.

No framework lock-in	Works with Redux, Zustand, TypeORM, Prisma, RxJS … or none.

Type-safety first	reply(payload) auto-picks the correct response creator; wrong shapes don’t compile.

Zero runtime deps	No RxJS, no Reflect-Metadata — just Maps and Symbols.

## ✨ Quick taste
```ts
// 1. declare triggers & steps
const Triggers = {
  AddButton: evt<{ title: string }>(),
  AddEnter : evt<{ title: string }>(),
};
const [CreateDeck, DeckCreated] = pair<{ title: string }, { id: string }>();

// 2. business story
function* addDeckFlow(p, step) {
  yield step(CreateDeck, { title: p.title });
}

// 3. wrap as flow
const flow = defineFlow({ name: 'AddDeck', triggers: Triggers, steps: { CreateDeck }, generator: addDeckFlow });

// 4. adapter mutating Postgres
const deckPgAdapter = defineAdapter({
  name: 'Deck@PG',
  setup(ctx) {
    ctx.on(Triggers.AddButton, ({ bus, steps }) => {
      bus.on(steps.CreateDeck, async (reply, { payload }) => {
        const id = await saveToDB(payload.title);
        reply({ id });
      });
    });
  },
});

// 5. bootstrap
const ctx = createFlowContext({ /* DI models here */ });
ctx.registerFlow(flow);
ctx.registerAdapter(deckPgAdapter);

// 6. use in React *or* Nest
ctx.emit(flow.triggers.AddButton({ title: 'Physics' }));
```

## 🚀 Core ideas

Flows are generator functions (yield step(CreateDeck, payload)).

Triggers are plain creators that start a new instance of a flow.

Adapters subscribe to one or more triggers, receive a typed bus, and call reply(payload)—never hand-crafting action objects.

FlowContext is the only stateful object; you can create multiple contexts (per request, per tab) or keep one singleton.

### 📦 Install
```bash
npm i diflow-js
```
ESM + CommonJS bundles and *.d.ts shipped.

## 🗺 Similar tools & where diflow-js sits

Redux-Saga / Effector:	No Redux store required, zero external runtime deps, DI-friendly.

XState:	No formal FSM needed; generator syntax is lighter for linear stories.

NestJS CQRS:	Works the same in the browser and doesn’t rely on decorators/reflect-metadata.

### When to reach for diflow-js

- You have multi-step stories that must run in both front-end and back-end.

- You want every side-effect to be searchable and reviewable, not hidden behind magic scanning.

- Your team lives in TypeScript and values compile-time guarantees over runtime checks.

### When a simple CRUD service is enough, stick to it.
### When the story spans UI, cache, DB, and queue—and you want one mental model everywhere—give diflow-js a spin.
