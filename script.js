const $ = (id) => document.getElementById(id);
const screens = ["titleScreen","gameScreen","endingScreen"];
const answers = {
  person: ["아니. 아주 확실하게 아니야.","그건 살아 있는 게 아니지. 적어도 내가 알기론."],
  indoors: ["실내에서도 쓸 수 있지! 밖에서도 쓸 수 있고!","장소를 가리진 않아. 아주 자유로운 물건이지."],
  hand: ["응! 손으로 들 수 있어.","물론이지. 손이 있다면 말이야."],
  fold: ["접을 수 있어! 굉장한 기술이지.","응. 접히는 게 핵심이라고 할 수 있지."],
  rain: ["비와 관련이 있지! 비가 오면 아주 유용해.","당연하지! 하늘에서 물이 떨어지는 그 현상 말이야."],
  electric: ["아니. 전기 같은 건 필요 없어.","전기 없이도 충분히 제 역할을 해."],
  wear: ["몸에 입는 건 아니야.","착용하는 물건은 아니지. 아마도."],
  eat: ["먹는 건 아니야! 난 먹을 수 있을 것 같지만.","아니. 먹으면 곤란해질걸."],
  metal: ["일부 부품은 그럴 수도 있겠지?","꼭 금속일 필요는 없어."],
  sound: ["특별히 소리를 내는 물건은 아니야.","사용한다고 소리가 나진 않아."]
};
const known = {person:false,indoors:true,hand:true,fold:true,rain:true,electric:false,wear:false,eat:false,metal:false,sound:false};
let count = 0, asked = new Set(), introStep = 0, soundOn = false;
const introLines = [
  ["MIGUEL","후후… 드디어 내 지성을 시험할 때가 왔군! 질문은 스무 번까지 허락하지!"],
  ["DANIEL","네가 지성이라는 단어를 입에 올리는 게 제일 수상한데."],
  ["MIGUEL","질문은 예, 아니오로 대답할 수 있는 것만! 정답을 맞히면 네 승리다!"]
];
function showScreen(id){screens.forEach(s=>$(s).classList.toggle("active",s===id));}
function setDialogue(speaker,text){$("speakerName").textContent=speaker;$("dialogueText").textContent=text;}
function startGame(){count=0;asked.clear();introStep=0;$("questionCount").textContent="00";$("notes").value="";$("guessInput").value="";$("questionGrid").querySelectorAll("button").forEach(b=>{b.disabled=false;b.classList.remove("used")});setDialogue("MIGUEL",introLines[0][1]);$("nextDialogue").style.display="inline-block";showScreen("gameScreen");}
function nextIntro(){introStep++;if(introStep<introLines.length){setDialogue(...introLines[introStep]);}else{$("nextDialogue").style.display="none";setDialogue("MIGUEL","자, 질문해 봐! 내 완벽한 문제를 풀어 보라고!");}}
function ask(key,label){if(count>=20||asked.has(key))return;count++;asked.add(key);$("questionCount").textContent=String(count).padStart(2,"0");const btn=document.querySelector(`[data-q="${key}"]`);if(btn){btn.disabled=true;btn.classList.add("used");}let response;
 if(key==="custom"){const q=$("customQuestion").value.trim();if(!q)return;response=customAnswer(q);$("customQuestion").value="";label=q;}
 else {const correct=known[key];const variants=answers[key];response=variants[(count+key.length)%variants.length];if(key==="rain"||key==="fold"||key==="hand")response=variants[0];if(key==="person"||key==="electric"||key==="wear"||key==="eat")response=variants[0];}
 setDialogue("MIGUEL",`Q${count}. ${label}\n${response}`);
 if(count===20){setTimeout(()=>{if($("gameScreen").classList.contains("active"))setDialogue("DANIEL","스무 번 다 썼어. 이제 찍는 수밖에 없겠네…");},250);}
}
function customAnswer(q){const lower=q.toLowerCase();if(/우산|비|접|손|들/.test(lower))return "음… 그렇다고 할 수 있지! 질문이 꽤 날카로운데?";if(/사람|생명|살아/.test(lower))return "아니! 생명체는 아니야.";return ["그건 아주 심오한 질문이군… 내 대답은 예스!","아니라고 생각해. 아니, 잠깐. 그래도 되나?","좋은 질문이야! 정답에 가까워지고 있어!"][count%3];}
function endGame(win){showScreen("endingScreen");$("endingEyebrow").textContent=win?"CASE CLOSED — SUCCESS":"CASE CLOSED — FAILURE";$("endingSymbol").textContent=win?"✓":"?!";$("endingSymbol").style.color=win?"var(--lime)":"var(--pink)";$("endingTitle").textContent=win?"정답이다!":"그걸 틀린다고?";$("endingText").textContent=win?"다니엘은 정답을 맞혔다. 미겔은 자신이 훌륭한 선생님이었기 때문이라고 주장했다.":"다니엘의 추리는 어딘가로 향했지만, 정답에는 도착하지 못했다. 미겔은 설명을 더 잘했어야 한다는 사실만 빼고 전부 다니엘 탓으로 돌렸다.");}
function guess(){const val=$("guessInput").value.trim().replace(/\s/g,"").toLowerCase();if(!val){$("guessInput").focus();return;}if(["우산","umbrella"].includes(val))endGame(true);else{setDialogue("MIGUEL",`“${$("guessInput").value.trim()}”이라고? 하하! 아주 흥미로운 추리군! 하지만 정답은 아니야!`);$("guessInput").value="";}}
$("startBtn").addEventListener("click",startGame);$("nextDialogue").addEventListener("click",nextIntro);
$("questionGrid").addEventListener("click",e=>{const b=e.target.closest("button[data-q]");if(b)ask(b.dataset.q,b.textContent);});
$("customAsk").addEventListener("click",()=>ask("custom","직접 질문"));$("customQuestion").addEventListener("keydown",e=>{if(e.key==="Enter")ask("custom","직접 질문");});
$("guessBtn").addEventListener("click",guess);$("guessInput").addEventListener("keydown",e=>{if(e.key==="Enter")guess();});
$("giveUpBtn").addEventListener("click",()=>endGame(false));$("retryBtn").addEventListener("click",startGame);$("homeBtn").addEventListener("click",()=>showScreen("titleScreen"));$("homeLink").addEventListener("click",e=>{e.preventDefault();showScreen("titleScreen");});
$("soundToggle").addEventListener("click",()=>{soundOn=!soundOn;$("soundToggle").querySelector("span").textContent=soundOn?"ON":"OFF";});
