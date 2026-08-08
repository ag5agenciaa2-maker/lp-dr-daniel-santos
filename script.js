(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- hero: trava altura real em px (evita "zoom" do Safari iOS ao rolar) ---------- */
  var heroEl = document.querySelector('.hero');
  if (heroEl) {
    var lockHeroHeight = function () {
      if (window.innerWidth > 768) { heroEl.style.height = ''; return; }
      heroEl.style.height = (window.innerHeight * 0.876) + 'px';
    };
    lockHeroHeight();
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(lockHeroHeight, 150);
    });
    window.addEventListener('orientationchange', lockHeroHeight);
  }

  /* ---------- scroll reveal ---------- */
  var revealables = document.querySelectorAll('[data-reveal]');
  if (reduced || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        var delay = i * 90;
        setTimeout(function () { entry.target.classList.add('is-in'); }, delay);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ---------- mobile menu (drawer) ---------- */
  var toggle = document.querySelector('.nav__toggle');
  var drawer = document.getElementById('drawer');
  var overlay = document.getElementById('drawer-overlay');
  var closeBtn = drawer ? drawer.querySelector('.drawer__close') : null;
  if (toggle && drawer && overlay) {
    var openDrawer = function () {
      overlay.hidden = false;
      requestAnimationFrame(function () {
        drawer.classList.add('is-open');
        overlay.classList.add('is-open');
      });
      drawer.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Fechar menu');
      document.body.classList.add('drawer-open');
    };
    var closeDrawer = function () {
      drawer.classList.remove('is-open');
      overlay.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
      document.body.classList.remove('drawer-open');
      setTimeout(function () { overlay.hidden = true; }, 400);
    };
    toggle.addEventListener('click', function () {
      var open = drawer.classList.contains('is-open');
      if (open) closeDrawer(); else openDrawer();
    });
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);
    drawer.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeDrawer();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer();
    });
  }

  /* ---------- dúvidas (objeção → pop-up) ---------- */
  var objModal = document.getElementById('obj-modal');
  var objModalQ = document.getElementById('obj-modal-q');
  var objModalA = document.getElementById('obj-modal-a');
  var objModalClose = document.getElementById('obj-modal-close');
  var objModalOverlay = document.getElementById('obj-modal-overlay');
  if (objModal && objModalQ && objModalA) {
    var openObjModal = function (q, a) {
      objModalQ.textContent = q;
      objModalA.textContent = a;
      objModal.classList.add('is-open');
      objModal.removeAttribute('aria-hidden');
      document.body.classList.add('drawer-open');
    };
    var closeObjModal = function () {
      objModal.classList.remove('is-open');
      objModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('drawer-open');
    };
    document.querySelectorAll('.depo__row').forEach(function (row) {
      row.addEventListener('click', function () {
        var q = row.querySelector('.depo__q');
        openObjModal(q ? q.textContent : '', row.getAttribute('data-ans') || '');
      });
    });
    if (objModalClose) objModalClose.addEventListener('click', closeObjModal);
    if (objModalOverlay) objModalOverlay.addEventListener('click', closeObjModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && objModal.classList.contains('is-open')) closeObjModal();
    });
  }

  /* ---------- lightbox de registros (somente mobile) ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxCaption = document.getElementById('lightbox-caption');
  var lightboxClose = document.getElementById('lightbox-close');
  var lightboxOverlay = document.getElementById('lightbox-overlay');
  if (lightbox && lightboxImg) {
    var openLightbox = function (src, alt, caption) {
      lightboxImg.src = src;
      lightboxImg.alt = alt || '';
      lightboxCaption.textContent = caption || '';
      lightbox.classList.add('is-open');
      lightbox.removeAttribute('aria-hidden');
      document.body.classList.add('drawer-open');
    };
    var closeLightbox = function () {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('drawer-open');
    };
    document.querySelectorAll('[data-lightbox]').forEach(function (frame) {
      frame.addEventListener('click', function () {
        if (window.innerWidth > 768) return;
        var img = frame.querySelector('img');
        openLightbox(frame.getAttribute('data-src'), img ? img.alt : '', frame.getAttribute('data-caption'));
      });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
    });
  }

  /* ---------- form validation ---------- */
  var form = document.getElementById('form-contato');
  var status = document.getElementById('form-status');
  if (form && status) {
    var setStatus = function (msg, ok) {
      status.textContent = msg;
      status.className = 'form__status ' + (ok ? 'is-ok' : 'is-error');
    };
    var mark = function (field, bad) {
      if (field) field.classList.toggle('is-error', !!bad);
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nome = form.nome, tel = form.telefone, mail = form.email, msg = form.mensagem;
      var digits = tel.value.replace(/\D/g, '');
      var emailOk = !mail.value.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail.value.trim());
      [nome, tel, mail, msg].forEach(function (f) { mark(f, false); });

      if (nome.value.trim().length < 3) { mark(nome, true); nome.focus(); return setStatus('Informe seu nome completo.'); }
      if (digits.length < 10) { mark(tel, true); tel.focus(); return setStatus('Informe um WhatsApp com DDD.'); }
      if (!emailOk) { mark(mail, true); mail.focus(); return setStatus('O e-mail informado parece inválido.'); }
      if (msg.value.trim().length < 15) { mark(msg, true); msg.focus(); return setStatus('Descreva o caso em pelo menos uma frase.'); }

      setStatus('Mensagem registrada. Retornaremos pelo WhatsApp no mesmo dia útil.', true);
      form.reset();
    });

    /* máscara simples de telefone */
    form.telefone.addEventListener('input', function (e) {
      var v = e.target.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 6) v = '(' + v.slice(0, 2) + ') ' + v.slice(2, v.length - 4) + '-' + v.slice(-4);
      else if (v.length > 2) v = '(' + v.slice(0, 2) + ') ' + v.slice(2);
      else if (v.length) v = '(' + v;
      e.target.value = v;
    });
  }
})();

