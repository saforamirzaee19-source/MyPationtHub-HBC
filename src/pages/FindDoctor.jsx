import useLegacyScript from "../hooks/useLegacyScript.js";
import AppShell, { SiteFooter } from "../components/AppShell.jsx";

export default function FindDoctor() {
  useLegacyScript();

  return (
    <AppShell activeKey="find-doctor" crumb="Find Doctor" title="Find Doctor">
      <main className="content doctor-page">
        <section className="find-doctor-hero" aria-labelledby="findDoctorTitle">
          <div>
            <p className="eyebrow">Your care, your way</p>
            <h1 id="findDoctorTitle">Find a doctor near you</h1>
            <p>Compare trusted specialists, check availability, and find the right care for your next visit.</p>
            <div className="hero-highlights" aria-label="Find doctor benefits">
              <span><strong>250+</strong> specialists</span>
              <span><strong>4.9/5</strong> patient rating</span>
              <span><strong>Same-day</strong> options</span>
            </div>
          </div>
          <div className="hero-mark" aria-hidden="true"><span>✚</span><small>Care starts here</small></div>
        </section>

        <form className="doctor-search-panel" id="doctorSearchForm">
          <div className="search-field search-field-wide">
            <label htmlFor="doctorSearch">What are you looking for?</label>
            <input id="doctorSearch" type="search" placeholder="Name, specialty, or service" autoComplete="off" />
          </div>
          <div className="search-field">
            <label htmlFor="locationSearch">Where?</label>
            <input id="locationSearch" type="text" placeholder="Zip code or neighborhood" autoComplete="postal-code" />
          </div>
          <button className="btn-doctor-find search-button" type="submit"><span aria-hidden="true">⌕</span> Search doctors</button>
          <button className="btn-doctor-find current-button" id="useLocation" type="button"><span aria-hidden="true">⌖</span> Use my location</button>
          <p className="search-status" id="doctorSearchStatus" role="status" aria-live="polite"></p>
        </form>

        <section className="cards-find-doctor" aria-labelledby="servicesTitle">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Explore care</p>
              <h2 id="servicesTitle">Special services</h2>
            </div>
            <span className="service-count" id="serviceCount">4 services</span>
          </div>
          <div className="service-grid" id="serviceGrid">
            <article className="card service-card" data-search="primary care internal medicine wellness family doctor">
              <a href="/find-clinic">
                <span><img src="/images/heart.webp" alt="Heart" /></span>
                <h2>Primary Care and Internal MD</h2>
                <p>Our doctors partner with you to support your long-term wellness.</p>
              </a>
            </article>
            <article className="card service-card" data-search="emergency care adults children urgent hospital">
              <a href="/find-clinic">
                <span><img src="/images/heart-hand.webp" alt="Emergency" /></span>
                <h2>Emergency Care</h2>
                <p>We provide emergency care for adults and children</p>
              </a>
            </article>
            <article className="card service-card" data-search="imaging services xray mri scan diagnostic">
              <a href="/find-clinic">
                <span><img src="/images/services.webp" alt="Imaging" /></span>
                <h2>Imaging Services</h2>
                <p>From X-rays to MRI scans, our imaging team is here to help.</p>
              </a>
            </article>
            <article className="card service-card" data-search="urgent care walk in quick treatment">
              <a href="/find-clinic">
                <span><img src="/images/urgent.avif" alt="Urgent" /></span>
                <h2>Urgent Care</h2>
                <p>Walk-in care for everyday illnesses and minor injuries.</p>
              </a>
            </article>
          </div>
          <p className="empty-services" id="emptyServices" hidden>No services match that search. Try a different specialty or service.</p>
        </section>

        <section className="doctor-results" aria-labelledby="doctorResultsTitle">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Recommended for you</p>
              <h2 id="doctorResultsTitle">Available specialists</h2>
            </div>
            <span className="service-count" id="doctorResultCount">4 doctors</span>
          </div>
          <div className="doctor-result-grid" id="doctorResultGrid"></div>
          <p className="empty-services" id="emptyDoctors" hidden>No doctors match that search. Try another specialty or location.</p>
        </section>

        <section className="doctors-specialty">
          <div className="header-specialty">
            <p className="eyebrow">Browse care</p>
            <h2>Doctors by specialty</h2>
            <p>Select a specialty to explore doctors and available appointment times.</p>
          </div>
          <div className="specialty-list">
            <button className="specialty" type="button" data-specialty="Anesthesiology">Anesthesiology <span>↗</span></button>
            <button className="specialty" type="button" data-specialty="Dermatology">Dermatology <span>↗</span></button>
            <button className="specialty" type="button" data-specialty="Emergency medicine">Emergency medicine <span>↗</span></button>
            <button className="specialty" type="button" data-specialty="Neurology">Neurology <span>↗</span></button>
            <button className="specialty" type="button" data-specialty="Consultation">Consultation <span>↗</span></button>
            <button className="specialty" type="button" data-specialty="Ophthalmology">Ophthalmology <span>↗</span></button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </AppShell>
  );
}
