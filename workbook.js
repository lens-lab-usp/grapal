// Educational tools. All personal records stay in the same device-local state as the notes.
function renderDeepLesson(module) {
  if (!module.teaching) return "";
  const diagram = module.diagram;
  const example = module.workedExample;
  return `<div class="deep-lesson">${module.teaching.map(section => `<section class="teaching-section"><h4>${esc(section.title)}</h4><p>${esc(section.text)}</p></section>`).join("")}</div>
    ${diagram ? `<figure class="concept-map"><figcaption>${esc(diagram.title)}</figcaption><ol>${diagram.nodes.map((node, i) => `<li><span class="concept-number" aria-hidden="true">${i + 1}</span><div><strong>${esc(node.title)}</strong><p>${esc(node.text)}</p></div></li>`).join("")}</ol><p class="figure-caption">${esc(diagram.caption)}</p><small>Esquema explicativo. Não representa uma sequência obrigatória nem dados de pesquisa.</small></figure>` : ""}
    ${example ? `<section class="worked-example"><h4>Um exemplo, passo a passo</h4><p class="record-note">Situação fictícia para acompanhar o raciocínio.</p><dl>${[["A cena",example.situation],["Como compreender",example.interpretation],["Uma tentativa possível",example.experiment],["O que observar depois",example.learning]].map(([title,text]) => `<div><dt>${title}</dt><dd>${esc(text)}</dd></div>`).join("")}</dl></section>` : ""}`;
}

function renderWorksheet(module, key) {
  const sheet = module.worksheet;
  if (!sheet) return "";
  const saved = state.workbooks[key] || {};
  return `<section class="worksheet" aria-labelledby="worksheetTitle"><span class="module-kicker">Caderno de prática</span><h4 id="worksheetTitle">${esc(sheet.title)}</h4><p>${esc(sheet.why)}</p><p class="record-note">Preencha só o que ajudar. Os campos são opcionais e salvos neste navegador; ninguém acompanha suas respostas.</p>
    ${sheet.fields.map((field, i) => `<label for="worksheetField${i}"><span class="field-number" aria-hidden="true">${i + 1}</span>${esc(field.label)}</label><textarea id="worksheetField${i}" data-worksheet-field="${i}" rows="3" maxlength="6000" placeholder="${esc(field.placeholder)}">${esc(saved.fields?.[i] || "")}</textarea>`).join("")}
    <div class="task-card"><h5>Uma tarefa para levar à semana</h5><p>${esc(sheet.task)}</p><label for="worksheetWhen">Quando e em que contexto isso caberia?</label><input id="worksheetWhen" type="text" maxlength="600" placeholder="Por exemplo: depois da aula de terça, com apoio de…" value="${esc(saved.when || "")}"><p class="record-note">É um lembrete escrito para você. O site não envia notificações.</p>
    <label for="worksheetStatus">Como está esta tentativa?</label><select id="worksheetStatus">${[["","Ainda não decidi"],["planned","Planejei experimentar"],["tried","Experimentei"],["adapted","Adaptei ou busquei apoio"],["paused","Prefiro pausar por enquanto"]].map(([value,label]) => `<option value="${value}" ${saved.status === value ? "selected" : ""}>${label}</option>`).join("")}</select></div>
    <label for="worksheetReview">${esc(sheet.review)}</label><textarea id="worksheetReview" rows="3" maxlength="6000" placeholder="Volte depois da tentativa. Não conseguir também traz informação sobre tamanho do passo, contexto e apoio necessário.">${esc(saved.reflection || "")}</textarea><p class="record-note">O retorno fica separado do plano inicial. Você pode ajustar o próximo passo sem apagar o que previu.</p></section>`;
}

function saveWorksheet(key) {
  const fields = [...document.querySelectorAll("[data-worksheet-field]")];
  if (!fields.length) return;
  state.workbooks[key] = {
    fields: fields.map(field => field.value),
    when: document.getElementById("worksheetWhen").value,
    status: document.getElementById("worksheetStatus").value,
    reflection: document.getElementById("worksheetReview").value
  };
}

