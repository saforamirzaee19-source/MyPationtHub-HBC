import AppShell, { SiteFooter } from "../components/AppShell.jsx";

import React, { useMemo, useState } from "react";

/* ---------- small inline icons ---------- */
const Icon = ({ d, className = "h-4 w-4", fill = "currentColor" }) => (
  <svg viewBox="0 0 24 24" className={className} fill={fill} aria-hidden="true">
    <path d={d} />
  </svg>
);
const PencilIcon = (p) => (
  <Icon
    {...p}
    d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
  />
);
const TrashIcon = (p) => (
  <Icon
    {...p}
    d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
  />
);
const PlusIcon = (p) => <Icon {...p} d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />;
const BankIcon = (p) => (
  <Icon
    {...p}
    d="M12 2L2 7v2h20V7L12 2zM4 11v7h3v-7H4zm6.5 0v7h3v-7h-3zM17 11v7h3v-7h-3zM2 20v2h20v-2H2z"
  />
);
const PdfIcon = (p) => (
  <Icon
    {...p}
    d="M20 2H8a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3.5H19v1.5h1.5V11H19v2h-1.5V7h3v1zM9 9.5h1v-1H9v1zm4 2.5h1v-3h-1v3zM4 6H2v14a2 2 0 002 2h14v-2H4V6z"
  />
);
const CalendarIcon = (p) => (
  <Icon
    {...p}
    d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 16H5V10h14v10zM7 12h4v4H7v-4z"
  />
);
const WifiIcon = (p) => (
  <Icon
    {...p}
    d="M12 18.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM12 13c2 0 3.8.8 5.1 2.1l-1.4 1.4A5.5 5.5 0 0012 15a5.5 5.5 0 00-3.7 1.5l-1.4-1.4A7.5 7.5 0 0112 13zm0-5c3.3 0 6.3 1.3 8.5 3.5l-1.4 1.4A10.5 10.5 0 0012 10a10.5 10.5 0 00-7.1 2.9L3.5 11.5A12.5 12.5 0 0112 8z"
  />
);

const MastercardLogo = ({ className = "h-7 w-9" }) => (
  <svg viewBox="0 0 48 30" className={className} aria-label="Mastercard">
    <circle cx="17" cy="15" r="13" fill="#EB001B" />
    <circle cx="31" cy="15" r="13" fill="#F79E1B" fillOpacity="0.95" />
    <path d="M24 4.6a13 13 0 010 20.8 13 13 0 010-20.8z" fill="#FF5F00" />
  </svg>
);
const VisaLogo = () => (
  <span className="text-lg font-black italic tracking-tight text-[#1a1f71]">
    VISA
  </span>
);

/* ---------- reusable card ---------- */
const Card = ({ className = "", children }) => (
  <div
    className={`rounded-3xl bg-white shadow-sm ring-1 ring-slate-100 ${className}`}
  >
    {children}
  </div>
);

/* ---------- data ---------- */
const initialInvoices = [
  { date: "March, 01, 2020", id: "#MS-415646", amount: 180 },
  { date: "February, 10, 2021", id: "#RV-126749", amount: 250 },
  { date: "April, 05, 2020", id: "#QW-103578", amount: 120 },
  { date: "June, 25, 2019", id: "#MS-415646", amount: 180 },
  { date: "March, 01, 2019", id: "#AR-803481", amount: 300 },
];

const initialBilling = [
  {
    id: 1,
    name: "Oliver Liam",
    company: "Viking Burrito",
    email: "oliver@burrito.com",
    vat: "FRB1235476",
  },
  {
    id: 2,
    name: "Lucas Harper",
    company: "Stone Tech Zone",
    email: "lucas@stone-tech.com",
    vat: "FRB1235476",
  },
  {
    id: 3,
    name: "Ethan James",
    company: "Fiber Notion",
    email: "ethan@fiber.com",
    vat: "FRB1235476",
  },
];

const transactions = [
  {
    group: "Newest",
    name: "Food",
    time: "27 March 2020, at 12:30 PM",
    amount: -2500,
  },
  {
    group: "Newest",
    name: "Medicine",
    time: "27 March 2020, at 04:30 AM",
    amount: 2000,
  },
  {
    group: "Yesterday",
    name: "Appointment",
    time: "26 March 2020, at 13:45 PM",
    amount: 750,
  },
  {
    group: "Yesterday",
    name: "MarketPlace",
    time: "26 March 2020, at 12:30 PM",
    amount: 1000,
  },
  {
    group: "Yesterday",
    name: "Pharmacy",
    time: "26 March 2020, at 08:30 AM",
    amount: 2500,
  },
  {
    group: "Yesterday",
    name: "Bookings",
    time: "26 March 2020, at 05:00 AM",
    amount: null,
  },
];

