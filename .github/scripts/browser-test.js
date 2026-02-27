/**
 * DragonSoul Web — Playwright headless browser test
 *
 * Ce script lance le jeu dans un Chromium headless et capture :
 * - Tous les messages console (log, warn, error)
 * - Les valeurs des status indicators (WebGL, Bridge, create(), render())
 * - Des screenshots à intervalles réguliers
 * - Un rapport JSON final
 *
 * Résultats dans /tmp/dragonsoul-test/
 */

const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = '/tmp/dragonsoul-test';
const BASE_URL = 'http://localhost:8080/';
const TEST_DURATION_MS = 45_000;   // 45 secondes de test
const SCREENSHOT_INTERVAL_MS = 5_000;

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const consoleLogs = [];
const errors = [];

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  consoleLogs.push(line);
}

function readStatus(page, id) {
  return page.evaluate((elId) => {
    const el = document.getElementById(elId);
    return el ? { text: el.textContent.trim(), className: el.className } : null;
  }, id);
}

(async () => {
  log('=== DragonSoul Playwright Test ===');
  log(`URL: ${BASE_URL}`);
  log(`Durée du test: ${TEST_DURATION_MS / 1000}s`);

  const browser = await chromium.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--enable-webgl',
      '--use-gl=swiftshader',           // SwiftShader = WebGL software renderer (pas besoin de GPU)
      '--enable-unsafe-webgpu',
      '--disable-web-security',
    ],
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
  });

  const page = await context.newPage();

  // --- Intercepter $hashCode sur undefined avant le boot TeaVM ---
  // Cela permet de trouver exactement où le crash se produit
  await page.addInitScript(() => {
    // Quand ju_HashMap_putImpl est chargé, on le wrappe pour logger le contexte
    // On utilise un Proxy sur window pour détecter quand la fonction est définie
    let _hashCodeTrapped = false;
    const _origDefProp = Object.defineProperty;
    Object.defineProperty(window, 'ju_HashMap_putImpl', {
      configurable: true,
      set(fn) {
        _origDefProp(window, 'ju_HashMap_putImpl', {
          configurable: true, writable: true,
          value: function($this, $key, $value) {
            if (!_hashCodeTrapped && ($key === undefined || $key === null && false)) {
              _hashCodeTrapped = true;
              console.error('[HASHCODE TRAP] key=undefined in ju_HashMap_putImpl, stack:', new Error().stack);
            }
            try {
              return fn($this, $key, $value);
            } catch(e) {
              if (e && e.message && e.message.includes('hashCode')) {
                console.error('[HASHCODE CRASH] key=' + JSON.stringify($key) + ' type=' + typeof $key + ' stack:', new Error().stack.split('\n').slice(0,8).join('\n'));
                console.error('[HASHCODE CRASH] error:', e.stack || e.message);
              }
              throw e;
            }
          }
        });
      }
    });
    // Aussi pour juc_ConcurrentHashMap_put
    Object.defineProperty(window, 'juc_ConcurrentHashMap_put', {
      configurable: true,
      set(fn) {
        _origDefProp(window, 'juc_ConcurrentHashMap_put', {
          configurable: true, writable: true,
          value: function($this, $key, $value) {
            try {
              return fn($this, $key, $value);
            } catch(e) {
              if (e && e.message && e.message.includes('hashCode')) {
                console.error('[CHASHCODE CRASH] key=' + JSON.stringify($key) + ' type=' + typeof $key + ' stack:', new Error().stack.split('\n').slice(0,8).join('\n'));
              }
              throw e;
            }
          }
        });
      }
    });
  });

  // --- Capturer tous les messages console ---
  page.on('console', (msg) => {
    const type = msg.type();
    const text = msg.text();
    const entry = { type, text, time: Date.now() };
    consoleLogs.push(entry);
    const prefix = type === 'error' ? '❌ [ERROR]' : type === 'warning' ? '⚠️  [WARN]' : '   [LOG]';
    log(`${prefix} ${text}`);
    if (type === 'error') errors.push(entry);
  });

  // --- Capturer les erreurs non catchées ---
  page.on('pageerror', (err) => {
    const entry = { type: 'pageerror', text: err.message, stack: err.stack, time: Date.now() };
    consoleLogs.push(entry);
    errors.push(entry);
    log(`💥 [PAGE ERROR] ${err.message}`);
    if (err.stack) {
      err.stack.split('\n').slice(0, 5).forEach(line => log(`   ${line}`));
    }
  });

  // --- Capturer les requêtes réseau échouées ---
  page.on('requestfailed', (req) => {
    log(`🔴 [NET FAIL] ${req.url()} — ${req.failure()?.errorText}`);
  });

  // --- Ouvrir la page ---
  log('Navigation vers ' + BASE_URL);
  const response = await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  log(`HTTP response: ${response.status()}`);

  // --- Attendre que classes.js soit chargé (peut prendre plusieurs secondes pour 83MB) ---
  log('Attente du chargement de classes.js (83MB)...');
  try {
    await page.waitForFunction(
      () => typeof window.main === 'function',
      { timeout: 60_000, polling: 1000 }
    );
    log('✅ classes.js chargé — window.main disponible');
  } catch (e) {
    log('❌ Timeout: window.main non disponible après 60s');
    errors.push({ type: 'timeout', text: 'window.main not found after 60s' });
  }

  // --- Screenshot initial ---
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'screenshot-00-initial.png') });
  log('Screenshot: screenshot-00-initial.png');

  // --- Attendre la fin de game.create() ---
  log('Attente de game.create()...');
  let createOk = false;
  try {
    await page.waitForFunction(
      () => {
        const el = document.getElementById('st-create');
        return el && (el.textContent.includes('OK') || el.textContent.includes('EXCEPTION') || el.textContent.includes('fail'));
      },
      { timeout: 30_000, polling: 500 }
    );
    const stCreate = await readStatus(page, 'st-create');
    createOk = stCreate?.text === 'OK' || stCreate?.className?.includes('ok');
    log(`game.create() status: ${JSON.stringify(stCreate)}`);
  } catch (e) {
    log('❌ Timeout: game.create() na pas fini dans les 30s');
  }

  await page.screenshot({ path: path.join(OUTPUT_DIR, 'screenshot-01-after-create.png') });
  log('Screenshot: screenshot-01-after-create.png');

  // --- Lire tous les status indicators ---
  const statusIds = ['st-webgl', 'st-bridge', 'st-create', 'st-render', 'st-frames'];
  const statuses = {};
  for (const id of statusIds) {
    statuses[id] = await readStatus(page, id);
  }
  log('Status indicators: ' + JSON.stringify(statuses, null, 2));

  // --- Lire le log visible dans la page ---
  const pageLog = await page.evaluate(() => {
    const el = document.getElementById('console');
    return el ? el.innerText : '(console div not found)';
  });
  log('=== Contenu du log in-page ===');
  pageLog.split('\n').forEach(line => log('  ' + line));
  log('=== Fin du log in-page ===');

  // --- Attendre 10s pour voir si le render loop démarre ---
  log('Attente 10s pour le render loop...');
  await page.waitForTimeout(10_000);

  const stRender = await readStatus(page, 'st-render');
  const stFrames = await readStatus(page, 'st-frames');
  log(`render() status après 10s: ${JSON.stringify(stRender)}`);
  log(`frames count: ${JSON.stringify(stFrames)}`);

  await page.screenshot({ path: path.join(OUTPUT_DIR, 'screenshot-02-after-10s.png') });
  log('Screenshot: screenshot-02-after-10s.png');

  // --- Attendre encore 15s et screenshot final ---
  log('Attente 15s supplémentaires...');
  await page.waitForTimeout(15_000);

  const stFramesFinal = await readStatus(page, 'st-frames');
  const stRenderFinal = await readStatus(page, 'st-render');
  log(`render() status final: ${JSON.stringify(stRenderFinal)}`);
  log(`frames count final: ${JSON.stringify(stFramesFinal)}`);

  await page.screenshot({ path: path.join(OUTPUT_DIR, 'screenshot-03-final.png') });
  log('Screenshot: screenshot-03-final.png');

  // --- Récupérer les draw calls WebGL comptés ---
  const webglStats = await page.evaluate(() => {
    return {
      shaderCount: window._shaderCount || 0,
      programCount: window._programCount || 0,
      drawCallCount: window._drawCallCount || 0,
    };
  });
  log(`WebGL stats: ${JSON.stringify(webglStats)}`);

  // --- Rapport final ---
  const report = {
    timestamp: new Date().toISOString(),
    url: BASE_URL,
    statuses,
    webglStats,
    errorCount: errors.length,
    errors: errors.slice(0, 50),  // max 50 erreurs dans le rapport
    frames: stFramesFinal?.text,
    renderOk: stRenderFinal?.className?.includes('ok') || false,
    createOk,
  };

  const reportPath = path.join(OUTPUT_DIR, 'report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  log(`Rapport JSON: ${reportPath}`);

  const logPath = path.join(OUTPUT_DIR, 'console.log');
  const logContent = consoleLogs.map(e =>
    typeof e === 'string' ? e : `[${e.type.toUpperCase()}] ${e.text}`
  ).join('\n');
  fs.writeFileSync(logPath, logContent);
  log(`Logs complets: ${logPath}`);

  // --- Résumé ---
  log('');
  log('========== RÉSUMÉ DU TEST ==========');
  log(`WebGL2:      ${statuses['st-webgl']?.text || 'N/A'}`);
  log(`Bridge:      ${statuses['st-bridge']?.text || 'N/A'}`);
  log(`create():    ${statuses['st-create']?.text || 'N/A'}`);
  log(`render():    ${stRenderFinal?.text || 'N/A'}`);
  log(`Frames:      ${stFramesFinal?.text || '0'}`);
  log(`Draw calls:  ${webglStats.drawCallCount}`);
  log(`Erreurs JS:  ${errors.length}`);
  log(`Shaders GL:  ${webglStats.shaderCount}`);
  log(`Programs GL: ${webglStats.programCount}`);
  log('=====================================');

  if (report.renderOk && webglStats.drawCallCount > 0) {
    log('✅ TEST RÉUSSI — render() fonctionne avec des draw calls WebGL !');
  } else if (report.createOk) {
    log('⚠️  create() OK mais render() pas encore fonctionnel');
  } else {
    log('❌ TEST ÉCHOUÉ — voir les erreurs ci-dessus');
  }

  await browser.close();

  // Exit code selon le résultat
  // On ne fait pas échouer le job CI même si le jeu crashe —
  // le but est de collecter les logs, pas de gater un merge.
  process.exit(0);
})().catch((err) => {
  log(`FATAL: ${err.message}`);
  if (err.stack) log(err.stack);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'fatal.log'), err.stack || err.message);
  process.exit(1);
});
