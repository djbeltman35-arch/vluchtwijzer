// Doorgeefluik naar Travelpayouts (Aviasales prijzen). De token staat alleen als Netlify-omgevingsvariabele
// TRAVELPAYOUTS_TOKEN, nooit in de code of in de browser. Alleen het endpoint prices_for_dates is toegestaan.
const OK = new Set(["origin", "destination", "departure_at", "return_at", "currency", "market", "sorting", "limit", "one_way", "direct", "page", "unique"]);
export default async (req) => {
  const token = Netlify.env.get("TRAVELPAYOUTS_TOKEN");
  const hdr = { "content-type": "application/json; charset=utf-8", "cache-control": "public, max-age=900", "x-content-type-options": "nosniff" };
  if (!token) return new Response('{"success":false,"error":"nokey"}', { status: 503, headers: hdr });
  const u = new URL(req.url);
  if (!u.pathname.endsWith("/aviasales/v3/prices_for_dates")) return new Response('{"success":false}', { status: 404, headers: hdr });
  const q = new URLSearchParams();
  for (const [k, v] of u.searchParams) if (OK.has(k) && /^[A-Za-z0-9_\-:]{1,20}$/.test(v)) q.set(k, v);
  if (!q.get("origin") || !q.get("destination")) return new Response('{"success":false,"error":"params"}', { status: 400, headers: hdr });
  try {
    const r = await fetch("https://api.travelpayouts.com/aviasales/v3/prices_for_dates?" + q, { headers: { "X-Access-Token": token, "Accept-Encoding": "gzip" }, signal: AbortSignal.timeout(9000) });
    return new Response(await r.text(), { status: r.status, headers: hdr });
  } catch (e) {
    return new Response('{"success":false,"error":"upstream"}', { status: 502, headers: hdr });
  }
};
export const config = { path: "/api/tp/*", rateLimit: { windowLimit: 60, windowSize: 60, aggregateBy: ["ip", "domain"] } };
