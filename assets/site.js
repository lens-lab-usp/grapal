/* GRAPAL · comportamento da página (sem cookies, sem rastreamento, sem bibliotecas) */
(function () {
  'use strict';

  /* ---------- cabeçalho com sombra ao rolar ---------- */
  var head = document.querySelector('.site-head');
  function onScroll() { if (head) head.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var reduz = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- aparecer ao rolar ---------- */
  var itens = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || reduz) {
    itens.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    itens.forEach(function (el) { io.observe(el); });
  }

  /* ---------- menu: marca a seção visível ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var alvos = links.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  if ('IntersectionObserver' in window && alvos.length) {
    var atual = null;
    var spy = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) { if (e.isIntersecting) atual = e.target.id; });
      links.forEach(function (a) {
        if (a.getAttribute('href') === '#' + atual) a.setAttribute('aria-current', 'location');
        else a.removeAttribute('aria-current');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    alvos.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- urgência: onde ir agora (horário de São Paulo) ----------
     Regra dos manuais: dias úteis, das 8h às 17h, pronto-atendimento do CeAC;
     noites, fins de semana e feriados, Unidade de Emergência Referenciada (UER-ICHC).
     Em qualquer dúvida (feriado, ponto facultativo, erro de data), indica a UER-ICHC. */
  function pascoa(a) { // algoritmo gregoriano anônimo
    var A = a % 19, b = Math.floor(a / 100), c = a % 100, d = Math.floor(b / 4), e = b % 4,
        f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * A + b - d - g + 15) % 30,
        i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((A + 11 * h + 22 * l) / 451),
        mes = Math.floor((h + l - 7 * m + 114) / 31), dia = ((h + l - 7 * m + 114) % 31) + 1;
    return Date.UTC(a, mes - 1, dia);
  }
  function chave(t) { var d = new Date(t); return d.getUTCFullYear() + '-' + (d.getUTCMonth() + 1) + '-' + d.getUTCDate(); }
  function feriado(ano, mes, dia) {
    var fixos = ['1-1', '1-25', '4-21', '5-1', '7-9', '9-7', '10-12', '11-2', '11-15', '11-20', '12-24', '12-25', '12-31'];
    if (fixos.indexOf(mes + '-' + dia) >= 0) return true;
    var P = pascoa(ano), D = 864e5, hoje = ano + '-' + mes + '-' + dia;
    // carnaval (seg, ter), quarta de cinzas, sexta-feira santa, corpus christi
    return [-48, -47, -46, -2, 60].some(function (n) { return chave(P + n * D) === hoje; });
  }
  function agoraSP() {
    var p = {};
    new Intl.DateTimeFormat('en-US', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', weekday: 'short', hourCycle: 'h23' })
      .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    return { ano: +p.year, mes: +p.month, dia: +p.day, h: +p.hour, min: +p.minute, sem: p.weekday };
  }
  var dia = document.querySelector('.place.p-day'), noite = document.querySelector('.place.p-night'),
      msg = document.querySelector('.now-msg');
  function atualiza() {
    if (!dia || !noite) return;
    var util = false;
    try {
      var t = agoraSP(), minutos = t.h * 60 + t.min;
      util = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].indexOf(t.sem) >= 0 && !feriado(t.ano, t.mes, t.dia) &&
             minutos >= 8 * 60 && minutos < 17 * 60;
    } catch (e) { util = false; }
    dia.classList.toggle('is-now', util);
    noite.classList.toggle('is-now', !util);
    if (msg) msg.innerHTML = util
      ? 'Agora é dia útil, entre 8h e 17h no horário de São Paulo: procure o pronto-atendimento do CeAC.'
      : 'Agora, pelo horário de São Paulo, procure a <span class="nb">UER-ICHC</span>.';
  }
  atualiza();
  setInterval(atualiza, 60000);

  /* ---------- equipe: mini currículo em janela ----------
     Clicar na foto ou no nome abre a janela com o texto de .p-cv daquela pessoa.
     Sem suporte a <dialog>, os currículos ficam visíveis na própria página. */
  var cv = document.getElementById('cv');
  function semJanela(li) {  // navegador sem <dialog>: currículos ficam na própria página
    document.documentElement.classList.add('no-dialog');
    if (li) li.scrollIntoView({ block: 'center' });
  }
  // Em visualizações que mostram a página inteira sem rolagem (moldura com a altura da página),
  // a janela abre perto de onde se clicou, e não no meio da página.
  function posiciona(origem) {
    var alta = window.innerHeight > ((window.screen && screen.height) || 1200) * 1.3;
    var r = alta && origem ? origem.getBoundingClientRect() : null;
    cv.style.top = r ? Math.max(16, r.top - 40) + 'px' : '';
    cv.style.bottom = r ? 'auto' : '';
    cv.style.marginTop = r ? '0' : '';
  }
  function abre(li, origem) {
    var b = li.querySelector('button.p-btn'), r = li.querySelector('.p-reg'), img = b.querySelector('img').cloneNode(false);
    img.removeAttribute('loading');
    var foto = cv.querySelector('.cv-foto'), reg = cv.querySelector('.cv-reg');
    foto.innerHTML = ''; foto.appendChild(img);
    cv.querySelector('.cv-nome').textContent = b.querySelector('b').textContent;
    cv.querySelector('.cv-role').textContent = b.querySelector('.p-role').textContent;
    reg.textContent = r ? r.textContent : ''; reg.hidden = !r;
    cv.querySelector('.cv-bio').innerHTML = li.querySelector('.p-txt').innerHTML;
    posiciona(origem || b);
    try { cv.showModal(); } catch (err) { semJanela(li); }
  }
  if (cv && typeof cv.showModal === 'function') {
    // cartões da seção Equipe
    document.querySelectorAll('.person').forEach(function (li) {
      var b = li.querySelector('button.p-btn');
      if (b) b.addEventListener('click', function () { abre(li, b); });
    });
    // rostos do início: quem tem currículo abre a janela; os demais levam ao cartão na seção Equipe
    document.querySelectorAll('.faces-grid .face').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var li = document.getElementById(a.getAttribute('href').slice(1));
        if (li && li.querySelector('.p-cv')) { e.preventDefault(); abre(li, a); }
      });
    });
    cv.querySelector('.cv-close').addEventListener('click', function () { cv.close(); });
    cv.addEventListener('click', function (e) { if (e.target === cv) cv.close(); });  // clique fora da janela
  } else if (cv) {
    semJanela(null);
  }
})();
