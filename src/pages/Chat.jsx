import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { useSearchParams } from "react-router-dom";
import AppShell, { SiteFooter } from "../components/AppShell.jsx";
import useLegacyScript from "../hooks/useLegacyScript.js";
import Khairullah from "../assets/images/khairullah.jpg";
import Mustafa from "../assets/images/doctor-6.jpg";
import Noman from "../assets/images/doctor-7.jpg";
import Azam from "../assets/images/azamShah.jpg";

const EMOJIS = [
  "😀",
  "😂",
  "😍",
  "👍",
  "🙏",
  "🎉",
  "😢",
  "😎",
  "🔥",
  "❤️",
  "😮",
  "🤝",
];

const MY_PROFILE = {
  name: "Pro Murtaza",
  status: "online",
  avatar: Khairullah,
};

const now = Date.now();
const INITIAL_CONTACTS = [
  {
    id: 1,
    name: "Mustafa Alizada",
    avatar: Mustafa,
    messages: [
      { id: 1, from: "them", text: "short message here...", time: now - 60000 },
    ],
  },
  {
    id: 2,
    name: "Kahirullah Karimi",
    avatar: Khairullah,
    messages: [
      {
        id: 2,
        from: "them",
        text: "Start your chat here...",
        time: now - 120000,
      },
    ],
  },
  {
    id: 3,
    name: "Noman Khan",
    avatar: Noman,
    messages: [
      {
        id: 3,
        from: "them",
        text: "short message here...",
        time: now - 180000,
      },
    ],
  },

  {
    id: 4,
    name: "Dr Azam Shah",
    avatar: Azam,
    messages: [
      {
        id: 5,
        from: "them",
        text: "short message here...",
        time: now - 180000,
      },
    ],
  },
];

/* ------------------------------ helpers ----------------------------- */
function formatTime(ms) {
  try {
    return new Date(ms).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    });
  } catch (e) {
    return "";
  }
}

function initials(name) {
  return String(name || "?")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");
}

function lastPreview(contact) {
  const last = contact.messages[contact.messages.length - 1];
  if (!last) return "";
  if (last.image) return "📷 Photo";
  return last.text;
}

/* ------------------------------ icons ------------------------------- */
const Icon = ({ d, size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);

const PATHS = {
  search:
    "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
  edit: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
  emoji:
    "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zM8.5 8a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM12 18c-2.28 0-4.22-1.66-5-4h10c-.78 2.34-2.72 4-5 4z",
  send: "M2.01 21 23 12 2.01 3 2 10l15 2-15 2z",
  mic: "M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z",
  gallery:
    "M22 16V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-11-4 2.03 2.71L16 11l4 5H8l3-4zM2 6v14a2 2 0 0 0 2 2h14v-2H4V6H2z",
  phone:
    "M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.56 3.58.56.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.19 2.46.56 3.58.11.36.03.76-.25 1.04l-2.19 2.17z",
  video:
    "M17 10.5V7c0-1.1-.9-2-2-2H5C3.9 5 3 5.9 3 7v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-3.5l4 4v-11l-4 4z",
  endCall:
    "M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.88 1.13-2.68 1.89-.18.18-.43.29-.71.29a.99.99 0 0 1-.71-.29L.29 13.16A.99.99 0 0 1 0 12.45c0-.28.11-.53.29-.71C3.35 8.94 7.46 7 12 7s8.65 1.94 11.71 4.74c.18.18.29.43.29.71s-.11.53-.29.71l-2.45 2.45a.99.99 0 0 1-.71.29c-.28 0-.53-.11-.71-.29-.8-.76-1.7-1.4-2.68-1.89a1 1 0 0 1-.56-.9v-3.1A14.9 14.9 0 0 0 12 9z",
  copy: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z",
  close:
    "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
};

/* ---------------------- shared Tailwind class strings --------------- */
const ICON_BTN =
  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent";
const ICON_GREY = "text-[#6d6d6d]";
const ICON_ACCENT = "text-[#c4009a]";
const TEXT_INPUT =
  "h-10 min-w-0 flex-1 rounded-[10px] border border-[#d3d6dc] bg-white px-3.5 text-base text-[#33405f] outline-none placeholder:text-[#a7abb6] focus:border-[#c4009a]";

/* ----------------------------- Avatar ------------------------------- */
function Avatar({ src, name, size = 48 }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    return (
      <div
        className="flex shrink-0 items-center justify-center rounded-full bg-[#33405f] font-medium text-white"
        style={{ width: size, height: size, fontSize: size * 0.38 }}
      >
        {initials(name)}
      </div>
    );
  }
  return (
    <img
      className="shrink-0 rounded-full bg-[#e8e9ee] object-cover object-top"
      style={{ width: size, height: size }}
      src={src}
      alt={name}
      onError={() => setFailed(true)}
    />
  );
}

