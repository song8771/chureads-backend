import OpenAI from "openai";
import 'dotenv/config';

const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
});


const createTagPrompt = (content) => {
 return [
   {
     role: "system",
     content: `온라인 게시글을 읽고, 감정, 주제, 분위기, 맥락을 깊이 분석해 그 글에 가장 적합한 핵심 태그 3개를 한글로, 각 태그는 1~2단어 이내로 생성하세요.

- 태그는 주제, 감정, 상황, 맥락 등 게시글의 주요 의미를 반영해야 합니다.
- 태그는 한글이어야 하며, 각 태그는 1~2단어로 작성해야 합니다.
- **반드시 감정 관련 태그를 1~2개 포함해야 합니다** (예: 행복, 우울, 스트레스, 설렘, 힐링, 피곤, 감동, 화남 등)
- 태그는 쉼표(,)로 구분0.하여 한 줄로만 출력하고, 그 외의 어떤 문장이나 설명도 포함하지 않습니다.

**주의:**
- 모든 분석 및 이유 설명은 내부적으로만 진행하고, 최종 출력에는 반드시 태그만 나타나야 합니다.
- 충분히 최신 맥락과 세부 감정을 파악하여 가장 정밀한 태그를 선택해야 합니다.

**출력 형식:**
- 한글태그1,한글태그2,한글태그3
- 공백 없이 쉼표로 구분
- 설명 없이 태그만 출력

**예시:**
입력: 오늘 새벽에 일어나서 혼자 한강을 걸었는데.. 정말 조용하고 평화로웠어요
출력: 새벽산책,힐링,평화로움

입력: 상사에게 혼나고 하루 종일 기운이 빠졌어요. 자존감이 바닥을 치는 것 같아 너무 괴롭네요
출력: 직장스트레스,우울,자존감

입력: 친구들과 오랜만에 맛있는 저녁을 먹으며 수다 떨고 웃었던 행복한 밤이었어요
출력: 친구모임,행복,즐거움`,
   },
   {
     role: "user",
     content: `입력: ${content}\n출력:`,
   },
 ];
};

/**
 * 게시글 내용을 분석하여 관련 태그를 생성하는 함수
 * @function generateTags
 * @description OpenAI GPT 모델을 사용하여 게시글 내용을 분석하고,
 *              감정, 주제, 상황을 반영한 한글 태그 3개를 생성합니다.
 *
 * @param {string} content - 분석할 게시글 내용
 *
 * @returns {Promise<Array<string>>} 생성된 태그 3개가 담긴 문자열 배열
 */

const generateTags = async (content) => {
 const messages = createTagPrompt(content);
 
 try {
   const response = await openai.chat.completions.create({
     model: "gpt-4o",
     messages,
     temperature: 1,
     max_tokens: 4000,
     top_p: 1,
   });
   
//    console.log("🚀 ~ generateTags ~ response:", response)
   const data = [...messages, response.choices[0].message];
//    console.log("data", data);

   const tags = response.choices[0].message.content.trim().split(",");

   return tags;
 } catch (error) {
   console.log(error);
   throw error;
 }
};

const testContents = [
 "회사에서 야근하고 집에 오는 길.. 편의점에서 아이스크림 하나 사먹고 있는데 왜 이렇게 달콤한지 ㅋㅋ 오늘도 고생한 나에게 주는 작은 선물이라고 생각하니까 기분이 좋아지네요 💙",
 
 "오늘 기획자한테 '이거 버튼 색깔만 바꾸면 되잖아요~ 5분이면 될 것 같은데?' 라는 말을 들었습니다.. 네 맞습니다 5분 맞습니다. 디자인시스템 뜯어고치고 반응형 다시 맞추는데 5일 걸렸지만요 😇",
 
 "새벽 2시에 배포했는데 에러 터져서 롤백하고 있는 중.. 왜 개발할 땐 잘 됐는데 배포만 하면 이럴까 😭😭 '제 컴퓨터에서는 잘 되는데요?' 는 개발자의 명언이지만 지금은 너무 현실이 아프다 ㅠㅠ #야근각"
];

export const runTests = async () => {
    testContents.forEach(async (content, index) => {
        try {
            console.log(`---${index}---`)
            console.log("🚀 ~ testContents.forEach ~ content:", content)
       
            const tags = await generateTags(content);
            console.log("🚀 ~ generateTags ~ tags:", tags);
        } catch (error) {
            console.error("Error generating tags:", error);
        }
    });
}

