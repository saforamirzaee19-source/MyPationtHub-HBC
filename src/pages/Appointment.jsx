import AppShell, { SiteFooter } from "../components/AppShell.jsx";
import ReactCharts from "../components/ReactCharts.jsx";
import bilalPhoto from "../assets/images/bilal.jpg";
import khirullahPhoto from "../assets/images/khairullah.jpg";
import shamsirPhoto from "../assets/images/shamsir.jpg";
import mustafaPhoto from "../assets/images/doctor-6.jpg";
import madihaPhoto from "../assets/images/doctor-4.jpg";
import ibrahimPhoto from "../assets/images/doctor-7.jpg";

import React, { useMemo, useState } from "react";

/* ───────────── Config ───────────── */
const TYPES = {
  emergency: {
    label: "Emergency",
    color: "#0a8bf5",
    chip: "from-sky-400 to-blue-600",
  },
  examination: {
    label: "Examination",
    color: "#00e08e",
    chip: "from-lime-400 to-green-600",
  },
  consultation: {
    label: "Consultation",
    color: "#ffb21a",
    chip: "from-amber-400 to-orange-500",
  },
  routine: {
    label: "Routine Checkup",
    color: "#ff4d67",
    chip: "from-rose-400 to-red-600",
  },
};
const TYPE_KEYS = Object.keys(TYPES);
const DOCTORS = [
  "Dr. Mustafa",
  "Dr. Khirullah",
  "Dr. Bilal",
  "Dr. Madiha",
  "Dr. Shamsir",
  "Dr. Ibrahim",
];
const DOCTOR_PHOTOS = {
  "Dr. Mustafa": mustafaPhoto,
  "Dr. Khirullah": khirullahPhoto,
  "Dr. Bilal": bilalPhoto,
  "Dr. Madiha": madihaPhoto,
  "Dr. Shamsir": shamsirPhoto,
  "Dr. Ibrahim": ibrahimPhoto,
};
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/* ───────────── Date helpers ───────────── */
const pad = (n) => String(n).padStart(2, "0");
const toKey = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromKey = (k) => {
  const [y, m, d] = k.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const fmtLong = (k) =>
  fromKey(k).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
const fmtShort = (k) =>
  fromKey(k).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

/* ───────────── Seed data (relative to today) ───────────── */
function buildSeed() {
  let s = 42;
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const now = new Date();
  const list = [];
  let id = 1;
  for (let m = -5; m <= 2; m++) {
    const count = m <= 0 ? 16 : 5;
    for (let i = 0; i < count; i++) {
      const date = new Date(
        now.getFullYear(),
        now.getMonth() + m,
        1 + Math.floor(rnd() * 27),
      );
      list.push({
        id: id++,
        doctor: DOCTORS[Math.floor(rnd() * DOCTORS.length)],
        type: TYPE_KEYS[Math.floor(rnd() * TYPE_KEYS.length)],
        date: toKey(date),
      });
    }
  }
  return list;
}

/* ───────────── Small UI pieces ───────────── */
const Card = ({ className = "", children }) => (
  <div
    className={`rounded-3xl bg-white p-5 shadow-[0_10px_30px_rgba(60,72,110,0.08)] ${className}`}
  >
    {children}
  </div>
);

const Avatar = ({ name }) => {
  const photo = DOCTOR_PHOTOS[name];
  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-sm font-semibold text-white shadow-md"
    >
      {photo ? (
        <img className="appointment-avatar-image" src={photo} alt={name} />
      ) : (
        name.replace("Dr.", "").trim().slice(0, 2).toUpperCase()
      )}
    </div>
  );
};

