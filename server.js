import "dotenv/config";
import { createServer } from "node:http";
import twilio from "twilio";

const port = Number(process.env.API_PORT || 8787);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("API_PORT must be a valid TCP port.");
}

const MAX_BODY_BYTES = 4096;
const ROOM_NAME_PATTERN =
  /^patienthub-[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const IDENTITY_PATTERN = /^[a-zA-Z0-9_-]{1,64}$/;

function sendJson(response, status, body) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
  });
  response.end(JSON.stringify(body));
}

async function readJson(request) {
  let size = 0;
  const chunks = [];

  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) {
      throw Object.assign(new Error("Request body is too large."), {
        status: 413,
      });
    }
    chunks.push(chunk);
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw Object.assign(new Error("Request body must be valid JSON."), {
      status: 400,
    });
  }
}

const server = createServer(async (request, response) => {
  if (request.url !== "/api/call-token" || request.method !== "POST") {
    sendJson(response, 404, { error: "Not found." });
    return;
  }

  try {
    const body = await readJson(request);
    const roomName = body?.roomName;
    const identity = body?.identity;

    if (
      typeof roomName !== "string" ||
      !ROOM_NAME_PATTERN.test(roomName) ||
      typeof identity !== "string" ||
      !IDENTITY_PATTERN.test(identity)
    ) {
      sendJson(response, 400, { error: "Invalid room or participant identity." });
      return;
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const apiKeySid = process.env.TWILIO_API_KEY_SID;
    const apiKeySecret = process.env.TWILIO_API_KEY_SECRET;
    if (!accountSid || !apiKeySid || !apiKeySecret) {
      sendJson(response, 503, {
        error: "Twilio calling is not configured on the server.",
      });
      return;
    }

    const AccessToken = twilio.jwt.AccessToken;
    const token = new AccessToken(accountSid, apiKeySid, apiKeySecret, {
      identity,
      ttl: 3600,
    });
    token.addGrant(new AccessToken.VideoGrant({ room: roomName }));

    sendJson(response, 200, { token: token.toJwt() });
  } catch (error) {
    if (error.status) {
      sendJson(response, error.status, { error: error.message });
      return;
    }
    console.error("Unable to issue Twilio Video token:", error.message);
    sendJson(response, 500, { error: "Unable to start the call right now." });
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Twilio call-token API listening on port ${port}.`);
});
