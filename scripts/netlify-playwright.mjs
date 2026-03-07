#!/usr/bin/env node
/**
 * DragonSoul Web — Netlify + Playwright automation
 *
 * Usage:
 *   node scripts/netlify-playwright.mjs [options]
 *
 * Options:
 *   --wait-deploy        Wait for latest Netlify deploy to be ready
 *   --screenshot         Take a canvas screenshot
 *   --filter=PATTERN     Only print logs matching this string (e.g. --filter=MMS)
 *   --timeout=N          Seconds to wait for game boot (default: 90)
 *   --extra-wait=N       Extra seconds to collect more logs after boot (default: 5)
 *   --no-headless        Show browser window
 */

import pkg from '/opt/node22/lib/node_modules/playwright/index.js'; const { chromium } = pkg;
import { execSync } from 'child_process';

// ─── Config ───────────────────────────────────────────────────────────────────
const NETLIFY_TOKEN = 'nfp_woxowgMZje8cmxTmMH239DGizfEimZQ4fe22';
const SITE_URL      = 'https://dragonsoul.netlify.app';
const SITE_ID       = 'dragonsoul';   // will be resolved via API

// Parse CLI args
const args = process.argv.slice(2);
const waitDeploy  = args.includes('--wait-deploy');
const doScreenshot= args.includes('--screenshot');
const headless    = !args.includes('--no-headless');
const timeoutSec  = parseInt((args.find(a => a.startsWith('--timeout=')) || '--timeout=90').split('=')[1]);
const extraWaitSec= parseInt((args.find(a => a.startsWith('--extra-wait=')) || '--extra-wait=5').split('=')[1]);
const filter      = (args.find(a => a.startsWith('--filter=')) || '').split('=')[1] || null;

// ─── Netlify API helpers (via curl to avoid proxy issues) ──────────────────────
function netlifyFetch(path) {
    const result = execSync(
        `curl -s -H "Authorization: Bearer ${NETLIFY_TOKEN}" "https://api.netlify.com/api/v1${path}"`,
        { encoding: 'utf8', timeout: 30000 }
    );
    return JSON.parse(result);
}

function getSiteId() {
    const sites = netlifyFetch('/sites');
    const site  = sites.find(s => s.url === SITE_URL || s.name === SITE_ID || s.custom_domain === SITE_URL.replace('https://', ''));
    if (!site) {
        console.error('Available sites:', sites.map(s => `${s.name} → ${s.url}`).join(', '));
        throw new Error(`Site not found for ${SITE_URL}`);
    }
    return site.id;
}

