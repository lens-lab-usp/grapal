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
})();
