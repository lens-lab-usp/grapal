const journeyCatalog = [
  {
    "id": "anxiety",
    "title": "Ansiedade",
    "icon": "≈",
    "color": "#2f7165",
    "bg": "#dfece7",
    "description": "Observe preocupações, incerteza e tentativas repetidas de buscar certeza."
  },
  {
    "id": "depression",
    "title": "Sintomas depressivos",
    "icon": "☼",
    "color": "#c36b55",
    "bg": "#f6e3dd",
    "description": "Retome contato com atividades, pessoas e necessidades em passos pequenos."
  },
  {
    "id": "adhd",
    "title": "TDAH e funções executivas",
    "icon": "↗",
    "color": "#5e84a6",
    "bg": "#e1eaf2",
    "description": "Torne tarefas visíveis, reduza o primeiro passo e teste apoios para tempo e atenção."
  },
  {
    "id": "insomnia",
    "title": "Insônia",
    "icon": "◔",
    "color": "#746c8e",
    "bg": "#e9e5ef",
    "description": "Observe oportunidade de sono, horários, vigília e o que acontece ao tentar dormir."
  },
  {
    "id": "substances",
    "title": "Álcool e outras substâncias",
    "icon": "△",
    "color": "#b27a35",
    "bg": "#f3e7cc",
    "description": "Examine função, consequências e motivos pessoais para mudar, com foco em redução de danos."
  },
  {
    "id": "emotion",
    "title": "Regulação emocional e impulsividade",
    "icon": "∿",
    "color": "#c36b55",
    "bg": "#f6e3dd",
    "description": "Reconheça o espaço entre emoção, impulso e resposta."
  },
  {
    "id": "perfectionism",
    "title": "Perfeccionismo, autocrítica e procrastinação",
    "icon": "◇",
    "color": "#5e84a6",
    "bg": "#e1eaf2",
    "description": "Teste critérios de conclusão e primeiras versões possíveis."
  },
  {
    "id": "social",
    "title": "Ansiedade social",
    "icon": "◎",
    "color": "#2f7165",
    "bg": "#dfece7",
    "description": "Observe previsões, atenção e proteções excessivas em situações seguras."
  },
  {
    "id": "belonging",
    "title": "Adaptação e pertencimento",
    "icon": "⌂",
    "color": "#b27a35",
    "bg": "#f3e7cc",
    "description": "Encontre oportunidades viáveis de contato, reciprocidade e participação."
  },
  {
    "id": "body",
    "title": "Corpo e alimentação",
    "icon": "◒",
    "color": "#746c8e",
    "bg": "#e9e5ef",
    "description": "Observe regras, comparação e sofrimento sem transformar registro em controle de peso."
  },
  {
    "id": "ocd",
    "title": "Pensamentos intrusivos e compulsões",
    "icon": "↻",
    "color": "#2f7165",
    "bg": "#dfece7",
    "description": "Mapeie dúvida, resposta e alívio temporário; práticas autônomas requerem cautela."
  },
  {
    "id": "panic",
    "title": "Pânico",
    "icon": "!",
    "color": "#c36b55",
    "bg": "#f6e3dd",
    "description": "Entenda medo das sensações e mudanças na rotina após avaliar sintomas físicos."
  },
  {
    "id": "gambling",
    "title": "Apostas",
    "icon": "▦",
    "color": "#b27a35",
    "bg": "#f3e7cc",
    "description": "Reconheça riscos, tentativas de recuperar perdas e barreiras de proteção."
  },
  {
    "id": "grief",
    "title": "Luto",
    "icon": "◌",
    "color": "#746c8e",
    "bg": "#e9e5ef",
    "description": "Identifique o que está mais difícil e de que apoio você precisa."
  },
  {
    "id": "relationships",
    "title": "Relacionamentos, conflitos e limites",
    "icon": "⇄",
    "color": "#5e84a6",
    "bg": "#e1eaf2",
    "description": "Prepare pedidos e limites para situações em que conversar seja seguro."
  },
  {
    "id": "burnout",
    "title": "Sobrecarga e esgotamento acadêmico",
    "icon": "▤",
    "color": "#c36b55",
    "bg": "#f6e3dd",
    "description": "Diferencie demandas, recursos e o que pode ser reduzido ou negociado."
  },
  {
    "id": "digital",
    "title": "Telas, redes sociais e jogos digitais",
    "icon": "□",
    "color": "#2f7165",
    "bg": "#dfece7",
    "description": "Escolha um comportamento para mudar preservando estudo, lazer e vínculos."
  }
];

