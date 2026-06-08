const sections = ['abc','vogais','silaba','frases','ler','escrever','matematica','ingles'];

const mathTabsData = [
  {
    id: 'counting',
    label: 'Números e contagem',
    title: 'Números e contagem',
    note: 'Reconhecer, escrever e ordenar números de 1 a 10 com apoio visual.',
    lessons: [
      {
        type: 'recognize',
        question: 'Qual número é este?',
        visual: 4,
        answer: 4,
        options: [2, 4, 6],
        explain: 'Conte os objetos e escolha o numeral correto.'
      },
      {
        type: 'count',
        question: 'Quantos objetos há?',
        visual: 7,
        answer: 7,
        options: [6, 7, 8],
        explain: 'Conte um por um até chegar ao total.'
      },
      {
        type: 'order',
        question: 'Coloque a sequência em ordem.',
        sequence: [3, 1, 2],
        answer: [1, 2, 3],
        options: ['1, 2, 3', '3, 2, 1', '2, 1, 3'],
        explain: 'Os números vão do menor para o maior.'
      },
      {
        type: 'match',
        question: 'Associe a quantidade ao número.',
        visual: 5,
        answer: 5,
        options: [4, 5, 6],
        explain: 'Cinco objetos combinam com o número 5.'
      },
      {
        type: 'trace',
        question: 'Trace o número mostrado.',
        answer: 8,
        options: [6, 8, 9],
        explain: 'Olhe a forma do número e escolha o correto.'
      }
    ]
  },
  {
    id: 'operations',
    label: 'Adição e subtração',
    title: 'Adição e subtração simples',
    note: 'Somar e retirar objetos com imagens para aprender de forma lúdica.',
    lessons: [
      {
        type: 'add',
        question: '2 maçãs + 1 maçã = ?',
        left: 2,
        right: 1,
        answer: 3,
        options: [2, 3, 4],
        explain: 'Junte os dois grupos e conte tudo.'
      },
      {
        type: 'add',
        question: '3 bolas + 2 bolas = ?',
        left: 3,
        right: 2,
        answer: 5,
        options: [4, 5, 6],
        explain: 'Some os objetos dos dois lados.'
      },
      {
        type: 'sub',
        question: '5 estrelas - 1 estrela = ?',
        left: 5,
        right: 1,
        answer: 4,
        options: [3, 4, 5],
        explain: 'Comece com 5 e tire 1.'
      },
      {
        type: 'sub',
        question: '4 carros - 2 carros = ?',
        left: 4,
        right: 2,
        answer: 2,
        options: [1, 2, 3],
        explain: 'Retire dois objetos e conte o que sobra.'
      },
      {
        type: 'mix',
        question: 'Qual conta mostra 3 + 1?',
        answer: '3+1',
        options: ['2+2', '3+1', '4-1'],
        explain: 'Escolha a conta que significa juntar 3 com 1.'
      }
    ]
  },
  {
    id: 'shapes',
    label: 'Formas e conjuntos',
    title: 'Formas geométricas e conjuntos',
    note: 'Identificar, colorir, agrupar e classificar formas e objetos.',
    lessons: [
      {
        type: 'shape',
        question: 'Qual é o círculo?',
        answer: 'circle',
        options: ['circle', 'square', 'triangle'],
        explain: 'O círculo é redondo e não tem lados.'
      },
      {
        type: 'shape',
        question: 'Qual é o quadrado?',
        answer: 'square',
        options: ['rectangle', 'circle', 'square'],
        explain: 'O quadrado tem 4 lados iguais.'
      },
      {
        type: 'shape',
        question: 'Qual forma tem 3 lados?',
        answer: 'triangle',
        options: ['triangle', 'star', 'circle'],
        explain: 'O triângulo tem 3 lados.'
      },
      {
        type: 'group',
        question: 'Qual grupo tem mais objetos?',
        groups: [3, 5],
        answer: 5,
        options: [3, 5],
        explain: 'Compare os dois conjuntos e escolha o maior.'
      },
      {
        type: 'sort',
        question: 'Escolha o grupo de objetos iguais.',
        answer: 'same',
        options: ['same', 'mixed'],
        explain: 'Objetos iguais podem ser agrupados juntos.'
      }
    ]
  }
];

let mathTabIndex = 0;
let mathLessonIndex = 0;
let silabaScore = 0;

const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const vogais = ['A','E','I','O','U'];
const consoantes = ['B','C','D','F','G','H','J','L','M','N','P','Q','R','S','T','V','X','Z'];
const palavras = [
  { word: 'BALA', sound: 'BALA' },
  { word: 'BOLA', sound: 'BOLA' },
  { word: 'CASA', sound: 'CASA' }
];
const inglesWords = [
  { word: 'APPLE', pt: 'MAÇÃ' },
  { word: 'BALL', pt: 'BOLA' },
  { word: 'CAT', pt: 'GATO' }
];

