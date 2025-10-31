const cover = document.getElementById('letterCover');
const contenido = document.getElementById('contenido');
const toTop = document.getElementById('toTop');

// Bloquea scroll mientras está cerrada
document.documentElement.classList.add('no-scroll');
document.body?.classList?.add('no-scroll');

function openCover(){
  // dispara animaciones
  cover.classList.add('open');

  // espera a que ambas tapas terminen (keyframes)
  let done = 0;
  const onEnd = () => {
    done += 1;
    if (done < 2) return;
    cover.remove();
    document.documentElement.classList.remove('no-scroll');
    document.body?.classList?.remove('no-scroll');
    contenido.classList.add('ready');

    // scroll al primer bloque
    const first = document.getElementById('p1');
    if (first) first.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const top = cover.querySelector('.panel.top');
  const bottom = cover.querySelector('.panel.bottom');
  top.addEventListener('animationend', onEnd, { once:true });
  bottom.addEventListener('animationend', onEnd, { once:true });
}

cover.addEventListener('click', openCover);
cover.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCover(); }
});

// botón volver arriba
toTop?.addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

// ——— Personalización por querystring (opcional)
const q = new URLSearchParams(location.search);
const name = q.get('n');
if (name) {
  const s = document.getElementById('saludoTitulo');
  s.textContent = `¡Feliz cumpleaños, ${name}!`;
}
[
  ['saludoTexto','saludo'],
  ['agradecimientoTitulo','agrTit'],
  ['agradecimientoTexto','agr'],
  ['felicitacionesTitulo','felTit'],
  ['felicitacionesTexto','fel']
].forEach(([id,k])=>{
  const v = q.get(k);
  if (v) document.getElementById(id).textContent = v;
});