// Keep the original module positions so earlier notes and completion flags retain their meaning.
journeyCatalog.forEach(journey => {
  const expanded = window.GRAPAL_CONTENT?.[journey.id];
  if (!expanded?.modules?.length) throw new Error(`Conteúdo ausente: ${journey.id}`);
  Object.assign(journey, expanded, { available: true, status: "reviewed" });
  const minutes = journey.modules.reduce((sum, module) => sum + (parseInt(module.time, 10) || 5), 0);
  journey.time = `${journey.modules.length} etapas • ${minutes} min de leitura e registro`;
});

const focusOptions = [
  { id: "anxiety", icon: "≈", title: "Preocupação e tensão", subtitle: "Incerteza, antecipação, checagem" },
  { id: "depression", icon: "☼", title: "Desânimo ou afastamento", subtitle: "Pouco interesse, rotina difícil" },
  { id: "adhd", icon: "↗", title: "Começar e organizar", subtitle: "Tempo, atenção, tarefas" },
  { id: "insomnia", icon: "◔", title: "Sono", subtitle: "Adormecer, acordar, disposição" },
  { id: "substances", icon: "△", title: "Álcool ou outras substâncias", subtitle: "Função, consequências, mudança" },
  ...journeyCatalog.slice(5).map(journey => ({ id: journey.id, icon: journey.icon, title: journey.title, subtitle: journey.description }))
];

const goals = {
  anxiety: ["Agir sobre um problema concreto", "Reduzir checagens ou busca de certeza", "Enfrentar uma situação segura aos poucos"],
  depression: ["Retomar uma atividade pequena", "Voltar a falar com alguém", "Organizar ajuda para a rotina"],
  adhd: ["Começar uma tarefa", "Tornar prazos e etapas visíveis", "Testar um apoio para atenção ou tempo"],
  insomnia: ["Entender meu padrão de sono", "Criar uma âncora de horário viável", "Saber quando procurar avaliação"],
  substances: ["Entender melhor meu uso", "Reduzir um risco específico", "Avaliar meus motivos e opções de mudança"],
  emotion: ["Reconhecer emoção e impulso", "Criar uma pausa possível", "Reparar uma resposta que trouxe prejuízo"],
  perfectionism: ["Começar uma primeira versão", "Definir quando uma tarefa está pronta", "Responder à autocrítica de outro jeito"],
  social: ["Participar de uma conversa", "Observar o medo de julgamento", "Preparar uma aproximação segura"],
  belonging: ["Encontrar uma oportunidade de contato", "Lidar com uma mudança de fase", "Pedir apoio para uma barreira concreta"],
  body: ["Entender comparação e regras rígidas", "Reduzir a centralidade da aparência", "Organizar uma busca por cuidado"],
  ocd: ["Entender dúvidas e rituais", "Mapear o ciclo de alívio e repetição", "Preparar perguntas para uma avaliação"],
  panic: ["Compreender o medo das sensações", "Mapear o impacto das crises", "Organizar avaliação e apoio"],
  gambling: ["Entender o impulso de recuperar perdas", "Criar uma barreira de proteção", "Pedir ajuda para consequências financeiras"],
  grief: ["Entender como a perda aparece na rotina", "Identificar o apoio de que preciso", "Retomar uma parte possível da vida"],
  relationships: ["Preparar um pedido claro", "Estabelecer um limite", "Distinguir conflito de uma relação insegura"],
  burnout: ["Mapear demandas e recursos", "Negociar uma redução de carga", "Proteger descanso e apoio"],
  digital: ["Observar um padrão de uso", "Mudar um momento específico", "Preservar lazer e vínculos com menos prejuízo"]
};

const storageKey = "grapal-hub-v1";
const initialState = { completed: {}, notes: {}, scales: {}, returns: {}, checks: {}, workbooks: {}, journals: {}, journalDrafts: {}, situation: "", wish: "", lastJourney: null };
let state = loadState();
let activeFilter = "available";
let checkin = { focus: null, goal: null, recommendation: null };
let currentJourney = null;
let currentModule = 0;
const focusReturns = new Map();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    const next = { ...structuredClone(initialState), ...saved };
    for (const key of ["completed", "notes", "scales", "returns", "checks", "workbooks", "journals", "journalDrafts"]) {
      if (!next[key] || typeof next[key] !== "object" || Array.isArray(next[key])) next[key] = {};
    }
    return next;
  } catch { return structuredClone(initialState); }
}