function speak(text, lang = 'pt-BR') {
  if ('speechSynthesis' in window) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = 0.9;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }
}

function showSection(id) {
  document.querySelectorAll('.module').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelector(`.menu-btn[data-section="${id}"]`)?.classList.add('active');
}

function initMenu() {
  document.querySelectorAll('.menu-btn').forEach(btn => {
    btn.addEventListener('click', () => showSection(btn.dataset.section));
  });
  showSection('abc');
}

function renderABC() {
  const grid = document.getElementById('abcGrid');
  grid.innerHTML = letras.map(l => `<button class="letter-btn" data-letter="${l}">${l}</button>`).join('');
  grid.querySelectorAll('.letter-btn').forEach(btn => {
    btn.addEventListener('click', () => speak(btn.dataset.letter));
  });
}

function renderVogais() {
  const grid = document.getElementById('vogaisGrid');
  grid.innerHTML = vogais.map(v => `<button class="letter-btn" data-letter="${v}">${v}</button>`).join('');
  grid.querySelectorAll('.letter-btn').forEach(btn => {
    btn.addEventListener('click', () => speak(btn.dataset.letter));
  });
}

function fillSelect(id, items) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = items.map(i => `<option value="${i}">${i}</option>`).join('');
}

function initSilaba() {
  fillSelect('consonanteSelect', consoantes);
  fillSelect('vogalSelect', vogais);
  const out = document.getElementById('silabaOutput');
  document.getElementById('btnJuntar').onclick = () => {
    const c = document.getElementById('consonanteSelect').value;
    const v = document.getElementById('vogalSelect').value;
    out.textContent = c + v;
    document.getElementById('silabaFeedback').textContent = `Sílaba formada: ${c + v}`;
    silabaScore++;
    document.getElementById('silabaScore').textContent = silabaScore;
    speak(c + v);
  };
  document.getElementById('btnNext').onclick = () => showSection('frases');
}

function initFrases() {
  fillSelect('fraseConsonante', consoantes);
  fillSelect('fraseVogal', vogais);
  fillSelect('fraseSyllaba1', ['BA','CA','LA','MA','PA']);
  fillSelect('fraseSyllaba2', ['BA','LA','MA','SA','TA']);

  document.getElementById('btnSyllaba').onclick = () => {
    const c = document.getElementById('fraseConsonante').value;
    const v = document.getElementById('fraseVogal').value;
    document.getElementById('fraseSyllabaOutput').textContent = c + v;
    speak(c + v);
  };

  document.getElementById('btnWord').onclick = () => {
    const s1 = document.getElementById('fraseSyllaba1').value;
    const s2 = document.getElementById('fraseSyllaba2').value;
    document.getElementById('fraseWordOutput').textContent = `${s1} + ${s2}`;
    speak(s1 + s2);
  };

  document.getElementById('btnFraseNext').onclick = () => showSection('ler');
}

function initLer() {
  const container = document.getElementById('lerContainer');
  container.innerHTML = palavras.map((p, i) => `
    <button class="word-card" data-i="${i}">
      <div class="word-main">${p.word}</div>
      <div class="word-sub">Clique para ouvir</div>
    </button>
  `).join('');
  container.querySelectorAll('.word-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = palavras[Number(btn.dataset.i)];
      speak(item.sound);
    });
  });
  document.getElementById('btnLerNext').onclick = () => showSection('escrever');
}

function initEscrever() {
  const container = document.getElementById('escreverContainer');
  container.innerHTML = `
    <div class="write-card">
      <h3>Trace a letra A</h3>
      <div class="trace-letter">A</div>
      <p>Use o dedo ou o mouse para seguir o contorno.</p>
    </div>
    <div class="write-card">
      <h3>Trace a letra B</h3>
      <div class="trace-letter">B</div>
      <p>Repita o movimento com calma.</p>
    </div>
  `;
}

function mathSpeech(t) {
  speak(t);
}

function renderMathTabs() {
  const tabs = document.getElementById('mathStageTabs');
  tabs.innerHTML = mathTabsData.map((t, i) => `<button class="math-tab ${i === 0 ? 'active' : ''}" data-index="${i}">${t.label}</button>`).join('');
  tabs.querySelectorAll('.math-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.querySelectorAll('.math-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      mathTabIndex = Number(btn.dataset.index);
      mathLessonIndex = 0;
      renderMath();
    });
  });
}

function renderVisualCount(n, symbol = '•') {
  return Array.from({ length: n }).map(() => `<div class="math-chip">${symbol}</div>`).join('');
}

function shapeClass(name) {
  return `math-shape ${name}`;
}

