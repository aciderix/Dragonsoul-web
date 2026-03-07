// netlify/functions/login.js
// Handles POST /login (DragonSoul login endpoint)
// Returns a server address so the game knows where to fetch /api/boot

exports.handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  // Return empty data string: WebNet_a will then use the login server base URL for /api/boot
  // which will be https://dragonsoul.netlify.app, matching our /api/boot redirect
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      status: 'good',
      data: '',          // empty = use loginBase (current origin) for /api/boot
      requestID: Date.now().toString(),
    }),
  };
};
