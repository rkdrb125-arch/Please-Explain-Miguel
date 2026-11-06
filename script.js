// Please Explain, Miguel — starter game logic
// Change the answer and question rules here when you build more cases.

const SECRET_ANSWER = "우산";
const questionRules = {
  indoor: { answer: "아니!", truth: false, line: "실내? 음… 밖에서 더 빛나는 물건이지!" },
  hand: { answer: "응!", truth: true, line: "당연하지! 손으로 들면 되는 거야. 아주 간단하군!" },
  rain: { answer: "응!", truth: true, line: "비와 관련이 있지! 비… 비라… 하하, 내가 힌트를 줬군!" },
  electric: { answer: "아니!", truth: false, line: "전기? 필요 없어! 난 전기 없이도 천재거든!" },
  fold: { answer: "응!", truth: true, line: "접을 수 있지! 아니, 꼭 접어야 하는 건 아니지만." },
  wear: { answer: "아니!", truth: false, line: "몸에 착용한다고? 글쎄, 머리에 얹을 순 있겠지만!" }
};

let questionCount = 0;
let finished = false;

const countEl = document.querySelector("#question-count");
const lineEl = document.querySelector("#miguel-line");
const feedbackEl = document.querySelector("#feedback");
const statusEl = document.querySelector("#case-status");
const questionButtons = [...document.querySelectorAll(".question-button")];

function updateCount() {
  countEl.textContent = String(questionCount).padStart(2, "0");
}

function askQuestion(key, button) {
  if (finished || questionCount >= 20 || button.disabled) return;
  const rule = questionRules[key];
  questionCount += 1;
  updateCount();
  lineEl.textContent = rule.line;
  feedbackEl.textContent = `미겔: "${rule.answer}"`;
  button.disabled = true;

  if (questionCount >= 20) {
    finishGame(false, "질문을 모두 사용했어. 미겔은 어째선지 뿌듯해 보인다.");
  }
}

function finishGame(won, message) {
  finished = true;
  statusEl.textContent = won ? "CASE SOLVED" : "CASE CLOSED";
  lineEl.textContent = won
    ? "하하하! 역시 내 설명이 훌륭했기 때문이지!"
    : "이럴 수가… 내 설명이 너무 완벽했던 모양이군!";
  feedbackEl.textContent = message;
  questionButtons.forEach(button => button.disabled = true);
}

questionButtons.forEach(button => {
  button.addEventListener("click", () => askQuestion(button.dataset.question, button));
});

function submitGuess() {
  if (finished) return;
  const input = document.querySelector("#guess-input");
  const guess = input.value.trim();
  if (!guess) {
    feedbackEl.textContent = "정답을 입력해 줘!";
    return;
  }
  if (guess === SECRET_ANSWER) {
    finishGame(true, "정답! 미겔이 생각한 물건은 우산이었어. 사건 해결!");
  } else {
    feedbackEl.textContent = `“${guess}”? 미겔은 고개를 갸웃했다. 아직 정답이 아닌 것 같아.`;
    lineEl.textContent = "아니야! 조금 더 생각해 보라고!";
  }
}

document.querySelector("#guess-button").addEventListener("click", submitGuess);
document.querySelector("#guess-input").addEventListener("keydown", event => {
  if (event.key === "Enter") submitGuess();
});
document.querySelector("#start-button").addEventListener("click", () => {
  document.querySelector("#game").scrollIntoView({ behavior: "smooth" });
});
document.querySelector("#sound-toggle").addEventListener("click", event => {
  const button = event.currentTarget;
  const enabled = button.getAttribute("aria-pressed") !== "true";
  button.setAttribute("aria-pressed", String(enabled));
  button.textContent = enabled ? "SOUND: ON*" : "SOUND: OFF";
  feedbackEl.textContent = enabled
    ? "사운드 기능은 아직 준비 중이야."
    : "사운드가 꺼졌어.";
});
updateCount();
