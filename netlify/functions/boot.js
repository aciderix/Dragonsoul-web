// netlify/functions/boot.js
// Handles GET|POST /api/boot (DragonSoul boot data endpoint)
// Returns default player data so the MainMenu shows gold, diamonds, stamina

exports.handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  // Default player profile used when no real server is available.
  // hero_type values match the first 5 heroes from server.py DB defaults.
  const bootData = {
    status: 'ok',
    user_id: 1,
    name: 'DragonSoul',
    team_level: 50,
    diamonds: 500,
    gold: 100000,
    stamina: 60,
    shard_id: 1,
    heroes: [
      { hero_type: 1,  level: 75, xp: 0, stars: 6, rarity: 5 }, // apprentice
      { hero_type: 2,  level: 70, xp: 0, stars: 6, rarity: 5 }, // brozerker
      { hero_type: 3,  level: 65, xp: 0, stars: 5, rarity: 4 }, // centaur
      { hero_type: 4,  level: 60, xp: 0, stars: 5, rarity: 4 }, // dragon_lady
      { hero_type: 5,  level: 55, xp: 0, stars: 4, rarity: 3 }, // electroyeti
    ],
  };

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(bootData),
  };
};
