import AppShell, { SiteFooter } from "../components/AppShell.jsx";
import useLegacyScript from "../hooks/useLegacyScript.js";
import MarketplaceCard from "../components/FindMarketCards.jsx";
import ResultsTable from "../components/ResultTable.jsx";

import food1 from "../assets/images/food-1.jpg";
import food2 from "../assets/images/food-2.jpg";
import food3 from "../assets/images/food-3.jpg";
import food4 from "../assets/images/food-4.jpg";
import foodPandaLogo from "../assets/images/foodPanda.png";
import grabLogo from "../assets/images/grab.png";
import deliverooLogo from "../assets/images/delevero.png";
import minimalistLogo from "../assets/images/minimalist.jpg";

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
