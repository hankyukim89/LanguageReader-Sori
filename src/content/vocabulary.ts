import type { VocabularyEntry, Level } from '../domain/content';

export const VOCABULARY = {
  // A1 Words
  '지하철': { lemma:'지하철', pronunciation:'[지하철]', meaning:'subway', level:'A1', partOfSpeech:'noun', example:'우리는 지하철을 타고 서점에 갔습니다.' },
  '역': { lemma:'역', pronunciation:'[역]', meaning:'station', level:'A1', partOfSpeech:'noun', example:'지하철 역 앞에는 사람이 많아요.' },
  '나오다': { lemma:'나오다', pronunciation:'[나오다]', meaning:'to come out; exit', level:'A1', partOfSpeech:'verb', example:'지하철 역을 나와 왼쪽으로 가세요.' },
  '골목': { lemma:'골목', pronunciation:'[골목]', meaning:'alley; side street', level:'A1', partOfSpeech:'noun', example:'그들은 조용한 골목을 따라 천천히 걸었다.' },
  '들어서다': { lemma:'들어서다', pronunciation:'[들어서다]', meaning:'to enter; step into', level:'A1', partOfSpeech:'verb', example:'골목으로 들어서면 빵집이 보입니다.' },
  '고소하다': { lemma:'고소하다', pronunciation:'[고소하다]', meaning:'to be savory; nutty', level:'A1', partOfSpeech:'adjective', example:'오븐에서 고소한 빵 냄새가 납니다.' },
  '빵': { lemma:'빵', pronunciation:'[빵]', meaning:'bread', level:'A1', partOfSpeech:'noun', example:'아침에 따뜻한 빵을 먹었습니다.' },
  '냄새': { lemma:'냄새', pronunciation:'[냄새]', meaning:'smell; scent', level:'A1', partOfSpeech:'noun', example:'맛있는 음식 냄새가 나요.' },
  '나다': { lemma:'나다', pronunciation:'[나다]', meaning:'to smell; occur; produce', level:'A1', partOfSpeech:'verb', example:'좋은 꽃 향기가 납니다.' },
  '오른쪽': { lemma:'오른쪽', pronunciation:'[오른쪽]', meaning:'right side', level:'A1', partOfSpeech:'noun', example:'오른쪽에는 예쁜 꽃집이 있습니다.' },
  '작다': { lemma:'작다', pronunciation:'[작따]', meaning:'to be small', level:'A1', partOfSpeech:'adjective', example:'작은 책상 위에 연필이 있습니다.' },
  '예쁘다': { lemma:'예쁘다', pronunciation:'[예쁘다]', meaning:'to be pretty; beautiful', level:'A1', partOfSpeech:'adjective', example:'길에 노란 꽃이 예쁘게 피었습니다.' },
  '빵집': { lemma:'빵집', pronunciation:'[빵찝]', meaning:'bakery', level:'A1', partOfSpeech:'noun', example:'우리 동네에는 작은 빵집이 있어요.' },
  '있다': { lemma:'있다', pronunciation:'[읻따]', meaning:'to exist; have; be there', level:'A1', partOfSpeech:'adjective', example:'서점 안에 책이 많이 있습니다.' },
  '친절하다': { lemma:'친절하다', pronunciation:'[친절하다]', meaning:'to be kind; friendly', level:'A1', partOfSpeech:'adjective', example:'그 빵집 주인은 아주 친절합니다.' },
  '주인': { lemma:'주인', pronunciation:'[주인]', meaning:'owner; host', level:'A1', partOfSpeech:'noun', example:'가게 주인이 반갑게 맞이해 주었습니다.' },
  '매일': { lemma:'매일', pronunciation:'[매일]', meaning:'every day; daily', level:'A1', partOfSpeech:'noun', example:'그는 매일 아침 일찍 운동을 합니다.' },
  '아침': { lemma:'아침', pronunciation:'[아침]', meaning:'morning; breakfast', level:'A1', partOfSpeech:'noun', example:'아침 바람이 상쾌하고 시원합니다.' },
  '일찍': { lemma:'일찍', pronunciation:'[일찍]', meaning:'early', level:'A1', partOfSpeech:'adverb', example:'내일은 일찍 일어나야 합니다.' },
  '일': { lemma:'일', pronunciation:'[일]', meaning:'work; task; matter', level:'A1', partOfSpeech:'noun', example:'오늘 해야 할 일이 많습니다.' },
  '시작하다': { lemma:'시작하다', pronunciation:'[시자카다]', meaning:'to begin; start', level:'A1', partOfSpeech:'verb', example:'그는 스무 살 때 일을 시작했어요.' },
  '손님': { lemma:'손님', pronunciation:'[손님]', meaning:'customer; guest', level:'A1', partOfSpeech:'noun', example:'가게에 손님이 계속 들어옵니다.' },
  '따뜻하다': { lemma:'따뜻하다', pronunciation:'[따뜨타다]', meaning:'to be warm', level:'A1', partOfSpeech:'adjective', example:'주인이 따뜻한 차를 건넸습니다.' },
  '환하다': { lemma:'환하다', pronunciation:'[환하다]', meaning:'to be bright; radiant', level:'A1', partOfSpeech:'adjective', example:'그녀는 환한 미소를 지으며 인사했습니다.' },
  '인사': { lemma:'인사', pronunciation:'[인사]', meaning:'greeting', level:'A1', partOfSpeech:'noun', example:'반갑게 서로 인사를 나누었습니다.' },
  '건네다': { lemma:'건네다', pronunciation:'[건네다]', meaning:'to hand over; pass; address', level:'A1', partOfSpeech:'verb', example:'손님에게 빵과 인사를 건넸습니다.' },
  '사람': { lemma:'사람', pronunciation:'[사람]', meaning:'person; people', level:'A1', partOfSpeech:'noun', example:'공원에 많은 사람들이 모여 있습니다.' },
  '먹다': { lemma:'먹다', pronunciation:'[먹따]', meaning:'to eat', level:'A1', partOfSpeech:'verb', example:'우리는 점심으로 김밥을 먹었습니다.' },
  '행복하다': { lemma:'행복하다', pronunciation:'[행보카다]', meaning:'to be happy', level:'A1', partOfSpeech:'adjective', example:'가족들과 함께 보내는 시간은 행복합니다.' },
  '미소': { lemma:'미소', pronunciation:'[미소]', meaning:'smile', level:'A1', partOfSpeech:'noun', example:'얼굴에 행복한 미소를 띠고 있습니다.' },
  '짓다': { lemma:'짓다', pronunciation:'[짇따]', meaning:'to make; build; wear (a smile)', level:'A1', partOfSpeech:'verb', example:'아이들은 밝은 미소를 지었습니다.' },
  '이곳': { lemma:'이곳', pronunciation:'[이곧]', meaning:'this place; here', level:'A1', partOfSpeech:'noun', example:'이곳은 동네 사람들의 쉼터입니다.' },
  '동네': { lemma:'동네', pronunciation:'[동네]', meaning:'neighborhood; town', level:'A1', partOfSpeech:'noun', example:'우리 동네는 조용하고 살기 좋습니다.' },
  '소중하다': { lemma:'소중하다', pronunciation:'[소중하다]', meaning:'to be precious; valuable', level:'A1', partOfSpeech:'adjective', example:'이 사진은 저에게 아주 소중합니다.' },
  '쉼터': { lemma:'쉼터', pronunciation:'[쉼터]', meaning:'shelter; resting place', level:'A1', partOfSpeech:'noun', example:'나무 그늘 아래는 좋은 쉼터입니다.' },
  '토요일': { lemma:'토요일', pronunciation:'[토요일]', meaning:'Saturday', level:'A1', partOfSpeech:'noun', example:'토요일 아침에 자전거를 탔습니다.' },
  '자전거': { lemma:'자전거', pronunciation:'[자전거]', meaning:'bicycle', level:'A1', partOfSpeech:'noun', example:'저는 주말마다 자전거를 타요.' },
  '타다': { lemma:'타다', pronunciation:'[타다]', meaning:'to ride; board', level:'A1', partOfSpeech:'verb', example:'자전거를 타고 강변을 달렸습니다.' },
  '집': { lemma:'집', pronunciation:'[집]', meaning:'home; house', level:'A1', partOfSpeech:'noun', example:'오후에 일찍 집으로 돌아왔습니다.' },
  '나서다': { lemma:'나서다', pronunciation:'[나서다]', meaning:'to step out; leave (home)', level:'A1', partOfSpeech:'verb', example:'자전거를 타고 집을 나섰습니다.' },
  '바람': { lemma:'바람', pronunciation:'[바람]', meaning:'wind; breeze', level:'A1', partOfSpeech:'noun', example:'시원한 아침 바람이 불어옵니다.' },
  '시원하다': { lemma:'시원하다', pronunciation:'[시원하다]', meaning:'to be cool; refreshing', level:'A1', partOfSpeech:'adjective', example:'바람이 불어서 참 시원합니다.' },
  '그녀': { lemma:'그녀', pronunciation:'[그녀]', meaning:'she', level:'A1', partOfSpeech:'pronoun', example:'그녀는 파란 자전거를 좋아합니다.' },
  '푸르다': { lemma:'푸르다', pronunciation:'[푸르다]', meaning:'to be blue/green', level:'A1', partOfSpeech:'adjective', example:'푸른 하늘 and 맑은 강이 보입니다.' },
  '강': { lemma:'강', pronunciation:'[강]', meaning:'river', level:'A1', partOfSpeech:'noun', example:'강 주변을 따라 산책을 했습니다.' },
  '옆': { lemma:'옆', pronunciation:'[엽]', meaning:'side; next to', level:'A1', partOfSpeech:'noun', example:'강 옆에 자전거 도로가 있습니다.' },
  '길': { lemma:'길', pronunciation:'[길]', meaning:'road; path; way', level:'A1', partOfSpeech:'noun', example:'이 길은 걷기에 아주 아름답습니다.' },
  '천천히': { lemma:'천천히', pronunciation:'[천천히]', meaning:'slowly', level:'A1', partOfSpeech:'adverb', example:'강 옆 길을 천천히 걸었어요.' },
  '달리다': { lemma:'달리다', pronunciation:'[달리다]', meaning:'to run; ride fast', level:'A1', partOfSpeech:'verb', example:'자전거를 타고 천천히 달렸습니다.' },
  '노랗다': { lemma:'노랗다', pronunciation:'[노라타]', meaning:'to be yellow', level:'A1', partOfSpeech:'adjective', example:'길가에 노란 꽃들이 가득합니다.' },
  '꽃': { lemma:'꽃', pronunciation:'[꼳]', meaning:'flower', level:'A1', partOfSpeech:'noun', example:'봄이 오면 산에 꽃이 핍니다.' },
  '피다': { lemma:'피다', pronunciation:'[피다]', meaning:'to bloom; blossom', level:'A1', partOfSpeech:'verb', example:'정원에 빨간 장미가 피었습니다.' },
  '아름답다': { lemma:'아름답다', pronunciation:'[아름답따]', meaning:'to be beautiful', level:'A1', partOfSpeech:'adjective', example:'저녁 하늘의 노을이 아름답습니다.' },
  '가족': { lemma:'가족', pronunciation:'[가족]', meaning:'family', level:'A1', partOfSpeech:'noun', example:'주말에는 가족들과 공원에 갑니다.' },
  '보이다': { lemma:'보이다', pronunciation:'[보이다]', meaning:'to be seen; visible; show', level:'A1', partOfSpeech:'verb', example:'저 멀리 큰 산이 보입니다.' },
  '공원': { lemma:'공원', pronunciation:'[공원]', meaning:'park', level:'A1', partOfSpeech:'noun', example:'공원 의자에 앉아 책을 읽었습니다.' },
  '의자': { lemma:'의자', pronunciation:'[의자]', meaning:'chair; bench', level:'A1', partOfSpeech:'noun', example:'공원 벤치 의자에 잠시 앉았습니다.' },
  '잠시': { lemma:'잠시', pronunciation:'[잠시]', meaning:'for a moment; briefly', level:'A1', partOfSpeech:'adverb', example:'잠시 쉬면서 도시를 보았습니다.' },
  '앉다': { lemma:'앉다', pronunciation:'[안따]', meaning:'to sit', level:'A1', partOfSpeech:'verb', example:'의자에 앉아 커피를 마셨습니다.' },
  '하늘': { lemma:'하늘', pronunciation:'[하늘]', meaning:'sky', level:'A1', partOfSpeech:'noun', example:'파란 하늘에 흰 구름이 떠 있습니다.' },
  '바라보다': { lemma:'바라보다', pronunciation:'[바라보다]', meaning:'to look at; watch; gaze', level:'A1', partOfSpeech:'verb', example:'의자에 앉아 저녁 하늘을 바라보았습니다.' },

  // A2 Words
  '오후': { lemma:'오후', pronunciation:'[오후]', meaning:'afternoon', level:'A2', partOfSpeech:'noun', example:'오늘 오후부터 비가 올 예정입니다.' },
  '비': { lemma:'비', pronunciation:'[비]', meaning:'rain', level:'A2', partOfSpeech:'noun', example:'비가 내려서 우산을 썼습니다.' },
  '내리다': { lemma:'내리다', pronunciation:'[내리다]', meaning:'to fall (rain/snow); go down', level:'A2', partOfSpeech:'verb', example:'어젯밤부터 하얗게 눈이 내렸습니다.' },
  '조용하다': { lemma:'조용하다', pronunciation:'[조용하다]', meaning:'to be quiet; peaceful', level:'A2', partOfSpeech:'adjective', example:'조용한 서점에서 시집을 읽었습니다.' },
  '빗소리': { lemma:'빗소리', pronunciation:'[빋쏘리]', meaning:'sound of rain', level:'A2', partOfSpeech:'noun', example:'창밖의 빗소리가 마음을 편안하게 했다.' },
  '울리다': { lemma:'울리다', pronunciation:'[울리다]', meaning:'to echo; ring; sound', level:'A2', partOfSpeech:'verb', example:'조용한 골목에 빗소리가 울립니다.' },
  '창문': { lemma:'창문', pronunciation:'[창문]', meaning:'window', level:'A2', partOfSpeech:'noun', example:'빗물이 바람에 실려 창문을 두드렸습니다.' },
  '두드리다': { lemma:'두드리다', pronunciation:'[두드리다]', meaning:'to tap; knock; beat', level:'A2', partOfSpeech:'verb', example:'빗소리가 조용히 창문을 두드렸습니다.' },
  '현우': { lemma:'현우', pronunciation:'[현우]', meaning:'Hyunwoo (name)', level:'A2', partOfSpeech:'noun', example:'현우는 책 읽는 것을 좋아합니다.' },
  '피하다': { lemma:'피하다', pronunciation:'[피하다]', meaning:'to avoid; seek shelter from', level:'A2', partOfSpeech:'verb', example:'비를 피해 건물 안으로 들어갔습니다.' },
  '서점': { lemma:'서점', pronunciation:'[서점]', meaning:'bookstore', level:'A2', partOfSpeech:'noun', example:'동네 서점에는 오래된 책들이 많습니다.' },
  '안': { lemma:'안', pronunciation:'[안]', meaning:'inside; interior', level:'A2', partOfSpeech:'noun', example:'서점 안은 따뜻하고 조용했습니다.' },
  '나무': { lemma:'나무', pronunciation:'[나무]', meaning:'wood; tree', level:'A2', partOfSpeech:'noun', example:'서점에는 큰 나무 책상이 놓여 있습니다.' },
  '책상': { lemma:'책상', pronunciation:'[책상]', meaning:'desk', level:'A2', partOfSpeech:'noun', example:'책상 위에 커피 잔이 놓여 있습니다.' },
  '오래되다': { lemma:'오래되다', pronunciation:'[오래되다]', meaning:'to be old; aged', level:'A2', partOfSpeech:'adjective', example:'책방에는 오래된 고서들이 가득합니다.' },
  '책': { lemma:'책', pronunciation:'[책]', meaning:'book', level:'A2', partOfSpeech:'noun', example:'어제 새로 산 책을 다 읽었습니다.' },
  '가득하다': { lemma:'가득하다', pronunciation:'[가드카다]', meaning:'to be full of; packed', level:'A2', partOfSpeech:'adjective', example:'서가에는 다양한 책들이 가득합니다.' },
  '그': { lemma:'그', pronunciation:'[그]', meaning:'he; that', level:'A2', partOfSpeech:'pronoun', example:'그는 시 읽기를 참 좋아합니다.' },
  '차': { lemma:'차', pronunciation:'[차]', meaning:'tea; car', level:'A2', partOfSpeech:'noun', example:'따뜻한 녹차 한 잔을 마셨습니다.' },
  '잔': { lemma:'잔', pronunciation:'[잔]', meaning:'glass; cup (counter)', level:'A2', partOfSpeech:'noun', example:'따뜻한 차 한 잔이 몸을 녹여줍니다.' },
  '마시다': { lemma:'마시다', pronunciation:'[마시다]', meaning:'to drink', level:'A2', partOfSpeech:'verb', example:'아침마다 따뜻한 물을 마집니다.' },
  '좋아하다': { lemma:'좋아하다', pronunciation:'[조아하다]', meaning:'to like', level:'A2', partOfSpeech:'verb', example:'저는 조용한 음악을 좋아합니다.' },
  '시집': { lemma:'시집', pronunciation:'[시집]', meaning:'poetry book', level:'A2', partOfSpeech:'noun', example:'책상 위에 얇은 시집 한 권이 있어요.' },
  '읽다': { lemma:'읽다', pronunciation:'[익따]', meaning:'to read', level:'A2', partOfSpeech:'verb', example:'조용한 구석에서 소설책을 읽었습니다.' },
  '밖': { lemma:'밖', pronunciation:'[박]', meaning:'outside; exterior', level:'A2', partOfSpeech:'noun', example:'밖에는 차가운 가을 비가 내립니다.' },
  '편안하다': { lemma:'편안하다', pronunciation:'[편안하다]', meaning:'to be comfortable; peaceful', level:'A2', partOfSpeech:'adjective', example:'마음이 한결 편안하게 느껴졌습니다.' },
  '일요일': { lemma:'일요일', pronunciation:'[이료일]', meaning:'Sunday', level:'A2', partOfSpeech:'noun', example:'일요일 저녁에 친구를 만났습니다.' },
  '저녁': { lemma:'저녁', pronunciation:'[저녁]', meaning:'evening; dinner', level:'A2', partOfSpeech:'noun', example:'가족들이 모여 맛있는 저녁을 먹었습니다.' },
  '민우': { lemma:'민우', pronunciation:'[민우]', meaning:'Minwoo (name)', level:'A2', partOfSpeech:'noun', example:'민우는 요리하는 것을 취미로 삼고 있습니다.' },
  '처음': { lemma:'처음', pronunciation:'[처음]', meaning:'first time; beginning', level:'A2', partOfSpeech:'noun', example:'저는 한국 요리를 처음 만들어 봅니다.' },
  '혼자': { lemma:'혼자', pronunciation:'[혼자]', meaning:'alone; by oneself', level:'A2', partOfSpeech:'noun', example:'그는 혼자 여행하는 것을 즐깁니다.' },
  '김밥': { lemma:'김밥', pronunciation:'[김밥]', meaning:'gimbap (rice roll)', level:'A2', partOfSpeech:'noun', example:'소풍 갈 때 먹을 김밥을 쌌습니다.' },
  '만들다': { lemma:'만들다', pronunciation:'[만들다]', meaning:'to make; create', level:'A2', partOfSpeech:'verb', example:'아버지는 나무 의자를 직접 만드셨습니다.' },
  '요리책': { lemma:'요리책', pronunciation:'[요리책]', meaning:'cookbook', level:'A2', partOfSpeech:'noun', example:'요리책을 보고 재료를 정성껏 씻었습니다.' },
  '재료': { lemma:'재료', pronunciation:'[재료]', meaning:'ingredient; material', level:'A2', partOfSpeech:'noun', example:'김밥 재료로 오이와 햄을 샀습니다.' },
  '준비하다': { lemma:'준비하다', pronunciation:'[준비하다]', meaning:'to prepare; get ready', level:'A2', partOfSpeech:'verb', example:'시험을 위해 열심히 준비하고 있습니다.' },
  '김': { lemma:'김', pronunciation:'[김]', meaning:'laver; seaweed', level:'A2', partOfSpeech:'noun', example:'김 위에 밥을 고르게 펼쳐 올립니다.' },
  '밥': { lemma:'밥', pronunciation:'[밥]', meaning:'rice; meal', level:'A2', partOfSpeech:'noun', example:'한국 사람은 밥을 주식으로 먹습니다.' },
  '얇다': { lemma:'얇다', pronunciation:'[얄따]', meaning:'to be thin', level:'A2', partOfSpeech:'adjective', example:'종이를 얇게 오려서 붙였습니다.' },
  '펴다': { lemma:'펴다', pronunciation:'[펴다]', meaning:'to spread; open; unfold', level:'A2', partOfSpeech:'verb', example:'김 위에 밥을 얇게 폈습니다.' },
  '계란': { lemma:'계란', pronunciation:'[계란]', meaning:'egg', level:'A2', partOfSpeech:'noun', example:'아침에 삶은 계란 두 개를 먹었습니다.' },
  '당근': { lemma:'당근', pronunciation:'[당근]', meaning:'carrot', level:'A2', partOfSpeech:'noun', example:'김밥에는 색감을 위해 당근이 꼭 들어갑니다.' },
  '시금치': { lemma:'시금치', pronunciation:'[시금치]', meaning:'spinach', level:'A2', partOfSpeech:'noun', example:'시금치를 데쳐서 소금과 참기름에 무쳤습니다.' },
  '가지런하다': { lemma:'가지런하다', pronunciation:'[가지런하다]', meaning:'to be neat; tidy; in order', level:'A2', partOfSpeech:'adjective', example:'책들을 책장에 가지런히 정리했습니다.' },
  '올리다': { lemma:'올리다', pronunciation:'[올리다]', meaning:'to put up; place on; raise', level:'A2', partOfSpeech:'verb', example:'밥 위에 잘 손질한 재료들을 올렸습니다.' },
  '조심스럽다': { lemma:'조심스럽다', pronunciation:'[조심스럽따]', meaning:'to be cautious; careful', level:'A2', partOfSpeech:'adjective', example:'반죽이 상하지 않게 조심스럽게 만졌습니다.' },
  '말다': { lemma:'말다', pronunciation:'[말다]', meaning:'to roll; wind', level:'A2', partOfSpeech:'verb', example:'김밥을 단단하게 말았습니다.' },
  '모양': { lemma:'모양', pronunciation:'[모양]', meaning:'shape; appearance', level:'A2', partOfSpeech:'noun', example:'김밥 모양은 둥글고 예쁩니다.' },
  '조금': { lemma:'조금', pronunciation:'[조금]', meaning:'a little; slightly', level:'A2', partOfSpeech:'adverb', example:'피곤해서 조금 쉬어야겠어요.' },
  '서툴다': { lemma:'서툴다', pronunciation:'[서툴다]', meaning:'to be clumsy; unskilled', level:'A2', partOfSpeech:'adjective', example:'한국어 발음이 아직 조금 서툽니다.' },
  '아주': { lemma:'아주', pronunciation:'[아주]', meaning:'very; extremely', level:'A2', partOfSpeech:'adverb', example:'새로 지은 도서관은 아주 큽니다.' },
  '맛있다': { lemma:'맛있다', pronunciation:'[마싣따]', meaning:'to be delicious', level:'A2', partOfSpeech:'adjective', example:'어머니가 해주신 음식은 아주 맛있습니다.' },
  '직접': { lemma:'직접', pronunciation:'[직쩝]', meaning:'directly; in person; yourself', level:'A2', partOfSpeech:'adverb', example:'가구를 직접 조립해 보았습니다.' },
  '뿌듯하다': { lemma:'뿌듯하다', pronunciation:'[뿌드타다]', meaning:'to feel proud; tight with joy', level:'A2', partOfSpeech:'adjective', example:'일을 성공적으로 끝내서 마음이 뿌듯합니다.' },

  // B1 Words
  '해': { lemma:'해', pronunciation:'[해]', meaning:'sun; year', level:'B1', partOfSpeech:'noun', example:'해가 지평선 아래로 뉘엿뉘엿 지고 있다.' },
  '서쪽': { lemma:'서쪽', pronunciation:'[서쪽]', meaning:'west', level:'B1', partOfSpeech:'noun', example:'해가 서쪽 하늘로 낮아지고 있습니다.' },
  '낮아지다': { lemma:'낮아지다', pronunciation:'[나자지다]', meaning:'to get lower; sink; decrease', level:'B1', partOfSpeech:'verb', example:'해가 낮아지자 온도가 내려갔습니다.' },
  '공기': { lemma:'공기', pronunciation:'[공기]', meaning:'air; atmosphere', level:'B1', partOfSpeech:'noun', example:'비가 그친 후에 공기가 맑아졌습니다.' },
  '부드러워지다': { lemma:'부드러워지다', pronunciation:'[부드러워지다]', meaning:'to soften; become gentle', level:'B1', partOfSpeech:'verb', example:'봄바람이 불자 공기가 부드러워졌습니다.' },
  '강변': { lemma:'강변', pronunciation:'[강변]', meaning:'riverside', level:'B1', partOfSpeech:'noun', example:'강변을 따라 산책하는 사람이 많아요.' },
  '발걸음': { lemma:'발걸음', pronunciation:'[발걸음]', meaning:'footstep; step', level:'B1', partOfSpeech:'noun', example:'집으로 향하는 발걸음이 가벼웠습니다.' },
  '한결': { lemma:'한결', pronunciation:'[한결]', meaning:'by far; much more; noticeably', level:'B1', partOfSpeech:'adverb', example:'바람이 부니 한결 시원하게 느껴지네요.' },
  '여유롭다': { lemma:'여유롭다', pronunciation:'[여유롭따]', meaning:'to be relaxed; leisurely; spacious', level:'B1', partOfSpeech:'adjective', example:'주말의 공원은 평화롭고 여유롭습니다.' },
  '붉다': { lemma:'붉다', pronunciation:'[북따]', meaning:'to be red; crimson', level:'B1', partOfSpeech:'adjective', example:'붉은 단풍잎이 길바닥에 가득 떨어져 있었다.' },
  '노을': { lemma:'노을', pronunciation:'[노을]', meaning:'sunset glow', level:'B1', partOfSpeech:'noun', example:'붉은 노을이 강 위에 비쳤다.' },
  '물결': { lemma:'물결', pronunciation:'[물결]', meaning:'wave; ripple', level:'B1', partOfSpeech:'noun', example:'강바람에 고요한 물결이 일렁였습니다.' },
  '위': { lemma:'위', pronunciation:'[위]', meaning:'above; top; surface', level:'B1', partOfSpeech:'noun', example:'책상 위에 시계가 놓여 있습니다.' },
  '번지다': { lemma:'번지다', pronunciation:'[번지다]', meaning:'to spread; smudge; permeate', level:'B1', partOfSpeech:'verb', example:'노을빛이 잔잔한 강물 위에 번졌습니다.' },
  '전체': { lemma:'전체', pronunciation:'[전체]', meaning:'whole; entire', level:'B1', partOfSpeech:'noun', example:'그 소식은 학교 전체에 알려졌습니다.' },
  '주황빛': { lemma:'주황빛', pronunciation:'[주황빋]', meaning:'orange color; amber glow', level:'B1', partOfSpeech:'noun', example:'노을이 하늘을 아름다운 주황빛으로 물들였다.' },
  '물들이다': { lemma:'물들이다', pronunciation:'[물드리다]', meaning:'to dye; color; tinge', level:'B1', partOfSpeech:'verb', example:'단풍이 온 산을 붉게 물들였습니다.' },
  '빌딩': { lemma:'빌딩', pronunciation:'[빌딩]', meaning:'building', level:'B1', partOfSpeech:'noun', example:'도심에는 높은 빌딩들이 밀집해 있다.' },
  '유리창': { lemma:'유리창', pronunciation:'[유리창]', meaning:'glass window', level:'B1', partOfSpeech:'noun', example:'빌딩의 유리창이 석양빛에 반사되어 빛났다.' },
  '반짝이다': { lemma:'반짝이다', pronunciation:'[반짜기다]', meaning:'to sparkle; twinkle', level:'B1', partOfSpeech:'verb', example:'밤하늘에 수많은 별들이 반짝입니다.' },
  '다리': { lemma:'다리', pronunciation:'[다리]', meaning:'bridge; leg', level:'B1', partOfSpeech:'noun', example:'강을 건너기 위해 다리를 건넜습니다.' },
  '하나둘': { lemma:'하나둘', pronunciation:'[하나둘]', meaning:'one by one; gradually', level:'B1', partOfSpeech:'adverb', example:'어두워지자 가로등이 하나둘 켜졌다.' },
  '조명': { lemma:'조명', pronunciation:'[조명]', meaning:'lighting; illumination', level:'B1', partOfSpeech:'noun', example:'무대 조명이 화려하게 비추고 있습니다.' },
  '켜지다': { lemma:'켜지다', pronunciation:'[켜지다]', meaning:'to be turned on; light up', level:'B1', partOfSpeech:'verb', example:'방의 불이 갑자기 환하게 켜졌습니다.' },
  '어둠': { lemma:'어둠', pronunciation:'[어둠]', meaning:'darkness', level:'B1', partOfSpeech:'noun', example:'해가지고 서서히 어둠이 내려앉았습니다.' },
  '가을': { lemma:'가을', pronunciation:'[가을]', meaning:'autumn; fall', level:'B1', partOfSpeech:'noun', example:'가을이 되자 나뭇잎이 붉게 변합니다.' },
  '밤': { lemma:'밤', pronunciation:'[밤]', meaning:'night; chestnut', level:'B1', partOfSpeech:'noun', example:'어두운 밤하늘에 둥근 달이 떴습니다.' },
  '즐기다': { lemma:'즐기다', pronunciation:'[즐기다]', meaning:'to enjoy', level:'B1', partOfSpeech:'verb', example:'그녀는 여가 시간에 독서를 즐깁니다.' },
  '깊어가다': { lemma:'깊어가다', pronunciation:'[기퍼가다]', meaning:'to deepen; grow deep (night/season)', level:'B1', partOfSpeech:'verb', example:'가을 밤이 깊어갈수록 바람이 차가워진다.' },
  '우리': { lemma:'우리', pronunciation:'[우리]', meaning:'we; our', level:'B1', partOfSpeech:'pronoun', example:'우리는 매일 만나서 한국어를 공부합니다.' },
  '언제나': { lemma:'언제나', pronunciation:'[언제나]', meaning:'always; all the time', level:'B1', partOfSpeech:'adverb', example:'그는 언제나 밝은 표정으로 일한다.' },
  '활기': { lemma:'활기', pronunciation:'[활기]', meaning:'vigor; vitality; energy', level:'B1', partOfSpeech:'noun', example:'전통 시장에는 상인들의 생기와 활기가 있다.' },
  '넘치다': { lemma:'넘치다', pronunciation:'[넘치다]', meaning:'to overflow; overflow with', level:'B1', partOfSpeech:'verb', example:'그는 언제나 자신감이 넘칩니다.' },
  '과일': { lemma:'과일', pronunciation:'[과일]', meaning:'fruit', level:'B1', partOfSpeech:'noun', example:'신선한 과일과 채소를 파는 가게입니다.' },
  '채소': { lemma:'채소', pronunciation:'[채소]', meaning:'vegetable', level:'B1', partOfSpeech:'noun', example:'비타민을 섭취하려면 채소를 먹어야 합니다.' },
  '상인': { lemma:'상인', pronunciation:'[상인]', meaning:'merchant; trader; vendor', level:'A2', partOfSpeech:'noun', example:'상인들이 손님들에게 물건을 설명합니다.' },
  '크다': { lemma:'크다', pronunciation:'[크다]', meaning:'to be big; loud', level:'A1', partOfSpeech:'adjective', example:'그의 웃음소리가 아주 크게 들렸습니다.' },
  '목소리': { lemma:'목소리', pronunciation:'[목소리]', meaning:'voice', level:'A2', partOfSpeech:'noun', example:'가게 주인의 우렁찬 목소리가 시장을 울렸다.' },
  '가득': { lemma:'가득', pronunciation:'[가득]', meaning:'full; fully', level:'A2', partOfSpeech:'adverb', example:'가방에 책을 가득 담았습니다.' },
  '울려 퍼지다': { lemma:'울려 퍼지다', pronunciation:'[울려퍼지다]', meaning:'to echo; resound; spread widely', level:'B1', partOfSpeech:'verb', example:'음악 소리가 공원에 가득 울려 퍼졌습니다.' },
  '떡볶이': { lemma:'떡볶이', pronunciation:'[떡뽀끼]', meaning:'tteokbokki (spicy rice cakes)', level:'A1', partOfSpeech:'noun', example:'시장에서 매콤한 떡볶이를 사 먹었습니다.' },
  '부침개': { lemma:'부침개', pronunciation:'[부침개]', meaning:'Korean pancake (jeon)', level:'A2', partOfSpeech:'noun', example:'비 오는 날에는 바삭한 부침개가 먹고 싶다.' },
  '멈추다': { lemma:'멈추다', pronunciation:'[멈추다]', meaning:'to stop; halt', level:'A2', partOfSpeech:'verb', example:'길가의 예쁜 그림 앞에서 발걸음을 멈추었다.' },
  '가게': { lemma:'가게', pronunciation:'[가게]', meaning:'store; shop', level:'A1', partOfSpeech:'noun', example:'그 가게는 삼십 년 동안 자리를 지켜왔다.' },
  '저마다': { lemma:'저마다', pronunciation:'[저마다]', meaning:'each; individually; respectively', level:'B1', partOfSpeech:'adverb', example:'아이들은 저마다 다른 꿈을 품고 있습니다.' },
  '역사': { lemma:'역사', pronunciation:'[역사]', meaning:'history', level:'A2', partOfSpeech:'noun', example:'이 오래된 성곽은 깊은 역사를 품고 있다.' },
  '품다': { lemma:'품다', pronunciation:'[품다]', meaning:'to harbor; bear; hold in heart', level:'B1', partOfSpeech:'verb', example:'가슴속에 뜨거운 열정을 품고 살아야 합니다.' },
  '덤': { lemma:'덤', pronunciation:'[덤]', meaning:'extra gift; free addition', level:'B2', partOfSpeech:'noun', example:'상인은 사과를 사자 덤으로 하나를 더 주었다.' },
  '물건': { lemma:'물건', pronunciation:'[물건]', meaning:'thing; object; goods', level:'A2', partOfSpeech:'noun', example:'시장에서 필요한 물건을 많이 샀습니다.' },
  '얹다': { lemma:'얹다', pronunciation:'[언따]', meaning:'to place on top; add extra', level:'B2', partOfSpeech:'verb', example:'상인은 나물을 덤으로 한 움큼 더 얹어 주었다.' },
  '넉넉하다': { lemma:'넉넉하다', pronunciation:'[농너카다]', meaning:'to be generous; sufficient; ample', level:'B1', partOfSpeech:'adjective', example:'어머니의 인심은 언제나 넉넉했습니다.' },
  '인심': { lemma:'인심', pronunciation:'[인심]', meaning:'hospitality; generosity of heart', level:'B1', partOfSpeech:'noun', example:'시골 마을에는 따뜻한 인심이 살아 있습니다.' },
  '느끼다': { lemma:'느끼다', pronunciation:'[느끼다]', meaning:'to feel; experience', level:'A2', partOfSpeech:'verb', example:'그는 음악을 들으며 평온함을 느꼈습니다.' },
  '정겹다': { lemma:'정겹다', pronunciation:'[정겹따]', meaning:'to be warm; affectionate; friendly', level:'B1', partOfSpeech:'adjective', example:'이웃들과 나누는 대화가 참 정겹습니다.' },
  '대화': { lemma:'대화', pronunciation:'[대화]', meaning:'conversation', level:'A2', partOfSpeech:'noun', example:'가족과의 따뜻한 대화가 필요합니다.' },
  '이웃': { lemma:'이웃', pronunciation:'[이욷]', meaning:'neighbor', level:'A2', partOfSpeech:'noun', example:'어려운 일이 있을 때 이웃들이 도와주었다.' },
  '소박하다': { lemma:'소박하다', pronunciation:'[소바카다]', meaning:'to be simple; plain; modest', level:'B1', partOfSpeech:'adjective', example:'그는 소박하지만 행복한 일상을 보낸다.' },
  '삶': { lemma:'삶', pronunciation:'[삼]', meaning:'life', level:'B1', partOfSpeech:'noun', example:'예술은 평범한 이들의 삶을 풍요롭게 한다.' },
  '빛나다': { lemma:'빛나다', pronunciation:'[빈나다]', meaning:'to shine; beam; sparkle', level:'B1', partOfSpeech:'verb', example:'그녀의 눈동자가 기쁨으로 반짝 빛났습니다.' },

  // B2 Words
  '밀가루': { lemma:'밀가루', pronunciation:'[밀가루]', meaning:'flour', level:'B2', partOfSpeech:'noun', example:'밀가루와 물을 섞어 반죽을 만들었다.' },
  '물': { lemma:'물', pronunciation:'[물]', meaning:'water', level:'A1', partOfSpeech:'noun', example:'컵에 맑은 물이 담겨 있습니다.' },
  '반죽': { lemma:'반죽', pronunciation:'[반죽]', meaning:'dough; batter', level:'B2', partOfSpeech:'noun', example:'아침마다 빵 반죽을 정성스럽게 만들어요.' },
  '부풀다': { lemma:'부풀다', pronunciation:'[부풀다]', meaning:'to swell; puff up; rise (dough)', level:'B2', partOfSpeech:'verb', example:'효모가 들어가자 반죽이 서서히 부풀었다.' },
  '때': { lemma:'때', pronunciation:'[때]', meaning:'time; moment; when', level:'A2', partOfSpeech:'noun', example:'그가 도착했을 때 비가 오기 시작했다.' },
  '묵묵히': { lemma:'묵묵히', pronunciation:'[뭉무키]', meaning:'silently; wordlessly; steadfastly', level:'B2', partOfSpeech:'adverb', example:'그는 자신의 목표를 위해 묵묵히 땀을 흘렸다.' },
  '기다리다': { lemma:'기다리다', pronunciation:'[기다리다]', meaning:'to wait', level:'A1', partOfSpeech:'verb', example:'약속 장소에서 한 시간을 기다렸습니다.' },
  '제빵사': { lemma:'제빵사', pronunciation:'[제빵사]', meaning:'baker', level:'B2', partOfSpeech:'noun', example:'제빵사는 오븐 온도에 민감하게 반응한다.' },
  '자연스럽다': { lemma:'자연스럽다', pronunciation:'[자연스럽따]', meaning:'to be natural', level:'B1', partOfSpeech:'adjective', example:'인공적인 것보다 자연스러운 미가 좋다.' },
  '지켜보기': { lemma:'지켜보기', pronunciation:'[지켜보기]', meaning:'observing; watching', level:'B1', partOfSpeech:'noun', example:'아이들의 성장을 지켜보는 것이 기쁨입니다.' },
  '지켜보다': { lemma:'지켜보다', pronunciation:'[지켜보다]', meaning:'to watch; observe; monitor', level:'B1', partOfSpeech:'verb', example:'제빵사는 반죽이 오븐에서 부푸는 것을 지켜보았다.' },
  '온도': { lemma:'온도', pronunciation:'[온도]', meaning:'temperature', level:'A2', partOfSpeech:'noun', example:'겨울이 되자 물의 온도가 매우 낮아졌다.' },
  '습도': { lemma:'습도', pronunciation:'[습도]', meaning:'humidity', level:'B1', partOfSpeech:'noun', example:'장마철에는 습도가 높아서 눅눅합니다.' },
  '미세하다': { lemma:'미세하다', pronunciation:'[미세하다]', meaning:'to be micro; fine; minute', level:'B2', partOfSpeech:'adjective', example:'소리의 미세한 차이를 구별할 수 있다.' },
  '변화': { lemma:'변화', pronunciation:'[변화]', meaning:'change; alteration', level:'B1', partOfSpeech:'noun', example:'날씨의 변화에 대비해 외투를 챙기세요.' },
  '공책': { lemma:'공책', pronunciation:'[공책]', meaning:'notebook', level:'A1', partOfSpeech:'noun', example:'그는 오늘 들은 수업 내용을 공책에 적었다.' },
  '기록하다': { lemma:'기록하다', pronunciation:'[기로카다]', meaning:'to record; document', level:'B2', partOfSpeech:'verb', example:'그날의 생각을 공책에 기록했다.' },
  '상태': { lemma:'상태', pronunciation:'[상태]', meaning:'state; condition', level:'B1', partOfSpeech:'noun', example:'환자의 건강 상태가 많이 호전되었습니다.' },
  '점검하다': { lemma:'점검하다', pronunciation:'[점검하다]', meaning:'to inspect; examine; check', level:'B2', partOfSpeech:'verb', example:'기차의 안전 장치를 꼼꼼히 점검했다.' },
  '굽다': { lemma:'굽다', pronunciation:'[굽따]', meaning:'to bake; roast; grill', level:'A2', partOfSpeech:'verb', example:'오븐에서 달콤한 쿠키를 구웠습니다.' },
  '오븐': { lemma:'오븐', pronunciation:'[오븐]', meaning:'oven', level:'A2', partOfSpeech:'noun', example:'뜨거운 오븐 문을 열 때는 조심해야 한다.' },
  '앞': { lemma:'앞', pronunciation:'[압]', meaning:'front; ahead', level:'A1', partOfSpeech:'noun', example:'가게 앞에는 화분들이 나란히 놓여 있다.' },
  '풍기다': { lemma:'풍기다', pronunciation:'[풍기다]', meaning:'to smell; emit a scent; exude', level:'B2', partOfSpeech:'verb', example:'커피숍에 들어서자 은은한 커피 향이 풍겼다.' },
  '향': { lemma:'향', pronunciation:'[향]', meaning:'scent; aroma; fragrance', level:'B1', partOfSpeech:'noun', example:'꽃이 만발하니 봄의 향이 그윽합니다.' },
  '기다림': { lemma:'기다림', pronunciation:'[기다림]', meaning:'waiting; anticipation', level:'B2', partOfSpeech:'noun', example:'오랜 기다림 끝에 반가운 편지가 도착했다.' },
  '보상': { lemma:'보상', pronunciation:'[보상]', meaning:'reward; compensation', level:'B2', partOfSpeech:'noun', example:'성실한 노력에 대한 보상을 받았습니다.' },
  '제빵': { lemma:'제빵', pronunciation:'[제빵]', meaning:'baking; bread-making', level:'B2', partOfSpeech:'noun', example:'그녀는 프랑스에서 제빵 기술을 배웠습니다.' },
  '단순히': { lemma:'단순히', pronunciation:'[단순히]', meaning:'simply; merely', level:'B1', partOfSpeech:'adverb', example:'이것은 단순히 돈의 문제가 아닙니다.' },
  '기술': { lemma:'기술', pronunciation:'[기술]', meaning:'skill; technology; technique', level:'B1', partOfSpeech:'noun', example:'새로운 디지털 기술이 세상을 바꿉니다.' },
  '배우다': { lemma:'배우다', pronunciation:'[배우다]', meaning:'to learn', level:'A1', partOfSpeech:'verb', example:'저는 작년부터 한국어를 배우기 시작했어요.' },
  '정성': { lemma:'정성', pronunciation:'[정성]', meaning:'sincerity; heart; care', level:'B1', partOfSpeech:'noun', example:'어머니는 손님에게 줄 음식을 정성껏 만드셨다.' },
  '담기다': { lemma:'담기다', pronunciation:'[담기다]', meaning:'to be filled; contained; bottled', level:'B1', partOfSpeech:'verb', example:'그의 편지에는 고마운 마음이 듬뿍 담겨 있었다.' },
  '여유': { lemma:'여유', pronunciation:'[여유]', meaning:'leisure; composure', level:'B2', partOfSpeech:'noun', example:'잠시 멈추니 마음의 여유가 생겼다.' },
  '따스하다': { lemma:'따스하다', pronunciation:'[따스하다]', meaning:'to be warm; gentle', level:'B1', partOfSpeech:'adjective', example:'오후의 따스한 햇살이 방 안을 채웠습니다.' },
  '평온': { lemma:'평온', pronunciation:'[평온]', meaning:'tranquility; calm; peace', level:'B2', partOfSpeech:'noun', example:'호수의 잔잔한 수면이 마음에 평온을 준다.' },
  '선물': { lemma:'선물', pronunciation:'[선물]', meaning:'gift; present', level:'A1', partOfSpeech:'noun', example:'생일날 친구에게 예쁜 지갑을 선물로 받았다.' },
  '잠들다': { lemma:'잠들다', pronunciation:'[잠들다]', meaning:'to fall asleep', level:'A2', partOfSpeech:'verb', example:'피곤했던 그는 눕자마자 깊이 잠들었다.' },
  '늦다': { lemma:'늦다', pronunciation:'[늗따]', meaning:'to be late', level:'A1', partOfSpeech:'adjective', example:'밤이 늦었으니 이제 잠자리에 들어야 합니다.' },
  '어둡다': { lemma:'어둡다', pronunciation:'[어둡따]', meaning:'to be dark', level:'A2', partOfSpeech:'adjective', example:'비가 올 것처럼 하늘이 어두워요.' },
  '어두워지다': { lemma:'어두워지다', pronunciation:'[어두워지다]', meaning:'to grow dark; darken', level:'B1', partOfSpeech:'verb', example:'해가 지고 나자 주위가 급격히 어두워졌다.' },
  '소음': { lemma:'소음', pronunciation:'[소음]', meaning:'noise; clamor', level:'B1', partOfSpeech:'noun', example:'자동차 소음 때문에 밤에 잠을 설쳤다.' },
  '낯설다': { lemma:'낯설다', pronunciation:'[낟썰다]', meaning:'to be unfamiliar', level:'C1', partOfSpeech:'adjective', example:'익숙한 거리도 밤에는 낯설게 느껴졌다.' },
  '고요함': { lemma:'고요함', pronunciation:'[고요함]', meaning:'silence; stillness; quietude', level:'B2', partOfSpeech:'noun', example:'도서관의 고요함이 마음을 차분히 만든다.' },
  '차오르다': { lemma:'차오르다', pronunciation:'[차오르다]', meaning:'to rise; swell; fill up', level:'B2', partOfSpeech:'verb', example:'달이 차오르고 마음속에는 그리움이 가득했다.' },
  '가로등': { lemma:'가로등', pronunciation:'[가로등]', meaning:'streetlight', level:'B1', partOfSpeech:'noun', example:'노란 가로등 불빛이 어두운 골목을 비춘다.' },
  '밑': { lemma:'밑', pronunciation:'[밑]', meaning:'bottom; under; beneath', level:'A2', partOfSpeech:'noun', example:'책상 밑에 고양이가 웅크리고 누워 있다.' },
  '지나가다': { lemma:'지나가다', pronunciation:'[지나가다]', meaning:'to pass by; go past', level:'A2', partOfSpeech:'verb', example:'트럭이 굉음을 내며 가게 앞을 지나갔다.' },
  '길다': { lemma:'길다', pronunciation:'[길다]', meaning:'to be long', level:'A1', partOfSpeech:'adjective', example:'길고 좁은 터널을 겨우 빠져나왔습니다.' },
  '늘어지다': { lemma:'늘어지다', pronunciation:'[늘어지다]', meaning:'to droop; stretch; sag', level:'B2', partOfSpeech:'verb', example:'버드나무 가지가 물속을 향해 길게 늘어졌다.' },
  '그림자': { lemma:'그림자', pronunciation:'[그림자]', meaning:'shadow', level:'B1', partOfSpeech:'noun', example:'가로등 불빛 아래 내 그림자가 길게 비쳤다.' },
  '깊이': { lemma:'깊이', pronunciation:'[기피]', meaning:'depth; deeply', level:'B1', partOfSpeech:'noun', example:'이 강은 깊이가 생각보다 아주 깊습니다.' },
  '알리다': { lemma:'알리다', pronunciation:'[알리다]', meaning:'to inform; announce; let know', level:'A2', partOfSpeech:'verb', example:'종소리가 수업의 시작을 널리 알렸다.' },
  '낮': { lemma:'낮', pronunciation:'[낟]', meaning:'daytime; day', level:'A2', partOfSpeech:'noun', example:'낮에는 덥고 밤에는 서늘한 날씨입니다.' },
  '무심히': { lemma:'무심히', pronunciation:'[무심히]', meaning:'indifferently; carelessly; casually', level:'B2', partOfSpeech:'adverb', example:'그는 무심히 지나가는 고양이를 쳐다보았다.' },
  '지나치다': { lemma:'지나치다', pronunciation:'[지나치다]', meaning:'to pass by; overlook; be excessive', level:'B1', partOfSpeech:'verb', example:'길에서 우연히 아는 사람을 그냥 지나쳤다.' },
  '건물': { lemma:'건물', pronunciation:'[건물]', meaning:'building', level:'A2', partOfSpeech:'noun', example:'우리 동네에서 가장 높은 건물은 시청이다.' },
  '외벽': { lemma:'외벽', pronunciation:'[외벽]', meaning:'outer wall', level:'B2', partOfSpeech:'noun', example:'붉은 벽돌로 지은 건물의 외벽이 예쁘다.' },
  '돌담': { lemma:'돌담', pronunciation:'[돌담]', meaning:'stone wall', level:'B2', partOfSpeech:'noun', example:'가을이 되자 돌담 밑에 낙엽이 소복이 쌓였다.' },
  '표정': { lemma:'표정', pronunciation:'[표정]', meaning:'facial expression', level:'A2', partOfSpeech:'noun', example:'그는 슬픈 표정을 지으며 아무 말도 하지 않았다.' },
  '다가오다': { lemma:'다가오다', pronunciation:'[다가오다]', meaning:'to approach; come closer', level:'A2', partOfSpeech:'verb', example:'시험 기간이 다가오자 모두 긴장하기 시작했다.' },
  '가슴속': { lemma:'가슴속', pronunciation:'[가슴속]', meaning:'in one\'s heart/chest; deep inside', level:'B1', partOfSpeech:'noun', example:'가슴속 깊은 곳의 비밀을 털어놓았습니다.' },
  '깊은': { lemma:'깊은', pronunciation:'[기픈]', meaning:'deep (adjective form)', level:'B1', partOfSpeech:'adjective', example:'깊은 숲속에서 맑은 새소리가 들려왔다.' },
  '묻어두다': { lemma:'묻어두다', pronunciation:'[무더두다]', meaning:'to bury; keep to oneself', level:'B2', partOfSpeech:'verb', example:'과거의 아픈 상처는 묻어두기로 결심했다.' },
  '생각': { lemma:'생각', pronunciation:'[생각]', meaning:'thought; idea', level:'A2', partOfSpeech:'noun', example:'아무리 생각해도 좋은 아이디어가 나지 않는다.' },
  '정리하다': { lemma:'정리하다', pronunciation:'[정리하다]', meaning:'to organize; tidy up; arrange', level:'A2', partOfSpeech:'verb', example:'책상 위에 어지러운 책들을 정리했습니다.' },
  '고요히': { lemma:'고요히', pronunciation:'[고요히]', meaning:'quietly; serenely', level:'B2', partOfSpeech:'adverb', example:'강물은 어둠 속에서 고요히 흘렀다.' },
  '고독하다': { lemma:'고독하다', pronunciation:'[고도카다]', meaning:'to be lonely; solitary', level:'B2', partOfSpeech:'adjective', example:'그는 고독한 도시의 산책자처럼 거닐었다.' },
  '평화롭다': { lemma:'평화롭다', pronunciation:'[평화롭따]', meaning:'to be peaceful', level:'B1', partOfSpeech:'adjective', example:'새가 지저귀는 시골 풍경은 아주 평화롭다.' },
  '산책': { lemma:'산책', pronunciation:'[산책]', meaning:'walk; stroll', level:'A2', partOfSpeech:'noun', example:'저녁을 먹은 후에 강변으로 산책을 나갔다.' },

  // C1 Words
  '세상': { lemma:'세상', pronunciation:'[세상]', meaning:'world; society', level:'B2', partOfSpeech:'noun', example:'기술의 발전은 세상을 더 편리하게 만든다.' },
  '디지털화': { lemma:'디지털화', pronunciation:'[디지털화]', meaning:'digitization', level:'C1', partOfSpeech:'noun', example:'디지털화가 급격히 진행되면서 아날로그가 주목받고 있다.' },
  '빠르다': { lemma:'빠르다', pronunciation:'[빠르다]', meaning:'to be fast; quick', level:'A1', partOfSpeech:'adjective', example:'속도가 너무 빠르니 조금 천천히 가세요.' },
  '느리다': { lemma:'느리다', pronunciation:'[느리다]', meaning:'to be slow', level:'A2', partOfSpeech:'adjective', example:'거북이는 걷는 속도가 아주 느립니다.' },
  '감촉': { lemma:'감촉', pronunciation:'[감촉]', meaning:'touch; texture; feel', level:'C1', partOfSpeech:'noun', example:'비단 이불의 부드러운 감촉이 마음에 들었다.' },
  '특유': { lemma:'특유', pronunciation:'[트규]', meaning:'unique characteristic; peculiar to', level:'C1', partOfSpeech:'noun', example:'종이책 특유의 냄새는 심적 안정을 준다.' },
  '잉크': { lemma:'잉크', pronunciation:'[잉크]', meaning:'ink', level:'A2', partOfSpeech:'noun', example:'만년필에 검은색 잉크를 채워 넣었다.' },
  '기억': { lemma:'기억', pronunciation:'[기억]', meaning:'memory', level:'A2', partOfSpeech:'noun', example:'어릴 적 고향에서의 기억은 아주 아름답습니다.' },
  '속': { lemma:'속', pronunciation:'[속]', meaning:'inside; depths; stomach', level:'A2', partOfSpeech:'noun', example:'어두운 숲속에서 길을 잃고 말았습니다.' },
  '전자책': { lemma:'전자책', pronunciation:'[전자책]', meaning:'e-book', level:'B1', partOfSpeech:'noun', example:'전자책은 무거운 종이책을 대신할 수 있다.' },
  '편리함': { lemma:'편리함', pronunciation:'[편리함]', meaning:'convenience', level:'B2', partOfSpeech:'noun', example:'스마트폰은 우리 일상에 엄청난 편리함을 가져다주었다.' },
  '제공하다': { lemma:'제공하다', pronunciation:'[제공하다]', meaning:'to provide; offer', level:'B1', partOfSpeech:'verb', example:'이 호텔은 투숙객에게 무료 아침을 제공합니다.' },
  '손가락': { lemma:'손가락', pronunciation:'[손가락]', meaning:'finger', level:'A2', partOfSpeech:'noun', example:'반지를 약지 손가락에 끼웠습니다.' },
  '페이지': { lemma:'페이지', pronunciation:'[페이지]', meaning:'page', level:'A2', partOfSpeech:'noun', example:'책의 마지막 페이지를 마침내 다 읽었습니다.' },
  '넘기다': { lemma:'넘기다', pronunciation:'[넘기다]', meaning:'to turn (a page); pass; hand over', level:'B1', partOfSpeech:'verb', example:'손끝으로 책장을 한 장씩 가만히 넘겼다.' },
  '아날로그': { lemma:'아날로그', pronunciation:'[아날로그]', meaning:'analog', level:'B2', partOfSpeech:'noun', example:'나는 아날로그 감성이 느껴지는 LP판을 좋아한다.' },
  '즐거움': { lemma:'즐거움', pronunciation:'[즐거움]', meaning:'pleasure; joy; delight', level:'B2', partOfSpeech:'noun', example:'배움의 즐거움은 그 어떤 것보다 크다.' },
  '책장': { lemma:'책장', pronunciation:'[책장]', meaning:'bookshelf; bookcase; book page', level:'B1', partOfSpeech:'noun', example:'서재 한쪽 벽면을 커다란 책장으로 가득 채웠다.' },
  '물리적': { lemma:'물리적', pronunciation:'[물리적]', meaning:'physical', level:'C1', partOfSpeech:'adjective', example:'우리는 물리적 한계를 극복해야 합니다.' },
  '존재감': { lemma:'존재감', pronunciation:'[존재감]', meaning:'presence', level:'C1', partOfSpeech:'noun', example:'그는 방 안에서 묵직한 존재감을 드러냈다.' },
  '대체': { lemma:'대체', pronunciation:'[대체]', meaning:'substitution; replacement', level:'C1', partOfSpeech:'noun', example:'화석 연료를 신재생 에너지로 대체하고 있습니다.' },
  '불가능하다': { lemma:'불가능하다', pronunciation:'[불가능하다]', meaning:'to be impossible', level:'B1', partOfSpeech:'adjective', example:'현 상황에서 포기하지 않고 가기란 불가능해 보였다.' },
  '젊은이': { lemma:'젊은이', pronunciation:'[절무니]', meaning:'young person; youth', level:'B1', partOfSpeech:'noun', example:'많은 젊은이들이 전통 시장을 찾고 있다.' },
  '독특하다': { lemma:'독특하다', pronunciation:'[독특하다]', meaning:'to be unique; peculiar', level:'B1', partOfSpeech:'adjective', example:'그 가게는 독특한 인테리어로 눈길을 끈다.' },
  '감성': { lemma:'감성', pronunciation:'[감성]', meaning:'sensibility; sensitivity; vibe', level:'B2', partOfSpeech:'noun', example:'이 노래는 가을에 어울리는 잔잔한 감성이 있다.' },
  '책방': { lemma:'책방', pronunciation:'[책방]', meaning:'bookstore; bookshop', level:'B1', partOfSpeech:'noun', example:'한적한 시골 마을에 작은 동네 책방이 문을 열었다.' },
  '찾다': { lemma:'찾다', pronunciation:'[찿따]', meaning:'to seek; search; find', level:'A1', partOfSpeech:'verb', example:'잃어버린 지갑을 드디어 찾았습니다.' },
  '현상': { lemma:'현상', pronunciation:'[현상]', meaning:'phenomenon', level:'C1', partOfSpeech:'noun', example:'급격한 고령화는 심각한 사회 현상 중 하나이다.' },
  '바쁘다': { lemma:'바쁘다', pronunciation:'[바쁘다]', meaning:'to be busy', level:'A1', partOfSpeech:'adjective', example:'요즘 일이 많아서 아주 바쁩니다.' },
  '현대': { lemma:'현대', pronunciation:'[현대]', meaning:'modern times; present day', level:'B1', partOfSpeech:'noun', example:'현대 문명은 인간의 삶을 비약적으로 변화시켰다.' },
  '사회': { lemma:'사회', pronunciation:'[사회]', meaning:'society', level:'B1', partOfSpeech:'noun', example:'우리는 더 나은 사회를 만들기 위해 협력해야 한다.' },
  '느림': { lemma:'느림', pronunciation:'[느림]', meaning:'slowness', level:'B2', partOfSpeech:'noun', example:'느림의 즐거움을 알면 삶이 훨씬 평온해집니다.' },
  '미학': { lemma:'미학', pronunciation:'[미학]', meaning:'aesthetics', level:'C1', partOfSpeech:'noun', example:'이 건축물에는 전통 한옥의 미학이 담겨 있다.' },
  '갈망하다': { lemma:'갈망하다', pronunciation:'[갈망하다]', meaning:'to long for; crave; desire', level:'C1', partOfSpeech:'verb', example:'평화로운 삶을 갈망하는 사람들이 많습니다.' },
  '현대인': { lemma:'현대인', pronunciation:'[현대인]', meaning:'modern people', level:'C1', partOfSpeech:'noun', example:'현대인들은 만성 피로와 스트레스에 시달립니다.' },
  '내면': { lemma:'내면', pronunciation:'[내면]', meaning:'inner self; inside', level:'C1', partOfSpeech:'noun', example:'외모도 중요하지만 내면의 아름다움이 더 중요하다.' },
  '반영하다': { lemma:'반영하다', pronunciation:'[반영하다]', meaning:'to reflect', level:'C1', partOfSpeech:'verb', example:'여론 조사 결과는 국민들의 뜻을 반영합니다.' },
  '재개발': { lemma:'재개발', pronunciation:'[재개발]', meaning:'redevelopment', level:'C1', partOfSpeech:'noun', example:'노후된 주택가 지역이 상업지구로 재개발되었다.' },
  '현대화': { lemma:'현대화', pronunciation:'[현대화]', meaning:'modernization', level:'C1', partOfSpeech:'noun', example:'전통 시장의 현대화 사업이 진행 중입니다.' },
  '풍경': { lemma:'풍경', pronunciation:'[풍경]', meaning:'landscape; scenery; view', level:'B1', partOfSpeech:'noun', example:'설산의 웅장한 풍경에 눈을 뗄 수 없었다.' },
  '순식간': { lemma:'순식간', pronunciation:'[순식깐]', meaning:'in an instant; a flash', level:'B2', partOfSpeech:'noun', example:'소나기가 오자 거리가 순식간에 물바다가 되었다.' },
  '차갑다': { lemma:'차갑다', pronunciation:'[차가웁따]', meaning:'to be cold; chilly; icy', level:'A2', partOfSpeech:'adjective', example:'겨울철 유리창의 공기는 몹시 차갑다.' },
  '빌딩숲': { lemma:'빌딩숲', pronunciation:'[빌딩숲]', meaning:'concrete jungle; forest of skyscrapers', level:'C1', partOfSpeech:'noun', example:'빽빽한 빌딩숲 사이로 가로수가 서 있다.' },
  '사라지다': { lemma:'사라지다', pronunciation:'[사라지다]', meaning:'to disappear; vanish', level:'B1', partOfSpeech:'verb', example:'구름 뒤로 해가 서서히 사라졌습니다.' },
  '사라져가다': { lemma:'사라져가다', pronunciation:'[사라져가다]', meaning:'to be fading away; disappearing', level:'C1', partOfSpeech:'verb', example:'점차 사라져가는 옛 가옥들을 보존해야 합니다.' },
  '주민': { lemma:'주민', pronunciation:'[주민]', meaning:'resident; inhabitant', level:'B1', partOfSpeech:'noun', example:'아파트 주민들이 모여 반상회를 열었습니다.' },
  '공간': { lemma:'공간', pronunciation:'[공간]', meaning:'space', level:'B1', partOfSpeech:'noun', example:'여백의 공간을 활용해 서재를 꾸몄다.' },
  '지도': { lemma:'지도', pronunciation:'[지도]', meaning:'map; guidance', level:'A2', partOfSpeech:'noun', example:'낯선 도시를 여행할 때는 지도가 필수적이다.' },
  '그림': { lemma:'그림', pronunciation:'[그림]', meaning:'drawing; picture; painting', level:'A1', partOfSpeech:'noun', example:'그녀는 거실 벽에 아름다운 풍경화 그림을 걸었다.' },
  '글씨': { lemma:'글씨', pronunciation:'[글씨]', meaning:'handwriting; character; script', level:'A2', partOfSpeech:'noun', example:'아버지는 명필이셔서 붓글씨를 아주 잘 쓰신다.' },
  '프로젝트': { lemma:'프로젝트', pronunciation:'[프로젝트]', meaning:'project', level:'B1', partOfSpeech:'noun', example:'새로운 모바일 웹 디자인 프로젝트를 시작했다.' },
  '진행': { lemma:'진행', pronunciation:'[진행]', meaning:'progress; proceed; host', level:'B1', partOfSpeech:'noun', example:'공사의 원활한 진행을 위해 안전 감독을 강화했다.' },
  '지리': { lemma:'지리', pronunciation:'[지리]', meaning:'geography; terrains', level:'B2', partOfSpeech:'noun', example:'이 근처 지리를 잘 몰라서 길을 헤맸습니다.' },
  '정보': { lemma:'정보', pronunciation:'[정보]', meaning:'information', level:'B1', partOfSpeech:'noun', example:'유용한 정보를 인터넷 검색으로 쉽게 얻었다.' },
  '태어나다': { lemma:'태어나다', pronunciation:'[태어나다]', meaning:'to be born', level:'A2', partOfSpeech:'verb', example:'그는 따뜻한 제주도에서 태어났습니다.' },
  '살아가다': { lemma:'살아가다', pronunciation:'[사라가다]', meaning:'to live; lead a life', level:'B1', partOfSpeech:'verb', example:'어려운 여건 속에서도 우리는 희망을 품고 살아갑니다.' },
  '평범하다': { lemma:'평범하다', pronunciation:'[평범하다]', meaning:'to be ordinary; common; plain', level:'B1', partOfSpeech:'adjective', example:'그는 지극히 평범한 회사원으로 살아가고 있다.' },
  '지워지다': { lemma:'지워지다', pronunciation:'[지워지다]', meaning:'to be erased; rubbed out; fade away', level:'B1', partOfSpeech:'verb', example:'종이에 연필로 쓴 글씨가 물에 젖어 지워졌다.' },
  '흔적': { lemma:'흔적', pronunciation:'[흔적]', meaning:'trace; mark; footprint', level:'B2', partOfSpeech:'noun', example:'눈 위에 동물의 흔적인 발자국이 남겨져 있었다.' },

  // C2 Words
  '훌륭하다': { lemma:'훌륭하다', pronunciation:'[훌륭하다]', meaning:'to be wonderful; great; superb', level:'B1', partOfSpeech:'adjective', example:'그는 많은 훌륭한 문학 작품을 남겼습니다.' },
  '문장': { lemma:'문장', pronunciation:'[문장]', meaning:'sentence', level:'A2', partOfSpeech:'noun', example:'어려운 문장은 사전에서 뜻을 직접 찾아보았다.' },
  '독자': { lemma:'독자', pronunciation:'[독짜]', meaning:'reader', level:'B2', partOfSpeech:'noun', example:'작가는 독자들과 활발하게 이메일로 소통했다.' },
  '일방적': { lemma:'일방적', pronunciation:'[일방적]', meaning:'unilateral; one-sided', level:'C1', partOfSpeech:'adjective', example:'일방적인 의사소통은 관계에 해를 입힙니다.' },
  '메시지': { lemma:'메시지', pronunciation:'[메시지]', meaning:'message', level:'A2', partOfSpeech:'noun', example:'그는 나에게 힘을 주는 따뜻한 메시지를 보냈다.' },
  '강요하다': { lemma:'강요하다', pronunciation:'[강요하다]', meaning:'to force; coerce; compel', level:'C1', partOfSpeech:'verb', example:'남에게 자신의 의견을 지나치게 강요해서는 안 된다.' },
  '행간': { lemma:'행간', pronunciation:'[행간]', meaning:'between the lines; spaces of lines', level:'C2', partOfSpeech:'noun', example:'훌륭한 수필은 행간의 여백을 음미하게 만든다.' },
  '여백': { lemma:'여백', pronunciation:'[여백]', meaning:'blank space; margin', level:'B2', partOfSpeech:'noun', example:'그림의 아름다움은 빈 여백에서 나온다고 한다.' },
  '머물다': { lemma:'머물다', pronunciation:'[머물다]', meaning:'to stay; remain; dwell', level:'B1', partOfSpeech:'verb', example:'비가 그칠 때까지 서점에 잠시 머물기로 했다.' },
  '스스로': { lemma:'스스로', pronunciation:'[스스로]', meaning:'by oneself; independently; voluntarily', level:'B1', partOfSpeech:'noun', example:'학생은 숙제를 스스로 해결하려고 노력해야 한다.' },
  '경험': { lemma:'경험', pronunciation:'[경험]', meaning:'experience', level:'A2', partOfSpeech:'noun', example:'다양한 직업 경험은 인생에 큰 자산이 됩니다.' },
  '차분히': { lemma:'차분히', pronunciation:'[차분히]', meaning:'calmly; coolly; composedly', level:'B2', partOfSpeech:'adverb', example:'차분히 생각을 가다듬고 답변을 준비했습니다.' },
  '되새기다': { lemma:'되새기다', pronunciation:'[되새기다]', meaning:'to reflect on; recall; chew over', level:'C2', partOfSpeech:'verb', example:'책의 마지막 문장을 오래 되새겼다.' },
  '이끌다': { lemma:'이끌다', pronunciation:'[이끌다]', meaning:'to lead; guide; attract', level:'B2', partOfSpeech:'verb', example:'선생님은 아이들을 안전한 곳으로 이끌었습니다.' },
  '수많은': { lemma:'수많은', pronunciation:'[수마는]', meaning:'numerous; countless', level:'B1', partOfSpeech:'adjective', example:'밤하늘에 수많은 은하와 별들이 펼쳐졌다.' },
  '말': { lemma:'말', pronunciation:'[말]', meaning:'word; speech; talk; horse', level:'A1', partOfSpeech:'noun', example:'그의 부드러운 말 한마디가 나를 위로해 주었다.' },
  '어지럽다': { lemma:'어지럽다', pronunciation:'[어지럽따]', meaning:'to be dizzy; messy; chaotic', level:'B2', partOfSpeech:'adjective', example:'방 안이 어지럽게 널려 있어서 정리했다.' },
  '쏟아지다': { lemma:'쏟아지다', pronunciation:'[쏟아지다]', meaning:'to pour; gush; spill out', level:'B1', partOfSpeech:'verb', example:'오후부터 폭우가 갑자기 쏟아지기 시작했다.' },
  '일상': { lemma:'일상', pronunciation:'[일상]', meaning:'daily life; routine', level:'A2', partOfSpeech:'noun', example:'그는 평범한 일상 속에서 즐거움을 발견했다.' },
  '침묵': { lemma:'침묵', pronunciation:'[침묵]', meaning:'silence', level:'C2', partOfSpeech:'noun', example:'두 사람 사이에는 잠시 묵직한 침묵이 흘렀다.' },
  '비로소': { lemma:'비로소', pronunciation:'[비로소]', meaning:'finally; at last; for the first time', level:'C1', partOfSpeech:'adverb', example:'사고를 겪고 나서야 비로소 건강의 소중함을 깨달았다.' },
  '진정한': { lemma:'진정한', pronunciation:'[진정한]', meaning:'true; genuine; sincere', level:'B2', partOfSpeech:'adjective', example:'어려울 때 돕는 친구가 진정한 친구입니다.' },
  '의미': { lemma:'의미', pronunciation:'[의미]', meaning:'meaning; significance', level:'A2', partOfSpeech:'noun', example:'그 단어가 어떤 의미인지 사전을 찾아보세요.' },
  '언어': { lemma:'언어', pronunciation:'[언어]', meaning:'language', level:'B1', partOfSpeech:'noun', example:'언어는 문화와 사고를 투영하는 거울이다.' },
  '사유': { lemma:'사유', pronunciation:'[사유]', meaning:'deep thinking; contemplation; reason', level:'C2', partOfSpeech:'noun', example:'철학적 사유의 끝에 도달하여 마침내 깨달았다.' },
  '정신적': { lemma:'정신적', pronunciation:'[정신적]', meaning:'mental; spiritual', level:'B2', partOfSpeech:'adjective', example:'과도한 업무는 정신적 피로를 야기할 수 있다.' },
  '마련하다': { lemma:'마련하다', pronunciation:'[마련하다]', meaning:'to prepare; provide; arrange', level:'B1', partOfSpeech:'verb', example:'손님들에게 대접할 다과를 마련해 두었습니다.' },
  '순간': { lemma:'순간', pronunciation:'[순간]', meaning:'moment; instant', level:'A2', partOfSpeech:'noun', example:'그와 눈이 마주친 순간, 머리가 하얘졌다.' },
  '타인': { lemma:'타인', pronunciation:'[타인]', meaning:'others; stranger', level:'B2', partOfSpeech:'noun', example:'타인의 시선에 지나치게 신경 쓸 필요가 없다.' },
  '고통': { lemma:'고통', pronunciation:'[고통]', meaning:'pain; suffering', level:'B1', partOfSpeech:'noun', example:'그녀는 극심한 두통 고통을 호소하고 있었다.' },
  '경청하다': { lemma:'경청하다', pronunciation:'[경청하다]', meaning:'to listen attentively; hark', level:'C2', partOfSpeech:'verb', example:'남의 의견을 주의 깊게 경청해야 현명해집니다.' },
  '온전히': { lemma:'온전히', pronunciation:'[온전히]', meaning:'wholly; entirely; intact', level:'C1', partOfSpeech:'adverb', example:'그 선물은 그의 고유한 노력이 온전히 담긴 것이다.' },
  '마주하다': { lemma:'마주하다', pronunciation:'[마주하다]', meaning:'to face; confront; sit face to face', level:'C1', partOfSpeech:'verb', example:'어려운 실체적 문제와 용기 있게 마주했다.' },
  '지혜': { lemma:'지혜', pronunciation:'[지혜]', meaning:'wisdom', level:'B2', partOfSpeech:'noun', example:'현명한 자의 지혜가 고난을 물리쳤다.' },
  '얻다': { lemma:'얻다', pronunciation:'[얻따]', meaning:'to get; obtain; gain', level:'A2', partOfSpeech:'verb', example:'여행을 통해 깊은 인생의 교훈을 얻었다.' },
  '끊임없이': { lemma:'끊임없이', pronunciation:'[끈임업시]', meaning:'constantly; endlessly; incessantly', level:'B2', partOfSpeech:'adverb', example:'시간의 강물은 끊임없이 하류를 향해 흐른다.' },
  '강가': { lemma:'강가', pronunciation:'[강가]', meaning:'riverside; riverbank', level:'A2', partOfSpeech:'noun', example:'여름철 강가에서 시원하게 텐트를 치고 놀았다.' },
  '서다': { lemma:'서다', pronunciation:'[서다]', meaning:'to stand; stop; build up', level:'A1', partOfSpeech:'verb', example:'언덕 위에 홀로 선 오래된 소나무가 보인다.' },
  '흐르다': { lemma:'흐르다', pronunciation:'[흐르다]', meaning:'to flow; pass (time)', level:'A2', partOfSpeech:'verb', example:'냇물이 산골짜기 사이로 맑게 흐른다.' },
  '시간': { lemma:'시간', pronunciation:'[시간]', meaning:'time; hour', level:'A1', partOfSpeech:'noun', example:'우리가 함께 지낸 시간이 참 소중합니다.' },
  '냉혹함': { lemma:'냉혹함', pronunciation:'[냉호캄]', meaning:'cold-heartedness; ruthlessness', level:'C2', partOfSpeech:'noun', example:'흐르는 역사적 시간의 냉혹함에 몸서리쳤다.' },
  '동시에': { lemma:'동시에', pronunciation:'[동시에]', meaning:'at the same time; simultaneously', level:'B1', partOfSpeech:'adverb', example:'두 사람은 문을 열고 동시에 밖으로 나갔다.' },
  '흐름': { lemma:'흐름', pronunciation:'[흐름]', meaning:'flow; stream; drift', level:'B2', partOfSpeech:'noun', example:'대세의 흐름에 순응해 나가는 것도 중요하다.' },
  '빚어내다': { lemma:'빚어내다', pronunciation:'[비저내다]', meaning:'to bring about; create; evoke', level:'C2', partOfSpeech:'verb', example:'그 화가는 빛과 그림자로 독특한 미를 빚어냈다.' },
  '무한하다': { lemma:'무한하다', pronunciation:'[무한하다]', meaning:'to be infinite; limitless', level:'C1', partOfSpeech:'adjective', example:'우리의 상상력은 참으로 무한하게 여겨진다.' },
  '평온함': { lemma:'평온함', pronunciation:'[평온함]', meaning:'tranquility; calmness', level:'B2', partOfSpeech:'noun', example:'숲 한가운데 가만히 서 있으니 평온함이 넘친다.' },
  '강물': { lemma:'강물', pronunciation:'[강물]', meaning:'river water; stream', level:'A2', partOfSpeech:'noun', example:'강물이 유유히 흘러 바다에 도달합니다.' },
  '방향': { lemma:'방향', pronunciation:'[방향]', meaning:'direction', level:'B1', partOfSpeech:'noun', example:'올바른 인생 방향을 설정하는 것이 우선이다.' },
  '잃다': { lemma:'잃다', pronunciation:'[일타]', meaning:'to lose', level:'A2', partOfSpeech:'verb', example:'어두운 골목길에서 방향을 완전히 잃었다.' },
  '바다': { lemma:'바다', pronunciation:'[바다]', meaning:'sea; ocean', level:'A1', partOfSpeech:'noun', example:'여름방학 때 동해 바다에 놀러 갈 겁니다.' },
  '향하다': { lemma:'향하다', pronunciation:'[향하다]', meaning:'to face; tend toward; head for', level:'B1', partOfSpeech:'verb', example:'그는 출구를 향해 빠른 발걸음을 옮겼다.' },
  '나아가다': { lemma:'나아가다', pronunciation:'[나아가다]', meaning:'to advance; proceed; go forward', level:'B2', partOfSpeech:'verb', example:'한 걸음 더 나아가서 깊은 의미를 생각해야 합니다.' },
  '가로막다': { lemma:'가로막다', pronunciation:'[가로막따]', meaning:'to block; obstruct; intercept', level:'B2', partOfSpeech:'verb', example:'거대한 돌벽이 그가 지나갈 앞길을 가로막았다.' },
  '바위': { lemma:'바위', pronunciation:'[바위]', meaning:'rock; boulder', level:'B1', partOfSpeech:'noun', example:'산 정상에 큰 바위들이 우뚝 솟아 있다.' },
  '탓하다': { lemma:'탓하다', pronunciation:'[탓하다]', meaning:'to blame', level:'B2', partOfSpeech:'verb', example:'남을 탓하기 전에 스스로를 깊이 성찰하라.' },
  '휘돌다': { lemma:'휘돌다', pronunciation:'[휘돌다]', meaning:'to swirl; turn round; detour', level:'C2', partOfSpeech:'verb', example:'강물은 큰 바위를 묵묵히 휘돌아 흘러갔다.' },
  '결국': { lemma:'결국', pronunciation:'[결국]', meaning:'eventually; in the end; ultimately', level:'A2', partOfSpeech:'adverb', example:'열심히 노력한 끝에 결국 시험에 합격했다.' },
  '인생': { lemma:'인생', pronunciation:'[인생]', meaning:'human life', level:'B1', partOfSpeech:'noun', example:'인생은 긴 여행과 같아서 배움의 연속입니다.' },
  '거대하다': { lemma:'거대하다', pronunciation:'[거대하다]', meaning:'to be huge; colossal; gigantic', level:'B1', partOfSpeech:'adjective', example:'바다 한가운데 떠 있는 거대한 크루즈선을 보았다.' },
  '내려놓다': { lemma:'내려놓다', pronunciation:'[내려노타]', meaning:'to put down; lay down; ease (mind)', level:'B2', partOfSpeech:'verb', example:'마음의 무거운 짐을 드디어 다 내려놓았습니다.' },
  '순리': { lemma:'순리', pronunciation:'[순리]', meaning:'reason; natural law; order of nature', level:'C2', partOfSpeech:'noun', example:'자연의 흐르는 순리를 거스를 수는 없는 법이다.' },
  '명상': { lemma:'명상', pronunciation:'[명상]', meaning:'meditation', level:'B2', partOfSpeech:'noun', example:'조용한 방에서 명상을 하며 하루를 시작한다.' },
  '가깝다': { lemma:'가깝다', pronunciation:'[가깝따]', meaning:'to be close; near', level:'A1', partOfSpeech:'adjective', example:'우리 집은 지하철 역과 아주 가깝습니다.' },
} satisfies Record<string, VocabularyEntry>;

