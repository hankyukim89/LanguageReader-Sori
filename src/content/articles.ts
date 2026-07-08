import type { Article, ArticleParagraph, ArticleSegment, Level } from '../domain/content';
import { getVocabulary } from './vocabulary';
import { isOpenClass } from '../domain/content';

const images = { bakery:`${import.meta.env.BASE_URL}assets/bakery.png`, river:`${import.meta.env.BASE_URL}assets/river.png`, bookstore:`${import.meta.env.BASE_URL}assets/bookstore.png` };
const t = (value: string): ArticleSegment => ({ type:'text', value });
const v = (value: string, lemma = value): ArticleSegment => ({ type:'vocab', value, lemma });
const p = (english: string, ...segments: ArticleSegment[]): ArticleParagraph => ({ segments, english });

const templates: Record<Level, ArticleParagraph[]> = {
  A1: [p('When you leave the subway station and enter the alley, you can smell savory bread. On the right is a small bakery.',t('지하철 역을 나와 '),v('골목'),t('으로 들어서면 고소한 빵 냄새가 납니다. 오른쪽에는 작은 '),v('빵집'),t('이 있습니다.')),p('The owner starts work at six every morning. He gives his customers bread and a bright greeting.',t('주인은 매일 아침 여섯 시에 일을 '),v('시작합니다','시작하다'),t('. 손님에게 빵과 환한 인사를 건넵니다.'))],
  A2: [p('On Saturday morning, Jisu left home on her blue bicycle. The breeze was cool.',t('토요일 아침, 지수는 파란 '),v('자전거'),t('를 타고 집을 나섰습니다. 바람이 시원했습니다.')),p('She rode slowly along the river. She stopped for a moment and looked at the city.',t('그녀는 강 옆 길을 '),v('천천히'),t(' 달렸습니다. 잠시 쉬며 도시를 바라보았습니다.'))],
  B1: [p('It began raining in the afternoon. The quiet sound of rain tapped against the window.',t('오후부터 비가 내렸습니다. 조용한 '),v('빗소리'),t('가 창문을 두드렸습니다.')),p('As the sun sank, the air by the riverside softened and a red sunset spread across the ripples.',t('해가 낮아지자 '),v('강변'),t('의 공기가 부드러워지고 붉은 '),v('노을'),t('이 물결 위에 번졌습니다.'))],
  B2: [p('To make good bread, you have to wait for the dough made from flour and water to rise slowly.',t('좋은 빵을 만들려면 밀가루와 물로 만든 '),v('반죽'),t('이 천천히 부풀 때까지 기다려야 합니다.')),p('The baker records changes in temperature and humidity each day. That waiting creates a sense of calm.',t('제빵사는 온도와 습도의 변화를 매일 '),v('기록합니다','기록하다'),t('. 그 기다림은 마음에 '),v('여유'),t('를 만듭니다.'))],
  C1: [p('The texture of paper and the scent of ink quietly seep into our memories.',t('종이의 감촉과 잉크 냄새는 기억 속으로 조용히 '),v('스며듭니다','스며들다'),t('.')),p('Even familiar streets feel unfamiliar at night. In that change, we discover a new expression.',t('익숙한 거리도 밤에는 '),v('낯설게','낯설다'),t(' 느껴집니다. 우리는 그 변화 속에서 새로운 표정을 발견합니다.'))],
  C2: [p('A good sentence waits, allowing the reader to remain in the empty space and reflect on their own memories.',t('좋은 문장은 독자가 빈 공간에 머물며 자신의 기억을 '),v('되새기도록','되새기다'),t(' 기다립니다.')),p('Silence is the space where meaning is born. Thoughts that flow serenely like a river fill that space.',t('침묵은 의미가 태어나는 여백입니다. 강물처럼 '),v('고요히'),t(' 흐르는 생각이 그 안을 채웁니다.'))],
};

const articleInfo: Array<Omit<Article,'paragraphs'>> = [
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

export const ARTICLES: Article[] = articleInfo.map(article => ({ ...article, paragraphs:templates[article.level] }));

// Content fails fast in development: highlighted tokens must resolve to open-class vocabulary.
export function validateArticleContent(articles = ARTICLES): void {
  for (const article of articles) for (const paragraph of article.paragraphs) for (const segment of paragraph.segments) {
    if (segment.type !== 'vocab') continue;
    const entry = getVocabulary(segment.lemma);
    if (!entry) throw new Error(`Unknown vocabulary lemma "${segment.lemma}" in ${article.id}`);
    if (!isOpenClass(entry)) throw new Error(`Closed-class word "${segment.lemma}" cannot be highlighted in ${article.id}`);
  }
}

if (import.meta.env.DEV) validateArticleContent();