const fmt = (n) => n.toLocaleString("en-US");

/* ---------- sections ---------- */
function CreditCard() {
  return (
    <div className="relative flex h-full min-h-[200px] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-[#1b2a4e] via-[#222a52] to-[#0f1530] p-6 text-white shadow-xl shadow-slate-400/30">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(circle_at_80%_10%,#6d7cff55,transparent_45%),repeating-linear-gradient(120deg,#ffffff12_0_2px,transparent_2px_14px)]" />
      <WifiIcon className="relative h-7 w-7 rotate-0" />
      <p className="relative text-xl font-semibold tracking-widest sm:text-2xl">
        4562&nbsp; 1122&nbsp; 4594&nbsp; 7852
      </p>
      <div className="relative flex items-end justify-between">
        <div className="flex gap-8">
          <div>
            <p className="text-xs text-slate-300">Card Holder</p>
            <p className="font-semibold">Jack Peterson</p>
          </div>
          <div>
            <p className="text-xs text-slate-300">Expires</p>
            <p className="font-semibold">11/22</p>
          </div>
        </div>
        <MastercardLogo className="h-8 w-11" />
      </div>
    </div>
  );
}

function StatCard({ icon, title, sub, value, gradient }) {
  return (
    <Card className="flex flex-col items-center px-4 pb-5 pt-5 text-center transition hover:-translate-y-0.5 hover:shadow-md">
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg ${gradient}`}
      >
        {icon}
      </div>
      <h3 className="mt-4 font-semibold text-slate-700">{title}</h3>
      <p className="mt-1 text-sm text-slate-400">{sub}</p>
      <div className="my-3 h-px w-4/5 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <p className="text-xl font-bold text-slate-700">{value}</p>
    </Card>
  );
}

function PaymentMethod() {
  const [cards, setCards] = useState([
    { id: 1, brand: "mastercard", last4: "7852" },
    { id: 2, brand: "visa", last4: "5248" },
  ]);
  const addCard = () => {
    const last4 = String(Math.floor(1000 + Math.random() * 9000));
    setCards((c) => [
      ...c,
      { id: Date.now(), brand: c.length % 2 ? "mastercard" : "visa", last4 },
    ]);
  };
  const editCard = (id) => {
    const v = window.prompt("Enter the last 4 digits of the card");
    if (v && /^\d{4}$/.test(v))
      setCards((c) => c.map((x) => (x.id === id ? { ...x, last4: v } : x)));
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-700">Payment Method</h2>
        <button
          onClick={addCard}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#2d3561] to-[#1b2040] px-5 py-3 text-xs font-bold uppercase tracking-wide text-white shadow-md transition hover:brightness-125 active:scale-95"
        >
          <PlusIcon className="h-4 w-4" /> Add new card
        </button>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between rounded-2xl border border-slate-200 px-5 py-4 transition hover:border-slate-300 hover:shadow-sm"
          >
            <div className="flex items-center gap-4">
              {c.brand === "visa" ? <VisaLogo /> : <MastercardLogo />}
              <p className="font-medium tracking-wider text-slate-600">
                **** **** ****{" "}
                <span className="text-lg text-slate-700">{c.last4}</span>
              </p>
            </div>
            <button
              onClick={() => editCard(c.id)}
              className="text-slate-600 transition hover:text-indigo-600"
              aria-label="Edit card"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Invoices() {
  const [showAll, setShowAll] = useState(true);
  const list = showAll ? initialInvoices : initialInvoices.slice(0, 3);
  return (
    <Card className="h-full p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-700">Invoices</h2>
        <button
          onClick={() => setShowAll((s) => !s)}
          className="rounded-lg border border-cyan-400 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-cyan-500 transition hover:bg-cyan-50"
        >
          {showAll ? "View all" : "Show more"}
        </button>
      </div>
      <ul className="mt-6 space-y-5">
        {list.map((inv, i) => (
          <li key={i} className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-700">{inv.date}</p>
              <p className="text-sm text-slate-400">{inv.id}</p>
            </div>
            <div className="flex items-center gap-5">
              <span className="text-slate-400">${inv.amount}</span>
              <button className="flex items-center gap-1.5 font-bold text-slate-700 transition hover:text-indigo-600">
                <PdfIcon className="h-5 w-5" /> PDF
              </button>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function BillingInfo() {
  const [items, setItems] = useState(initialBilling);
  const remove = (id) => setItems((l) => l.filter((x) => x.id !== id));
  const edit = (id) => {
    const name = window.prompt("Edit name");
    if (name) setItems((l) => l.map((x) => (x.id === id ? { ...x, name } : x)));
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-slate-700">
        Billing Information
      </h2>
      <div className="mt-5 space-y-5">
        {items.map((b) => (
          <div
            key={b.id}
            className="rounded-2xl bg-slate-50 p-6 transition hover:bg-slate-100/70"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-slate-700">{b.name}</h3>
              <div className="flex items-center gap-6 text-xs font-bold uppercase">
                <button
                  onClick={() => remove(b.id)}
                  className="flex items-center gap-1.5 text-red-600 transition hover:text-red-800"
                >
                  <TrashIcon className="h-4 w-4" /> Delete
                </button>
                <button
                  onClick={() => edit(b.id)}
                  className="flex items-center gap-1.5 text-slate-700 transition hover:text-indigo-600"
                >
                  <PencilIcon className="h-4 w-4" /> Edit
                </button>
              </div>
            </div>
            <dl className="mt-4 space-y-1.5 text-sm">
              {[
                ["Company Name:", b.company],
                ["Email Address:", b.email],
                ["VAT Number:", b.vat],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-3">
                  <dt className="text-slate-400">{k}</dt>
                  <dd className="font-semibold text-slate-700">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
        {items.length === 0 && (
          <p className="py-8 text-center text-sm text-slate-400">
            No billing information left.
          </p>
        )}
      </div>
    </Card>
  );
}

function Transactions() {
  const groups = useMemo(() => {
    const m = {};
    transactions.forEach((t) => (m[t.group] = [...(m[t.group] || []), t]));
    return Object.entries(m);
  }, []);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-700">
          Your Transaction's
        </h2>
        <span className="flex items-center gap-2 text-sm text-slate-500">
          <CalendarIcon className="h-5 w-5 text-slate-500" /> 23 - 30 March 2020
        </span>
      </div>
      {groups.map(([group, rows]) => (
        <div key={group} className="mt-6">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">
            {group}
          </p>
          <ul className="space-y-4">
            {rows.map((t, i) => {
              const pending = t.amount === null;
              const neg = !pending && t.amount < 0;
              const tone = pending
                ? "border-slate-700 text-slate-700"
                : neg
                  ? "border-red-500 text-red-500"
                  : "border-lime-500 text-lime-500";
              return (
                <li key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-bold ${tone}`}
                    >
                      {pending ? "!" : neg ? "↓" : "↑"}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-700">{t.name}</p>
                      <p className="text-xs text-slate-400">{t.time}</p>
                    </div>
                  </div>
                  <span
                    className={`font-semibold ${pending ? "text-slate-800" : neg ? "text-red-500" : "text-lime-500"}`}
                  >
                    {pending
                      ? "Pending"
                      : `${neg ? "-" : "+"} $ ${fmt(Math.abs(t.amount))}`}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </Card>
  );
}