function localDateISO() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
}
function validJournalDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0,10) === value && value <= localDateISO();
}
function shortDate(value) {
  return new Date(`${value}T12:00:00Z`).toLocaleDateString("pt-BR", {day:"2-digit",month:"2-digit",timeZone:"UTC"});
}
function fullDate(value) {
  return new Date(`${value}T12:00:00Z`).toLocaleDateString("pt-BR", {day:"2-digit",month:"2-digit",year:"numeric",timeZone:"UTC"});
}
function journalEntries(id) {
  const entries = Array.isArray(state.journals[id]) ? state.journals[id] : [];
  return entries.filter(entry => entry && validJournalDate(entry.date)).map(entry => ({
    ...entry, value: typeof entry.value === "number" && Number.isInteger(entry.value) && entry.value >= 0 && entry.value <= 10 ? entry.value : null
  })).sort((a,b) => a.date.localeCompare(b.date));
}
const journalStatusLabels = { "": "Sem marcação", planned: "Planejei", tried: "Experimentei", adapted: "Adaptei / pedi apoio", paused: "Pausei" };

function renderJournal(journey) {
  const journal = journey.journal;
  if (!journal) return "";
  return `<section class="journal" aria-labelledby="journalTitle"><span class="module-kicker">Acompanhamento opcional · desta jornada</span><h4 id="journalTitle">${esc(journal.title)}</h4><p>Você pode voltar depois de uma tentativa ou quando fizer sentido. Não precisa registrar todos os dias. Um dia difícil não desfaz o que você aprendeu.</p>
    <div class="journal-guidance"><p>${esc(journal.taskLabel)}</p><p>${esc(journal.reflection)}</p></div>
    <form id="journalForm"><div class="journal-row"><div><label for="journalDate">Data do registro</label><input id="journalDate" type="date" required max="${localDateISO()}"></div><div><label for="journalStatus">Prática ou cuidado neste dia</label><select id="journalStatus">${Object.entries(journalStatusLabels).map(([value,label])=>`<option value="${value}">${label}</option>`).join("")}</select></div></div>
    <p class="record-note">Ao responder, pense na data selecionada.</p><label for="journalValue">${esc(journal.prompt)}</label><select id="journalValue"><option value="">Prefiro registrar sem número</option>${Array.from({length:11},(_,i)=>`<option value="${i}">${i} / 10</option>`).join("")}</select><div class="scale-anchors"><span><strong>0</strong> ${esc(journal.low)}</span><span><strong>10</strong> ${esc(journal.high)}</span></div>
    <label for="journalContext">Que contexto ajuda a entender este dia?</label><textarea id="journalContext" rows="3" maxlength="6000" placeholder="${esc(journal.contextPlaceholder)}"></textarea>
    <label for="journalReflection">O que percebeu e o que pode precisar ajustar?</label><textarea id="journalReflection" rows="3" maxlength="6000" placeholder="Você pode anotar o que ajudou, o que dificultou ou de que apoio precisa."></textarea>
    <div class="journal-form-actions"><button type="submit" class="button primary" id="saveJournal">Adicionar registro</button><button type="button" class="text-button" id="newJournal">Limpar campos</button></div><p id="journalMessage" class="record-note" role="status"></p></form>
    <p class="record-note">Um registro por data nesta jornada. Rascunhos e registros ficam somente neste navegador, sem sincronização ou monitoramento profissional. Em dispositivo compartilhado, outras pessoas com acesso ao navegador podem lê-los.</p>
    <section class="journal-chart-section" aria-labelledby="chartHeading"><div class="chart-heading"><h4 id="chartHeading">Seus registros no tempo</h4><label for="chartRange">Período<select id="chartRange"><option value="7">7 dias</option><option value="14" selected>14 dias</option><option value="30">30 dias</option></select></label></div><div id="journalChart"></div><p class="record-note">Esta medida pessoal não é uma escala validada, não avalia gravidade e não demonstra efeito de tratamento. Ausência de registro não vale zero. Leia os números junto com o contexto; não há metas, comparação com outras pessoas ou sequência a manter.</p><div id="journalRecords"></div></section></section>`;
}