export type VocabularyLemma = keyof typeof VOCABULARY;

let dynamicVocabCache: Record<string, VocabularyEntry> = {};

export function setDynamicVocabCache(vocab: Record<string, VocabularyEntry>): void {
  dynamicVocabCache = vocab;
}

export function getVocabulary(lemma: string): VocabularyEntry | undefined {
  // Check static database first
  const staticEntry = VOCABULARY[lemma as VocabularyLemma];
  if (staticEntry) return staticEntry;

  // Check memory cache loaded from database
  if (dynamicVocabCache[lemma]) return dynamicVocabCache[lemma];

  // Fallback to dynamic vocabulary saved in localStorage
  try {
    const raw = localStorage.getItem('sori:dynamic-vocabulary');
    if (raw) {
      const dynamicMap = JSON.parse(raw);
      if (dynamicMap[lemma]) {
        return dynamicMap[lemma] as VocabularyEntry;
      }
    }
  } catch (error) {
    console.error("Error reading dynamic vocabulary from localStorage:", error);
  }

  return undefined;
}

export function saveDynamicVocabulary(newVocab: VocabularyEntry[]): void {
  try {
    const raw = localStorage.getItem('sori:dynamic-vocabulary');
    const dynamicMap = raw ? JSON.parse(raw) : {};
    
    for (const entry of newVocab) {
      dynamicMap[entry.lemma] = entry;
    }
    
    localStorage.setItem('sori:dynamic-vocabulary', JSON.stringify(dynamicMap));
  } catch (error) {
    console.error("Error saving dynamic vocabulary to localStorage:", error);
  }
}

