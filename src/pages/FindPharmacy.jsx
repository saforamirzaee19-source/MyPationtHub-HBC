import AppShell, { SiteFooter } from "../components/AppShell.jsx";
import useLegacyScript from "../hooks/useLegacyScript.js";
import MarketplaceCard from "../components/FindMarketCards.jsx";
import ResultsTable from "../components/ResultTable.jsx";

import esomephrazole from "../assets/images/Esomephrazole.jpg";
import omeprazole from "../assets/images/Omeprazole.jpg";
import lansoprazole from "../assets/images/Lansoprazole.jpg";
import dexlansoprazole from "../assets/images/Dexlansoprazole.jpg";
import carryLogo from "../assets/images/sarryMedical.jpg";
import poolLogo from "../assets/images/poolMedical.jpg";
import okLogo from "../assets/images/okPharmacy.jpg";
import hamzaLogo from "../assets/images/hamzaPharma.jpg";
 
// ---------- Data for the cards ----------
const items = [
  {
    id: 1,
    image: esomephrazole,
    category: "Esomephrazole",
    price: 10,
    logo: carryLogo,
    name: "Carry Medical",
    description: "Carry Medical Provide Fresh and Excellent Quality Drugs.",
  },
  {
    id: 2,
    image: omeprazole,
    category: "Omeprazole",
    price: 9,
    logo: poolLogo,
    name: "Pool Medical",
    description: "High Quality is Our Strenght we provide good",
  },
  {
    id: 3,
    image: lansoprazole,
    category: "Lansoprazole",
    price: 8,
    logo: okLogo,
    name: "OK Phramacy",
    description: "Different people have different taste, and various types of tablet.",
  },
  {
    id: 4,
    image: dexlansoprazole,
    category: "Dexlansoprazole",
    price: 11,
    logo: hamzaLogo,
    name: "Hamza Pharma",
    description: "Different people have different taste, and various types of music.",
  },
];
 
// ---------- Data for the table ----------
const rows = [
  { rowKey: 1, image: esomephrazole, name: "Esomephrazole", category: "Tablet", serviceLogo: carryLogo, serviceName: "Caring Pharmacy", discount: 1, price: 5, id: "8234" },
  { rowKey: 2, image: omeprazole, name: "Omeprazole", category: "Tablet", serviceLogo: okLogo, serviceName: "OK Pharmacy", discount: 3, price: 9, id: "872" },
  { rowKey: 3, image: lansoprazole, name: "Lansoprazole", category: "Tablet", serviceLogo: poolLogo, serviceName: "Hilton Medical", discount: 5, price: 7, id: "0134" },
  { rowKey: 4, image: dexlansoprazole, name: "Dexlansoprazole", category: "Tablet", serviceLogo: hamzaLogo, serviceName: "Hinucion Pharma", discount: 5, price: 9, id: "113" },
  { rowKey: 5, image: esomephrazole, name: "Esomephrazole", category: "Tablet", serviceLogo: hamzaLogo, serviceName: "Hamza Medical Pharmacy", discount: 7, price: 20, id: "629" },
  { rowKey: 6, image: omeprazole, name: "Omeprazole", category: "Tablet", serviceLogo: poolLogo, serviceName: "Pool Medical", discount: 0, price: 20, id: "634729" },
];
 
// ---------- Page ----------
export default function FindPharmacy() {
  useLegacyScript();
 
  return (
    <AppShell activeKey="pharmacy" crumb="Find Pharmacy" title="Find Pharmacy">
      <main className="offers-page">
        {/* Cards section */}
        <section className="offers-page__section">
          <h2 className="offers-page__title">Search Pharmacies for Medicines</h2>
 
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
          title="Other results for Esso search"
          rows={rows}
          onRowClick={(row) => console.log("clicked", row)}
        />
      </main>
      <SiteFooter />
    </AppShell>
  );
}
 
