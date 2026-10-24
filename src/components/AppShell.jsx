import doctorImage from "../assets/images/myPatient.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import Information from "./Information.jsx";
import ConfirmationLoginMSG from "./ConfimatioLoginMSG.jsx";
import { Variable } from "lucide-react";

// Sidbar Variables
const NAV_ITEMS = [
  { href: "/dashboard", icon: "🏠", label: "Dashboard", key: "dashboard" },
  {
    href: "/appointment",
    icon: "📅",
    label: "Appointments",
    key: "appointments",
  },
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
    href: "/chat",
    icon: "💬",
    label: "Chat",
    key: "chat",
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
    href: "/my-dependents",
    icon: "👪",
    label: "My Dependents",
    key: "dependents",
  },
  {
    href: "/my-account",
    icon: "👤",
    label: "My Account",
    key: "account",
  },
  { href: "/sitting", icon: "⚙️", label: "Settings", key: "settings" },
];

// Sidbar function

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

// Header or topbar function
function Topbar({
  crumb,
  title,
  onToggleSidebar,
  sidebarExpanded,
  theme,
  onToggleTheme,
  onLogout,
}) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const terms = searchQuery
      .trim()
      .toLocaleLowerCase()
      .split(/\s+/)
      .filter(Boolean);
    if (!terms.length) {
      setSearchResults([]);
      return;
    }

    const page = document.querySelector(".main");
    if (!page) {
      setSearchResults([]);
      return;
    }

    const candidates = Array.from(page.querySelectorAll("*")).reverse();
    const matches = [];

    candidates.forEach((element) => {
      if (
        element.closest(
          ".topbar, .site-footer, [hidden], script, style, noscript, input, textarea, select, option, svg",
        ) ||
        element.getClientRects().length === 0
      ) {
        return;
      }

      const text = (element.innerText || element.textContent || "")
        .replace(/\s+/g, " ")
        .trim();
      const normalizedText = text.toLocaleLowerCase();
      if (!text || !terms.every((term) => normalizedText.includes(term)))
        return;
      if (matches.some(({ element: match }) => element.contains(match))) return;

      matches.push({ element, text });
    });

    setSearchResults(matches.reverse().slice(0, 8));
  }, [searchQuery]);

  const navigateToSearchResult = (element) => {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
    setSearchQuery("");
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <div>
          <div className="crumbs">
            <Link
              to="/dashboard"
              className="topbar-home-link"
              aria-label="Go to dashboard"
              title="Dashboard"
            >
              🏠
            </Link>{" "}
            / {crumb}
          </div>
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
        <div className="topbar-search">
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search this page..."
            aria-label="Search this page"
            aria-expanded={searchQuery.trim().length > 0}
            aria-controls="topbar-search-results"
          />
          {searchQuery.trim() && (
            <div
              className="topbar-search-results"
              id="topbar-search-results"
              role="region"
              aria-label="Search results"
              aria-live="polite"
            >
              {searchResults.length ? (
                searchResults.map(({ element, text }, index) => (
                  <button
                    className="topbar-search-result"
                    key={`${index}-${text}`}
                    type="button"
                    onClick={() => navigateToSearchResult(element)}
                  >
                    {text.length > 140 ? `${text.slice(0, 137)}...` : text}
                  </button>
                ))
              ) : (
                <p className="topbar-search-empty">
                  No results found on this page.
                </p>
              )}
            </div>
          )}
        </div>
        <button
          className="theme-toggle"
          type="button"
          data-react-theme-toggle="true"
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
          onClick={onToggleTheme}
        >
          <span className="toggle-icon">{theme === "dark" ? "☀️" : "🌙"}</span>
          <span className="toggle-text">
            {theme === "dark" ? "Light" : "Dark"}
          </span>
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
        <button className="logout" type="button" onClick={onLogout}>
          <span aria-hidden="true">🔒</span>
          <span>Log out</span>
        </button>
        <Link
          to="/sitting"
          className="topbar-settings-link"
          aria-label="Go to settings"
          title="Settings"
        >
          ⚙️
        </Link>
      </div>
    </div>
  );
}

//  Footer
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
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  const [collapsed, setCollapsed] = useState(
    () =>
      window.innerWidth > 1000 &&
      localStorage.getItem("sidebarCollapsed") === "1",
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-theme", theme === "dark");
    document.body.classList.toggle("light-theme", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

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
  const toggleTheme = () =>
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  const handleLogout = async () => {
    await ConfirmationLoginMSG("logout");
    navigate("/");
  };

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
          theme={theme}
          onToggleTheme={toggleTheme}
          onLogout={handleLogout}
        />
        {children}
      </div>
    </div>
  );
}
