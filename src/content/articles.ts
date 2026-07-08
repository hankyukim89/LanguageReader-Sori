import type { Article, ArticleParagraph, ArticleSegment, Level } from '../domain/content';
import { getVocabulary, findLemmaForWord } from './vocabulary';
import { isOpenClass } from '../domain/content';

const images = { 
  bakery: `${import.meta.env.BASE_URL}assets/bakery.png`, 
  river: `${import.meta.env.BASE_URL}assets/river.png`, 
  bookstore: `${import.meta.env.BASE_URL}assets/bookstore.png` 
};

/**
 * Automatically tokenizes a plain Korean text string into a list of segments.
 * Spaces and punctuation are mapped to plain text segments.
 * Core open class words that resolve to our dictionary are mapped to vocab segments.
 */
export function segmentKoreanText(text: string): ArticleSegment[] {
  // Regex to split on spaces, keeping spaces
  const parts = text.split(/(\s+)/);
  const segments: ArticleSegment[] = [];

  for (const part of parts) {
    if (!part) continue;
    
    // If it's a pure spacing segment, preserve it as text
    if (/^\s+$/.test(part)) {
      segments.push({ type: 'text', value: part });
      continue;
    }

    // Split leading/trailing punctuation from Hangul/Alphanumeric core
    const match = part.match(/^([^가-힣a-zA-Z0-9]*)([가-힣a-zA-Z0-9]+)([^가-힣a-zA-Z0-9]*)$/);
    if (match) {
      const [, prefix, cleanWord, suffix] = match;
      if (prefix) {
        segments.push({ type: 'text', value: prefix });
      }

      const lemma = findLemmaForWord(cleanWord);
      const entry = lemma ? getVocabulary(lemma) : undefined;
      if (entry && isOpenClass(entry)) {
        segments.push({ type: 'vocab', value: cleanWord, lemma: lemma! });
      } else {
        segments.push({ type: 'text', value: cleanWord });
      }

      if (suffix) {
        segments.push({ type: 'text', value: suffix });
      }
    } else {
      // Fallback for symbols/punctuation only
      segments.push({ type: 'text', value: part });
    }
  }

  return segments;
}

function createParagraph(text: string, english: string): ArticleParagraph {
  return {
    segments: segmentKoreanText(text),
    english
  };
}

