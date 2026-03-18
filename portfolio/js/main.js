/* ============================================================
   PORTFOLIO EMILIANA AMARO — main.js
   ============================================================ */

/* --- Cursor personalizado --- */
const dot  = document.getElementById('cur-dot');
const ring = document.getElementById('cur-ring');
if (dot && ring) {
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });
  (function tick() {
    rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(tick);
  })();
  document.querySelectorAll('a,button,.sk-card,.proj-card,.svc-card,.cert-item,.exp-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovered'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovered'));
  });
}

/* --- Nav scroll stuck --- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('stuck', scrollY > 50), { passive: true });

/* --- Mobile menu --- */
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
}));

/* --- Scroll reveal --- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* --- Skill bars animadas --- */
const barIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const fill = e.target.querySelector('.sk-fill');
      const lvl  = e.target.dataset.level;
      if (fill && lvl) { setTimeout(() => fill.style.width = lvl + '%', 200); }
      barIO.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.sk-card').forEach(c => barIO.observe(c));

/* --- Typewriter --- */
const roles = [
  'Frontend Developer Junior',
  'Desarrolladora Web',
  'Maquetadora · HTML / CSS',
  'Apasionada del código limpio'
];
let ri = 0, ci = 0, deleting = false;
const rt = document.getElementById('roleText');
if (rt) {
  setInterval(() => {
    const cur = roles[ri];
    if (!deleting) {
      rt.textContent = cur.slice(0, ++ci);
      if (ci === cur.length) { deleting = true; setTimeout(() => {}, 1200); }
    } else {
      rt.textContent = cur.slice(0, --ci);
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
    }
  }, deleting ? 55 : 80);
}

/* --- Back to top --- */
const btt = document.getElementById('btt');
window.addEventListener('scroll', () => btt.classList.toggle('show', scrollY > 500), { passive: true });
btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* --- Formulario de contacto --- */
const cform = document.getElementById('cform');
const fmsg  = document.getElementById('fmsg');
if (cform) {
  cform.addEventListener('submit', e => {
    e.preventDefault();
    const v = f => cform[f].value.trim();
    if (!v('nombre') || !v('email') || !v('asunto') || !v('mensaje')) {
      fmsg.className = 'form-msg err show';
      fmsg.textContent = '⚠ Por favor rellena todos los campos obligatorios.';
      return;
    }
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailReg.test(v('email'))) {
      fmsg.className = 'form-msg err show';
      fmsg.textContent = '⚠ Introduce un email válido.';
      return;
    }
    fmsg.className = 'form-msg ok show';
    fmsg.textContent = '✓ ¡Mensaje enviado! Me pondré en contacto contigo pronto.';
    cform.reset();
    setTimeout(() => { fmsg.className = 'form-msg'; }, 5000);
  });
}