function RowMenu({ onComplete, onDelete }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Appointment actions"
        className="flex h-8 w-8 flex-col items-center justify-center gap-[3px] rounded-full hover:bg-slate-100"
      >
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-1 w-1 rounded-full bg-slate-400" />
        ))}
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-1 w-36 overflow-hidden rounded-xl bg-white text-sm shadow-xl ring-1 ring-slate-100">
          {onComplete && (
            <button
              onClick={() => {
                onComplete();
                setOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-slate-600 hover:bg-slate-50"
            >
              Mark as done
            </button>
          )}
          <button
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
            className="block w-full px-4 py-2 text-left text-rose-500 hover:bg-rose-50"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

function AppointmentRow({ item, onDelete, onComplete }) {
  return (
    <li className="flex items-center gap-3">
      <Avatar name={item.doctor} />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-slate-700">{item.doctor}</p>
        <p
          className="text-sm font-medium"
          style={{ color: TYPES[item.type].color }}
        >
          {TYPES[item.type].label}
        </p>
      </div>
      <p className="w-24 text-right text-xs leading-snug text-slate-500" title={fmtLong(item.date)}>
        {fmtShort(item.date)}
      </p>
      <RowMenu onDelete={onDelete} onComplete={onComplete} />
    </li>
  );
}

/* ───────────── Stat card with sparkline ───────────── */
function StatCard({ title, value, delta, series, categories }) {
  const options = useMemo(
    () => ({
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: {
          ticks: { display: false },
          grid: { display: false },
        },
        y: {
          display: false,
          grid: { display: false },
        },
      },
    }),
    [],
  );
  return (
    <Card className="appointment-card appointment-stat-card">
      <p className="font-medium text-slate-500">{title}</p>
      <p className="mt-1 text-3xl font-bold text-slate-800">
        {value}
        <span
          className={`ml-2 text-base font-semibold ${delta >= 0 ? "text-lime-500" : "text-rose-500"}`}
        >
          {delta >= 0 ? `+${delta}` : delta}
        </span>
      </p>
      <ReactCharts
        type="line"
        height={76}
        labels={categories}
        datasets={[
          {
            label: title,
            data: series,
            borderColor: "#1fc7e8",
            backgroundColor: "rgba(31, 199, 232, 0.2)",
            fill: true,
            tension: 0.4,
            pointRadius: 2,
          },
        ]}
        options={options}
      />
    </Card>
  );
}

/* ───────────── Calendar ───────────── */
function Calendar({ cursor, setCursor, appointments }) {
  const today = toKey(new Date());
  const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const gridStart = new Date(first);
  gridStart.setDate(1 - first.getDay());
  const days = Array.from({ length: 42 }, (_, i) => {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    return d;
  });
  const byDay = useMemo(() => {
    const map = {};
    appointments.forEach((a) => (map[a.date] ||= []).push(a));
    return map;
  }, [appointments]);
  const shift = (n) =>
    setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + n, 1));

  return (
    <Card className="appointment-card appointment-calendar">
      <div className="appointment-calendar-header">
        <h2>
          {first.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <div className="appointment-calendar-controls">
          <button
            onClick={() => setCursor(new Date())}
            className="appointment-today-button"
          >
            today
          </button>
          <div className="appointment-month-controls">
            <button
              onClick={() => shift(-1)}
              aria-label="Previous month"
            >
              ‹
            </button>
            <button
              onClick={() => shift(1)}
              aria-label="Next month"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <div className="appointment-weekdays">
        {WEEKDAYS.map((w) => (
          <div key={w}>{w}</div>
        ))}
      </div>
      <div className="appointment-calendar-grid">
        {days.map((d) => {
          const key = toKey(d);
          const inMonth = d.getMonth() === cursor.getMonth();
          const items = byDay[key] || [];
          return (
            <div
              key={key}
              className={`appointment-day${inMonth ? "" : " outside-month"}${key === today ? " is-today" : ""}`}
            >
              <p className="appointment-day-number">
                <span
                  className={
                    key === today
                      ? "today-number"
                      : ""
                  }
                >
                  {d.getDate()}
                </span>
              </p>
              {items.slice(0, 2).map((a) => (
                <div
                  key={a.id}
                  title={`${a.doctor} – ${TYPES[a.type].label}`}
                  className={`appointment-event appointment-event-${a.type}`}
                >
                  {a.doctor}
                </div>
              ))}
              {items.length > 2 && (
                <p className="appointment-more-events">
                  +{items.length - 2} more
                </p>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

/* ───────────── New booking form ───────────── */
function BookingForm({ onSubmit, defaultDate }) {
  const [form, setForm] = useState({
    doctor: DOCTORS[0],
    type: "consultation",
    date: defaultDate,
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const field = "appointment-form-field";
  return (
    <Card className="appointment-card appointment-booking-form">
      <h2>
        New booking
      </h2>
      <div className="appointment-form-fields">
        <label>
          Doctor
          <select
            className={field}
            value={form.doctor}
            onChange={set("doctor")}
          >
            {DOCTORS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>
        <label>
          Appointment type
          <select
            className={field}
            value={form.type}
            onChange={set("type")}
          >
            {TYPE_KEYS.map((k) => (
              <option key={k} value={k}>
                {TYPES[k].label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Date
          <input
            type="date"
            className={field}
            value={form.date}
            onChange={set("date")}
          />
        </label>
        <button
          disabled={!form.date}
          onClick={() => onSubmit(form)}
          className="appointment-submit-button"
        >
          Book appointment
        </button>
      </div>
    </Card>
  );
}

/* ───────────── Page ───────────── */
export default function Appointment() {
  const [tab, setTab] = useState("appointments");
  const [appointments, setAppointments] = useState(buildSeed);
  const [cursor, setCursor] = useState(() => new Date());
  const [range, setRange] = useState("Days");
  const [toast, setToast] = useState("");

  const today = startOfDay(new Date());
  const todayKey = toKey(today);

  /* derived data – recomputed whenever appointments change */
  const monthWindow = useMemo(
    () =>
      Array.from(
        { length: 6 },
        (_, i) => new Date(today.getFullYear(), today.getMonth() - 5 + i, 1),
      ),
    [todayKey],
  );

  const stackedSeries = useMemo(
    () =>
      TYPE_KEYS.map((k) => ({
        name: TYPES[k].label,
        data: monthWindow.map(
          (m) =>
            appointments.filter((a) => {
              const d = fromKey(a.date);
              return (
                a.type === k &&
                d.getFullYear() === m.getFullYear() &&
                d.getMonth() === m.getMonth()
              );
            }).length,
        ),
      })),
    [appointments, monthWindow],
  );

  const stackedOptions = useMemo(
    () => ({
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true,
            boxWidth: 8,
            padding: 8,
            font: { size: 10 },
          },
        },
      },
      scales: {
        x: { stacked: true },
        y: { stacked: true, beginAtZero: true },
      },
    }),
    [],
  );

  // sparkline data: monthly totals for the last 9 months
  const trend = useMemo(() => {
    const months = Array.from(
      { length: 9 },
      (_, i) => new Date(today.getFullYear(), today.getMonth() - 8 + i, 1),
    );
    const count = (keys) =>
      months.map(
        (m) =>
          appointments.filter((a) => {
            const d = fromKey(a.date);
            return (
              keys.includes(a.type) &&
              d.getFullYear() === m.getFullYear() &&
              d.getMonth() === m.getMonth()
            );
          }).length,
      );
    return {
      categories: months.map((m) => MONTHS[m.getMonth()]),
      procedures: count(["emergency", "examination"]),
      treatments: count(["consultation", "routine"]),
    };
  }, [appointments, todayKey]);

  const diff = (arr) => (arr[arr.length - 1] ?? 0) - (arr[arr.length - 2] ?? 0);

  const past = appointments
    .filter((a) => a.date < todayKey)
    .sort((a, b) => b.date.localeCompare(a.date));
  const upcoming = useMemo(() => {
    const limit = new Date(today);
    if (range === "Days") limit.setDate(limit.getDate() + 7);
    if (range === "Months") limit.setMonth(limit.getMonth() + 1);
    if (range === "Years") limit.setFullYear(limit.getFullYear() + 1);
    return appointments
      .filter((a) => a.date >= todayKey && fromKey(a.date) <= limit)
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [appointments, range, todayKey]);

  /* actions */
  const flash = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };
  const addAppointment = (f) => {
    setAppointments((list) => [...list, { id: Date.now(), ...f }]);
    setCursor(fromKey(f.date));
    setTab("appointments");
    flash("Appointment booked");
  };
  const remove = (id) => {
    setAppointments((list) => list.filter((a) => a.id !== id));
    flash("Appointment deleted");
  };
  const markDone = (id) => {
    setAppointments((list) =>
      list.map((a) =>
        a.id === id
          ? { ...a, date: toKey(new Date(today.getTime() - 86400000)) }
          : a,
      ),
    );
    flash("Moved to previous appointments");
  };

  const tabBtn = (id, label, icon) => (
    <button
      type="button"
      onClick={() => setTab(id)}
      className={`appointment-tab${tab === id ? " active" : ""}`}
      aria-pressed={tab === id}
    >
      <span className="text-fuchsia-600">{icon}</span>
      {label}
    </button>
  );

  return (
    <AppShell
      activeKey="appointments"
      crumb="Appointments"
      title="Appointments"
    >
      <div className="appointment-page">
        <header className="appointment-page-header">
          <div>
            <p className="appointment-eyebrow">YOUR CARE, ORGANIZED</p>
            <h1>Appointments</h1>
            <p>Keep track of your visits and upcoming care.</p>
          </div>
          <div className="appointment-tabs">
            {tabBtn("appointments", "Overview", "◉")}
            {tabBtn("booking", "New booking", "+")}
          </div>
        </header>

        {tab === "booking" ? (
          <BookingForm onSubmit={addAppointment} defaultDate={todayKey} />
        ) : (
          <>
            <div className="appointment-stats">
                <StatCard
                  title="Procedures Taken"
                  value={trend.procedures.reduce((a, b) => a + b, 0)}
                  delta={diff(trend.procedures)}
                  series={trend.procedures}
                  categories={trend.categories}
                />
                <StatCard
                  title="Treatments Taken"
                  value={trend.treatments.reduce((a, b) => a + b, 0)}
                  delta={diff(trend.treatments)}
                  series={trend.treatments}
                  categories={trend.categories}
                />
                <button
                  type="button"
                  onClick={() => setTab("booking")}
                  className="appointment-quick-book"
                >
                  <span className="appointment-quick-book-icon">+</span>
                  <span>
                    <strong>Book an appointment</strong>
                    <small>Choose a doctor and time</small>
                  </span>
                  <span className="appointment-quick-book-arrow">→</span>
                </button>
            </div>

            <div className="appointment-content-grid">
              <main className="appointment-main-column">
              <Calendar
                cursor={cursor}
                setCursor={setCursor}
                appointments={appointments}
              />
              </main>

              <aside className="appointment-side-column">
              <Card className="appointment-card appointment-chart-card">
                <h3>Appointment activity</h3>
                <ReactCharts
                  type="bar"
                  height={270}
                  labels={monthWindow.map((m) => MONTHS[m.getMonth()])}
                  datasets={stackedSeries.map((item, index) => ({
                    label: item.name,
                    data: item.data,
                    backgroundColor: TYPES[TYPE_KEYS[index]].color,
                    borderRadius: 6,
                    stack: "appointments",
                  }))}
                  options={stackedOptions}
                />
              </Card>

              <Card className="appointment-card appointment-list-card">
                <h3>
                  Previous Appointments
                </h3>
                <ul>
                  {past.slice(0, 8).map((a) => (
                    <AppointmentRow
                      key={a.id}
                      item={a}
                      onDelete={() => remove(a.id)}
                    />
                  ))}
                  {past.length === 0 && (
                    <p className="appointment-empty-state">
                      No previous appointments.
                    </p>
                  )}
                </ul>
              </Card>

              <Card className="appointment-card appointment-list-card">
                <h3>
                  Upcoming Appointments
                </h3>
                <div className="appointment-range-tabs">
                  {["Days", "Months", "Years"].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRange(r)}
                      className={range === r ? "active" : ""}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                <ul>
                  {upcoming.map((a) => (
                    <AppointmentRow
                      key={a.id}
                      item={a}
                      onDelete={() => remove(a.id)}
                      onComplete={() => markDone(a.id)}
                    />
                  ))}
                  {upcoming.length === 0 && (
                    <p className="appointment-empty-state">
                      Nothing scheduled in this range. Book a new appointment to
                      get started.
                    </p>
                  )}
                </ul>
              </Card>
              </aside>
            </div>
          </>
        )}

        {toast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-slate-800 px-5 py-2 text-sm text-white shadow-lg">
            {toast}
          </div>
        )}
      </div>
      <SiteFooter />
    </AppShell>
  );
}