function saveState(refresh = true) {
  let saved = true;
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
    document.getElementById("storageWarning")?.classList.add("hidden");
  } catch {
    saved = false;
    const warning = document.getElementById("storageWarning");
    if (warning) {
      warning.textContent = "Não foi possível salvar neste navegador. As alterações atuais serão mantidas apenas enquanto esta página estiver aberta.";
      warning.classList.remove("hidden");
    }
  }
  if (refresh) updateGlobalProgress();
  return saved;
}

function esc(value = "") {
  return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;" }[char]));
}

function availableJourneys() { return journeyCatalog.filter(j => j.available); }
function journeyCompletedCount(id) { return (journeyCatalog.find(j => j.id === id)?.modules || []).filter((_, i) => state.completed[id]?.[i]).length; }

function journeyStarted(id) {
  return state.lastJourney === id || journeyCompletedCount(id) > 0 || Object.keys(state.notes).some(key => key.startsWith(`${id}-`));
}

function renderJourneys() {
  const grid = document.getElementById("journeyGrid");
  let items = journeyCatalog;
  if (activeFilter === "available") items = availableJourneys();
  if (activeFilter === "saved") items = availableJourneys().filter(j => journeyStarted(j.id) && journeyCompletedCount(j.id) < j.modules.length);
  if (activeFilter === "completed") items = availableJourneys().filter(j => journeyCompletedCount(j.id) === j.modules.length);

  if (!items.length) {
    grid.innerHTML = `<div class="empty-state"><strong>${activeFilter === "completed" ? "Nenhuma jornada concluída ainda." : "Nenhuma jornada em andamento."}</strong><br>Abra “Todas as 17” para escolher. Não há prazo nem obrigação de completar todas.</div>`;
    return;
  }

  grid.innerHTML = items.map(j => {
    const completed = journeyCompletedCount(j.id);
    const total = j.modules?.length || 0;
    const progress = total ? Math.round((completed / total) * 100) : 0;
    return `
      <article class="journey-card ${j.available ? "available" : "planned"}" style="--accent:${j.color};--accent-bg:${j.bg}">
        <div class="card-top">
          <span class="journey-symbol" aria-hidden="true">${j.icon}</span>
          <span class="status-label">${completed === total ? "Concluída" : journeyStarted(j.id) ? "Em andamento" : "Disponível"}</span>
        </div>
        <h3>${j.title}</h3>
        <p>${j.description}</p>
        <div class="card-meta">
          <span>${completed ? `${completed} de ${total} etapas concluídas` : j.time}</span><span class="mini-track" aria-hidden="true"><i style="width:${progress}%"></i></span><button class="card-open" data-open-journey="${j.id}" aria-label="Abrir ${j.title}">→</button>
        </div>
      </article>`;
  }).join("");

  grid.querySelectorAll("[data-open-journey]").forEach(button => button.addEventListener("click", () => openJourney(button.dataset.openJourney)));
  grid.querySelectorAll(".journey-card.available").forEach(card => {
    card.addEventListener("click", event => {
      if (!event.target.closest("button")) card.querySelector("[data-open-journey]").click();
    });
  });
}