const rawArticlesData: Record<string, { paragraphs: ArticleParagraph[] }> = {
  'a1-bakery': {
    paragraphs: [
      createParagraph(
        '지하철 역을 나와 골목으로 들어서면 고소한 빵 냄새가 납니다. 오른쪽에는 작고 예쁜 빵집이 있습니다.',
        'When you exit the subway station and enter the alley, you smell savory bread. On the right, there is a small and pretty bakery.'
      ),
      createParagraph(
        '친절한 주인은 매일 아침 일찍 일을 시작합니다. 손님들에게 따뜻한 빵과 환한 인사를 건냅니다.',
        'The friendly owner starts work early every morning. He gives customers warm bread and a bright greeting.'
      ),
      createParagraph(
        '사람들은 맛있는 빵을 먹으며 행복한 미소를 짓습니다. 이곳은 동네 사람들의 소중한 쉼터입니다.',
        'People make happy smiles as they eat the delicious bread. This place is a precious shelter for the neighborhood people.'
      )
    ]
  },
  'a1-bicycle': {
    paragraphs: [
      createParagraph(
        '토요일 아침, 지수는 파란 자전거를 타고 집을 나섰습니다. 아침 바람이 시원했습니다.',
        'On Saturday morning, Jisu left home riding her blue bicycle. The morning breeze was cool.'
      ),
      createParagraph(
        '그녀는 푸른 강 옆 길을 천천히 달렸습니다. 노란 꽃들이 핀 아름다운 길입니다.',
        'She rode slowly along the green river path. It is a beautiful path where yellow flowers bloom.'
      ),
      createParagraph(
        '자전거를 타는 가족들과 달리는 사람들이 보였습니다. 지수는 공원 의자에 잠시 앉아 하늘을 보았습니다.',
        'She saw families riding bicycles and people running. Jisu sat on a park bench for a moment and looked at the sky.'
      )
    ]
  },
  'a2-bookstore': {
    paragraphs: [
      createParagraph(
        '오후부터 비가 내렸습니다. 조용한 빗소리가 골목에 울리고 창문을 두드렸습니다.',
        'It began raining in the afternoon. The quiet sound of rain echoed in the alley and tapped against the window.'
      ),
      createParagraph(
        '현우는 비를 피해 작은 동네 서점으로 들어갔습니다. 서점 안은 나무 책상과 오래된 책들로 가득했습니다.',
        'Hyunwoo went into a small neighborhood bookstore to avoid the rain. Inside the bookstore, it was full of wooden desks and old books.'
      ),
      createParagraph(
        '그는 따뜻한 차 한 잔을 마시며 좋아하는 시집을 읽었습니다. 밖에는 비가 내리지만 마음은 참 편안했습니다.',
        'Drinking a cup of warm tea, he read his favorite poetry book. Though it was raining outside, his heart was very comfortable.'
      )
    ]
  },
  'a2-gimbap': {
    paragraphs: [
      createParagraph(
        '일요일 저녁, 민우는 처음으로 혼자 김밥을 만들기로 했습니다. 요리책을 보며 재료를 준비했습니다.',
        'On Sunday evening, Minwoo decided to make gimbap by himself for the first time. He prepared ingredients looking at the cookbook.'
      ),
      createParagraph(
        '김 위에 밥을 얇게 펴고 계란, 당근, 시금치를 가지런히 올렸습니다. 그리고 김밥을 조심스럽게 말았습니다.',
        'He spread rice thinly on seaweed and placed eggs, carrots, and spinach neatly. And then he rolled the gimbap carefully.'
      ),
      createParagraph(
        '김밥의 모양은 조금 서툴었지만 아주 맛있었습니다. 그는 직접 만든 김밥을 먹으며 아주 뿌듯했습니다.',
        'The shape of the gimbap was a bit clumsy, but it was very delicious. He felt very proud eating the gimbap he made himself.'
      )
    ]
  },
  'b1-river': {
    paragraphs: [
      createParagraph(
        '해가 서쪽 하늘로 낮아지자 한강의 공기가 부드러워졌습니다. 강물을 따라 걷는 사람들의 발걸음도 한결 여유롭습니다.',
        'As the sun set into the western sky, the air of the Han River softened. The footsteps of people walking along the river are also much more relaxed.'
      ),
      createParagraph(
        '붉은 노을이 물결 위에 번지며 강 전체를 주황빛으로 물들였습니다. 빌딩들의 유리창이 노을빛을 받아 반짝였습니다.',
        'The red sunset spread over the ripples, coloring the whole river orange. The glass windows of buildings sparkled reflecting the sunset light.'
      ),
      createParagraph(
        '다리에 하나둘 조명이 켜지고 어둠이 내리기 시작했습니다. 사람들은 벤치에 앉아 깊어가는 가을 밤의 바람을 즐겼습니다.',
        'Lights turned on one by one on the bridge, and darkness began to fall. Sitting on benches, people enjoyed the breeze of the deepening autumn night.'
      )
    ]
  },
  'b1-market': {
    paragraphs: [
      createParagraph(
        '우리 동네 시장은 언제나 활기가 넘칩니다. 아침 일찍부터 과일과 채소를 파는 상인들의 큰 목소리가 골목 가득 울려 퍼집니다.',
        'Our neighborhood market is always full of energy. From early morning, the loud voices of merchants selling fruits and vegetables echo throughout the alley.'
      ),
      createParagraph(
        '시장 골목길을 걸으면 떡볶이와 부침개의 고소한 냄새가 발걸음을 멈추게 합니다. 오래된 가게들은 저마다 따뜻한 역사를 품고 있습니다.',
        'Walking along the market alley, the savory smell of tteokbokki and pajeon makes you stop. Each old store holds a warm history of its own.'
      ),
      createParagraph(
        '이곳에서는 덤으로 물건을 더 얹어주는 시장의 넉넉한 인심을 느낄 수 있습니다. 정겨운 대화 속에서 이웃들의 소박한 삶이 빛납니다.',
        'Here, you can feel the generous hospitality of the market, where extra items are added for free. In warm conversations, the simple lives of neighbors shine.'
      )
    ]
  },
  'b2-bread': {
    paragraphs: [
      createParagraph(
        '좋은 빵을 만들기 위해서는 밀가루와 물로 만든 반죽이 부풀 때까지 묵묵히 기다려야 합니다. 제빵사는 매일 이 자연스러운 과정을 지켜봅니다.',
        'To make good bread, you must wait silently for the dough made of flour and water to rise. The baker watches this natural process every day.'
      ),
      createParagraph(
        '그는 온도와 습도의 미세한 변화를 공책에 기록하며 반죽의 상태를 점검합니다. 빵이 구워지는 오븐 앞에서 풍기는 향은 긴 기다림에 대한 보상입니다.',
        'He checks the state of the dough, recording micro-changes in temperature and humidity in his notebook. The scent wafting in front of the oven where bread bakes is the reward for the long wait.'
      ),
      createParagraph(
        '그에게 제빵이란 단순히 기술이 아니라 기다림을 통해 마음에 여유를 배우는 과정입니다. 정성이 담긴 빵은 먹는 사람에게 따스한 평온을 선물합니다.',
        'To him, baking is not just a skill, but a process of learning mental composure through waiting. Bread made with sincerity gifts warm tranquility to those who eat it.'
      )
    ]
  },
  'b2-city': {
    paragraphs: [
      createParagraph(
        '모두가 잠든 늦은 밤, 어두워진 도시의 골목길을 혼자 걸었습니다. 소음이 사라진 거리에는 낯선 고요함이 가득 차오릅니다.',
        'Late at night when everyone was asleep, I walked alone in the dark city alleys. In the streets where noise had vanished, an unfamiliar silence filled the air.'
      ),
      createParagraph(
        '가로등 밑을 지나갈 때마다 길게 늘어지는 그림자가 밤의 깊이를 알려줍니다. 낮에는 무심히 지나쳤던 건물의 외벽이나 돌담이 새로운 표정으로 다가옵니다.',
        'Each time I pass under a streetlight, the long-stretching shadow reveals the depth of the night. The outer walls or stone fences of buildings that I passed by indifferently during the day approach with a new expression.'
      ),
      createParagraph(
        '어둠 속에서 반짝이는 불빛들을 바라보며 가슴속 깊은 곳에 묻어두었던 생각들을 천천히 정리합니다. 고독하지만 평화로운 밤의 산책입니다.',
        'Looking at the lights sparkling in the darkness, I slowly organize the thoughts buried deep inside my heart. It is a lonely but peaceful night walk.'
      )
    ]
  },
  'c1-books': {
    paragraphs: [
      createParagraph(
        '모든 것이 디지털화되는 빠른 세상 속에서, 종이책의 느린 감촉과 특유의 잉크 냄새는 여전히 우리의 기억 속에 깊숙이 스며들어 있습니다.',
        'In a fast world where everything is digitized, the slow texture of paper books and their unique ink smell still seep deeply into our memories.'
      ),
      createParagraph(
        '전자책이 편리함을 제공하지만, 손가락으로 페이지를 넘길 때 느껴지는 아날로그적인 즐거움과 책장을 가득 채운 책들의 물리적 존재감은 대체 불가능합니다.',
        'Although e-books provide convenience, the analog pleasure felt when turning pages with fingers and the physical presence of books filling the bookshelf are irreplaceable.'
      ),
      createParagraph(
        '많은 젊은이들이 독특한 감성을 지닌 동네 책방을 찾기 시작한 현상은 바쁜 현대 사회에서 느림의 미학을 갈망하는 현대인의 내면을 반영합니다.',
        'The phenomenon of many young people beginning to seek out neighborhood bookstores with unique sensibilities reflects the inner desire of modern people longing for the aesthetics of slowness in a busy society.'
      )
    ]
  },
  'c1-map': {
    paragraphs: [
      createParagraph(
        '재개발과 현대화 속에서 우리가 알던 익숙한 풍경들이 순식간에 사라지고, 그 자리에 거대하고 차가운 빌딩숲이 들어서고 있습니다.',
        'Amid redevelopment and modernization, familiar landscapes we once knew vanish in an instant, and huge, cold concrete jungles rise in their place.'
      ),
      createParagraph(
        '사라져가는 골목길과 오랜 시간 주민들의 쉼터였던 공간들을 지도 위에 그림과 글씨로 기록하는 프로젝트가 곳곳에서 활발히 진행 중입니다.',
        'Projects that record disappearing alleys and spaces that were shelters for residents for a long time on maps with drawings and writings are actively ongoing in various places.'
      ),
      createParagraph(
        '이 기억의 지도는 단순한 지리 정보가 아니라, 그 골목에서 태어나 살아가던 평범한 이웃들의 소중한 이야기이자 지워지지 않는 삶의 흔적입니다.',
        'This map of memories is not just geographical information, but a precious story of ordinary neighbors who were born and lived in that alley, and an indelible trace of life.'
      )
    ]
  },
  'c2-silence': {
    paragraphs: [
      createParagraph(
        '훌륭한 문장은 독자에게 일방적으로 메시지를 강요하기보다, 행간의 여백에 머물며 스스로의 경험과 기억을 차분히 되새기도록 이끕니다.',
        'A great sentence, rather than unilaterally forcing a message upon the reader, leads them to dwell in the white spaces between the lines and calmly reflect on their own experiences and memories.'
      ),
      createParagraph(
        '수많은 말들이 어지럽게 쏟아지는 일상 속에서 침묵은 비로소 진정한 의미의 언어가 태어날 수 있는 사유의 공간이자 정신적 여유를 마련해 줍니다.',
        'In a daily life where countless words pour out in confusion, silence prepares a space of thinking and mental composure where language of true meaning can finally be born.'
      ),
      createParagraph(
        '말을 잠시 멈추고 조용히 세상을 바라보는 순간, 우리는 비로소 타인의 고통을 경청하고 자신의 내면과 온전히 마주하는 지혜를 얻게 됩니다.',
        'The moment we stop speaking for a while and look at the world quietly, we finally gain the wisdom to listen to others\' pain and fully face our own inner self.'
      )
    ]
  },
  'c2-river': {
    paragraphs: [
      createParagraph(
        '물결이 끊임없이 흘러가는 강가에 서면 흐르는 시간의 냉혹함과 동시에 그 흐름이 빚어내는 무한한 평온함을 동시에 경험하게 됩니다.',
        'Standing by the riverside where ripples flow incessantly, one experiences simultaneously the ruthlessness of passing time and the infinite tranquility created by that flow.'
      ),
      createParagraph(
        '강물은 어둠 속에서도 제 방향을 잃지 않고 바다를 향해 고요히 나아가며, 자신의 길을 가로막는 바위를 탓하지 않고 휘돌아 흘러갑니다.',
        'Even in the darkness, the river does not lose its direction and moves silently toward the sea, and rather than blaming the rocks blocking its path, it flows around them.'
      ),
      createParagraph(
        '강을 묵묵히 바라보는 일은 결국 쉼 없이 흘러가는 인생이라는 거대한 흐름 속에서 조급한 마음을 내려놓고 순리를 배우는 명상에 가깝습니다.',
        'Looking at the river silently is ultimately close to a meditation where one lets go of a rushed mind and learns the natural order in the huge flow of life that passes without rest.'
      )
    ]
  }
};