function renderJournalChart(journey) {
  const entries = journalEntries(journey.id);
  const range = Number(document.getElementById("chartRange").value);
  const chart = document.getElementById("journalChart");
  const end = entries.at(-1)?.date || localDateISO();
  const endTime = Date.parse(`${end}T12:00:00Z`);
  const startTime = endTime - (range - 1) * 86400000;
  const start = new Date(startTime).toISOString().slice(0,10);
  const visible = entries.filter(entry => entry.date >= start && entry.date <= end && entry.value !== null);
  const x = date => 44 + ((Date.parse(`${date}T12:00:00Z`) - startTime) / 86400000) * (550 / (range - 1));
  const y = value => 202 - value * 17;
  if (!visible.length) {
    chart.innerHTML = `<div class="chart-empty"><strong>O gráfico começa com um registro seu.</strong><p>Se quiser usar números, escolha uma resposta de 0 a 10 e adicione o registro. Você também pode usar apenas as anotações abaixo.</p></div>`;
  } else {
    const links = visible.slice(1).map((entry, i) => {
      const previous = visible[i];
      // Never connect across missing calendar days or days recorded without a number.
      return Date.parse(entry.date) - Date.parse(previous.date) === 86400000 ? `<line x1="${x(previous.date)}" y1="${y(previous.value)}" x2="${x(entry.date)}" y2="${y(entry.value)}" class="chart-line"/>` : "";
    }).join("");
    chart.innerHTML = `<p class="chart-period">${fullDate(start)} a ${fullDate(end)} · ${visible.length} ${visible.length === 1 ? "registro com número" : "registros com número"}</p><svg class="journal-plot" viewBox="0 0 630 252" role="img" aria-labelledby="journalPlotTitle journalPlotDesc"><title id="journalPlotTitle">${esc(journey.journal.prompt)}</title><desc id="journalPlotDesc">Escala de zero a dez. ${visible.map(entry => `${fullDate(entry.date)}: ${entry.value}`).join("; ")}. Linhas ligam apenas dias consecutivos com registro. Os mesmos valores estão na lista abaixo.</desc>${[0,5,10].map(value => `<line x1="44" y1="${y(value)}" x2="594" y2="${y(value)}" class="chart-grid"/><text x="30" y="${y(value)+5}" text-anchor="end">${value}</text>`).join("")}${links}${visible.map(entry => `<circle data-chart-value="${entry.value}" cx="${x(entry.date)}" cy="${y(entry.value)}" r="5" class="chart-point"><title>${fullDate(entry.date)}: ${entry.value}/10</title></circle>`).join("")}<text x="44" y="232">${shortDate(start)}</text><text x="594" y="232" text-anchor="end">${shortDate(end)}</text></svg><p class="chart-measure">${esc(journey.journal.prompt)}</p>`;
  }
  document.getElementById("journalRecords").innerHTML = entries.length ? `<details class="journal-history" open><summary>Registros e contexto (${entries.length})</summary><ol>${[...entries].reverse().map(entry => `<li><div class="entry-heading"><strong>${fullDate(entry.date)}</strong><span>${entry.value === null ? "Sem número" : `${entry.value} / 10`} · ${esc(journalStatusLabels[entry.status] || journalStatusLabels[""])}</span></div>${entry.context ? `<p><strong>Contexto:</strong> ${esc(entry.context)}</p>` : ""}${entry.reflection ? `<p><strong>Aprendizado / próximo passo:</strong> ${esc(entry.reflection)}</p>` : ""}<div class="entry-actions"><button type="button" class="text-button" data-edit-entry="${entry.date}" aria-label="Editar registro de ${fullDate(entry.date)}">Editar</button><button type="button" class="text-button" data-delete-entry="${entry.date}" aria-label="Apagar registro de ${fullDate(entry.date)}">Apagar</button></div></li>`).join("")}</ol></details>` : "";
}

