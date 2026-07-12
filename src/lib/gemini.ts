import type { Article, Level } from '../domain/content';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export interface GeneratedStoryResponse {
  title: string;
  subtitle: string;
  minutes: number;
  wordCount: number;
  category: string;
  paragraphs: {
    english: string;
    segments: Array<
      | { type: 'text'; value: string }
      | { type: 'vocab'; value: string; lemma: string }
    >;
  }[];
  newVocab: Array<{
    lemma: string;
    pronunciation: string;
    meaning: string;
    level: Level;
    partOfSpeech: string;
    example: string;
  }>;
}

const DEFAULT_STORY_PREPROMPT = `You are a professional Korean language teacher. Generate a decently long, full Korean graded reading story (not a short demo snippet) for a student at the CEFR [level] level. The story topic is "[topic]".

It must contain at least 3 detailed paragraphs, with around 150-300 words total. It should read like a real story or article.

Return a JSON object matching this structure EXACTLY:
{
  "title": "A beautiful Korean title for the story",
  "subtitle": "A one-sentence subtitle in Korean summarizing the story",
  "minutes": 4,
  "wordCount": 240,
  "category": "Daily Life",
  "paragraphs": [
    {
      "english": "English translation for this paragraph",
      "segments": [
        {"type": "text", "value": "오후에 친구를 만나 "},
        {"type": "vocab", "value": "커피", "lemma": "커피"},
        {"type": "text", "value": "를 마셨습니다."}
      ]
    }
  ],
  "newVocab": [
    {
      "lemma": "커피",
      "pronunciation": "[커피]",
      "meaning": "coffee",
      "level": "[level]",
      "partOfSpeech": "noun",
      "example": "저는 아침마다 따뜻한 커피를 마셔요."
    }
  ]
}

Constraints:
1. The story should be written precisely for the CEFR [level] level:
   - A1: Very simple present tense, basic particles, short sentences (e.g. -습니다/비읍니다 or -아요/어요).
   - A2: Elementary structures, basic past tense, simple conjunctions, everyday topics.
   - B1: Intermediate structures, basic complex sentences, compound tenses, descriptive clauses.
   - B2: Upper intermediate, diverse expressions, idioms, and natural flows.
   - C1/C2: Rich, advanced expressions, deep topics, philosophical or literary language.
2. The story MUST contain at least 3 paragraphs to provide a full, immersive reading experience.
3. In 'paragraphs', segment the Korean text. Split into parts. Words that are open-class (nouns, verbs, adjectives, adverbs) and are useful vocabulary words for the learner should have type "vocab" and reference their dictionary "lemma" (e.g., v('시작했습니다', '시작하다')). All other text (particles, spaces, punctuation, grammar conjugations that are not the root verb) must be type "text".
4. Every vocab lemma in "segments" MUST either be one of Sori's core words (골목, 빵집, 자전거, 시작하다, 천천히, 따뜻하다, 빗소리, 강변, 노을, 반죽, 여유, 기록하다, 스며들다, 낯설다, 되새기다, 고요히) OR be defined in the "newVocab" array.
5. Ensure all "newVocab" entries have open-class parts of speech ('noun', 'verb', 'adjective', 'adverb') only.
6. Provide pronunciation in brackets, standard English meaning, and an example sentence in Korean utilizing that vocab word.
7. The response MUST be valid JSON. Do not include any markdown formatting wrappers (like \`\`\`json) in your raw response, only the raw JSON.`;

const DEFAULT_PICTURE_PREPROMPT = `Create a highly descriptive, artistic English prompt for generating a warm illustration to accompany a Korean graded reader story about: "[topic]" (Level: [level]).
Specify a cozy illustration style, soft digital art or watercolor textures, and detail the key scene, characters, and color tones.
Output ONLY the final image generation prompt text, with no quotes, intro, or wrapping. Keep it under 60 words.`;

export function getStoryPreprompt(): string {
  return localStorage.getItem('sori:settings:preprompt:story') || DEFAULT_STORY_PREPROMPT;
}

export function getPicturePreprompt(): string {
  return localStorage.getItem('sori:settings:preprompt:picture') || DEFAULT_PICTURE_PREPROMPT;
}

export async function generateStory(level: Level, topic: string): Promise<GeneratedStoryResponse> {
  const basePreprompt = getStoryPreprompt();
  const prompt = basePreprompt
    .replace(/\[level\]/g, level)
    .replace(/\[topic\]/g, topic);

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          responseMimeType: 'application/json'
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      throw new Error("Empty response received from Gemini API");
    }

    const cleanedJson = rawText.replace(/^\s*```json\s*/i, '').replace(/\s*```\s*$/i, '').trim();
    const result = JSON.parse(cleanedJson) as GeneratedStoryResponse;

    result.newVocab = (result.newVocab || []).map(v => ({
      ...v,
      level: v.level || level,
      partOfSpeech: ['noun', 'verb', 'adjective', 'adverb'].includes(v.partOfSpeech) 
        ? v.partOfSpeech 
        : 'noun'
    }));

    return result;

  } catch (error) {
    console.error("Gemini Generation failed, returning fallback story.", error);
    return getFallbackStory(level, topic);
  }
}

export async function generatePicturePrompt(level: Level, topic: string): Promise<string> {
  const basePreprompt = getPicturePreprompt();
  const prompt = basePreprompt
    .replace(/\[level\]/g, level)
    .replace(/\[topic\]/g, topic);

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API Error: ${response.status}`);
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return rawText ? rawText.trim() : `cozy digital illustration about ${topic}`;
  } catch (error) {
    console.error("Failed to generate picture prompt:", error);
    return `cozy digital illustration about ${topic}`;
  }
}

function getFallbackStory(level: Level, topic: string): GeneratedStoryResponse {
  return {
    title: `서울에서의 ${topic}`,
    subtitle: `${level} 난이도로 만나는 특별한 이야기`,
    minutes: 3,
    wordCount: 150,
    category: 'AI generated',
    paragraphs: [
      {
        english: "Today I visited a new place and spent a special time there. The coffee was warm.",
        segments: [
          { type: 'text', value: '오늘 나는 새로운 장소에 가서 특별한 시간을 보냈습니다. ' },
          { type: 'vocab', value: '따뜻한', lemma: '따뜻하다' },
          { type: 'text', value: ' 커피를 마시며 여유를 즐겼습니다.' }
        ]
      }
    ],
    newVocab: []
  };
}