const articleInfo: Array<Omit<Article, 'paragraphs'>> = [
  {id:'a1-bakery',level:'A1',title:'서울의 작은 빵집',subtitle:'매일 아침, 골목을 깨우는 고소한 냄새',image:images.bakery,minutes:4,wordCount:312,category:'일상'},
  {id:'a1-bicycle',level:'A1',title:'주말의 자전거',subtitle:'두 바퀴로 만나는 새로운 동네',image:images.river,minutes:3,wordCount:246,category:'여행'},
  {id:'a2-bookstore',level:'A2',title:'비 오는 날의 서점',subtitle:'책 한 권과 따뜻한 차 한 잔',image:images.bookstore,minutes:5,wordCount:398,category:'문화'},
  {id:'a2-gimbap',level:'A2',title:'처음 만든 김밥',subtitle:'서툴지만 맛있는 저녁',image:images.bakery,minutes:4,wordCount:331,category:'음식'},
  {id:'b1-river',level:'B1',title:'한강의 저녁빛',subtitle:'도시가 잠시 느려지는 시간',image:images.river,minutes:6,wordCount:492,category:'에세이'},
  {id:'b1-market',level:'B1',title:'우리 동네 시장',subtitle:'오래된 가게들이 들려주는 이야기',image:images.bakery,minutes:7,wordCount:544,category:'사회'},
  {id:'b2-bread',level:'B2',title:'빵이 익는 시간',subtitle:'기다림이 만드는 깊은 맛',image:images.bakery,minutes:8,wordCount:687,category:'인터뷰'},
  {id:'b2-city',level:'B2',title:'혼자 걷는 도시',subtitle:'익숙한 길에서 낯선 장면을 찾다',image:images.river,minutes:8,wordCount:721,category:'에세이'},
  {id:'c1-books',level:'C1',title:'종이책의 느린 귀환',subtitle:'디지털 시대에 다시 펼치는 페이지',image:images.bookstore,minutes:10,wordCount:914,category:'문화'},
  {id:'c1-map',level:'C1',title:'도시와 기억의 지도',subtitle:'사라진 공간을 기록하는 사람들',image:images.bakery,minutes:11,wordCount:1028,category:'사회'},
  {id:'c2-silence',level:'C2',title:'침묵이 건네는 문장',subtitle:'말하지 않음으로써 드러나는 것들',image:images.bookstore,minutes:13,wordCount:1250,category:'문학'},
  {id:'c2-river',level:'C2',title:'강을 바라보는 방식',subtitle:'풍경과 시간에 관한 짧은 사유',image:images.river,minutes:14,wordCount:1384,category:'인문'},
];

export const ARTICLES: Article[] = articleInfo.map(article => ({ 
  ...article, 
  paragraphs: rawArticlesData[article.id]?.paragraphs || []
}));

// Content fails fast in development: highlighted tokens must resolve to open-class vocabulary.
export function validateArticleContent(articles = ARTICLES): void {
  for (const article of articles) {
    for (const paragraph of article.paragraphs) {
      for (const segment of paragraph.segments) {
        if (segment.type !== 'vocab') continue;
        const entry = getVocabulary(segment.lemma);
        if (!entry) {
          throw new Error(`Unknown vocabulary lemma "${segment.lemma}" in ${article.id}`);
        }
        if (!isOpenClass(entry)) {
          throw new Error(`Closed-class word "${segment.lemma}" cannot be highlighted in ${article.id}`);
        }
      }
    }
  }
}

if (import.meta.env.DEV) validateArticleContent();
