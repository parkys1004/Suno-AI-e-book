import { Chapter } from '../types';

export const appendix: Chapter = {
  id: "appendix",
  title: "부록: 필수 체크리스트",
  subTitle: "Secret Hacks & Templates",
  content: [
    {
      id: "appendix-1",
      title: "프롬프트 템플릿 & 체크리스트",
      items: [
        "👨‍🍳 **Suno AI 장르별 황금 프롬프트 모음**\n\nSuno AI에서 바로 복사해서 사용할 수 있는 **장르별 검증된 프롬프트(스타일 명령어)**를 정리해 드립니다.\n\n이 프롬프트들은 소스 자료에서 언급된 **GMIV 공식(장르, 분위기, 악기, 보컬)**과 **고퀄리티 키워드**를 조합하여 최적화한 것입니다. **[Custom Mode]**의 **Style of Music** 칸에 그대로 붙여넣으시면 됩니다.",
        "🎵 **1. 팝 / K-Pop (대중성 & 중독성)**\n\n대중적인 멜로디와 신나는 비트를 강조하여, 아이돌 음악이나 틱톡 챌린지용 음악을 만들 때 적합합니다.\n\n*   **추천 프롬프트 (복사해서 사용):**\n    > **(Masterpiece), (Best Quality), K-Pop, Future Bass, Electronic Pop, Upbeat, Energetic, Catchy Hook, Bouncy, Heavy 808 bass, Synthesizer leads, Trap beats, Finger snaps, Female group vocals, Auto-tuned, High-pitched, Dynamic changes**\n\n*   **💡 핵심 포인트:**\n    *   `Catchy Hook`과 `Earworm` 키워드를 넣으면 중독성 있는 후렴구가 생성될 확률이 높습니다.\n    *   가사 입력 시 `[Rap Breakdown]`이나 `[Dance Break]` 같은 메타태그를 활용하면 K-Pop 특유의 구성을 살릴 수 있습니다.",
        "☕ **2. 재즈 / Lo-Fi (카페 & 공부 배경음악)**\n\n가사가 없거나 최소화된 편안한 분위기로, 유튜브 플레이리스트나 공부할 때 듣기 좋은 사운드입니다.\n\n*   **추천 프롬프트 (복사해서 사용):**\n    > **(High Fidelity Recording), Lo-Fi Hip Hop, Chillhop, Downtempo, Jazz Piano, Nostalgic, Relaxing, Cozy, Mellow, Vinyl crackle, Soft piano, Dusty drum loops, Jazzy saxophone, Ambient noise, Warm tone, Slow tempo**\n\n*   **💡 핵심 포인트:**\n    *   `Vinyl crackle`(LP 잡음)이나 `Dusty drum loops`를 추가하면 특유의 아날로그 질감이 살아납니다.\n    *   가사 없이 배경음악으로만 쓰고 싶다면 **[Instrumental]** 버튼을 켜거나, 가사 창에 `[Instrumental]`이라고 적어주세요.",
        "🎤 **3. 힙합 / R&B (그루브 & 소울)**\n\n세련된 비트와 감성적인 보컬이 어우러진 스타일로, 감각적인 브이로그 배경음악이나 감성 힙합에 적합합니다.\n\n*   **추천 프롬프트 (복사해서 사용):**\n    > **(Studio Quality), Modern R&B, Neo-soul, Boom Bap, Mellow groove, Rhodes piano, Upright bass, Layered percussion, Soulful male vocals, Conversational, Relaxed, Warm tone, Emotional phrasing, Smooth rhythms**\n\n*   **💡 핵심 포인트:**\n    *   `Rhodes piano`(로즈 피아노)와 `Upright bass` 조합은 R&B 특유의 따뜻하고 고급스러운 느낌을 줍니다.\n    *   보컬 스타일에 `Conversational`(대화하듯이)을 넣으면 랩과 노래 사이의 자연스러운 싱잉랩 느낌을 낼 수 있습니다.",
        "💎 **팁: 퀄리티를 2배 높이는 방법**\n\n프롬프트 맨 앞에 아래의 **'치트키 코드'**를 추가하면 음질과 악기 분리도가 향상되는 효과가 있습니다.\n\n*   **치트키 코드:**\n    > **(Masterpiece), (Best Quality), (High Fidelity Recording)**\n\n*   **참고:** 위 프롬프트들에는 이미 이 코드가 적용되어 있으니 그대로 복사해서 사용하시면 됩니다.",
        "✅ **수익화 런칭 체크리스트**\n\n**\"이 리스트의 체크박스가 모두 채워졌다면, 당신의 통장에 달러가 찍힐 준비가 끝난 것입니다.\"**\n\n음원을 유통사에 보내기 직전, 마지막으로 점검해야 할 필수 항목들을 정리했습니다. 꼼꼼하게 확인하고 클릭하여 체크(v) 하세요.\n\n✅ **1단계: 제작 (Production) - '팔릴 수 있는' 상태인가?**\n\n* **[ ] 음원 생성 및 구조 확인 (Composition)**\n    *   [ ] 곡의 기승전결(Intro - Verse - Chorus - Bridge - Outro)이 뚜렷한가?\n    *   [ ] 곡의 길이가 너무 짧지 않은가? (스트리밍 수익을 위해 최소 2분 이상 권장)\n    *   [ ] 프롬프트에 `[Chorus]`나 `[Verse]` 같은 메타태그가 정확히 적용되어 섹션이 구분되었는가?\n\n* **[ ] 가사 검수 및 발음 확인 (Lyrics check)**\n    *   [ ] AI가 뭉개거나 얼버무린(Mumble) 발음은 없는가?\n    *   [ ] \"Oh\", \"Yeah\" 같은 불필요한 추임새가 분위기를 깨지 않는가?\n    *   [ ] 가사의 라임(Rhyme)과 음절 수가 박자와 잘 맞아떨어지는가?\n\n* **[ ] 보컬 튜닝 및 부분 수정 (Vocal Tuning)**\n    *   [ ] 튀는 음이나 어색한 부분은 'In-painting(부분 수정)'이나 'Cover' 기능으로 교체했는가?\n    *   [ ] 목소리가 악기에 묻히지 않고 명확하게 들리는가?\n\n✅ **2단계: 편집 (Editing) - '프로'의 사운드인가?**\n\n* **[ ] Stem 분리 및 노이즈 제거 (Stem & Noise)**\n    *   [ ] 'Get Stems' 기능을 사용하여 보컬과 반주를 분리해 확인했는가?\n    *   [ ] 'Remove FX'를 사용하여 보컬 트랙의 과도한 리버브(잔향)를 제거하고 드라이(Dry)한 소스를 확보했는가?\n    *   [ ] AI 특유의 고주파 노이즈(Hiss)나 저음의 웅웅거림(Mud)을 EQ(이퀄라이저)로 깎아냈는가?\n\n* **[ ] 믹싱 밸런스 조정 (Mixing)**\n    *   [ ] 보컬이 반주보다 너무 작거나 크지 않은가?\n    *   [ ] 킥 드럼과 베이스가 서로 엉키지 않고 단단하게 들리는가?\n    *   [ ] 팬(Pan) 조절을 통해 악기들이 좌우로 적절히 배치되어 공간감이 느껴지는가?\n\n* **[ ] 마스터링 적용 여부 (Mastering)**\n    *   [ ] 최종 음원의 음압(Loudness)이 상업 음원 수준으로 충분히 큰가?\n    *   [ ] Suno의 'Remaster' 기능이나 외부 마스터링 툴(Landr, Ozone 등)을 통과시켰는가?\n    *   [ ] 최종 파일 포맷은 고음질 WAV 파일로 준비되었는가? (MP3 지양)\n\n✅ **3단계: 유통 (Distribution) - '반려'되지 않는가?**\n\n* **[ ] 앨범 커버 규격 준수 (Artwork)**\n    *   [ ] 이미지 해상도가 **3000 x 3000 픽셀** 이상인가? (필수)\n    *   [ ] 이미지가 흐릿하거나 픽셀이 깨지지 않고 선명한가? (업스케일링 권장)\n    *   [ ] 커버에 불필요한 텍스트, 로고, 웹사이트 주소, 가격표 등이 없는가?\n\n* **[ ] 메타데이터 정확성 (Metadata)**\n    *   [ ] **아티스트명(Artist Name)**이 기존에 등록한 이름과 철자, 대소문자까지 100% 일치하는가?\n    *   [ ] 곡 제목에 유명 가수의 이름이나 상표권 침해 소지가 있는 단어가 없는가?\n    *   [ ] AI 생성 여부를 묻는 항목에 솔직하게 체크했는가? (투명성 정책 준수)\n\n* **[ ] 발매일 및 추가 설정 (Scheduling)**\n    *   [ ] **발매일(Release Date)**을 최소 2주 뒤로 설정했는가? (스포티파이 피칭용)\n    *   [ ] 유튜브 콘텐츠 ID(YouTube Content ID) 등록 여부를 신중히 결정했는가? (추가 비용 발생 주의)\n    *   [ ] 가사에 욕설이나 선정적인 내용이 있다면 'Explicit(19금)' 체크를 했는가?\n\n---\n\n**[모든 체크가 끝났다면?]**\n축하합니다. 이제 **[Submit]** 버튼을 누르세요.\n당신의 음악이 전 세계로 퍼져나가는 순간입니다. 첫 정산금이 들어오는 그날까지, 멈추지 말고 계속 만드세요 (Keep Creating)!"
      ]
    },
    {
      id: "appendix-2",
      title: "Suno Studio: Stem 추출(Track 분리) 완벽 가이드",
      items: [
        "🛠️ **1. 기능 접근 및 실행 방법**\n\nSuno Studio 타임라인에서 분리하고 싶은 오디오 클립을 선택한 후, 다음 절차를 따르세요.\n\n*   **클립 선택:** 타임라인에 있는 노래나 오디오 클립의 상단을 클릭\n*   **메뉴 진입:** 우측 설정 패널의 **[Clip]** 탭 하단 확인 또는 클립 **우클릭**\n*   **실행:** 메뉴에서 **'Extract Stems'** 버튼 클릭",
        "🎛️ **2. 추출 옵션 선택**\n\n목적에 따라 두 가지 옵션 중 하나를 선택하세요.\n\n*   **All Detected Stems (모든 악기 분리):**\n    *   보컬, 드럼, 베이스, 기타 등 **감지되는 모든 악기**를 개별 트랙으로 분리합니다.\n    *   **용도:** 정밀한 믹싱, 특정 악기(예: 드럼) 제거 및 교체\n\n*   **Vocals & Instrumental (보컬/반주 분리):**\n    *   곡을 **목소리**와 **나머지 반주(MR)** 딱 두 개로만 나눕니다.\n    *   **용도:** 크레딧 절약, 단순 MR 제작, 리믹스용 보컬 확보",
        "📥 **3. 프로젝트 적용 (Insert All)**\n\n*   스템 생성이 완료되면 **[Insert All]** 버튼이 나타납니다.\n*   버튼을 클릭하면 분리된 모든 트랙이 **현재 타임라인에 자동으로 추가**됩니다.",
        "💡 **4. 활용 팁 (Pro Tip)**\n\n*   **🔇 특정 소리 제거:** 마음에 들지 않는 악기(예: 찢어지는 드럼) 트랙만 **삭제(Delete)**하거나 볼륨을 줄이세요.\n*   **🎚️ 리믹스 및 편곡:** 보컬 트랙만 남기고 다른 악기를 새로 생성(Cover)하여 입히거나 패턴을 변경해보세요.\n*   **🎧 S/M 버튼 활용:** **S(Solo)**로 특정 소리만 집중해서 듣거나, **M(Mute)**로 특정 소리를 끄며 밸런스를 확인하세요."
      ]
    },
    {
      id: "appendix-3",
      title: "Suno AI 실험실: 매시업(Mashup) 가이드",
      items: [
        "🧪 **Suno AI 매시업(Mashup) 기능이란?**\n\nSuno AI의 **매시업(Mashup)** 기능은 서로 다른 두 곡의 스타일과 요소를 결합하여 완전히 새로운 곡을 창조하는 실험적인 기능입니다. 이 기능을 사용하면 발라드와 힙합을 섞거나, 서로 다른 분위기의 곡을 하나로 합치는 창의적인 시도가 가능합니다.",
        "🚀 **1. 매시업 기능 실행하기**\n\n매시업을 시작하는 방법은 크게 두 가지가 있습니다.\n\n*   **방법 A (메뉴 이용):** 라이브러리에서 원하는 곡(Song A)의 **점 세 개(...)** 메뉴를 클릭한 후, **[Remix/Edit]** -> **[Mashup]**을 선택합니다.\n*   **방법 B (드래그 앤 드롭):** **[Create]** 탭의 리믹스 영역으로 원하는 곡을 드래그한 후, 모드 선택 옵션에서 **[Mashup]**을 선택합니다.",
        "🎵 **2. 곡 선택 (Song A & Song B)**\n\n매시업은 기본적으로 두 개의 곡을 섞는 과정입니다.\n\n*   **Song A:** 처음 선택하거나 드래그하여 넣은 곡이 기준이 되는 'Song A'가 됩니다.\n*   **Song B:** Song A가 선택된 상태에서 **[Add another song to mashup]** 버튼을 눌러 섞을 두 번째 곡을 추가합니다.\n    *   **My Library:** 내가 만든 곡 중에서 선택할 수 있습니다.\n    *   **Everything:** Suno에 공개된 곡 중 리믹스가 허용된 다른 사용자의 곡도 선택하여 섞을 수 있습니다.",
        "🎛️ **3. 세부 설정 (가사, 스타일, 오디오)**\n\n두 곡을 선택했다면, 이 둘을 어떻게 배합할지 결정해야 합니다.\n\n*   **① 가사(Lyrics) 설정**\n    *   **Use lyrics from Song B:** Song B의 가사를 사용합니다.\n    *   **Keep current lyrics:** Song A의 가사를 그대로 유지합니다.\n    *   **Mash up lyrics:** 두 곡의 가사를 Suno가 섞어서 새로운 조합을 만듭니다. **[Mash up lyrics]** 버튼을 누를 때마다 가사의 배열이 무작위로 바뀝니다.\n\n*   **② 스타일(Style) 설정**\n    *   **빈칸으로 두기:** 입력창을 비워두면 Suno가 두 곡의 스타일을 분석하여 평균적인 느낌으로 자동 혼합합니다.\n    *   **직접 입력:** 특정 장르(예: Rock, EDM) 쪽으로 더 기울기를 원한다면, 해당 스타일 프롬프트를 직접 입력하여 방향성을 제시할 수 있습니다.\n\n*   **③ 오디오 반영도(Audio Influence) 조절**\n    *   **수치를 높일 경우:** 원곡들(Song A, B)의 실제 오디오 느낌을 더 많이 유지합니다.\n    *   **수치를 낮출 경우:** 원곡의 느낌보다는 Suno가 새롭게 생성하고 창조하는 비중이 더 커집니다.",
        "✨ **4. 생성하기 (Create)**\n\n모든 설정이 완료되면 **[Create]** 버튼을 눌러 매시업을 생성합니다.\n\n*   **주의사항:** 현재 이 기능은 베타 버전이므로 예상치 못한 독특하고 실험적인 결과물이 나올 수 있습니다. 다양한 조합을 시도해보세요!"
      ]
    },
    {
      id: "appendix-4",
      title: "Suno AI 시크릿: 단축키 & 히든 커맨드",
      items: [
        "⌨️ **1. Suno Studio 필수 단축키 (작업 속도 2배 향상)**\n\nSuno Studio(웹 DAW 환경)에서 마우스 클릭을 줄여주는 필수 단축키입니다.\n\n*   **자르기 (Split):** `Ctrl + E` (Mac: `Cmd + E`)\n    *   선택한 오디오 클립을 현재 재생 헤드 위치에서 자릅니다. 불필요한 구간을 잘라내거나 편곡을 바꿀 때 가장 많이 사용합니다.\n*   **실행 취소 (Undo):** `Ctrl + Z` (Mac: `Cmd + Z`)\n    *   실수로 잘라내거나 이동한 작업을 즉시 되돌립니다.\n*   **삭제 (Delete):** `Delete` 키\n    *   선택한 클립이나 트랙을 제거합니다.\n*   **복제 (Duplicate):** `Alt + 드래그` (또는 트랙 메뉴에서 Duplicate)\n    *   클립을 복사하여 반복되는 루프를 만들거나 트랙 전체를 복제하여 레이어링할 때 유용합니다. 일부 소스에서는 `Ctrl + D`로 언급되기도 합니다.\n*   **재생/일시정지:** `Space Bar`\n    *   가장 기본적인 재생 및 정지 기능입니다.",
        "🤫 **2. 히든 커맨드 & 프롬프트 해킹 (퀄리티 및 제어)**\n\n공식 버튼에는 없지만, 텍스트 입력창에 특정 코드를 넣어 AI의 행동을 제어하는 고급 기술입니다.\n\n*   **① 'Max Mode' (음질 강제 향상 코드)**\n    *   **Style 입력창 최상단:**\n        > `(Masterpiece), (Best Quality), (High Fidelity Recording), (Studio Quality)`\n    *   **Lyrics 입력창 최상단:**\n        > `[///*****///]`\n    *   **효과:** 악기 분리도가 좋아지고 노이즈가 감소하며, 보컬과 악기가 더 선명해지는 효과가 있습니다.\n\n*   **② 'Mumble Mode' (가사 없는 멜로디 생성)**\n    *   **가사 입력창:** `[Mumble]` 또는 `(mumble) a a a`\n    *   **효과:** AI가 구체적인 단어 대신 흐얼거리는 소리로 노래를 불러, 작곡가가 멜로디 작업에만 집중할 수 있게 해줍니다.\n\n*   **③ 부정 프롬프트 (Exclude Styles)**\n    *   **스타일 입력창:** `[Exclude Styles: Drums, Male Vocals]`\n    *   **효과:** 특정 악기나 보컬 성별을 배제하여 더 깨끗한 결과물을 얻을 수 있습니다.",
        "🎛️ **3. 메타태그(Metatags)를 이용한 연출 제어**\n\n가사 입력창에 대괄호 `[ ]`를 사용하여 곡의 구조와 연출을 지시하는 명령어입니다.\n\n*   **[Spoken Word] / [Narration]:** 노래가 아닌 내레이션이나 대사 톤으로 말하게 합니다.\n*   **[Silence] / [Break] / [Stop]:** 모든 악기가 멈추는 브레이크 구간을 만듭니다. 극적인 효과를 줄 때 유용합니다.\n*   **[Instrumental Solo] / [Guitar Solo]:** 특정 악기의 독주 구간을 강제합니다.\n*   **[Big Finish] / [Fade Out]:** 곡의 엔딩 방식을 지정합니다.\n*   **태그 스택(Stacking):** 여러 명령어를 한 번에 쌓아서 복합적인 연출을 합니다.\n    *   *예시:* `[Bridge]`, `[Build up]`, `[Heavy Drums]`를 줄바꿈으로 연달아 입력.",
        "🚀 **4. 숨겨진 기능 활용 꿀팁**\n\n*   **Remove FX (드라이 소스 만들기):**\n    *   Suno Studio에서 트랙을 우클릭하고 **[Remove FX]**를 선택하면, AI가 생성한 리버브(에코)를 제거하고 깔끔한 원음(Dry)만 남겨줍니다. 외부 믹싱을 할 때 매우 유용합니다.\n*   **오디오 퀀타이즈 (Quantize):**\n    *   생성된 오디오의 박자가 미묘하게 나갔을 때, Studio에서 클립을 더블 클릭하고 **[Quantize]** 버튼을 누르면 자동으로 박자를 그리드(1/8, 1/16 등)에 맞춰줍니다.\n*   **가사 부분 수정 (In-painting):**\n    *   전체 곡을 다시 만들 필요 없이, 틀린 가사 부분만 드래그하여 **[Replace Lyrics]** 기능을 쓰면 해당 부분의 보컬만 감쪽같이 수정됩니다.\n*   **BPM 고정:**\n    *   프롬프트에 `128 BPM`처럼 구체적인 숫자를 명시하면, AI가 해당 템포를 따를 확률이 매우 높아집니다."
      ]
    }
  ]
};