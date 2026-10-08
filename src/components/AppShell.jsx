import doctorImage from "../assets/images/myPatient.png";
import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import Information from "./Information.jsx";
const NAV_ITEMS = [
  { href: "/dashboard", icon: "🏠", label: "Dashboard", key: "dashboard" },
  { href: "#", icon: "📅", label: "Appointments", key: "appointments" },
  {
    href: "/find-doctor",
    icon: "🩺",
    label: "Find Doctor",
    key: "find-doctor",
  },
  {
    href: "/find-clinic",
    icon: "🏥",
    label: "Find Clinic",
    key: "find-clinic",
  },
  {
    href: "/find-marketplace",
    icon: "🛒",
    label: "Find MarketPlace",
    key: "marketplace",
  },
  {
    href: "/find-pharmacy",
    icon: "💊",
    label: "Find Pharmacy",
    key: "pharmacy",
  },
  {
    href: "/my-dependets",
    icon: "👪",
    label: "My Dependents",
    key: "dependents",
  },
  { href: "#", icon: "👤", label: "My Account", key: "account" },
  { href: "#", icon: "⚙️", label: "Settings", key: "settings" },
];

function Sidebar({ activeKey, collapsed, open, onNavigate }) {
  return (
    <aside
      className={`sidebar${collapsed ? " collapsed" : ""}${open ? " open" : ""}`}
      id="sidebar"
    >
      <div className="sidebar-logo">
        <span className="logo-badge">
          <img src={doctorImage} alt="My Patient" className="logo-badge" />
        </span>
        <span className="logo-text">MyPatientHUB</span>
      </div>

      <nav>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.key}
            href={item.href}
            className={item.key === activeKey ? "active" : undefined}
            aria-current={item.key === activeKey ? "page" : undefined}
            onClick={onNavigate}
          >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="sidebar-help">
        Need help? <br /> Ask us anything!
      </div>
      <button
        className="sidebar-help-mini"
        type="button"
        aria-label="Need help? Ask us anything!"
        title="Need help? Ask us anything!"
      >
        ?
      </button>
    </aside>
  );
}

function Topbar({ crumb, title, onToggleSidebar, sidebarExpanded }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  return (
    <div className="topbar">
      <div className="topbar-left">
        <div>
          <div className="crumbs">🏠 / {crumb}</div>
          <h2>{title}</h2>
        </div>
        <button
          className="sidebar-toggle"
          id="sidebarToggle"
          type="button"
          aria-label="Toggle sidebar"
          aria-expanded={sidebarExpanded}
          aria-controls="sidebar"
          onClick={onToggleSidebar}
        >
          <span className="hamburger-icon">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
      <div className="topbar-right">
        <input type="text" placeholder="Type here..." />
        <button
          className="theme-toggle"
          type="button"
          aria-label="Toggle dark mode"
        >
          <span className="toggle-icon">🌙</span>
          <span className="toggle-text">Dark</span>
        </button>
        <div className="notification-menu">
          <button
            className="notification-toggle"
            type="button"
            aria-label="Show notifications"
            aria-expanded={notificationsOpen}
            aria-controls="notification-panel"
            onClick={() => setNotificationsOpen((open) => !open)}
          >
            <FaBell aria-hidden="true" />
            <span className="notification-count">3</span>
          </button>
          {notificationsOpen && (
            <section
              className="notification-panel"
              id="notification-panel"
              aria-label="Notifications"
            >
              <h3>Notifications</h3>
              <Information />
            </section>
          )}
        </div>{" "}
        <span className="logout" onClick={() => (window.location.href = "/")}>
          🔒 Log out
        </span>
        <span>⚙️</span>
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        © 2026, made with ❤ by <strong>MyPiHUB</strong> for a better web.
      </div>
      <div className="links">
        <a href="#">MyPatientHUB</a>
        <a href="#">About Us</a>
        <a href="#">Blog</a>
      </div>
    </footer>
  );
}

export default function AppShell({ activeKey, crumb, title, children }) {
  const [collapsed, setCollapsed] = useState(
    () =>
      window.innerWidth > 1000 &&
      localStorage.getItem("sidebarCollapsed") === "1",
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMobileOpen(false);
      if (window.innerWidth > 1000) {
        setCollapsed(localStorage.getItem("sidebarCollapsed") === "1");
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const toggleSidebar = () => {
    if (window.innerWidth <= 1000) {
      setMobileOpen((open) => !open);
      return;
    }

    setCollapsed((wasCollapsed) => {
      const nextCollapsed = !wasCollapsed;
      localStorage.setItem("sidebarCollapsed", nextCollapsed ? "1" : "0");
      return nextCollapsed;
    });
  };

  const closeMobileSidebar = () => setMobileOpen(false);

  return (
    <div className="dashboard-layout">
      <div
        className={`sidebar-backdrop${mobileOpen ? " show" : ""}`}
        id="sidebarBackdrop"
        onClick={closeMobileSidebar}
      ></div>
      <Sidebar
        activeKey={activeKey}
        collapsed={collapsed}
        open={mobileOpen}
        onNavigate={closeMobileSidebar}
      />
      <div className="main">
        <Topbar
          crumb={crumb}
          title={title}
          onToggleSidebar={toggleSidebar}
          sidebarExpanded={window.innerWidth <= 1000 ? mobileOpen : !collapsed}
        />
        {children}
      </div>
    </div>
  );
}