function renderMath() {
  const tab = mathTabsData[mathTabIndex];
  const lesson = tab.lessons[Math.min(mathLessonIndex, tab.lessons.length - 1)];
  const container = document.getElementById('matematicaContainer');
  let visual = '';
  let optionsHtml = '';

  if (tab.id === 'counting') {
    if (lesson.type === 'order') {
      visual = `<div class="math-visual-row">${lesson.sequence.map(n => `<div class="math-chip">${n}</div>`).join('')}</div>`;
      optionsHtml = lesson.options.map(opt => `<button class="math-choice-btn" data-answer="${opt}">${opt}</button>`).join('');
    } else {
      visual = `<div class="math-visual-row">${renderVisualCount(lesson.visual)}</div>`;
      optionsHtml = lesson.options.map(opt => `<button class="math-choice-btn" data-answer="${opt}">${opt}</button>`).join('');
    }
  }

  if (tab.id === 'operations') {
    const leftVisual = renderVisualCount(lesson.left, '🍎');
    const rightVisual = renderVisualCount(lesson.right, lesson.type === 'sub' ? '➖' : '🍎');
    visual = `<div class="math-visual-row">${leftVisual}<div class="math-chip" style="background:#94a3b8">+</div>${rightVisual}</div>`;
    optionsHtml = lesson.options.map(opt => `<button class="math-choice-btn" data-answer="${opt}">${opt}</button>`).join('');
  }

  if (tab.id === 'shapes') {
    if (lesson.type === 'shape') {
      optionsHtml = lesson.options.map(opt => `<button class="math-choice-btn" data-answer="${opt}"><div class="${shapeClass(opt)}"></div><div class="math-mini-label">${opt}</div></button>`).join('');
      visual = `<div class="math-classroom-note">${lesson.explain}</div>`;
    } else if (lesson.type === 'group') {
      visual = `<div class="math-visual-row"><div>${renderVisualCount(lesson.groups[0], '🔴')}</div><div style="font-size:22px;font-weight:900;padding:0 8px;">vs</div><div>${renderVisualCount(lesson.groups[1], '🔵')}</div></div>`;
      optionsHtml = lesson.options.map(opt => `<button class="math-choice-btn" data-answer="${opt}">${opt}</button>`).join('');
    } else if (lesson.type === 'sort') {
      visual = `<div class="math-visual-row"><div>${renderVisualCount(3, '⭐')}</div><div>${renderVisualCount(3, '⭐')}</div></div>`;
      optionsHtml = lesson.options.map(opt => `<button class="math-choice-btn" data-answer="${opt}">${opt === 'same' ? 'Mesmos objetos' : 'Misturados'}</button>`).join('');
    }
  }

  container.innerHTML = `
    <div class="math-card">
      <div class="math-card-title">${tab.title}</div>
      <div class="math-classroom-note">${tab.note}</div>
      <div class="math-card-question">${lesson.question}</div>
      <div>${visual}</div>
      <div class="math-grid math-grid-3">${optionsHtml}</div>
      <div id="mathFeedback" class="feedback"></div>
      <div style="margin-top:12px;">
        <button class="matematica-btn" id="mathSpeak">🔊 Ouvir explicação</button>
        <button class="matematica-btn-confirm" id="mathNext">Próximo</button>
      </div>
    </div>
  `;

  document.getElementById('mathSpeak').onclick = () => mathSpeech(lesson.explain);

  container.querySelectorAll('.math-choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const fb = document.getElementById('mathFeedback');
      const val = btn.dataset.answer;
      const ok = String(lesson.answer) === String(val);
      fb.textContent = ok ? '✅ Muito bem!' : '❌ Tente novamente.';
      fb.style.color = ok ? '#16a34a' : '#dc2626';
      if (ok) {
        mathSpeech('Muito bem. ' + lesson.explain);
      } else {
        mathSpeech('Tente novamente.');
      }
    });
  });

  document.getElementById('mathNext').onclick = () => {
    if (mathLessonIndex < tab.lessons.length - 1) {
      mathLessonIndex++;
      renderMath();
    } else {
      mathLessonIndex = 0;
      mathTabIndex = (mathTabIndex + 1) % mathTabsData.length;
      const tabs = document.querySelectorAll('.math-tab');
      tabs.forEach(b => b.classList.remove('active'));
      if (tabs[mathTabIndex]) tabs[mathTabIndex].classList.add('active');
      renderMath();
    }
  };
}

function initIngles() {
  const container = document.getElementById('inglesContainer');
  container.innerHTML = inglesWords.map((w, i) => `
    <button class="word-card" data-i="${i}">
      <div class="word-main">${w.word}</div>
      <div class="word-sub">${w.pt}</div>
    </button>
  `).join('');
  container.querySelectorAll('.word-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = inglesWords[Number(btn.dataset.i)];
      speak(item.word, 'en-US');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  renderABC();
  renderVogais();
  initSilaba();
  initFrases();
  initLer();
  initEscrever();
  renderMathTabs();
  renderMath();
  initIngles();
});