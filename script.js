// All 30 questions (same data as your Python version)
const ALL_QUESTIONS = [
  {q: "Which is the cleanest city of India?", a: "indore", options: ["indore","mysuru","pune","bhopal"]},
  {q: "What is the capital of England?", a: "london", options: ["london","bristol","sheffield","newcastle"]},
  {q: "Who is the president of India?", a: "draupadi murmu", options: ["meira kumar","sushma swaraj","draupadi murmu","nirmala sitharaman"]},
  {q: "Which team recently won the 2024 T20 World Cup?", a: "india", options: ["south africa","india","sri lanka","bangladesh"]},
  {q: "What is India's global position in defence systems?", a: "4", options: ["3","7","8","4"]},
  {q: "Which is the smallest country in the world?", a: "vatican city", options: ["tuvalu","vatican city","palau","andorra"]},
  {q: "Which is the largest state of India?", a: "rajasthan", options: ["rajasthan","madhya pradesh","maharashtra","uttar pradesh"]},
  {q: "Which bird can't fly?", a: "kiwi", options: ["kiwi","ostrich","emu","cassowary"]},
  {q: "Which is the no1. country in terms of advanced medical science?", a: "italy", options: ["switzerland","south korea","italy","sweden"]},
  {q: "Name the science institute established by J.C. Bose?", a: "bosu biggan mandir", options: ["bose innovation centre","bosu biggan mandir","kolkata science forum","bose experimental lab"]},
  {q: "Who wrote the national anthem of India?", a: "rabindranath tagore", options: ["bankim chandra chatterjee","kazi nazrul islam","lala lajpat rai","rabindranath tagore"]},
  {q: "Which planet is known as the Red Planet?", a: "mars", options: ["mars","venus","jupiter","saturn"]},
  {q: "What is the largest ocean in the world?", a: "pacific ocean", options: ["pacific ocean","atlantic ocean","indian ocean","arctic ocean"]},
  {q: "Who invented the telephone?", a: "alexander graham bell", options: ["thomas edison","alexander graham bell","nikola tesla","guglielmo marconi"]},
  {q: "Which is the longest river in the world?", a: "nile", options: ["nile","amazon","yangtze","mississippi"]},
  {q: "What is the currency of Japan?", a: "yen", options: ["yen","won","yuan","baht"]},
  {q: "Who painted the Mona Lisa?", a: "leonardo da vinci", options: ["leonardo da vinci","pablo picasso","vincent van gogh","claude monet"]},
  {q: "Which country is known as the Land of the Rising Sun?", a: "japan", options: ["japan","china","south korea","thailand"]},
  {q: "What is the hardest natural substance?", a: "diamond", options: ["diamond","gold","platinum","ruby"]},
  {q: "Who discovered gravity?", a: "isaac newton", options: ["isaac newton","galileo galilei","nikola tesla","albert einstein"]},
  {q: "Which physicist developed the theory of general relativity?", a: "albert einstein", options: ["albert einstein","isaac newton","nikola tesla","stephen hawking"]},
  {q: "What is the only country in the world to have a non-rectangular flag?", a: "nepal", options: ["nepal","bhutan","switzerland","vatican city"]},
  {q: "Which element has the highest electrical conductivity?", a: "silver", options: ["silver","copper","gold","aluminum"]},
  {q: "Who was the first woman to win a Nobel Prize?", a: "marie curie", options: ["marie curie","dorothy hodgkin","irene joliot-curie","lise meitner"]},
  {q: "Which ancient civilization built Machu Picchu?", a: "inca", options: ["inca","maya","aztec","olmec"]},
  {q: "What is the smallest bone in the human body?", a: "stapes", options: ["stapes","femur","tibia","fibula"]},
  {q: "Which mathematician is known as the 'Prince of Mathematicians'?", a: "carl friedrich gauss", options: ["carl friedrich gauss","leonhard euler","riemann","laplace"]},
  {q: "Which is the deepest known point in Earth's oceans?", a: "mariana trench", options: ["mariana trench","tonga trench","kuril trench","philippine trench"]},
  {q: "Who wrote the play 'Waiting for Godot'?", a: "samuel beckett", options: ["samuel beckett","eugene ionesco","harold pinter","arthur miller"]},
  {q: "Which country was formerly known as Abyssinia?", a: "ethiopia", options: ["ethiopia","eritrea","somalia","djibouti"]}
];

// quiz config
const TOTAL_QUESTIONS = 10;

let quizQuestions = [];
let currentIndex = 0;
let score = 0;
let summary = []; // record {q, given, correct, points}

const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');

const qNumEl = document.getElementById('q-num');
const qTotalEl = document.getElementById('q-total');
const qTextEl = document.getElementById('question-text');
const textAnswer = document.getElementById('text-answer');
const useOptionsBtn = document.getElementById('use-options');
const submitTextBtn = document.getElementById('submit-text');
const optionsBox = document.getElementById('options-box');
const optionsList = document.getElementById('options-list');
const submitOptionBtn = document.getElementById('submit-option');
const hideOptionsBtn = document.getElementById('hide-options');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');

const scoreEl = document.getElementById('score');

const finalScoreEl = document.getElementById('final-score');
const finalTotalEl = document.getElementById('final-total');
const finalPercentEl = document.getElementById('final-percent');
const summaryList = document.getElementById('summary-list');
const playAgainBtn = document.getElementById('play-again');

// helper: shuffle array copy
function pickRandomQuestions(all, count){
  const arr = all.slice();
  for(let i=arr.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, count);
}

