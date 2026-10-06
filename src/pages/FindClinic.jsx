import useLegacyScript from "../hooks/useLegacyScript.js";
import AppShell, { SiteFooter } from "../components/AppShell.jsx";

export default function FindClinic() {
  useLegacyScript();

  return (
    <AppShell activeKey="find-clinic" crumb="Find Clinic" title="Find Clinic">
      <main className="clinic-page" aria-labelledby="clinicTitle">
        <section className="clinic-hero">
          <div className="clinic-hero-copy">
            <p className="eyebrow">Care close to home</p>
            <h1 id="clinicTitle">Find a clinic near you</h1>
            <p>Search nearby clinics, compare services, and choose a location that works for your next visit.</p>
          </div>
          <div className="clinic-search-area">
            <label><span>Clinic or service</span><input id="clinicSearch" type="search" placeholder="Primary care, urgent care..." autoComplete="off" /></label>
            <label><span>Location</span><input id="clinicLocation" type="text" placeholder="City, zip code, or neighborhood" autoComplete="postal-code" /></label>
            <button className="current-btn" id="clinicUseLocation" type="button">⌖ Use location</button>
            <button className="search-btn" id="clinicSearchButton" type="button">Search clinics</button>
            <p id="clinicStatus" className="clinic-status" role="status" aria-live="polite"></p>
          </div>
        </section>

        <div className="view-buttons" role="tablist" aria-label="Clinic results view">
          <button className="view-btn active" id="clinicMapTab" type="button" role="tab" aria-selected="true">⌖ Map</button>
          <button className="view-btn" id="clinicListTab" type="button" role="tab" aria-selected="false">☷ List</button>
        </div>

        <section className="clinic-content">
          <aside className="filters" aria-label="Clinic filters">
            <div className="filter-box">
              <h2>Refine results</h2>
              <label className="clinic-filter-label" htmlFor="clinicType">Clinic type</label>
              <select id="clinicType">
                <option value="">All clinic types</option>
                <option value="Primary Care">Primary Care</option>
                <option value="Urgent Care">Urgent Care</option>
                <option value="Specialty Care">Specialty Care</option>
              </select>
              <h3>Services</h3>
              <label className="checkbox"><input type="checkbox" data-clinic-filter="Online scheduling" /><span>Online scheduling</span></label>
              <label className="checkbox"><input type="checkbox" data-clinic-filter="Open today" /><span>Open today</span></label>
              <label className="checkbox"><input type="checkbox" data-clinic-filter="All ages" /><span>All ages</span></label>
              <button className="clear-filters" id="clearClinicFilters" type="button">Clear filters</button>
            </div>
          </aside>

          <div className="clinic-results">
            <div className="clinic-results-heading">
              <div>
                <p className="eyebrow">Nearby care</p>
                <h2 id="clinicResultTitle">Clinics near you</h2>
              </div>
              <span id="clinicResultCount">3 locations</span>
            </div>
            <div className="map-view" id="clinicMapView">
              <div className="map-toolbar">
                <button className="map-type active" id="streetMapButton" type="button">Street</button>
                <button className="map-type" id="satelliteMapButton" type="button">Satellite</button>
                <button className="fullscreen" id="clinicFullscreen" type="button" aria-label="View map fullscreen">⛶</button>
              </div>
              <div id="clinicMap" aria-label="Interactive map showing nearby clinics"></div>
            </div>
            <div className="clinic-list" id="clinicList"></div>
            <p className="clinic-empty" id="clinicEmpty" hidden>No clinics match these filters. Try another search.</p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </AppShell>
  );
}
