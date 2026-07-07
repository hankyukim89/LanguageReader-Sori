export const LEVELS = {
  A1: '#2f9e62', A2: '#68ad4d', B1: '#d5a523',
  B2: '#ed8a2f', C1: '#e35f45', C2: '#c93d3d',
} as const;

export type Level = keyof typeof LEVELS;
export type OpenClassPartOfSpeech = 'noun' | 'verb' | 'adjective' | 'adverb';
export type ClosedClassPartOfSpeech = 'pronoun' | 'particle' | 'determiner' | 'numeral' | 'conjunction' | 'interjection' | 'auxiliary';
export type PartOfSpeech = OpenClassPartOfSpeech | ClosedClassPartOfSpeech;

export interface VocabularyEntry {
  lemma: string;
  pronunciation: string;
  meaning: string;
  level: Level;
  partOfSpeech: PartOfSpeech;
  example: string;
}

export type ArticleSegment =
  | { type: 'text'; value: string }
  | { type: 'vocab'; value: string; lemma: string };

export interface ArticleParagraph {
  segments: ArticleSegment[];
  english: string;
}

export interface Article {
  id: string;
  level: Level;
  title: string;
  subtitle: string;
  image: string;
  minutes: number;
  wordCount: number;
  category: string;
  paragraphs: ArticleParagraph[];
}

export const OPEN_CLASS_PARTS = new Set<PartOfSpeech>(['noun', 'verb', 'adjective', 'adverb']);

export function isOpenClass(entry: VocabularyEntry): entry is VocabularyEntry & { partOfSpeech: OpenClassPartOfSpeech } {
  return OPEN_CLASS_PARTS.has(entry.partOfSpeech);
}
