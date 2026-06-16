/* Canvas Background Effects for Cape Town Peptide Club */

(function() {
  'use strict';

  const activeCleanups = new Map();

  function initTopographicHuman(canvas) {
    if (activeCleanups.has(canvas)) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.offsetWidth || canvas.parentElement?.offsetWidth || 800;
    let h = canvas.offsetHeight || canvas.parentElement?.offsetHeight || 600;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    let time = 0;
    let mouseX = w * 0.7;
    let mouseY = h * 0.5;
    let raf;

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', onMove);

    const bodyPoints = [
      { x: 0.5, y: 0.15, r: 0.08 }, { x: 0.5, y: 0.23, r: 0.03 },
      { x: 0.35, y: 0.28, r: 0.06 }, { x: 0.65, y: 0.28, r: 0.06 },
      { x: 0.5, y: 0.32, r: 0.07 }, { x: 0.28, y: 0.35, r: 0.05 },
      { x: 0.72, y: 0.35, r: 0.05 }, { x: 0.25, y: 0.48, r: 0.04 },
      { x: 0.75, y: 0.48, r: 0.04 }, { x: 0.22, y: 0.6, r: 0.035 },
      { x: 0.78, y: 0.6, r: 0.035 }, { x: 0.5, y: 0.42, r: 0.06 },
      { x: 0.42, y: 0.5, r: 0.065 }, { x: 0.58, y: 0.5, r: 0.065 },
      { x: 0.4, y: 0.62, r: 0.07 }, { x: 0.6, y: 0.62, r: 0.07 },
      { x: 0.38, y: 0.75, r: 0.05 }, { x: 0.62, y: 0.75, r: 0.05 },
      { x: 0.37, y: 0.88, r: 0.04 }, { x: 0.63, y: 0.88, r: 0.04 },
      { x: 0.36, y: 0.98, r: 0.03 }, { x: 0.64, y: 0.98, r: 0.03 },
    ];

    function field(x, y) {
      let f = 0;
      for (const p of bodyPoints) {
        const dx = x - p.x, dy = y - p.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        f += Math.exp(-(d * d) / (p.r * p.r * 0.5));
      }
      return f;
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      time += 0.008;
      const mx = mouseX / w, my = mouseY / h;
      const mInf = (x, y) => {
        const dx = x - mx, dy = y - my;
        return Math.exp(-(dx * dx + dy * dy) / 0.03) * 0.015;
      };

      // Contour lines
      for (let i = 0; i < 80; i++) {
        const thr = 0.02 + (i / 80) * 0.95;
        const op = i < 15 ? 0.03 : i > 70 ? 0.02 : 0.035 + Math.sin(i * 0.1) * 0.015;
        ctx.beginPath();
        let started = false;
        for (let px = 0; px <= w; px += 4) {
          for (let py = 0; py <= h; py += 4) {
            const nx = px / w, ny = py / h;
            const val = field(nx, ny)
              + Math.sin(nx * 8 + time * 2 + i * 0.05) * 0.01
              + Math.cos(ny * 6 + time * 1.5 + i * 0.03) * 0.01
              + mInf(nx, ny);
            if (Math.abs(val - thr) < 0.015) {
              if (!started) { ctx.moveTo(px, py); started = true; }
              else ctx.lineTo(px, py);
            } else { started = false; }
          }
        }
        ctx.strokeStyle = 'rgba(193, 224, 51, ' + op + ')';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Flowing lines
      for (let y = 0; y < h; y += 8) {
        const ny = y / h;
        const bf = field(0.5, ny);
        if (bf < 0.05) continue;
        ctx.beginPath();
        for (let x = 0; x < w; x += 2) {
          const nx = x / w;
          const wave = Math.sin(nx * 12 + time * 3 + ny * 8) * 8 * Math.sin(ny * 4 + time) * bf;
          if (x === 0) ctx.moveTo(x, y + wave); else ctx.lineTo(x, y + wave);
        }
        ctx.strokeStyle = 'rgba(193, 224, 51, ' + (bf * 0.12) + ')';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Nodes
      for (const p of bodyPoints) {
        const px = p.x * w, py = p.y * h;
        const pulse = Math.sin(time * 3 + p.x * 10) * 0.5 + 0.5;
        const rad = (2 + pulse * 3) * p.r * 10;
        ctx.beginPath(); ctx.arc(px, py, rad, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(193, 224, 51, ' + (0.03 * pulse) + ')'; ctx.fill();
        ctx.beginPath(); ctx.arc(px, py, rad * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(193, 224, 51, ' + (0.08 * pulse) + ')'; ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }
    draw();

    const onResize = () => {
      w = canvas.offsetWidth || canvas.parentElement?.offsetWidth || 800;
      h = canvas.offsetHeight || canvas.parentElement?.offsetHeight || 600;
      canvas.width = w * dpr; canvas.height = h * dpr; ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', onResize);

    activeCleanups.set(canvas, () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
    });
  }

  function initNeuralField(canvas, density) {
    if (activeCleanups.has(canvas)) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.offsetWidth || 400;
    let h = canvas.offsetHeight || 300;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr; canvas.height = h * dpr; ctx.scale(dpr, dpr);

    const particles = [];
    for (let i = 0; i < density; i++) {
      particles.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        r: 1 + Math.random() * 2, pulse: Math.random() * Math.PI * 2,
        ps: 0.02 + Math.random() * 0.03,
      });
    }

    let time = 0, raf;
    function draw() {
      ctx.clearRect(0, 0, w, h); time += 0.016;
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy; p.pulse += p.ps;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        const a = (Math.sin(p.pulse) * 0.5 + 0.5) * 0.4;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(193, 224, 51, ' + a + ')'; ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const a = (1 - dist / 120) * 0.08;
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(193, 224, 51, ' + a + ')'; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }
    draw();

    const onResize = () => {
      w = canvas.offsetWidth || 400; h = canvas.offsetHeight || 300;
      canvas.width = w * dpr; canvas.height = h * dpr; ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', onResize);
    activeCleanups.set(canvas, () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); });
  }

  function initWaveGrid(canvas) {
    if (activeCleanups.has(canvas)) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.offsetWidth || 800, h = canvas.offsetHeight || 600;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr; canvas.height = h * dpr; ctx.scale(dpr, dpr);

    let time = 0, raf;
    const spacing = 40;

    function draw() {
      ctx.clearRect(0, 0, w, h); time += 0.01;
      for (let y = 0; y < h; y += spacing) {
        ctx.beginPath();
        for (let x = 0; x < w; x += 2) {
          const wave = Math.sin((x / w) * Math.PI * 4 + time + (y / h) * 3) * 10 +
                       Math.sin((x / w) * Math.PI * 2 - time * 0.5 + (y / h) * 5) * 5;
          if (x === 0) ctx.moveTo(x, y + wave); else ctx.lineTo(x, y + wave);
        }
        ctx.strokeStyle = 'rgba(193, 224, 51, 0.015)'; ctx.lineWidth = 0.8; ctx.stroke();
      }
      for (let x = 0; x < w; x += spacing) {
        ctx.beginPath();
        for (let y = 0; y < h; y += 2) {
          const wave = Math.sin((y / h) * Math.PI * 3 + time * 0.7 + (x / w) * 4) * 8 +
                       Math.cos((y / h) * Math.PI * 5 - time + (x / w) * 2) * 4;
          if (y === 0) ctx.moveTo(x + wave, y); else ctx.lineTo(x + wave, y);
        }
        ctx.strokeStyle = 'rgba(193, 224, 51, 0.012)'; ctx.lineWidth = 0.8; ctx.stroke();
      }
      for (let x = 0; x < w; x += spacing) {
        for (let y = 0; y < h; y += spacing) {
          const pulse = Math.sin(time * 2 + (x / w) * 5 + (y / h) * 5) * 0.5 + 0.5;
          ctx.beginPath(); ctx.arc(x, y, 1.2 * pulse, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(193, 224, 51, ' + (0.06 * pulse) + ')'; ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    }
    draw();

    const onResize = () => {
      w = canvas.offsetWidth || 800; h = canvas.offsetHeight || 600;
      canvas.width = w * dpr; canvas.height = h * dpr; ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', onResize);
    activeCleanups.set(canvas, () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); });
  }

  function initDataStream(canvas) {
    if (activeCleanups.has(canvas)) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.offsetWidth || 800, h = canvas.offsetHeight || 400;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr; canvas.height = h * dpr; ctx.scale(dpr, dpr);

    const cols = Math.floor(w / 20);
    const drops = [];
    for (let i = 0; i < cols; i++) drops[i] = Math.random() * -100;
    const chars = '01';
    let raf;

    function draw() {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.08)'; ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < cols; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 20, y = drops[i] * 14;
        ctx.fillStyle = 'rgba(193, 224, 51, ' + (0.15 + Math.random() * 0.1) + ')';
        ctx.font = '10px monospace'; ctx.fillText(char, x, y);
        for (let t = 1; t < 8; t++) {
          const ty = y - t * 14;
          if (ty > 0) { ctx.fillStyle = 'rgba(193, 224, 51, ' + (0.02 / t) + ')'; ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, ty); }
        }
        drops[i]++;
        if (y > h && Math.random() > 0.975) drops[i] = 0;
      }
      raf = requestAnimationFrame(draw);
    }
    draw();

    const onResize = () => {
      w = canvas.offsetWidth || 800; h = canvas.offsetHeight || 400;
      canvas.width = w * dpr; canvas.height = h * dpr; ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', onResize);
    activeCleanups.set(canvas, () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); });
  }

  function scan() {
    document.querySelectorAll('canvas[data-effect="topographic"]').forEach(c => initTopographicHuman(c));
    document.querySelectorAll('canvas[data-effect="neural"]').forEach(c => initNeuralField(c, parseInt(c.dataset.density) || 60));
    document.querySelectorAll('canvas[data-effect="wavegrid"]').forEach(c => initWaveGrid(c));
    document.querySelectorAll('canvas[data-effect="datastream"]').forEach(c => initDataStream(c));
  }

  // Initial scan + MutationObserver for React dynamically added canvases
  scan();
  const observer = new MutationObserver((mutations) => {
    let shouldScan = false;
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node.nodeType === 1) {
          const el = node;
          if (el.tagName === 'CANVAS' && el.dataset.effect) shouldScan = true;
          else if (el.querySelector && el.querySelector('canvas[data-effect]')) shouldScan = true;
        }
      }
    }
    if (shouldScan) scan();
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
