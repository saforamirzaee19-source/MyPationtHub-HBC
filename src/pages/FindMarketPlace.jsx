import AppShell, { SiteFooter } from "../components/AppShell.jsx";
import useLegacyScript from "../hooks/useLegacyScript.js";
import MarketplaceCard from "../components/FindMarketCards.jsx";
import ResultsTable from "../components/ResultTable.jsx";

// These lightweight local SVGs keep the marketplace page self-contained.
const foodImage = (color) => `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360"><defs><linearGradient id="g" x2="0" y2="1"><stop stop-color="${color}"/><stop offset="1" stop-color="#f6e9d2"/></linearGradient></defs><rect width="640" height="360" fill="url(#g)"/><circle cx="320" cy="190" r="112" fill="#fff" opacity=".9"/><circle cx="320" cy="190" r="83" fill="#d9a441"/><ellipse cx="320" cy="179" rx="69" ry="54" fill="#79a95b"/><circle cx="292" cy="166" r="17" fill="#df6150"/><circle cx="345" cy="194" r="19" fill="#f1cf64"/><path d="M273 215q48 32 95-2" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"/></svg>`
 )}`;
const providerLogo = (label, color) => `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" rx="40" fill="${color}"/><text x="40" y="48" text-anchor="middle" font-family="Arial,sans-serif" font-size="23" font-weight="700" fill="white">${label}</text></svg>`
 )}`;
const food1 = foodImage("#b7d9a5");
const food2 = foodImage("#f0c16b");
const food3 = foodImage("#8dc9b2");
const food4 = foodImage("#e5a99a");
const foodPandaLogo = providerLogo("FP", "#e84d5b");
const grabLogo = providerLogo("G", "#14834a");
const deliverooLogo = providerLogo("D", "#32b8b2");
const minimalistLogo = providerLogo("M", "#333333");

// ---------- Data for the cards ----------
const items = [
  {
    id: 1,
    image: food1,
    category: "Healthy Diet",
    price: 5,
    logo: foodPandaLogo,
    name: "Food Panda",
    description: "As Uber works through a huge amount of internal management turmoil.",
  },
  {
    id: 2,
    image: food2,
    category: "Healthy Diet",
    price: 10,
    logo: grabLogo,
    name: "Grab Food",
    description: "Music is something that every person has his own taste.",
  },
  {
    id: 3,
    image: food3,
    category: "Healthy Diet",
    price: 15,
    logo: deliverooLogo,
    name: "Deliveroo",
    description: "Different people have different taste, and various types of music.",
  },
  {
    id: 4,
    image: food4,
    category: "Healthy Diet",
    price: 20,
    logo: minimalistLogo,
    name: "Minimalist",
    description: "Different people have different taste, and various types of music.",
  },
];

// ---------- Data for the table ----------
const rows = [
  { rowKey: 1, image: food1, name: "Healthy Diet", category: "Food", serviceLogo: foodPandaLogo, serviceName: "Food panda", discount: 0, price: 10, id: "243598234" },
  { rowKey: 2, image: food2, name: "Healthy Diet", category: "Food", serviceLogo: grabLogo, serviceName: "Grab Food", discount: 5, price: 9, id: "877712" },
  { rowKey: 3, image: food3, name: "Healthy Diet", category: "Food", serviceLogo: deliverooLogo, serviceName: "Delivroo", discount: 9, price: 25, id: "0134729" },
  { rowKey: 4, image: food4, name: "Healthy Diet", category: "Food", serviceLogo: foodPandaLogo, serviceName: "Food Panda", discount: 5, price: 15, id: "113213" },
  { rowKey: 5, image: food1, name: "Healthy Diet", category: "Food", serviceLogo: foodPandaLogo, serviceName: "Food Panda", discount: 7, price: 25, id: "634729" },
  { rowKey: 6, image: food2, name: "Healthy Diet", category: "Food", serviceLogo: foodPandaLogo, serviceName: "Food Panda", discount: 0, price: 20, id: "634729" },
];

// ---------- Page ----------
export default function FindMarketplaces() {
  useLegacyScript();

  return (
    <AppShell activeKey="marketplace" crumb="Find MarketPlace" title="Find MarketPlace">
      <main className="offers-page">
        {/* Cards section */}
        <section className="offers-page__section">
          <h2 className="offers-page__title">Search Marketplaces and order what you need</h2>

          <div className="offers-page__grid">
            {items.map((item) => (
              <MarketplaceCard
                key={item.id}
                {...item}
                onBuy={() => console.log("buy", item.name)}
              />
            ))}
          </div>
        </section>

        {/* Table section */}
        <ResultsTable
          title="Other results for healthy diet search"
          rows={rows}
          onRowClick={(row) => console.log("clicked", row)}
        />
      </main>
      <SiteFooter />
    </AppShell>
  );
}
