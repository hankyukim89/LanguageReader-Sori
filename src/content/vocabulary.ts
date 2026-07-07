import type { VocabularyEntry } from '../domain/content';

export const VOCABULARY = {
  '골목': { lemma:'골목', pronunciation:'[골목]', meaning:'alley; side street', level:'A1', partOfSpeech:'noun', example:'그들은 조용한 골목을 따라 천천히 걸었다.' },
  '빵집': { lemma:'빵집', pronunciation:'[빵찝]', meaning:'bakery', level:'A1', partOfSpeech:'noun', example:'우리 동네에는 작은 빵집이 있어요.' },
  '자전거': { lemma:'자전거', pronunciation:'[자전거]', meaning:'bicycle', level:'A1', partOfSpeech:'noun', example:'저는 주말마다 자전거를 타요.' },
  '시작하다': { lemma:'시작하다', pronunciation:'[시자카다]', meaning:'to begin; start', level:'A2', partOfSpeech:'verb', example:'그는 스무 살 때 일을 시작했어요.' },
  '천천히': { lemma:'천천히', pronunciation:'[천천히]', meaning:'slowly', level:'A2', partOfSpeech:'adverb', example:'강 옆 길을 천천히 걸었어요.' },
  '따뜻하다': { lemma:'따뜻하다', pronunciation:'[따뜨타다]', meaning:'to be warm', level:'A2', partOfSpeech:'adjective', example:'주인이 따뜻한 차를 건넸습니다.' },
  '빗소리': { lemma:'빗소리', pronunciation:'[빋쏘리]', meaning:'sound of rain', level:'B1', partOfSpeech:'noun', example:'창밖의 빗소리가 마음을 편안하게 했다.' },
  '강변': { lemma:'강변', pronunciation:'[강변]', meaning:'riverside', level:'B1', partOfSpeech:'noun', example:'강변을 따라 산책하는 사람이 많아요.' },
  '노을': { lemma:'노을', pronunciation:'[노을]', meaning:'sunset glow', level:'B1', partOfSpeech:'noun', example:'붉은 노을이 강 위에 비쳤다.' },
  '반죽': { lemma:'반죽', pronunciation:'[반죽]', meaning:'dough; batter', level:'B2', partOfSpeech:'noun', example:'아침마다 빵 반죽을 정성스럽게 만들어요.' },
  '여유': { lemma:'여유', pronunciation:'[여유]', meaning:'leisure; composure', level:'B2', partOfSpeech:'noun', example:'잠시 멈추니 마음의 여유가 생겼다.' },
  '기록하다': { lemma:'기록하다', pronunciation:'[기로카다]', meaning:'to record; document', level:'B2', partOfSpeech:'verb', example:'그날의 생각을 공책에 기록했다.' },
  '스며들다': { lemma:'스며들다', pronunciation:'[스며들다]', meaning:'to seep in; permeate', level:'C1', partOfSpeech:'verb', example:'따뜻한 불빛이 거리로 스며들었다.' },
  '낯설다': { lemma:'낯설다', pronunciation:'[낟썰다]', meaning:'to be unfamiliar', level:'C1', partOfSpeech:'adjective', example:'익숙한 거리도 밤에는 낯설게 느껴졌다.' },
  '되새기다': { lemma:'되새기다', pronunciation:'[되새기다]', meaning:'to reflect on; recall', level:'C2', partOfSpeech:'verb', example:'책의 마지막 문장을 오래 되새겼다.' },
  '고요히': { lemma:'고요히', pronunciation:'[고요히]', meaning:'quietly; serenely', level:'C2', partOfSpeech:'adverb', example:'강물은 어둠 속에서 고요히 흘렀다.' },
} satisfies Record<string, VocabularyEntry>;

export type VocabularyLemma = keyof typeof VOCABULARY;

export function getVocabulary(lemma: string): VocabularyEntry | undefined {
  return VOCABULARY[lemma as VocabularyLemma];
}
