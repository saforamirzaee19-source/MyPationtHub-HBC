import AppShell, { SiteFooter } from "../components/AppShell.jsx";
import AzamShah from "../assets/images/azamShah.jpg";

import React, { useEffect, useMemo, useState } from "react";

/* ---------------- icons ---------------- */
const Svg = ({ children, className = "h-5 w-5", viewBox = "0 0 24 24" }) => (
  <svg
    viewBox={viewBox}
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    {children}
  </svg>
);
const RocketIcon = (p) => (
  <Svg {...p}>
    <path d="M12.9 2.1c3.6-.9 7 .1 8.9.2.1 1.9 1.1 5.3.2 8.9-.6 2.3-2.4 4.1-4.4 5.5l-.6 3.4a1 1 0 01-1.6.6l-3.2-2.5-2.3-2.3-2.5-3.2a1 1 0 01.6-1.6l3.4-.6c1.4-2 3.2-3.8 5.5-4.4zM16 8a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM4.2 15.4c1.3-.7 2.8-.4 3.7.6s1.3 2.4.6 3.7c-.8 1.5-3.9 1.9-4.9 1.9 0-1 .4-4.1 1.9-4.9z" />
  </Svg>
);
const DocIcon = (p) => (
  <Svg {...p}>
    <path d="M6 2h9l5 5v13a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm1 9h10v2H7v-2zm0 4h10v2H7v-2zm0-8h5v2H7V7z" />
  </Svg>
);
const CubeIcon = (p) => (
  <Svg {...p}>
    <path d="M12 2l9 4.5v11L12 22l-9-4.5v-11L12 2zm0 2.2L6 7.2l6 3 6-3-6-3zM5 8.9v7.4l6 3V11.9l-6-3zm14 0l-6 3v7.4l6-3V8.9z" />
  </Svg>
);
const StoreIcon = (p) => (
  <Svg {...p}>
    <path d="M3 4h18l1 5a3 3 0 01-5 2 3 3 0 01-5 0 3 3 0 01-5 0 3 3 0 01-5-2l1-5zm1 9.2c.3.1.7.2 1 .2.9 0 1.7-.3 2.3-.9v7.5h3V16h5v4h3v-7.5c.6.6 1.4.9 2.3.9.4 0 .7-.1 1-.2V22H4v-8.8z" />
  </Svg>
);
const WrenchIcon = (p) => (
  <Svg {...p}>
    <path d="M22 6.5a5 5 0 01-6.6 4.7L7.7 19a2.1 2.1 0 01-3-3l7.8-7.8A5 5 0 0117.5 2l-3 3 .5 3.5L18.5 9l3-3c.3.1.5.3.5.5zM3.3 3.3l3.4 1.1.9 3.2-2 2L2 7 3.3 3.3zM13 14l1.5-1.5 7 7a1.4 1.4 0 01-2 2l-6.5-7.5z" />
  </Svg>
);
const CardIcon = (p) => (
  <Svg {...p}>
    <path d="M3 5h18a1 1 0 011 1v3H2V6a1 1 0 011-1zm-1 6h20v7a1 1 0 01-1 1H3a1 1 0 01-1-1v-7zm3 3v2h5v-2H5z" />
  </Svg>
);
const ChevronIcon = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="3.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);
const MonitorIcon = ({ className = "h-7 w-7" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="12" rx="1.5" />
    <path d="M9 20h6M12 16v4" />
  </svg>
);
const PhoneIcon = ({ className = "h-7 w-7" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="7" y="2.5" width="10" height="19" rx="2" />
    <path d="M11 18.5h2" />
  </svg>
);
const ArrowRight = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* ---------------- small building blocks ---------------- */
const Card = ({ id, className = "", children }) => (
  <section
    id={id}
    className={`scroll-mt-6 rounded-3xl bg-white shadow-[0_8px_30px_rgba(52,71,103,0.08)] ${className}`}
  >
    {children}
  </section>
);

const Label = ({ htmlFor, children }) => (
  <label
    htmlFor={htmlFor}
    className="mb-2 ml-1 block text-[13px] font-bold text-slate-700"
  >
    {children}
  </label>
);

const inputCls =
  "w-full rounded-xl border border-slate-300/80 bg-white px-4 py-3 text-[15px] text-slate-700 placeholder-slate-400 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100";

const Input = ({ id, label, className = "", ...props }) => (
  <div className={className}>
    <Label htmlFor={id}>{label}</Label>
    <input id={id} className={inputCls} {...props} />
  </div>
);

const Select = ({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  className = "",
}) => (
  <div className={className}>
    {label !== undefined && <Label htmlFor={id}>{label}</Label>}
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`${inputCls} cursor-pointer appearance-none pr-10 ${value ? "" : "text-slate-400"}`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o} value={o} className="text-slate-700">
            {o}
          </option>
        ))}
      </select>
      <ChevronIcon className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
    </div>
  </div>
);