function startQuiz(){
  quizQuestions = pickRandomQuestions(ALL_QUESTIONS, TOTAL_QUESTIONS);
  currentIndex = 0;
  score = 0;
  summary = [];
  document.getElementById('q-total').textContent = TOTAL_QUESTIONS;
  document.getElementById('numQs').textContent = TOTAL_QUESTIONS;
  scoreEl.textContent = score;
  startScreen.classList.add('hidden');
  resultScreen.classList.add('hidden');
  questionScreen.classList.remove('hidden');
  renderQuestion();
}

function renderQuestion(){
  const qObj = quizQuestions[currentIndex];
  qNumEl.textContent = currentIndex + 1;
  qTextEl.textContent = qObj.q;
  textAnswer.value = '';
  hideOptions();
  feedbackEl.classList.add('hidden');
  nextBtn.classList.add('hidden');
}

function showOptions(){
  const qObj = quizQuestions[currentIndex];
  optionsList.innerHTML = '';
  qObj.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-item';
    btn.type = 'button';
    btn.textContent = opt;
    btn.onclick = () => {
      // mark selected visually
      Array.from(optionsList.children).forEach(child => child.classList.remove('selected'));
      btn.classList.add('selected');
    };
    optionsList.appendChild(btn);
  });
  optionsBox.classList.remove('hidden');
}

function hideOptions(){
  optionsBox.classList.add('hidden');
  optionsList.innerHTML = '';
}

function sanitize(s){ return (s||'').trim().toLowerCase(); }

function submitTextAnswer(){
  const user = sanitize(textAnswer.value);
  const qObj = quizQuestions[currentIndex];
  const correct = sanitize(qObj.a);
  if(user.length===0){
    showFeedback('Please type an answer or use options.', 'wrong');
    return;
  }

  if(user === correct){
    score += 2;
    showFeedback('Absolutely correct ✅ (+2)', 'success');
    summary.push({ q: qObj.q, given: textAnswer.value.trim(), correct: qObj.a, points: 2 });
  } else if(user === 'opt++'){
    // user typed opt++ — show options instead
    showOptions();
    showFeedback('Options shown — choose one then click Submit Option.', 'info');
    return;
  } else {
    showFeedback(`Wrong ❌ — Correct: ${qObj.a}`, 'wrong');
    summary.push({ q: qObj.q, given: textAnswer.value.trim(), correct: qObj.a, points: 0 });
  }
  updateAfterAnswer();
}

function submitOptionAnswer(){
  const selected = Array.from(optionsList.children).find(c => c.classList.contains('selected'));
  if(!selected){
    showFeedback('Please select an option first.', 'wrong');
    return;
  }
  const chosen = sanitize(selected.textContent);
  const qObj = quizQuestions[currentIndex];
  const correct = sanitize(qObj.a);
  if(chosen === correct){
    score += 1; // option used → 1 point
    showFeedback('Correct ✅ (+1)', 'success');
    summary.push({ q: qObj.q, given: selected.textContent, correct: qObj.a, points: 1 });
  } else {
    showFeedback(`Wrong ❌ — Correct: ${qObj.a}`, 'wrong');
    summary.push({ q: qObj.q, given: selected.textContent, correct: qObj.a, points: 0 });
  }
  updateAfterAnswer();
}

function updateAfterAnswer(){
  scoreEl.textContent = score;
  nextBtn.classList.remove('hidden');
  // lock inputs until next: disable submit buttons
  submitTextBtn.disabled = true;
  submitOptionBtn.disabled = true;
  useOptionsBtn.disabled = true;
  document.getElementById('text-answer').disabled = true;
}

function showFeedback(msg, type){
  feedbackEl.classList.remove('hidden','success','wrong','info');
  feedbackEl.textContent = msg;
  if(type==='success'){ feedbackEl.classList.add('success'); }
  else if(type==='wrong'){ feedbackEl.classList.add('wrong'); }
  else { /* info uses default styling */ }
}

function nextQuestion(){
  // prepare next
  currentIndex++;
  // re-enable controls
  submitTextBtn.disabled = false;
  submitOptionBtn.disabled = false;
  useOptionsBtn.disabled = false;
  document.getElementById('text-answer').disabled = false;

  if(currentIndex >= quizQuestions.length){
    showResult();
  } else {
    renderQuestion();
  }
}

function showResult(){
  questionScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  finalScoreEl.textContent = score;
  const total = quizQuestions.length * 2;
  finalTotalEl.textContent = total;
  finalPercentEl.textContent = ((score/total)*100).toFixed(2);
  // fill summary
  summaryList.innerHTML = '';
  summary.forEach((s, idx) => {
    const div = document.createElement('div');
    div.innerHTML = `<strong>Q${idx+1}:</strong> ${s.q} <br>
      Your answer: <em>${s.given||'(no answer)'}</em> — Correct: <em>${s.correct}</em> — Points: <strong>${s.points}</strong>`;
    div.style.marginBottom = '8px';
    summaryList.appendChild(div);
  });
}

// event listeners
startBtn.addEventListener('click', startQuiz);
useOptionsBtn.addEventListener('click', () => { showOptions(); });
submitTextBtn.addEventListener('click', submitTextAnswer);
submitOptionBtn.addEventListener('click', submitOptionAnswer);
hideOptionsBtn.addEventListener('click', () => { hideOptions(); });
nextBtn.addEventListener('click', nextQuestion);
playAgainBtn.addEventListener('click', () => {
  startScreen.classList.remove('hidden');
  resultScreen.classList.add('hidden');
});


// small UX: enter submits text
textAnswer.addEventListener('keydown', function(e){
  if(e.key === 'Enter'){ e.preventDefault(); submitTextAnswer(); }
});
