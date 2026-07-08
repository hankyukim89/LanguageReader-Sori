/** Preferred Korean voices, ordered by quality (best first). */
const PREFERRED_VOICES = [
  'Google 한국의',       // Chrome's high-quality Korean voice
  'Yuna',               // macOS/iOS premium Korean voice
  'Sora',               // macOS/iOS Korean voice
  'Naver',              // Naver-provided voices
  'Microsoft Heami',    // Edge high-quality Korean voice
  'Microsoft SunHi',    // Edge Korean voice
];

let cachedVoice: SpeechSynthesisVoice | null = null;
let voicesLoaded = false;

function findBestKoreanVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return null;

  // Filter to only Korean voices
  const koreanVoices = voices.filter(v => v.lang.startsWith('ko'));
  if (koreanVoices.length === 0) return null;

  // Try preferred voices in order
  for (const preferred of PREFERRED_VOICES) {
    const match = koreanVoices.find(v => v.name.includes(preferred));
    if (match) return match;
  }

  // Prefer non-local (network/cloud) voices — they tend to sound much better
  const remoteVoice = koreanVoices.find(v => !v.localService);
  if (remoteVoice) return remoteVoice;

  // Fall back to first available Korean voice
  return koreanVoices[0];
}

function getKoreanVoice(): SpeechSynthesisVoice | null {
  if (!voicesLoaded || !cachedVoice) {
    cachedVoice = findBestKoreanVoice();
    voicesLoaded = cachedVoice !== null;
  }
  return cachedVoice;
}

// Voices may load asynchronously — cache when ready
if ('speechSynthesis' in window) {
  window.speechSynthesis.addEventListener?.('voiceschanged', () => {
    cachedVoice = findBestKoreanVoice();
    voicesLoaded = true;
  });
  // Trigger initial load
  window.speechSynthesis.getVoices();
}

export function speakKorean(text: string): void {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ko-KR';
  utterance.rate = 0.88;

  const voice = getKoreanVoice();
  if (voice) utterance.voice = voice;

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  window.speechSynthesis?.cancel();
}