/* ---------- page ---------- */
export default function MyAccount() {
  return (
    <AppShell activeKey="account" crumb="My Account" title="My Account">
      <main className="content min-h-0 bg-slate-50">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* top: cards + invoices */}
          <div className="grid gap-6 xl:grid-cols-12">
            <div className="space-y-6 xl:col-span-8">
              <div className="grid gap-6 md:grid-cols-5">
                <div className="md:col-span-3">
                  <CreditCard />
                </div>
                <div className="grid grid-cols-2 gap-6 md:col-span-2">
                  <StatCard
                    icon={<BankIcon className="h-7 w-7" />}
                    title="Account Balance"
                    sub="Payments"
                    value="+$2000"
                    gradient="bg-gradient-to-br from-cyan-400 to-blue-600 shadow-blue-300"
                  />
                  <StatCard
                    icon={<span className="text-2xl font-black italic">P</span>}
                    title="Wallet Bank Card"
                    sub="Payments"
                    value="$455.00"
                    gradient="bg-gradient-to-br from-sky-400 to-blue-600 shadow-blue-300"
                  />
                </div>
              </div>
              <PaymentMethod />
            </div>
            <div className="xl:col-span-4">
              <Invoices />
            </div>
          </div>

          {/* bottom: billing + transactions */}
          <div className="grid gap-6 xl:grid-cols-12">
            <div className="xl:col-span-7">
              <BillingInfo />
            </div>
            <div className="xl:col-span-5">
              <Transactions />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </AppShell>
  );
}
