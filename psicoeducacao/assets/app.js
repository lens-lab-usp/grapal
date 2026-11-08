(() => {
  const menu = document.querySelector('[data-menu]');
  const nav = document.querySelector('#site-nav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false');
    }));
  }
  const search = document.querySelector('[data-search]');
  const cards = [...document.querySelectorAll('[data-article]')];
  const filters = [...document.querySelectorAll('[data-filter]')];
  let activeFilter = 'todos';
  const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  function filterArticles() {
    const term = normalize(search?.value || '');
    let visible = 0;
    cards.forEach(card => {
      const matches = (activeFilter === 'todos' || card.dataset.category === activeFilter) && normalize(card.dataset.search).includes(term);
      card.hidden = !matches;
      if (matches) visible++;
    });
    const count = document.querySelector('[data-count]');
    if (count) count.textContent = `${visible} ${visible === 1 ? 'conteúdo encontrado' : 'conteúdos encontrados'}`;
    const empty = document.querySelector('[data-empty]');
    if (empty) empty.hidden = visible !== 0;
  }
  search?.addEventListener('input', filterArticles);
  filters.forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filters.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    filterArticles();
  }));
  if (cards.length) filterArticles();
  document.querySelectorAll('[data-print-page]').forEach(button => button.addEventListener('click', () => window.print()));
  document.querySelectorAll('[data-copy-link]').forEach(button => button.addEventListener('click', async () => {
    const status = document.querySelector('[data-copy-status]');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(window.location.href);
      if (status) status.textContent = 'Link copiado. Você pode compartilhar com quem quiser.';
    } catch {
      if (status) status.textContent = 'Copie o endereço na barra do navegador para compartilhar.';
    }
  }));
  const form = document.querySelector('[data-tool-form]');
  if (form) {
    form.addEventListener('submit', e => e.preventDefault());
    const status = document.querySelector('[data-form-status]');
    function syncPrint() {
      form.querySelectorAll('input,textarea').forEach(input => {
        const output = document.getElementById(`print-${input.id}`);
        if (output) output.textContent = input.value.trim() || '________________________________________________________________';
      });
    }
    form.addEventListener('input', syncPrint);
    window.addEventListener('beforeprint', syncPrint);
    document.querySelector('[data-print]')?.addEventListener('click', () => { syncPrint(); window.print(); });
    document.querySelector('[data-reset]')?.addEventListener('click', () => {
      if (!form.querySelector('input,textarea') || ![...form.querySelectorAll('input,textarea')].some(i => i.value)) return;
      if (window.confirm('Limpar tudo o que você escreveu nesta ferramenta?')) {
        form.reset(); syncPrint(); if(status) status.textContent = 'Campos limpos. Você pode começar de novo.';
      }
    });
    syncPrint();
  }
})();