function setFilter(filter) {
  activeFilter = filter;
  document.querySelectorAll(".filter-chip").forEach(button => {
    const active = button.dataset.filter === filter;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  renderJourneys();
}

function updateGlobalProgress() {
  const total = availableJourneys().reduce((sum, j) => sum + j.modules.length, 0);
  const done = availableJourneys().reduce((sum, j) => sum + journeyCompletedCount(j.id), 0);
  const pct = total ? Math.round((done / total) * 100) : 0;
  document.getElementById("headerProgress").textContent = done === 1 ? "1 etapa" : `${done} etapas`;
  document.querySelector(".progress-ring").style.setProperty("--progress", `${pct}%`);
  renderJourneys();
}

function openModal(id) {
  const modal = document.getElementById(id);
  focusReturns.set(id, document.activeElement);
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  syncModalInert();
  setTimeout(() => modal.querySelector("button, textarea, [href]")?.focus(), 30);
}

function closeModal(modal) {
  if (modal.id === "journeyModal") saveCurrentModule(false);
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = document.querySelector(".modal-backdrop.open") ? "hidden" : "";
  if (modal.id === "journeyModal") setModuleScreen(false);
  syncModalInert();
  const previous = focusReturns.get(modal.id);
  if (previous?.isConnected) previous.focus();
  else document.getElementById("journeys-title").focus();
}

function syncModalInert() {
  const top = [...document.querySelectorAll(".modal-backdrop.open")].pop();
  document.querySelectorAll("body > header, body > main, body > footer").forEach(node => node.inert = Boolean(top));
  document.querySelectorAll(".modal-backdrop").forEach(node => node.inert = Boolean(top && node !== top));
}

function syncJourneyPanels() {
  const shell = document.querySelector(".journey-modal");
  const mobile = window.matchMedia ? window.matchMedia("(max-width: 720px)").matches : window.innerWidth <= 720;
  const moduleOpen = shell.classList.contains("module-open");
  document.getElementById("moduleList").inert = mobile && moduleOpen;
  document.getElementById("moduleContent").inert = mobile && !moduleOpen;
}

function setModuleScreen(open) {
  document.querySelector(".journey-modal").classList.toggle("module-open", open);
  syncJourneyPanels();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.remove("show"), 2600);
}

function setupCheckin() {
  document.getElementById("focusOptions").innerHTML = focusOptions.map(option => `
    <button class="option-button" data-focus="${option.id}">
      <span aria-hidden="true">${option.icon}</span><span><strong>${option.title}</strong><small>${option.subtitle}</small></span>
    </button>`).join("");
  document.querySelectorAll("[data-focus]").forEach(button => button.addEventListener("click", () => {
    checkin.focus = button.dataset.focus;
    showCheckinStep(2);
    document.getElementById("goalOptions").innerHTML = goals[checkin.focus].map(goal => `<button class="goal-button" data-goal="${esc(goal)}"><strong>${goal}</strong></button>`).join("");
    document.querySelectorAll("[data-goal]").forEach(goalButton => goalButton.addEventListener("click", () => {
      checkin.goal = goalButton.dataset.goal;
      checkin.recommendation = checkin.focus;
      renderRecommendation();
      showCheckinStep(3);
    }));
  }));
}

function showCheckinStep(step) {
  document.querySelectorAll(".checkin-step").forEach(panel => panel.classList.toggle("hidden", Number(panel.dataset.step) !== step));
  document.getElementById("checkinBar").style.width = `${step * 33.333}%`;
  const heading = document.querySelector(`.checkin-step[data-step="${step}"] h2`);
  if (heading) { heading.tabIndex = -1; heading.focus(); }
}

function renderRecommendation() {
  const journey = journeyCatalog.find(j => j.id === checkin.recommendation);
  document.getElementById("recommendation").innerHTML = `
    <h2>Uma jornada para começar, não uma conclusão.</h2>
    <p class="modal-lede">Com base no foco escolhido, este pode ser um primeiro percurso. Você continua livre para escolher outro.</p>
    <div class="recommend-card" style="--accent:${journey.color};--accent-bg:${journey.bg}">
      <span class="journey-symbol" aria-hidden="true">${journey.icon}</span>
      <div><h3>${journey.title}</h3><p>${journey.description}</p></div>
    </div>
    <p class="recommend-note">Objetivo escolhido: ${esc(checkin.goal)}. Este direcionamento não avalia gravidade nem substitui atendimento.</p>`;
  const openButton = document.getElementById("openRecommended");
  openButton.textContent = "Abrir jornada";
}

function openJourney(id, moduleIndex = null) {
  currentJourney = journeyCatalog.find(j => j.id === id && j.available);
  if (!currentJourney) return;
  state.lastJourney = id;
  saveState();
  const firstIncomplete = currentJourney.modules.findIndex((_, i) => !state.completed[id]?.[i]);
  currentModule = moduleIndex ?? (firstIncomplete < 0 ? 0 : firstIncomplete);
  document.getElementById("journeyTitle").textContent = currentJourney.title;
  document.getElementById("journeyIcon").textContent = currentJourney.icon;
  document.getElementById("journeyIcon").style.background = currentJourney.bg;
  renderModuleList();
  renderModule();
  const modal = document.getElementById("journeyModal");
  if (!modal.classList.contains("open")) openModal("journeyModal");
}

function renderModuleList() {
  document.getElementById("moduleList").innerHTML = currentJourney.modules.map((module, index) => {
    const done = Boolean(state.completed[currentJourney.id]?.[index]);
    return `<button class="module-button ${index === currentModule ? "active" : ""} ${done ? "done" : ""}" data-module="${index}">
      <span class="module-index">${done ? "✓" : index + 1}</span>
      <span><strong>${module.title}</strong><small>${module.time}</small></span>
    </button>`;
  }).join("");
  document.querySelectorAll("[data-module]").forEach(button => button.addEventListener("click", () => {
    saveCurrentModule(false);
    currentModule = Number(button.dataset.module);
    renderModuleList();
    renderModule();
    setModuleScreen(true);
  }));
  updateJourneyProgress();
}

function renderModule() {
  const module = currentJourney.modules[currentModule];
  const noteKey = `${currentJourney.id}-${currentModule}`;
  const note = state.notes[noteKey] || "";
  const scale = state.scales[noteKey] ?? "";
  const done = Boolean(state.completed[currentJourney.id]?.[currentModule]);
  document.getElementById("moduleContent").innerHTML = `
    <span class="module-kicker">${module.kicker} • Etapa ${currentModule + 1}</span>
    <h3 tabindex="-1">${module.heading}</h3>
    <p class="module-intro">${module.intro}</p>
    <div class="module-tabs" id="moduleTabs" role="tablist" aria-label="Conteúdo e práticas da etapa">
      <button type="button" id="tab-learn" role="tab" aria-controls="view-learn" data-module-view="learn">Entender</button>
      <button type="button" id="tab-practice" role="tab" aria-controls="view-practice" data-module-view="practice">Praticar e anotar</button>
      <button type="button" id="tab-journal" role="tab" aria-controls="view-journal" data-module-view="journal">Meu acompanhamento</button>
    </div>
    <section id="view-learn" role="tabpanel" aria-labelledby="tab-learn" tabindex="-1" data-view-panel="learn">
    ${module.detail ? `<p class="module-detail">${esc(module.detail)}</p>` : ""}
    <div class="lesson-block"><h4>${module.lesson}</h4><p>${module.lessonText}</p></div>
    ${renderDeepLesson(module)}
    ${module.example && !module.workedExample ? `<div class="lesson-block example-block"><h4>Uma situação universitária · exemplo fictício</h4><p>${esc(module.example)}</p></div>` : ""}
    ${module.safety ? `<div class="safety-callout"><strong>Atenção</strong>${module.safety}</div>` : ""}
    <button type="button" class="button primary practice-next" data-go-view="practice">Levar para a prática →</button>
    ${currentJourney.sources?.length ? `<details class="source-details"><summary>Referências desta jornada</summary><p>O conteúdo acima apresenta os conceitos em linguagem própria. As fontes orientam os princípios destas práticas; não equivalem a uma avaliação de eficácia desta plataforma.</p><ul>${currentJourney.sources.map(source => `<li><a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.title)}</a></li>`).join("")}</ul></details>` : ""}
    </section>
    <section id="view-practice" role="tabpanel" aria-labelledby="tab-practice" tabindex="-1" data-view-panel="practice" hidden>
    ${module.steps?.length ? `<div class="practice-steps"><h4>Experimente no seu ritmo</h4><ol>${module.steps.map(step => `<li>${esc(step)}</li>`).join("")}</ol></div>` : ""}
    ${module.safety ? `<div class="safety-callout"><strong>Atenção</strong>${module.safety}</div>` : ""}
    ${renderWorksheet(module, noteKey)}
    <details class="free-notes" ${note || state.returns[noteKey] || scale !== "" ? "open" : ""}><summary>Anotações livres e registros anteriores</summary><div class="exercise">
      <p class="record-note">Registrar é opcional. Você também pode refletir sem escrever. Ninguém acompanha estas respostas.</p>
      <label>${esc(module.prompt)}<textarea id="moduleNote" rows="4" placeholder="${esc(module.placeholder)}">${esc(note)}</textarea></label>
      ${module.scale ? `<div class="scale-wrap"><label for="moduleScale">${module.scale}</label><select id="moduleScale"><option value="">Prefiro não responder</option>${Array.from({length:11}, (_, i) => `<option value="${i}" ${scale === i ? "selected" : ""}>${i} / 10</option>`).join("")}</select><p class="record-note">0 = mínimo; 10 = máximo na sua experiência. Registro pessoal, sem ponto de corte diagnóstico.</p></div>` : ""}
      ${module.followup ? `<div class="return-record"><label>${esc(module.followup)}<textarea id="moduleReturn" rows="3" placeholder="${esc(module.followupPlaceholder || "Volte depois da tentativa. Conte também se não conseguiu fazer e o que atrapalhou.")}">${esc(state.returns[noteKey] || "")}</textarea></label><p class="record-note">Preencha depois de experimentar; o registro inicial permanece separado.</p></div>` : ""}
    </div></details>
    ${module.check ? `<fieldset class="knowledge-check"><legend>Uma pausa para conferir</legend><p>${esc(module.check.question)}</p>${module.check.options.map((option, i) => `<label><input type="radio" name="checkpoint" value="${i}" ${state.checks[noteKey] === i ? "checked" : ""}> <span>${esc(option)}</span></label>`).join("")}<button type="button" class="button ghost" id="checkUnderstanding">Conferir raciocínio</button><p id="checkpointFeedback" role="status" class="check-feedback"></p><small>Opcional. Não há nota, diagnóstico ou bloqueio de etapas.</small></fieldset>` : ""}
    </section>
    <section id="view-journal" role="tabpanel" aria-labelledby="tab-journal" tabindex="-1" data-view-panel="journal" hidden>${renderJournal(currentJourney)}</section>
    <div class="module-actions" data-only-view="practice">
      <button class="text-button" id="saveNote">Salvar registro</button>
      <button class="button primary complete-button ${done ? "done" : ""}" id="completeModule">${done ? "Rever e continuar ✓" : (currentModule === currentJourney.modules.length - 1 ? "Concluir etapa" : "Concluir e continuar")}</button>
    </div>
    <p class="record-note" data-only-view="practice">${done ? "Esta etapa já está concluída. Você pode voltar e ajustar seu registro." : "Conclua quando esta etapa tiver sido útil. Não é necessário experimentar tudo hoje."}</p>`;

  bindModuleViews();
  bindJournal(currentJourney);
  document.querySelectorAll(".worksheet textarea, .worksheet input, .worksheet select").forEach(field => field.addEventListener("input", () => saveCurrentModule(false)));
  const scaleInput = document.getElementById("moduleScale");
  scaleInput?.addEventListener("change", () => saveCurrentModule(false));
  document.getElementById("moduleNote").addEventListener("input", () => saveCurrentModule(false));
  document.getElementById("moduleReturn")?.addEventListener("input", () => saveCurrentModule(false));
  document.getElementById("saveNote").addEventListener("click", () => saveCurrentModule());
  document.getElementById("checkUnderstanding")?.addEventListener("click", () => {
    const selected = document.querySelector('input[name="checkpoint"]:checked');
    const feedback = document.getElementById("checkpointFeedback");
    if (!selected) { feedback.textContent = "Escolha uma alternativa para ver o comentário, ou siga no seu ritmo."; return; }
    const choice = Number(selected.value);
    state.checks[noteKey] = choice;
    saveState(false);
    feedback.textContent = `${choice === module.check.answer ? "Isso mesmo. " : "Vamos olhar por outro ângulo. "}${module.check.feedback}`;
  });
  document.getElementById("completeModule").addEventListener("click", () => {
    saveCurrentModule(false);
    state.completed[currentJourney.id] ||= {};
    state.completed[currentJourney.id][currentModule] = true;
    saveState();
    showToast("Etapa concluída");
    if (currentModule < currentJourney.modules.length - 1) {
      currentModule += 1;
      renderModuleList(); renderModule();
    } else {
      renderModuleList(); renderModule();
      showToast(journeyCompletedCount(currentJourney.id) === currentJourney.modules.length ? "Jornada concluída — volte quando precisar" : "Etapa concluída. As demais continuam disponíveis.");
    }
  });
  document.getElementById("moduleContent").scrollTop = 0;
  setModuleScreen(true);
  document.querySelector("#moduleContent h3").focus({ preventScroll: true });
}

function saveCurrentModule(notify = true) {
  if (!currentJourney || !document.getElementById("moduleNote")) return;
  const key = `${currentJourney.id}-${currentModule}`;
  state.notes[key] = document.getElementById("moduleNote").value.trim();
  const scale = document.getElementById("moduleScale");
  if (scale) {
    if (scale.value === "") delete state.scales[key];
    else state.scales[key] = Number(scale.value);
  }
  const after = document.getElementById("moduleReturn");
  if (after) state.returns[key] = after.value.trim();
  saveWorksheet(key);
  const saved = saveState(false);
  if (notify) showToast(saved ? "Registro salvo neste dispositivo" : "Sem armazenamento: registro mantido só nesta página");
}

function updateJourneyProgress() {
  if (!currentJourney) return;
  const completed = journeyCompletedCount(currentJourney.id);
  const total = currentJourney.modules.length;
  document.getElementById("journeyProgressLabel").textContent = `${completed} de ${total} etapas`;
  document.getElementById("journeyProgressBar").style.width = `${Math.round(completed / total * 100)}%`;
}

document.addEventListener("DOMContentLoaded", () => {
  setupCheckin();
  renderJourneys();
  updateGlobalProgress();
  document.getElementById("situationInput").value = state.situation;
  document.getElementById("wishInput").value = state.wish;

  document.getElementById("startCheckin").addEventListener("click", () => { showCheckinStep(1); openModal("checkinModal"); });
  document.getElementById("openReflection").addEventListener("click", () => openModal("reflectionModal"));
  document.querySelectorAll("[data-open-help]").forEach(button => button.addEventListener("click", () => openModal("helpModal")));
  document.querySelectorAll("[data-close-modal]").forEach(button => button.addEventListener("click", () => closeModal(button.closest(".modal-backdrop"))));
  document.querySelectorAll(".modal-backdrop").forEach(backdrop => backdrop.addEventListener("mousedown", event => { if (event.target === backdrop) closeModal(backdrop); }));

  document.querySelectorAll(".filter-chip").forEach(button => button.addEventListener("click", () => setFilter(button.dataset.filter)));
  document.getElementById("progressPill").addEventListener("click", () => { setFilter("saved"); document.getElementById("jornadas").scrollIntoView({ behavior: "smooth" }); });

  document.querySelectorAll(".back-checkin").forEach(button => button.addEventListener("click", () => {
    const visible = [...document.querySelectorAll(".checkin-step")].find(panel => !panel.classList.contains("hidden"));
    showCheckinStep(Math.max(1, Number(visible.dataset.step) - 1));
  }));
  document.getElementById("openRecommended").addEventListener("click", () => {
    closeModal(document.getElementById("checkinModal"));
    openJourney(checkin.recommendation, 0);
  });

  document.getElementById("saveReflection").addEventListener("click", () => {
    state.situation = document.getElementById("situationInput").value.trim();
    state.wish = document.getElementById("wishInput").value.trim();
    saveState();
    closeModal(document.getElementById("reflectionModal"));
    showCheckinStep(1); openModal("checkinModal");
  });

  document.getElementById("journeyBack").addEventListener("click", () => {
    setModuleScreen(false);
    document.querySelector(".module-button.active")?.focus();
  });
  document.getElementById("clearData").addEventListener("click", () => {
    if (!window.confirm("Apagar progresso e anotações salvos neste navegador?")) return;
    let removed = true;
    try { localStorage.removeItem(storageKey); } catch { removed = false; }
    state = structuredClone(initialState);
    document.getElementById("situationInput").value = ""; document.getElementById("wishInput").value = "";
    updateGlobalProgress();
    showToast(removed ? "Dados locais apagados" : "Página limpa; não foi possível apagar os dados do navegador");
    if (!removed) {
      const warning = document.getElementById("storageWarning");
      warning.textContent = "Não foi possível apagar os dados salvos. Para removê-los, limpe os dados deste site nas configurações do navegador.";
      warning.classList.remove("hidden");
    }
  });

  document.addEventListener("keydown", event => {
    const top = [...document.querySelectorAll(".modal-backdrop.open")].pop();
    if (event.key === "Tab" && top) {
      const controls = [...top.querySelectorAll('button, a[href], textarea, input, select, summary, [tabindex="0"]')].filter(node => !node.disabled && !node.closest(".hidden, [hidden], [inert]") && node.getClientRects().length);
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && (document.activeElement === first || !controls.includes(document.activeElement))) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || !controls.includes(document.activeElement))) { event.preventDefault(); first?.focus(); }
    }
    if (event.key === "Escape") {
      const open = [...document.querySelectorAll(".modal-backdrop.open")].pop();
      if (open) closeModal(open);
    }
  });
  window.addEventListener("scroll", () => document.querySelector(".site-header").classList.toggle("scrolled", window.scrollY > 8));
  window.addEventListener("resize", syncJourneyPanels);
});
