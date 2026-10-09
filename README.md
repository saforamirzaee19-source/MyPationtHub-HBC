# MyPatientHUB

React + Vite app for MyPatientHUB.

## Routes
- `/` — Sign in
- `/dashboard` — Dashboard
- `/chat` — Chat and room-based voice/video calls

## Run it
```bash
npm install
npm run dev
```
`npm run build` produces a production build in `dist/`.

## Twilio room calls

Chat's call buttons create a shareable Twilio Video room link. Voice calls use
an audio-only room; video calls use audio and video. Anyone with the link can
join the room, so share it only with the intended participant.

1. Create a Twilio project and an API key/secret for Programmable Video.
2. Copy `.env.example` to `.env` and fill in the Twilio Account SID, API key
   SID, and API key secret. Keep `.env` private; never put these credentials in
   frontend variables or commit the file.
3. Run `npm install` and `npm run dev`. The development command starts both
   Vite and the token API; the app is available at `http://localhost:5173`.
4. Select a chat and choose the voice or video button. Copy the invite link
   from the call window and send it to the other participant. The recipient
   must open the link in a secure context (localhost or HTTPS) and allow
   microphone/camera access.

For deployment, serve the frontend over HTTPS and proxy `/api/call-token` to
the Node API server. Configure the server's environment variables in the
hosting platform. Room links are bearer links and this sample app has no
authenticated user/room authorization; do not use it for protected health
information without appropriate authentication, access controls, and a
Twilio configuration/Business Associate Agreement suitable for that use.