const Toggle = ({ checked, onChange, label, dark = false }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={() => onChange(!checked)}
    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
      checked ? (dark ? "bg-[#464d7a]" : "bg-[#464d7a]") : "bg-slate-200"
    }`}
  >
    <span
      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${
        checked ? "left-[22px]" : "left-0.5"
      }`}
    />
  </button>
);

const Badge = ({ children, tone = "green" }) => (
  <span
    className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${
      tone === "green"
        ? "bg-lime-200 text-lime-700"
        : "bg-slate-200 text-slate-500"
    }`}
  >
    {children}
  </span>
);

const DarkButton = ({ className = "", ...props }) => (
  <button
    className={`rounded-xl bg-gradient-to-br from-[#343c6a] to-[#1a2040] px-7 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-slate-400/40 transition hover:brightness-125 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:brightness-100 ${className}`}
    {...props}
  />
);

const OutlineButton = ({ className = "", ...props }) => (
  <button
    className={`rounded-lg border border-slate-700 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-slate-700 transition hover:bg-slate-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    {...props}
  />
);

/* ---------------- static data ---------------- */
const NAV = [
  { key: "profile", label: "Profile", icon: RocketIcon },
  { key: "basic-info", label: "Basic Info", icon: DocIcon },
  { key: "change-password", label: "Change Password", icon: CubeIcon },
  { key: "2fa", label: "2FA", icon: StoreIcon },
  { key: "sessions", label: "Sessions", icon: WrenchIcon },
  { key: "delete-account", label: "Delete Account", icon: CardIcon },
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));
const YEARS = Array.from({ length: 100 }, (_, i) =>
  String(new Date().getFullYear() - i),
);
const BLOOD = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const initialSessions = [
  {
    id: 1,
    icon: "desktop",
    title: "Bucharest 68.133.163.201",
    sub: "Your current session",
    region: "EU",
    active: true,
    details: "Last activity: just now · Chrome on Windows",
  },
  {
    id: 2,
    icon: "desktop",
    title: "Chrome on macOS",
    region: "US",
    details: "Last activity: 2 days ago · IP 24.18.77.102",
  },
  {
    id: 3,
    icon: "phone",
    title: "Safari on iPhone",
    region: "US",
    details: "Last activity: 5 days ago · IP 73.92.14.8",
  },
];

/* ---------------- sections ---------------- */
function ProfileHeader({ invisible, setInvisible, name }) {
  return (
    <Card
      id="profile"
      className="flex items-center justify-between gap-4 px-5 py-4"
    >
      <div className="flex items-center gap-6">
        <img
          src={AzamShah}
          alt={name}
          className="h-24 w-24 rounded-2xl object-cover object-top shadow-lg shadow-slate-400/50"
        />
        <div>
          <h1 className="text-2xl font-semibold text-slate-700">{name}</h1>
          <p className="mt-1 font-medium text-slate-500">Patient</p>
        </div>
      </div>
      <div className="flex items-center gap-3 self-start pt-4 text-sm text-slate-600">
        <span className="hidden sm:inline">
          {invisible ? "Switch to visible" : "Switch to invisible"}
        </span>
        <Toggle
          checked={invisible}
          onChange={setInvisible}
          label="Toggle profile visibility"
        />
      </div>
    </Card>
  );
}

function BasicInfo({ form, setForm, onSave, saved }) {
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  return (
    <Card id="basic-info" className="p-7">
      <h2 className="text-xl font-semibold text-slate-700">Basic Info</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave();
        }}
        className="mt-6 space-y-6"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            id="firstName"
            label="First Name"
            placeholder="Alec"
            value={form.firstName}
            onChange={set("firstName")}
          />
          <Input
            id="lastName"
            label="Last Name"
            placeholder="Thompson"
            value={form.lastName}
            onChange={set("lastName")}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-12">
          <Select
            id="gender"
            label="I'm"
            placeholder="Male"
            value={form.gender}
            onChange={set("gender")}
            options={["Male", "Female", "Other"]}
            className="md:col-span-4"
          />
          <div className="md:col-span-8">
            <Label>Birth Date</Label>
            <div className="grid gap-6 sm:grid-cols-12">
              <Select
                id="month"
                placeholder="Month"
                value={form.month}
                onChange={set("month")}
                options={MONTHS}
                className="sm:col-span-5"
              />
              <Select
                id="day"
                placeholder="Day"
                value={form.day}
                onChange={set("day")}
                options={DAYS}
                className="sm:col-span-4"
              />
              <Select
                id="year"
                placeholder="Year"
                value={form.year}
                onChange={set("year")}
                options={YEARS}
                className="sm:col-span-3"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="example@email.com"
            value={form.email}
            onChange={set("email")}
          />
          <Select
            id="blood"
            label="Blood Group"
            placeholder="A+"
            value={form.blood}
            onChange={set("blood")}
            options={BLOOD}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Input
            id="location"
            label="Your Location"
            placeholder="Sydney, A"
            value={form.location}
            onChange={set("location")}
          />
          <Input
            id="phone"
            type="tel"
            label="Phone Number"
            placeholder="+40 735 631 620"
            value={form.phone}
            onChange={set("phone")}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Input
            id="height"
            type="number"
            min="0"
            label="Height"
            placeholder="Height"
            value={form.height}
            onChange={set("height")}
          />
          <Input
            id="weight"
            type="number"
            min="0"
            label="Weight"
            placeholder="Weight"
            value={form.weight}
            onChange={set("weight")}
          />
        </div>

        <div className="flex items-center justify-end gap-4">
          {saved && (
            <span className="text-sm font-semibold text-lime-600">
              Changes saved ✓
            </span>
          )}
          <DarkButton type="submit">Save changes</DarkButton>
        </div>
      </form>
    </Card>
  );
}

function ChangePassword() {
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [done, setDone] = useState(false);
  const set = (k) => (e) => {
    setDone(false);
    setPw((p) => ({ ...p, [k]: e.target.value }));
  };

  const rules = useMemo(
    () => [
      { text: "One special characters", ok: /[^A-Za-z0-9]/.test(pw.next) },
      { text: "Min 6 characters", ok: pw.next.length >= 6 },
      { text: "One number (2 are recommended)", ok: /\d/.test(pw.next) },
      { text: "Change it often", ok: null },
    ],
    [pw.next],
  );
  const valid =
    rules.filter((r) => r.ok !== null).every((r) => r.ok) &&
    pw.current &&
    pw.next === pw.confirm;

  return (
    <Card id="change-password" className="p-7">
      <h2 className="text-xl font-semibold text-slate-700">Change Password</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!valid) return;
          setPw({ current: "", next: "", confirm: "" });
          setDone(true);
        }}
      >
        <div className="mt-6 space-y-6">
          <Input
            id="curPw"
            type="password"
            label="Current Password"
            placeholder="Current Password"
            value={pw.current}
            onChange={set("current")}
          />
          <Input
            id="newPw"
            type="password"
            label="New Password"
            placeholder="New Password"
            value={pw.next}
            onChange={set("next")}
          />
          <div>
            <Input
              id="confPw"
              type="password"
              label="Confirm New Password"
              placeholder="Confirm Password"
              value={pw.confirm}
              onChange={set("confirm")}
            />
            {pw.confirm && pw.next !== pw.confirm && (
              <p className="ml-1 mt-2 text-xs font-semibold text-red-500">
                Passwords do not match
              </p>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <h3 className="text-xl font-semibold text-slate-700">
              Password requirements
            </h3>
            <p className="mt-2 text-lg text-slate-500">
              Please follow this guide for a strong password
            </p>
            <ul className="mt-4 space-y-1.5">
              {rules.map((r) => (
                <li
                  key={r.text}
                  className={`flex items-center gap-3 text-[17px] transition-colors ${r.ok ? "text-lime-600" : "text-slate-500"}`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${r.ok ? "bg-lime-500" : "bg-slate-500"}`}
                  />
                  {r.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-end gap-2">
            {done && (
              <span className="text-sm font-semibold text-lime-600">
                Password updated ✓
              </span>
            )}
            <DarkButton type="submit" disabled={!valid} className="px-6">
              Update password
            </DarkButton>
          </div>
        </div>
      </form>
    </Card>
  );
}

function TwoFactor() {
  const [methods, setMethods] = useState([
    { id: "sms", label: "SMS Verification", on: true },
    { id: "app", label: "Authenticator app", on: false },
  ]);
  const toggle = (id) =>
    setMethods((m) => m.map((x) => (x.id === id ? { ...x, on: !x.on } : x)));
  const enabled = methods.some((m) => m.on);

  return (
    <Card id="2fa" className="px-7 py-7">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-700">
          Two-factor authentication
        </h2>
        <Badge tone={enabled ? "green" : "gray"}>
          {enabled ? "Enabled" : "Disabled"}
        </Badge>
      </div>
      <div className="mt-6 divide-y divide-slate-100">
        {methods.map((m) => (
          <div key={m.id} className="flex items-center justify-between py-4">
            <span className="text-slate-500">{m.label}</span>
            <div className="flex items-center gap-5">
              <span className="text-slate-400">
                {m.on ? "Configured" : "Not Configured"}
              </span>
              <OutlineButton
                onClick={() => toggle(m.id)}
                className="min-w-[96px]"
              >
                {m.on ? "Remove" : "Set up"}
              </OutlineButton>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Sessions() {
  const [list, setList] = useState(initialSessions);
  const [open, setOpen] = useState(null);
  const remove = (id) => setList((l) => l.filter((s) => s.id !== id));

  return (
    <Card id="sessions" className="px-7 py-7">
      <h2 className="text-xl font-semibold text-slate-700">Sessions</h2>
      <p className="mt-1 text-slate-500">
        This is a list of devices that have logged into your account. Remove
        those that you do not recognize.
      </p>
      <ul className="mt-4 divide-y divide-slate-100">
        {list.map((s) => (
          <li key={s.id} className="py-4">
            <div className="flex items-center gap-5">
              <span className="w-8 text-slate-400">
                {s.icon === "phone" ? (
                  <PhoneIcon className="mx-auto h-7 w-5" />
                ) : (
                  <MonitorIcon />
                )}
              </span>
              <div className="flex-1">
                <p className="text-lg text-slate-600">{s.title}</p>
                {s.sub && (
                  <p className="mt-1 text-xs text-slate-500">{s.sub}</p>
                )}
              </div>
              {s.active && <Badge>Active</Badge>}
              <span className="text-slate-400">{s.region}</span>
              <button
                onClick={() => setOpen(open === s.id ? null : s.id)}
                className="flex items-center gap-1.5 font-semibold text-cyan-500 transition hover:text-cyan-700"
              >
                See more <ArrowRight />
              </button>
            </div>
            {open === s.id && (
              <div className="ml-[52px] mt-3 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
                <span>{s.details}</span>
                {!s.active && (
                  <button
                    onClick={() => remove(s.id)}
                    className="font-bold uppercase text-red-500 transition hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            )}
          </li>
        ))}
        {list.length === 0 && (
          <li className="py-6 text-center text-slate-400">No sessions.</li>
        )}
      </ul>
    </Card>
  );
}

function DeleteAccount() {
  const [confirm, setConfirm] = useState(false);
  const [msg, setMsg] = useState("");
  return (
    <Card id="delete-account" className="px-7 py-7">
      <h2 className="text-xl font-semibold text-slate-700">Delete Account</h2>
      <p className="mt-1 text-slate-500">
        Once you delete your account, there is no going back. Please be certain.
      </p>
      <div className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Toggle
            checked={confirm}
            onChange={(v) => {
              setConfirm(v);
              setMsg("");
            }}
            label="Confirm account deletion"
          />
          <div>
            <p className="font-semibold leading-tight text-slate-700">
              Confirm
            </p>
            <p className="text-sm text-slate-500">
              I want to delete my account.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            disabled={!confirm}
            onClick={() => setMsg("Account deactivated.")}
            className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-xs font-bold uppercase tracking-wide text-slate-500 transition hover:bg-slate-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Deactivate
          </button>
          <button
            disabled={!confirm}
            onClick={() =>
              window.confirm("Delete your account permanently?") &&
              setMsg("Account deletion requested.")
            }
            className="rounded-lg bg-gradient-to-r from-rose-500 to-red-600 px-6 py-3 text-xs font-bold uppercase tracking-wide text-white shadow-lg shadow-rose-300/60 transition hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Delete account
          </button>
        </div>
      </div>
      {msg && <p className="mt-4 text-sm font-semibold text-red-500">{msg}</p>}
    </Card>
  );
}

/* ---------------- page ---------------- */
export default function Sitting() {
  const [active, setActive] = useState("basic-info");
  const [invisible, setInvisible] = useState(true);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    firstName: "Azam",
    lastName: "Shah",
    gender: "",
    month: "",
    day: "",
    year: "",
    email: "",
    blood: "",
    location: "",
    phone: "",
    height: "",
    weight: "",
  });

  /* highlight the sidebar item of the section in view */
  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.key)).filter(Boolean);
    if (!("IntersectionObserver" in window) || !els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (key) => {
    setActive(key);
    document
      .getElementById(key)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const fullName = `${form.firstName} ${form.lastName}`.trim() || "Your Name";

  return (
    <div>
      <AppShell activeKey="settings" crumb="Settings" title="Settings">
        <main className="content settings-page min-h-0 bg-slate-50">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
            {/* sidebar */}
            <aside className="lg:sticky lg:top-6 lg:self-start">
              <nav className="rounded-3xl bg-white p-3 shadow-[0_8px_30px_rgba(52,71,103,0.1)]">
                <ul className="list-none space-y-1">
                  {NAV.map(({ key, label, icon: I }) => (
                    <li key={key}>
                      <button
                        onClick={() => go(key)}
                        className={`flex w-full items-center gap-4 rounded-xl border-0 bg-transparent px-5 py-3.5 text-left text-[17px] transition ${
                          active === key
                            ? "bg-slate-50 font-medium text-slate-800 shadow-inner"
                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                        }`}
                      >
                        <I className="h-5 w-5 text-slate-600" />
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* content */}
            <div className="min-w-0 space-y-6">
              <ProfileHeader
                invisible={invisible}
                setInvisible={setInvisible}
                name={fullName}
              />
              <BasicInfo
                form={form}
                setForm={setForm}
                onSave={save}
                saved={saved}
              />
              <ChangePassword />
              <TwoFactor />
              <Sessions />
              <DeleteAccount />
            </div>
          </div>
        </main>
        <SiteFooter />
      </AppShell>
    </div>
  );
}
