# Sori

A mobile-first Korean graded reader built with React, Vite, and TypeScript.

## Commands

```bash
npm install
npm run dev
npm run check
```

## Adding content

1. Add each vocabulary lemma to `src/content/vocabulary.ts` with its pronunciation, CEFR level, meaning, example, and part of speech.
2. Only `noun`, `verb`, `adjective`, and `adverb` entries are open-class and may be highlighted.
3. Add the article metadata and segmented paragraphs—including an English translation for each paragraph—in `src/content/articles.ts`.
4. Use `v('displayed form', 'dictionary lemma')` for conjugated forms, for example `v('시작했습니다', '시작하다')`.
5. Run `npm run check`. Development validation fails immediately if a highlighted lemma is missing or closed-class.

## Architecture

- `src/app` — application composition and top-level UI state
- `src/components` — shared application chrome
- `src/content` — backend-replaceable article and vocabulary repositories
- `src/domain` — stable content types and vocabulary policy
- `src/features` — feature-owned components (auth, library, reader, vocabulary)
- `src/hooks` — reusable state adapters
- `src/lib` — browser/service integrations

Saved vocabulary currently uses versioned `localStorage`. A future backend can replace that hook without changing the reader or review components.