/* ------------------------------ Page -------------------------------- */
export default function Chat() {
  useLegacyScript();

  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [contactQuery, setContactQuery] = useState("");
  const [recipientQuery, setRecipientQuery] = useState("");
  const [activeId, setActiveId] = useState(null);
  const [draft, setDraft] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [recording, setRecording] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const callId = searchParams.get("call");
  const callMode = searchParams.get("mode") === "audio" ? "audio" : "video";
  const [callStatus, setCallStatus] = useState("Connecting to the room…");
  const [callError, setCallError] = useState("");
  const [callMuted, setCallMuted] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [remoteParticipantCount, setRemoteParticipantCount] = useState(0);
  const [inviteCopied, setInviteCopied] = useState(false);

  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteMediaRef = useRef(null);
  const roomRef = useRef(null);
  const nextMsgId = useRef(1000);
  const objectUrls = useRef([]);

  const activeContact = useMemo(
    () => contacts.find((c) => c.id === activeId) || null,
    [contacts, activeId],
  );

  const filteredContacts = useMemo(() => {
    const q = contactQuery.trim().toLowerCase();
    if (!q) return contacts;
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        lastPreview(c).toLowerCase().includes(q),
    );
  }, [contacts, contactQuery]);

  useEffect(() => {
    if (messagesEndRef.current && messagesEndRef.current.scrollIntoView) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [activeContact && activeContact.messages.length, activeId]);

  useEffect(() => {
    const urls = objectUrls.current;
    return () => {
      urls.forEach((u) => {
        try {
          URL.revokeObjectURL(u);
        } catch (e) {
          /* ignore */
        }
      });
    };
  }, []);

  useEffect(() => {
    if (!callId) return undefined;

    let cancelled = false;
    let connectedRoom = null;
    setCallError("");
    setCallStatus("Connecting to the room…");
    setCallMuted(false);
    setCameraEnabled(callMode === "video");
    setRemoteParticipantCount(0);

    const detachTrack = (track) => {
      track.detach().forEach((element) => element.remove());
    };

    const attachTrack = (track, container) => {
      if (!container) return;
      const element = track.attach();
      element.className =
        element.tagName === "VIDEO"
          ? "h-full w-full rounded-xl object-cover"
          : "hidden";
      container.appendChild(element);
    };

    const joinRoom = async () => {
      if (
        !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
          callId,
        )
      ) {
        throw new Error("This call link is invalid.");
      }
      if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
        throw new Error(
          "Calls require a secure connection (HTTPS or localhost) and microphone/camera access.",
        );
      }

      const identity = `patient-${window.crypto.randomUUID()}`;
      const roomName = `patienthub-${callId}`;
      const response = await fetch("/api/call-token", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ roomName, identity }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to get a call access token.");
      }

      const Video = (await import("twilio-video")).default;
      const room = await Video.connect(result.token, {
        name: roomName,
        audio: true,
        video: callMode === "video",
      });
      if (cancelled) {
        room.disconnect();
        return;
      }

      connectedRoom = room;
      roomRef.current = room;

      room.localParticipant.videoTracks.forEach(({ track }) => {
        if (track) attachTrack(track, localVideoRef.current);
      });

      const connectParticipant = (participant) => {
        participant.tracks.forEach(({ track }) => {
          if (track) attachTrack(track, remoteMediaRef.current);
        });
        participant.on("trackSubscribed", (track) =>
          attachTrack(track, remoteMediaRef.current),
        );
        participant.on("trackUnsubscribed", detachTrack);
      };

      room.participants.forEach(connectParticipant);
      setRemoteParticipantCount(room.participants.size);
      setCallStatus(
        room.participants.size
          ? "Connected."
          : "Connected. Waiting for someone to join…",
      );
      room.on("participantConnected", (participant) => {
        connectParticipant(participant);
        setRemoteParticipantCount(room.participants.size);
        setCallStatus("Connected.");
      });
      room.on("participantDisconnected", () => {
        setRemoteParticipantCount(room.participants.size);
        setCallStatus(
          room.participants.size
            ? "Connected."
            : "The other participant left the call.",
        );
      });
    };

    joinRoom().catch((error) => {
      if (!cancelled) {
        setCallError(error.message || "Unable to start the call.");
        setCallStatus("Call could not be connected.");
      }
    });

    return () => {
      cancelled = true;
      if (connectedRoom) {
        connectedRoom.localParticipant.tracks.forEach(({ track }) => {
          track?.stop();
          if (track) detachTrack(track);
        });
        connectedRoom.disconnect();
        connectedRoom = null;
      }
      roomRef.current = null;
    };
  }, [callId, callMode]);

  const selectContact = useCallback((contact) => {
    setActiveId(contact.id);
    setRecipientQuery(contact.name);
    setShowEmoji(false);
  }, []);

  const handleRecipientSearch = useCallback(() => {
    const q = recipientQuery.trim().toLowerCase();
    if (!q) {
      setActiveId(null);
      return;
    }
    const match = contacts.find((c) => c.name.toLowerCase().includes(q));
    if (match) {
      setActiveId(match.id);
      setRecipientQuery(match.name);
    }
  }, [recipientQuery, contacts]);

  const pushMessage = useCallback(
    (message) => {
      if (activeId == null) return;
      nextMsgId.current += 1;
      const full = {
        id: nextMsgId.current,
        from: "me",
        time: Date.now(),
        ...message,
      };
      setContacts((prev) =>
        prev.map((c) =>
          c.id === activeId ? { ...c, messages: [...c.messages, full] } : c,
        ),
      );
    },
    [activeId],
  );

  const handleSend = useCallback(() => {
    const text = draft.trim();
    if (!text || activeId == null) return;
    pushMessage({ text });
    setDraft("");
    setShowEmoji(false);
  }, [draft, activeId, pushMessage]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file && file.type.startsWith("image/") && activeId != null) {
      const url = URL.createObjectURL(file);
      objectUrls.current.push(url);
      pushMessage({ text: "", image: url });
    }
    e.target.value = "";
  };

  const startRoomCall = (mode) => {
    if (!window.crypto?.randomUUID) {
      setCallError("This browser cannot create a secure call link.");
      return;
    }
    setCallError("");
    setInviteCopied(false);
    setSearchParams({
      call: window.crypto.randomUUID(),
      mode,
    });
  };

  const callInvite = useMemo(() => {
    if (!callId) return "";
    const invite = new URL(window.location.href);
    invite.searchParams.set("call", callId);
    invite.searchParams.set("mode", callMode);
    return invite.toString();
  }, [callId, callMode]);

  const copyCallInvite = async () => {
    try {
      await navigator.clipboard.writeText(callInvite);
      setInviteCopied(true);
      setCallError("");
    } catch {
      setCallError(
        "Could not copy the invite link. Select and copy it from the field above.",
      );
    }
  };

  const toggleCallMicrophone = () => {
    const nextMuted = !callMuted;
    roomRef.current?.localParticipant.audioTracks.forEach(({ track }) => {
      if (nextMuted) track?.disable();
      else track?.enable();
    });
    setCallMuted(nextMuted);
  };

  const toggleCallCamera = () => {
    const nextEnabled = !cameraEnabled;
    roomRef.current?.localParticipant.videoTracks.forEach(({ track }) => {
      if (nextEnabled) track?.enable();
      else track?.disable();
    });
    setCameraEnabled(nextEnabled);
  };

  const endRoomCall = () => {
    setSearchParams({});
    setCallError("");
    setInviteCopied(false);
    setRemoteParticipantCount(0);
  };

  const canSend = draft.trim().length > 0 && activeId != null;

  return (
    <AppShell>
      <div className="flex h-auto min-h-[560px] w-full flex-col bg-white font-sans text-[#33405f] lg:h-[calc(100vh-120px)] lg:flex-row">
        {/* ------------------------- LEFT SIDEBAR ------------------------- */}
        <aside className="flex max-h-[340px] w-full shrink-0 flex-col overflow-hidden px-5 py-4 lg:max-h-none lg:w-[400px] lg:border-r lg:border-[#f1f1e6]">
          {/* profile */}
          <div className="mb-2 flex items-center gap-3">
            <Avatar src={MY_PROFILE.avatar} name={MY_PROFILE.name} size={70} />
            <div className="min-w-0 flex-1">
              <div className="text-[17px] font-medium">{MY_PROFILE.name}</div>
              <div className="mt-1 text-sm">{MY_PROFILE.status}</div>
            </div>
            <button
              type="button"
              className={`${ICON_BTN} ${ICON_GREY}`}
              aria-label="Edit profile"
              onClick={() => {
                setActiveId(null);
                setRecipientQuery("");
              }}
            >
              <Icon d={PATHS.edit} />
            </button>
          </div>

          {/* search contacts */}
          <div className="flex items-center gap-2.5 rounded-md bg-white p-1.5 shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
            <input
              type="text"
              className={TEXT_INPUT}
              placeholder="Search Contacts"
              value={contactQuery}
              onChange={(e) => setContactQuery(e.target.value)}
              aria-label="Search contacts"
            />
            <button
              type="button"
              className={`${ICON_BTN} ${ICON_GREY}`}
              aria-label="Search contacts"
            >
              <Icon d={PATHS.search} />
            </button>
          </div>

          {/* contact list */}
          <ul className="mt-6 flex-1 list-none overflow-y-auto p-0">
            {filteredContacts.length === 0 && (
              <li className="px-1.5 py-4 text-[#6b6f78]">No contacts found</li>
            )}
            {filteredContacts.map((c) => {
              const last = c.messages[c.messages.length - 1];
              const isActive = c.id === activeId;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => selectContact(c)}
                    className={`flex w-full items-start gap-[18px] rounded-lg px-1.5 py-2.5 text-left transition hover:bg-[#f4f5f9] ${
                      isActive ? "bg-[#f4f5f9]" : "bg-transparent"
                    }`}
                  >
                    <Avatar src={c.avatar} name={c.name} size={48} />
                    <div className="min-w-0 flex-1">
                      <div className="text-lg font-medium">{c.name}</div>
                      <div className="mt-1 truncate text-lg text-[#6b6f78]">
                        {lastPreview(c)}
                      </div>
                    </div>
                    <div className="mt-1 text-sm">
                      {last ? formatTime(last.time) : ""}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* --------------------------- MAIN PANE -------------------------- */}
        <section className="flex min-h-[460px] min-w-0 flex-1 flex-col lg:pr-[170px]">
          {/* recipients bar */}
          <div className="flex items-center gap-2.5 rounded-b-[10px] bg-white py-3 pl-3 pr-1.5 shadow-[0_3px_8px_rgba(0,0,0,0.18)] lg:pl-[50px]">
            <input
              type="text"
              className={TEXT_INPUT}
              placeholder="To: Recipients"
              value={recipientQuery}
              onChange={(e) => setRecipientQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRecipientSearch();
              }}
              aria-label="Recipients"
            />
            <button
              type="button"
              className={`${ICON_BTN} ${ICON_GREY}`}
              aria-label="Find recipient"
              onClick={handleRecipientSearch}
            >
              <Icon d={PATHS.search} />
            </button>
            <button
              type="button"
              className={`${ICON_BTN} ${ICON_ACCENT}`}
              aria-label="Start voice call"
              title="Start audio-only room"
              onClick={() => startRoomCall("audio")}
              disabled={activeId == null || Boolean(callId)}
            >
              <Icon d={PATHS.phone} />
            </button>
            <button
              type="button"
              className={`${ICON_BTN} ${ICON_ACCENT}`}
              aria-label="Start video call"
              title="Start video room"
              onClick={() => startRoomCall("video")}
              disabled={activeId == null || Boolean(callId)}
            >
              <Icon d={PATHS.video} />
            </button>
          </div>

          {/* messages */}
          <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto px-4 py-5">
            {activeContact &&
              activeContact.messages.map((m) => {
                const mine = m.from === "me";
                return (
                  <div
                    key={m.id}
                    className={`flex ${mine ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] break-words rounded-[14px] px-3 py-2 text-base leading-snug ${
                        mine
                          ? "bg-[#c4009a] text-white"
                          : "bg-[#eceef4] text-[#33405f]"
                      }`}
                    >
                      {m.image && (
                        <img
                          className="mb-1 block max-h-[260px] max-w-full rounded-[10px]"
                          src={m.image}
                          alt="Sent"
                        />
                      )}
                      {m.text && <span>{m.text}</span>}
                      <span className="mt-0.5 block text-right text-[11px] opacity-70">
                        {formatTime(m.time)}
                      </span>
                    </div>
                  </div>
                );
              })}
            <div ref={messagesEndRef} />
          </div>

          {/* composer */}
          <div className="relative">
            {showEmoji && (
              <div
                className="absolute bottom-[68px] left-3 z-10 grid grid-cols-6 gap-1 rounded-[10px] bg-white p-2 shadow-[0_4px_14px_rgba(0,0,0,0.2)]"
                role="listbox"
                aria-label="Emoji picker"
              >
                {EMOJIS.map((em) => (
                  <button
                    key={em}
                    type="button"
                    className="h-9 w-9 rounded-lg text-xl hover:bg-[#f1f2f6]"
                    onClick={() => setDraft((d) => d + em)}
                  >
                    {em}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 rounded-t-xl bg-white px-3 py-2 shadow-[0_-2px_8px_rgba(0,0,0,0.12)]">
              <button
                type="button"
                className={`${ICON_BTN} ${ICON_GREY}`}
                aria-label="Emoji"
                onClick={() => setShowEmoji((s) => !s)}
              >
                <Icon d={PATHS.emoji} />
              </button>

              <input
                type="text"
                className={`${TEXT_INPUT} !h-12 !rounded-3xl`}
                placeholder="Enter Message"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Message"
              />

              <button
                type="button"
                className={`${ICON_BTN} ${ICON_ACCENT}`}
                aria-label="Send"
                onClick={handleSend}
                disabled={!canSend}
              >
                <Icon d={PATHS.send} />
              </button>

              <button
                type="button"
                className={`${ICON_BTN} ${ICON_ACCENT} ${recording ? "animate-pulse bg-[#c4009a]/15" : ""}`}
                aria-label={
                  recording ? "Stop recording" : "Record voice message"
                }
                aria-pressed={recording}
                onClick={() => setRecording((r) => !r)}
              >
                <Icon d={PATHS.mic} />
              </button>

              <span className="h-[22px] w-px bg-[#e3e3e3]" />

              <button
                type="button"
                className={`${ICON_BTN} ${ICON_GREY}`}
                aria-label="Attach image"
                onClick={() =>
                  fileInputRef.current && fileInputRef.current.click()
                }
                disabled={activeId == null}
              >
                <Icon d={PATHS.gallery} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleFile}
              />
            </div>
          </div>
        </section>
        {callId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3">
            <section
              className="flex max-h-[95vh] w-full max-w-3xl flex-col gap-4 overflow-y-auto rounded-2xl bg-white p-4 text-[#33405f] shadow-2xl sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="call-title"
            >
              <header className="flex items-center justify-between gap-3">
                <div>
                  <h2 id="call-title" className="text-xl font-semibold">
                    {callMode === "audio" ? "Voice call" : "Video call"}
                  </h2>
                  <p className="mt-1 text-sm text-[#6b6f78]" aria-live="polite">
                    {callStatus}
                  </p>
                </div>
                <button
                  type="button"
                  className={`${ICON_BTN} ${ICON_GREY}`}
                  aria-label="Close call"
                  onClick={endRoomCall}
                >
                  <Icon d={PATHS.close} />
                </button>
              </header>

              <div className="relative flex min-h-[260px] flex-1 items-center justify-center overflow-hidden rounded-xl bg-[#20232b] sm:min-h-[360px]">
                {callMode === "video" ? (
                  <>
                    <div
                      ref={remoteMediaRef}
                      className="absolute inset-0 grid grid-cols-1 place-items-center gap-2 overflow-hidden [&>video]:h-full [&>video]:w-full [&>video]:object-cover [&>audio]:hidden"
                    />
                    {remoteParticipantCount === 0 && (
                      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 p-5 text-center text-white">
                        <Avatar
                          src={activeContact?.avatar}
                          name={activeContact?.name || "Room participant"}
                          size={76}
                        />
                        <p>Waiting for someone to join…</p>
                      </div>
                    )}
                    <div
                      ref={localVideoRef}
                      className="absolute bottom-3 right-3 h-24 w-32 overflow-hidden rounded-lg bg-[#3b3e47] shadow-lg sm:h-32 sm:w-44 [&>video]:h-full [&>video]:w-full [&>video]:object-cover"
                    />
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-4 text-center text-white">
                    <Avatar
                      src={activeContact?.avatar}
                      name={activeContact?.name || "Room participant"}
                      size={92}
                    />
                    <p>
                      {remoteParticipantCount
                        ? "Audio room connected"
                        : "Waiting for someone to join…"}
                    </p>
                    <div ref={remoteMediaRef} className="hidden" />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="call-invite" className="text-sm font-medium">
                  Share this invite link
                </label>
                <div className="flex min-w-0 gap-2">
                  <input
                    id="call-invite"
                    className={`${TEXT_INPUT} min-w-0 flex-1 text-sm`}
                    value={callInvite}
                    readOnly
                    onFocus={(event) => event.target.select()}
                  />
                  <button
                    type="button"
                    className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#33405f] px-3 text-sm font-medium text-white transition hover:bg-[#26334f]"
                    onClick={copyCallInvite}
                  >
                    <Icon d={PATHS.copy} size={18} />
                    {inviteCopied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              {(callError || inviteCopied) && (
                <p
                  className={`text-sm ${callError ? "text-red-700" : "text-green-700"}`}
                  role={callError ? "alert" : "status"}
                >
                  {callError || "Invite link copied."}
                </p>
              )}

              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${callMuted ? "bg-red-100 text-red-700" : "bg-[#eef0f5] text-[#33405f]"}`}
                  aria-label={
                    callMuted ? "Turn microphone on" : "Mute microphone"
                  }
                  aria-pressed={callMuted}
                  onClick={toggleCallMicrophone}
                  disabled={!roomRef.current}
                >
                  <Icon d={PATHS.mic} />
                </button>
                {callMode === "video" && (
                  <button
                    type="button"
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${cameraEnabled ? "bg-[#eef0f5] text-[#33405f]" : "bg-red-100 text-red-700"}`}
                    aria-label={
                      cameraEnabled ? "Turn camera off" : "Turn camera on"
                    }
                    aria-pressed={!cameraEnabled}
                    onClick={toggleCallCamera}
                    disabled={!roomRef.current}
                  >
                    <Icon d={PATHS.video} />
                  </button>
                )}
                <button
                  type="button"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white transition hover:bg-red-700"
                  aria-label="End call"
                  onClick={endRoomCall}
                >
                  <Icon d={PATHS.endCall} />
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
      <SiteFooter />
    </AppShell>
  );
}
