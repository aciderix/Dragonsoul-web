// netlify/functions/boot.js
// DragonSoul /api/boot endpoint
// Returns full player state (resources + heroes + campaign) as JSON.
// The web client (Fix88/89 in classes.js) reads this to populate the game.

const { createClient } = require('@supabase/supabase-js');

function parseCookies(str = '') {
  const out = {};
  str.split(';').forEach(part => {
    const [k, ...v] = part.trim().split('=');
    if (k) out[k.trim()] = v.join('=').trim();
  });
  return out;
}

// Fallback when no session cookie or Supabase unavailable.
// hero_type ordinals from gamedata.py UNIT_TYPE (must match client enum exactly).
// Only heroes with local Spine assets are included (see HEROES dict in gamedata.py).
const DEFAULT_BOOT = {
  user_id: 10001,
  name: 'Hero',
  team_level: 1,
  gold: 0,
  diamonds: 0,
  stamina: 60,
  raid_tickets: 5,
  tutorial_step: 999,
  campaign_progress: {},
  lineups: { 1: [0, 1, 2, 3, 4] },
  heroes: [
    { hero_num: 0, hero_type: 30, level: 1, stars: 1, rarity: 1, xp: 0 }, // CRIMSON_WITCH
    { hero_num: 1, hero_type:  1, level: 1, stars: 1, rarity: 1, xp: 0 }, // ELECTROYETI
    { hero_num: 2, hero_type:  3, level: 1, stars: 1, rarity: 1, xp: 0 }, // FAITH_HEALER
    { hero_num: 3, hero_type:  8, level: 1, stars: 1, rarity: 1, xp: 0 }, // CENTAUR_OF_ATTENTION
    { hero_num: 4, hero_type:  4, level: 1, stars: 1, rarity: 1, xp: 0 }, // DARK_DRACUL
  ],
};

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

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
  const cookies = parseCookies(event.headers.cookie);
  const deviceId = cookies['ds_did'];

  if (!deviceId || !supabaseUrl || !supabaseKey) {
    return { statusCode: 200, headers: corsHeaders, body: JSON.stringify(DEFAULT_BOOT) };
  }

  try {
    const sb = createClient(supabaseUrl, supabaseKey);

    const { data: player } = await sb
      .from('players')
      .select('*')
      .eq('device_id', deviceId)
      .maybeSingle();

    if (!player) {
      return { statusCode: 200, headers: corsHeaders, body: JSON.stringify(DEFAULT_BOOT) };
    }

    const { data: heroRows } = await sb
      .from('heroes')
      .select('hero_num, hero_type, level, stars, rarity, xp')
      .eq('player_id', player.id)
      .order('hero_num');

    const boot = {
      user_id:           player.user_id,
      name:              player.name,
      team_level:        player.team_level,
      gold:              player.gold,
      diamonds:          player.diamonds,
      stamina:           player.stamina,
      raid_tickets:      player.raid_tickets,
      tutorial_step:     player.tutorial_step,
      campaign_progress: player.campaign_progress || {},
      lineups:           player.lineups           || { 1: [0, 1, 2, 3, 4] },
      heroes: (heroRows || []).map(h => ({
        hero_num:  h.hero_num,
        hero_type: h.hero_type,
        level:     h.level,
        stars:     h.stars,
        rarity:    h.rarity,
        xp:        h.xp,
      })),
    };

    return { statusCode: 200, headers: corsHeaders, body: JSON.stringify(boot) };

  } catch (e) {
    console.error('[boot] Supabase error:', e.message);
    return { statusCode: 200, headers: corsHeaders, body: JSON.stringify(DEFAULT_BOOT) };
  }
};
