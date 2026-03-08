// netlify/functions/login.js
// DragonSoul /login endpoint
// Creates or retrieves a player in Supabase, sets a ds_did cookie for session tracking.

const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

// Starter heroes matching gamedata.py get_starter_heroes()
// hero_type ordinals from UNIT_TYPE in gamedata.py
const STARTER_HEROES = [
  { hero_num: 0, hero_type: 30, level: 1, stars: 1, rarity: 1, xp: 0 }, // CRIMSON_WITCH
  { hero_num: 1, hero_type:  1, level: 1, stars: 1, rarity: 1, xp: 0 }, // ELECTROYETI
  { hero_num: 2, hero_type:  3, level: 1, stars: 1, rarity: 1, xp: 0 }, // FAITH_HEALER
  { hero_num: 3, hero_type:  8, level: 1, stars: 1, rarity: 1, xp: 0 }, // CENTAUR_OF_ATTENTION
  { hero_num: 4, hero_type:  4, level: 1, stars: 1, rarity: 1, xp: 0 }, // DARK_DRACUL
];

function parseCookies(str = '') {
  const out = {};
  str.split(';').forEach(part => {
    const [k, ...v] = part.trim().split('=');
    if (k) out[k.trim()] = v.join('=').trim();
  });
  return out;
}

exports.handler = async (event) => {
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  // Resolve device_id: cookie > query param > generated
  const cookies = parseCookies(event.headers.cookie);
  let deviceId = cookies['ds_did'];

  if (!deviceId) {
    const q = event.queryStringParameters || {};
    deviceId = q.uniqueIdentifier || q.deviceId || null;
  }
  if (!deviceId && event.body) {
    try {
      const p = new URLSearchParams(event.body);
      deviceId = p.get('uniqueIdentifier') || p.get('deviceId') || null;
    } catch (_) {}
  }
  if (!deviceId) deviceId = 'web_' + crypto.randomUUID();

  // Persist player in Supabase when credentials are available
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const sb = createClient(supabaseUrl, supabaseKey);

      const { data: existing } = await sb
        .from('players')
        .select('id')
        .eq('device_id', deviceId)
        .maybeSingle();

      if (!existing) {
        // Get next user_id from sequence
        const { data: uid } = await sb.rpc('next_user_id');
        const userId = uid || Date.now();

        const { data: newPlayer, error: insErr } = await sb
          .from('players')
          .insert({ device_id: deviceId, user_id: userId })
          .select('id')
          .single();

        if (!insErr && newPlayer) {
          const heroRows = STARTER_HEROES.map(h => ({ player_id: newPlayer.id, ...h }));
          await sb.from('heroes').insert(heroRows);
        }
      } else {
        await sb
          .from('players')
          .update({ last_login: new Date().toISOString() })
          .eq('device_id', deviceId);
      }
    } catch (e) {
      console.error('[login] Supabase error:', e.message);
    }
  }

  const cookie = `ds_did=${deviceId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000`;

  return {
    statusCode: 200,
    headers: { ...corsHeaders, 'Set-Cookie': cookie },
    body: JSON.stringify({
      status: 'good',
      data: '',                       // No TCP server — web client uses loginBase for /api/boot
      requestID: crypto.randomUUID(),
    }),
  };
};