function bindJournal(journey) {
  if (!journey.journal) return;
  const fields = {date:"journalDate",value:"journalValue",status:"journalStatus",context:"journalContext",reflection:"journalReflection"};
  let editingDate = null;
  const readDraft = () => ({...Object.fromEntries(Object.entries(fields).map(([name,id])=>[name,document.getElementById(id).value])),editingDate});
  const saveDraft = () => { state.journalDrafts[journey.id] = readDraft(); saveState(false); };
  const fillDraft = draft => {
    editingDate = draft.editingDate || null;
    for (const [name,id] of Object.entries(fields)) document.getElementById(id).value = draft[name] ?? (name === "date" ? localDateISO() : "");
    document.getElementById("saveJournal").textContent = editingDate ? "Atualizar registro" : "Adicionar registro";
  };
  fillDraft(state.journalDrafts[journey.id] || {});
  for (const id of Object.values(fields)) document.getElementById(id).addEventListener("input", saveDraft);
  document.getElementById("journalForm").addEventListener("submit", event => {
    event.preventDefault();
    const draft = readDraft();
    const message = document.getElementById("journalMessage");
    if (!validJournalDate(draft.date)) { message.textContent = "Escolha uma data válida, de hoje ou anterior."; return; }
    if (draft.value === "" && !draft.status && !draft.context.trim() && !draft.reflection.trim()) { message.textContent = "Acrescente uma anotação, uma marcação de prática ou um número. Não precisa preencher tudo."; return; }
    const entries = journalEntries(journey.id);
    const existing = entries.some(entry => entry.date === draft.date);
    if (existing && editingDate !== draft.date && !window.confirm("Já existe um registro nesta data. Substituir pelo conteúdo destes campos?")) return;
    const entry = {date:draft.date,value:draft.value === "" ? null : Number(draft.value),status:draft.status,context:draft.context.trim(),reflection:draft.reflection.trim()};
    state.journals[journey.id] = [...entries.filter(item => item.date !== draft.date && item.date !== editingDate),entry];
    editingDate = draft.date;
    state.journalDrafts[journey.id] = {...draft,editingDate};
    const saved = saveState(false);
    message.textContent = saved ? "Registro salvo neste navegador. O gráfico e a lista foram atualizados." : "Registro mantido só nesta página: o navegador bloqueou o armazenamento.";
    document.getElementById("saveJournal").textContent = "Atualizar registro";
    renderJournalChart(journey);
  });
  document.getElementById("newJournal").addEventListener("click", () => {
    if (!window.confirm("Limpar os campos do formulário? Registros já adicionados serão mantidos.")) return;
    fillDraft({}); saveDraft();
    document.getElementById("journalMessage").textContent = "Campos limpos. Seus registros anteriores continuam na lista.";
  });
  document.getElementById("chartRange").addEventListener("change", () => renderJournalChart(journey));
  document.getElementById("journalRecords").addEventListener("click", event => {
    const edit = event.target.closest("[data-edit-entry]");
    const remove = event.target.closest("[data-delete-entry]");
    if (edit) {
      const entry = journalEntries(journey.id).find(item => item.date === edit.dataset.editEntry);
      if (entry) {
        const draft = readDraft();
        const original = journalEntries(journey.id).find(item => item.date === editingDate);
        const changedDraft = original
          ? Object.keys(fields).some(name => String(draft[name] ?? "") !== String(original[name] ?? ""))
          : draft.context || draft.reflection || draft.status || draft.value !== "";
        if (changedDraft && !window.confirm("Abrir este registro nos campos? Isso substituirá as alterações ainda não adicionadas ao diário.")) return;
        fillDraft({...entry,value:entry.value ?? "",editingDate:entry.date}); saveDraft();
        document.getElementById("journalMessage").textContent = `Editando ${fullDate(entry.date)}. As alterações entram no gráfico ao atualizar o registro.`;
        document.getElementById("journalForm").scrollIntoView({block:"start"});
        document.getElementById("journalDate").focus({preventScroll:true});
      }
    }
    if (remove && window.confirm("Apagar somente este registro? Esta ação não pode ser desfeita.")) {
      state.journals[journey.id] = journalEntries(journey.id).filter(entry => entry.date !== remove.dataset.deleteEntry);
      if (editingDate === remove.dataset.deleteEntry) { fillDraft({}); state.journalDrafts[journey.id] = readDraft(); }
      const saved = saveState(false);
      renderJournalChart(journey);
      document.getElementById("journalMessage").textContent = saved ? "Registro apagado deste navegador." : "Registro removido desta página; não foi possível atualizar o armazenamento do navegador.";
      document.getElementById("journalDate").focus({preventScroll:true});
    }
  });
  renderJournalChart(journey);
}

function bindModuleViews() {
  const tabs = [...document.querySelectorAll("[data-module-view]")];
  const select = (view, focus = false) => {
    tabs.forEach(tab => { const active = tab.dataset.moduleView === view; tab.setAttribute("aria-selected",String(active)); tab.tabIndex = active ? 0 : -1; });
    document.querySelectorAll("[data-view-panel]").forEach(panel => { panel.hidden = panel.dataset.viewPanel !== view; });
    document.querySelectorAll("[data-only-view]").forEach(node => { node.hidden = node.dataset.onlyView !== view; });
    if (focus) document.getElementById(`view-${view}`).focus({preventScroll:true});
  };
  tabs.forEach((tab,index) => {
    tab.addEventListener("click", () => select(tab.dataset.moduleView));
    tab.addEventListener("keydown", event => {
      let next;
      if(event.key === "ArrowRight") next = (index+1)%tabs.length;
      if(event.key === "ArrowLeft") next = (index+tabs.length-1)%tabs.length;
      if(event.key === "Home") next = 0;
      if(event.key === "End") next = tabs.length-1;
      if(next !== undefined) { event.preventDefault(); tabs[next].focus(); select(tabs[next].dataset.moduleView); }
    });
  });
  document.querySelectorAll("[data-go-view]").forEach(button => button.addEventListener("click", () => { select(button.dataset.goView,true); document.getElementById("moduleTabs").scrollIntoView({block:"start"}); }));
  select("learn");
}