async function waitForDeploy(siteId) {
    console.log('[Netlify] Waiting for deploy to finish...');
    for (let i = 0; i < 120; i++) {
        const deploys = netlifyFetch(`/sites/${siteId}/deploys?per_page=1`);
        const deploy  = deploys[0];
        const state   = deploy?.state;
        const created = deploy?.created_at;
        process.stdout.write(`\r[Netlify] Deploy state: ${state} (${created})   `);
        if (state === 'ready') { console.log('\n[Netlify] Deploy is ready!'); return deploy; }
        if (state === 'error') { throw new Error('Netlify deploy failed'); }
        await new Promise(r => setTimeout(r, 5000));
    }
    throw new Error('Timed out waiting for deploy');
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const logs = [];
let screenshotPath = null;

try {
    // 1. Optionally wait for deploy
    if (waitDeploy) {
        const siteId = getSiteId();
        await waitForDeploy(siteId);
    }

    // 2. Launch browser
    console.log(`[PW] Launching ${headless ? 'headless ' : ''}Chromium → ${SITE_URL}`);
    const _rawProxy = process.env.HTTPS_PROXY || process.env.HTTP_PROXY || '';
    let _proxyOpts = undefined;
    if (_rawProxy) {
        try {
            const _pu = new URL(_rawProxy);
            _proxyOpts = {
                server: _pu.protocol + '//' + _pu.hostname + ':' + _pu.port,
                username: decodeURIComponent(_pu.username || ''),
                password: decodeURIComponent(_pu.password || ''),
            };
        } catch(e) { console.warn('[PW] Could not parse proxy:', e.message); }
    }
    const browser = await chromium.launch({ headless, proxy: _proxyOpts });
    const context = await browser.newContext({
        ignoreHTTPSErrors: true,
        viewport: { width: 1280, height: 900 },
        userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
    });
    const page = await context.newPage();

    // 3. Capture ALL console messages
    page.on('console', msg => {
        const text = msg.text();
        const type = msg.type();
        const entry = { type, text };
        logs.push(entry);
        const show = !filter || text.includes(filter);
        if (show) {
            const prefix = type === 'error' ? '[ERR]' : type === 'warn' ? '[WRN]' : '[LOG]';
            console.log(`${prefix} ${text}`);
        }
    });
    page.on('pageerror', err => {
        logs.push({ type: 'pageerror', text: err.message });
        console.error('[PAGE-ERR]', err.message);
    });

    // 4. Navigate
    await page.goto(SITE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // 5. Wait for game to boot (MMS render OR timeout)
    const bootTimeout = timeoutSec * 1000;
    console.log(`[PW] Waiting up to ${timeoutSec}s for [MMS] render or render loop...`);
    try {
        await page.waitForFunction(() => window._mmsRender >= 3, { timeout: bootTimeout });
        console.log('[PW] MainMenuScreen confirmed rendering!');
    } catch {
        console.warn('[PW] MainMenuScreen not detected within timeout');
    }

    // 6. Extra wait for more log lines (scene dump, flush data, etc.)
    console.log(`[PW] Extra wait ${extraWaitSec}s to collect additional logs...`);
    await page.waitForTimeout(extraWaitSec * 1000);

    // 7. Screenshot
    if (doScreenshot) {
        screenshotPath = `/tmp/dragonsoul-screenshot-${Date.now()}.png`;
        await page.screenshot({ path: screenshotPath, fullPage: false });
        console.log(`[PW] Screenshot saved: ${screenshotPath}`);
    }

    // 8. Canvas pixel sample to detect black screen
    const canvasInfo = await page.evaluate(() => {
        const canvas = document.getElementById('game-canvas');
        if (!canvas) return { error: 'no canvas' };
        // Try reading pixels via WebGL readPixels
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        if (!gl) return { error: 'no webgl ctx' };
        const w = canvas.width, h = canvas.height;
        const pixels = new Uint8Array(4);
        const pts = [
            [Math.floor(w/2), Math.floor(h/2)],
            [100, 100],
            [w-100, 100],
            [100, h-100],
            [w-100, h-100],
        ];
        const samples = pts.map(([x, y]) => {
            gl.readPixels(x, h - y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
            return { x, y, r: pixels[0], g: pixels[1], b: pixels[2], a: pixels[3] };
        });
        const allBlack = samples.every(s => s.r === 0 && s.g === 0 && s.b === 0);
        return { w, h, samples, allBlack };
    });
    console.log('[PW] Canvas pixel samples:', JSON.stringify(canvasInfo, null, 2));

    // 9. Print summary
    console.log('\n═══ SUMMARY ═══');
    console.log(`Total console lines captured: ${logs.length}`);
    const mmsLogs = logs.filter(l => l.text.includes('[MMS]'));
    const smLogs  = logs.filter(l => l.text.includes('[SM]') || l.text.includes('[SS]'));
    const errLogs = logs.filter(l => l.type === 'error' || l.type === 'pageerror');
    console.log(`[MMS] logs: ${mmsLogs.length}`);
    console.log(`[SM]/[SS] logs: ${smLogs.length}`);
    console.log(`Page errors: ${errLogs.length}`);
    if (mmsLogs.length > 0) {
        console.log('Last [MMS] logs:');
        mmsLogs.slice(-10).forEach(l => console.log(' ', l.text));
    }
    if (smLogs.length > 0) {
        console.log('Last [SM]/[SS] logs:');
        smLogs.slice(-5).forEach(l => console.log(' ', l.text));
    }
    if (errLogs.length > 0) {
        console.log('First page errors:');
        errLogs.slice(0, 5).forEach(l => console.log(' ', l.text));
    }

    await browser.close();

} catch (err) {
    console.error('[FATAL]', err.message);
    process.exit(1);
}