/* ──────────────────────────────────────────────
   WHATSAPP PREMIUM (Balão flutuante, AG5 V4)

   Timeline:
     • t=0s  → usuário chega na 3ª seção (#servicos) → botão verde aparece imediatamente
     • t=25s → balão sobe ("digitando..." por 2.5s → mensagem real)
     • t=40s → balão some automaticamente (visível por 15s)
     • t=45s → badge vermelho "1" apareceria (só nicho tranquilo); advocacia é Compliance, badge não ativa

   Se o usuário fechar manualmente: nada mais acontece (Compliance).
   Se o usuário clicar no botão WhatsApp: tudo é limpo, abre wa.me.
─────────────────────────────────────────────── */
(function initWaPremium() {
  // ─── CONFIGURAÇÃO POR PROJETO ───
  const MODO_COMPLIANCE = true; // advocacia (OAB Provimento 205/2021) → nicho rigoroso, SEM badge

  const bubble        = document.getElementById('wa-message-bubble');
  const typing        = document.getElementById('wa-typing');
  const realMessage   = document.getElementById('wa-real-message');
  const badge         = document.getElementById('wa-notification');
  const closeBtn      = document.getElementById('wa-close-btn');
  const mainBtn       = document.getElementById('wa-main-btn');
  const targetSection = document.getElementById('servicos'); // 3ª seção da página

  if (!bubble || !typing || !realMessage || !closeBtn || !mainBtn || !targetSection) return;

  var DELAY_BALAO            = 25000; // 25s após entrar na seção
  var DURATION_TYPING        = 2500;  // 2.5s de "digitando..."
  var DURATION_BALAO_VISIVEL = 15000; // 15s exibido depois de aparecer
  var DELAY_BADGE_APOS_SUMIR = 5000;  // 5s após sumir → badge (só nicho tranquilo)

  var triggered = false;
  var autoHideTimer = null;
  var badgeTimer = null;
  var userClosed = false;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !triggered) {
        triggered = true;

        // Botão flutuante aparece imediatamente
        mainBtn.classList.add('visible');

        // t=25s → balão sobe
        setTimeout(function () {
          if (userClosed) return;
          bubble.classList.add('show');

          // 2.5s de "digitando..." → mensagem real (via classes utilitárias, sem inline style)
          setTimeout(function () {
            if (userClosed) return;
            typing.classList.add('is-hidden');
            realMessage.classList.add('is-visible');
            requestAnimationFrame(function () { realMessage.classList.add('is-in'); });
          }, DURATION_TYPING);

          // t=40s → balão some automaticamente
          autoHideTimer = setTimeout(function () {
            if (userClosed) return;
            bubble.classList.remove('show');

            // t=45s → badge "1" aparece (só se NÃO for Compliance)
            if (!MODO_COMPLIANCE && badge) {
              badgeTimer = setTimeout(function () {
                if (userClosed) return;
                badge.classList.add('show');
              }, DELAY_BADGE_APOS_SUMIR);
            }
          }, DURATION_BALAO_VISIVEL);
        }, DELAY_BALAO);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(targetSection);

  closeBtn.addEventListener('click', function (e) {
    e.preventDefault();
    userClosed = true;
    bubble.classList.remove('show');
    if (autoHideTimer) clearTimeout(autoHideTimer);
    if (badgeTimer) clearTimeout(badgeTimer);
    // Badge pós-close: só em nicho tranquilo
    if (!MODO_COMPLIANCE && badge) {
      setTimeout(function () { badge.classList.add('show'); }, DELAY_BADGE_APOS_SUMIR);
    }
  });

  mainBtn.addEventListener('click', function () {
    bubble.classList.remove('show');
    if (badge) badge.classList.remove('show');
    if (autoHideTimer) clearTimeout(autoHideTimer);
    if (badgeTimer) clearTimeout(badgeTimer);
  });
})();