/**
 * Custom Korean stemming logic to find dictionary lemma form from a text word.
 * Handles common noun particles (은, 는, 이, 가, 을, 를, 에, 의, 로, 으로, 에서, 과, 와, 도, 만, 까지, 부터)
 * and verb/adjective conjugations (합니다, 했습니다, 했다, 해요, 하고, 하면, 은, 는, 을, 습니다, 었다, 았다, etc.).
 */
export function findLemmaForWord(word: string): string | null {
  if (!word) return null;

  // 1. Direct dictionary match
  if (getVocabulary(word)) {
    return word;
  }

  // 2. Strip common noun particles (longest first)
  const particles = [
    '에서는', '에게서', '으로부터', '한테서', '으로서', '으로서의', 
    '에서의', '으로', '에서', '에게', '한테', '처럼', '보다', '마다', 
    '조차', '마저', '부터', '까지', '은', '는', '이', '가', '을', '를', 
    '에', '의', '와', '과', '도', '만', '로', '고'
  ];

  for (const p of particles) {
    if (word.length > p.length && word.endsWith(p)) {
      const stem = word.slice(0, -p.length);
      const entry = getVocabulary(stem);
      if (entry && entry.partOfSpeech === 'noun') {
        return stem;
      }
    }
  }

  // 3. Verb and Adjective stem mapping
  const verbEndings = [
    // -하다 verbs/adjectives
    { suffix: '합니다만', replace: '하다' },
    { suffix: '합니다', replace: '하다' },
    { suffix: '했습니다', replace: '하다' },
    { suffix: '하셨습니다', replace: '하다' },
    { suffix: '했다', replace: '하다' },
    { suffix: '해요', replace: '하다' },
    { suffix: '하여', replace: '하다' },
    { suffix: '하러', replace: '하다' },
    { suffix: '하면', replace: '하다' },
    { suffix: '해서', replace: '하다' },
    { suffix: '하고', replace: '하다' },
    { suffix: '하길', replace: '하다' },
    { suffix: '하지', replace: '하다' },
    { suffix: '하는', replace: '하다' },
    { suffix: '한', replace: '하다' },
    { suffix: '할', replace: '하다' },
    { suffix: '하더라고', replace: '하다' },
    
    // Regular verb/adjective suffixes
    { suffix: '습니다', replace: '다' },
    { suffix: '었습니다', replace: '다' },
    { suffix: '았습니다', replace: '다' },
    { suffix: '였습니다', replace: '다' },
    { suffix: '었다', replace: '다' },
    { suffix: '았다', replace: '다' },
    { suffix: '였다', replace: '다' },
    { suffix: '어요', replace: '다' },
    { suffix: '아요', replace: '다' },
    { suffix: '어서', replace: '다' },
    { suffix: '아서', replace: '다' },
    { suffix: '으면', replace: '다' },
    { suffix: '면', replace: '다' },
    { suffix: '고', replace: '다' },
    { suffix: '는', replace: '다' },
    { suffix: '은', replace: '다' },
    { suffix: '을', replace: '다' },
    { suffix: '던', replace: '다' },
    { suffix: '지', replace: '다' },
    { suffix: '어', replace: '다' },
    { suffix: '아', replace: '다' },
    
    // Irregular -르다 sound changes (e.g. 흘렀다 -> 흐르다, 불렀다 -> 부르다)
    { suffix: '렀습니다', replace: '르다' },
    { suffix: '렀다', replace: '르다' },
    { suffix: '러요', replace: '르다' },
    { suffix: '러', replace: '르다' },
    
    // Conjugations that end in -리다 (e.g. 달렸다 -> 달리다)
    { suffix: '렸습니다', replace: '리다' },
    { suffix: '렸다', replace: '리다' },
    { suffix: '려요', replace: '리다' },
    { suffix: '려', replace: '리다' },

    // Conjugations that end in -서다 (e.g. 나섰다 -> 나서다)
    { suffix: '섰습니다', replace: '서다' },
    { suffix: '섰다', replace: '서다' },
    { suffix: '서요', replace: '서다' },
    { suffix: '서', replace: '서다' },

    // Conjugations that end in -끼다 (e.g. 느껴졌다 -> 느끼다/느껴지다)
    { suffix: '꼈습니다', replace: '끼다' },
    { suffix: '꼈다', replace: '끼다' },
    { suffix: '껴요', replace: '끼다' },
    { suffix: '껴', replace: '끼다' },

    // Conjugations that end in -치다 (e.g. 비쳤다 -> 비치다)
    { suffix: '쳤습니다', replace: '치다' },
    { suffix: '쳤다', replace: '치다' },
    { suffix: '쳐요', replace: '치다' },
    { suffix: '쳐', replace: '치다' },

    // Conjugations that end in -오다 (e.g. 나왔다 -> 나오다)
    { suffix: '왔습니다', replace: '오다' },
    { suffix: '왔다', replace: '오다' },
    { suffix: '와요', replace: '오다' },
    { suffix: '와', replace: '오다' },

    // Conjugations that end in -우다 (e.g. 세웠다 -> 세우다)
    { suffix: '웠습니다', replace: '우다' },
    { suffix: '웠다', replace: '우다' },
    { suffix: '워요', replace: '우다' },
    { suffix: '워', replace: '우다' },
  ];

  for (const e of verbEndings) {
    if (word.endsWith(e.suffix)) {
      const stem = word.slice(0, -e.suffix.length) + e.replace;
      const entry = getVocabulary(stem);
      if (entry && (entry.partOfSpeech === 'verb' || entry.partOfSpeech === 'adjective')) {
        return stem;
      }
      
      // Irregular: ㅂ-irregular adjectives/verbs (e.g. 부드러워 -> 부드럽다)
      if (e.suffix === '워' || e.suffix === '웠다' || e.suffix === '워요' || e.suffix === '웠습니다') {
        const stemB = word.slice(0, -e.suffix.length) + 'ㅂ다';
        const entryB = getVocabulary(stemB);
        if (entryB) return stemB;
      }

      // Irregular: ㄹ-irregular verbs/adjectives (e.g. 만드는 -> 만들다, 부푸는 -> 부풀다)
      if (e.suffix === '는' || e.suffix === 'ㄴ') {
        const stemL = word.slice(0, -e.suffix.length) + 'ㄹ다';
        const entryL = getVocabulary(stemL);
        if (entryL) return stemL;
      }
    }
  }

  // Modifiers ending in single character suffixes
  if (word.endsWith('ㄴ')) {
    const stem = word.slice(0, -1) + '다';
    const entry = getVocabulary(stem);
    if (entry && (entry.partOfSpeech === 'verb' || entry.partOfSpeech === 'adjective')) return stem;
  }
  if (word.endsWith('은')) {
    const stem = word.slice(0, -2) + '다';
    const entry = getVocabulary(stem);
    if (entry && (entry.partOfSpeech === 'verb' || entry.partOfSpeech === 'adjective')) return stem;
  }
  if (word.endsWith('ㄹ')) {
    const stem = word.slice(0, -1) + '다';
    const entry = getVocabulary(stem);
    if (entry && (entry.partOfSpeech === 'verb' || entry.partOfSpeech === 'adjective')) return stem;
  }
  if (word.endsWith('을')) {
    const stem = word.slice(0, -2) + '다';
    const entry = getVocabulary(stem);
    if (entry && (entry.partOfSpeech === 'verb' || entry.partOfSpeech === 'adjective')) return stem;
  }

  return null;
}
