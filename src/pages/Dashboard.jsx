import useLegacyScript from "../hooks/useLegacyScript.js";
import AppShell, { SiteFooter } from "../components/AppShell.jsx";
import ReactCharts from "../components/ReactCharts.jsx";
import doctorImage from "../assets/images/myPatient.png";

const clinicLabels = ["Klinik Lee Healthcare", "Klinik Bandar Baru Nilai", "Klinik Mediviron Giant Nilai", "Klinik Nilai Impian", "Klinik Mediviron"];
const clinicDatasets = [{ label: "Promotion", data: [19, 4, 10, 21, 2], backgroundColor: ["#e6007e", "#241a3d", "#f5b642", "#8a153a", "#3b82f6"], borderWidth: 0 }];
const pharmacyLabels = ["Alpro Pharmacy Nilai", "Alpro Pharmacy Pekan Nilai", "OK Pharmacy", "Pharmart Pharmacy Nilai", "Health Lane Family Pharmacy"];
const pharmacyDatasets = [{ label: "Promotion", data: [15, 12, 5, 9, 14], backgroundColor: ["#241a3d", "#3b82f6", "#e6007e", "#8a153a", "#60a5fa"], borderWidth: 0 }];
const marketLabels = ["Food Panda", "Grab Food", "Zomato", "Lazada", "Uber Eats"];
const marketDatasets = [{ label: "Usage", data: [25, 3, 12, 7, 10], backgroundColor: ["#414a80", "#2867ff", "#e6007e", "#8a153a", "#60a5fa"], borderWidth: 0 }];
const wellnessLabels = ["2017", "2018", "2019", "2020", "2021", "2022"];
const wellnessDatasets = [
  { label: "Malaria", data: [85, 55, 30, 25, 110, 20], backgroundColor: "rgba(0,139,255,.15)", borderColor: "#008df5", pointBackgroundColor: "#008df5", borderWidth: 2 },
  { label: "Cold", data: [65, 45, 35, 75, 15, 90], backgroundColor: "rgba(165,21,103,.15)", borderColor: "#a51567", pointBackgroundColor: "#a51567", borderWidth: 2 },
  { label: "Typhoid", data: [45, 75, 90, 15, 35, 25], backgroundColor: "rgba(255,166,0,.12)", borderColor: "#ffa600", pointBackgroundColor: "#ffa600", borderWidth: 2 },
  { label: "Cough", data: [80, 20, 90, 30, 55, 25], backgroundColor: "rgba(255,64,91,.1)", borderColor: "#ff405b", pointBackgroundColor: "#ff405b", borderWidth: 2 },
];
const appointmentLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const appointmentDatasets = [
  { label: "Emergency", data: [44, 55, 41, 67, 22, 43], backgroundColor: "#078cf0", stack: "appointments" },
  { label: "Examination", data: [13, 23, 20, 8, 13, 27], backgroundColor: "#a51567", stack: "appointments" },
  { label: "Consultation", data: [11, 17, 15, 15, 21, 14], backgroundColor: "#ffa914", stack: "appointments" },
  { label: "Routine Checkup", data: [21, 7, 25, 13, 22, 8], backgroundColor: "#ff405d", borderRadius: 8, stack: "appointments" },
];

function PromotionCard({ title, labels, datasets, values, action = "MORE DETAILS" }) {
  const colors = datasets[0].backgroundColor;
  return (
    <section className="card promotion-card">
      <div className="card-header"><h3>{title}</h3><span className="info-mark">!</span></div>
      <div className="promotion-body">
        <div className="promotion-chart">
          <ReactCharts type="doughnut" labels={labels} datasets={datasets} options={{ cutout: "62%", plugins: { legend: { display: false } }, layout: { padding: 2 } }} ariaLabel={`${title} chart`} />
        </div>
        <div className="promotion-legend">
          {labels.map((label, index) => (
            <div className="promotion-legend-item" key={label}>
              <span className="promotion-name"><i style={{ backgroundColor: Array.isArray(colors) ? colors[index] : colors }} />{label}</span>
              <strong>{values[index]}</strong>
            </div>
          ))}
        </div>
      </div>
      <button className="more-btn">{action}</button>
    </section>
  );
}

function HealthMetric({ title, data }) {
  return (
    <section className="card health-metric-card">
      <div className="card-header"><h3>{title}</h3></div>
      <div className="health-value">70% <span className="up">+3%</span></div>
      <div className="health-chart">
        <ReactCharts type="line" labels={data.map((_, index) => index)} datasets={[{ label: title, data, borderColor: "#526b91", backgroundColor: "rgba(82,107,145,.08)", fill: true, tension: 0.42, pointRadius: 0, borderWidth: 2 }]} options={{ plugins: { legend: { display: false }, tooltip: { enabled: true } }, scales: { x: { display: false }, y: { display: false, min: 0, max: 100 } }, elements: { line: { capBezierPoints: true } } }} ariaLabel={`${title} trend`} />
      </div>
    </section>
  );
}

export default function Dashboard() {
  useLegacyScript();

  return (
    <AppShell activeKey="dashboard" crumb="Dashboard" title="Dashboard">
      {/* Page content */}
      <div className="content">
        <h1>Welcome To MyPatientHUB!</h1>

        <div className="grid">
          <PromotionCard title="Promotion by Clinics" labels={clinicLabels} datasets={clinicDatasets} values={["19%", "4%", "10%", "21%", "2%"]} />
          <PromotionCard title="Promotion by Pharmacies" labels={pharmacyLabels} datasets={pharmacyDatasets} values={["15%", "12%", "5%", "9%", "14%"]} />
          <PromotionCard title="Smart Market Usage by app" labels={marketLabels} datasets={marketDatasets} values={["25%", "3%", "12%", "7%", "10%"]} action="SEE ALL REFERRALS" />
          <div className="health-stack">
            <HealthMetric title="Health Index" data={[58, 53, 61, 59, 72, 63, 77, 70, 82, 76, 88]} />
            <HealthMetric title="Symptoms" data={[41, 37, 45, 43, 55, 47, 59, 52, 57, 54, 64]} />
          </div>
        </div>
      </div>

      <main className="dashboard-grid">
        {/* Wellness Chart */}
        <section className="card wellness-card">
          <div className="card-header">
            <h2>Chronic wellness Tracker</h2>
            <span className="menu">☰</span>
          </div>
          <div className="chart-container">
            <ReactCharts type="radar" labels={wellnessLabels} datasets={wellnessDatasets} options={{ scales: { r: { min: 0, max: 120, ticks: { stepSize: 30, backdropColor: "transparent" } } } }} ariaLabel="Chronic wellness tracker" />
          </div>
        </section>

        {/* Appointment Chart */}
        <section className="card appointment-chart-card">
          <div className="card-header">
            <h2>Appointment</h2>
            <span className="menu">☰</span>
          </div>
          <div className="chart-container">
            <ReactCharts type="bar" labels={appointmentLabels} datasets={appointmentDatasets} options={{ scales: { x: { stacked: true, grid: { display: false } }, y: { stacked: true, beginAtZero: true, max: 120, ticks: { stepSize: 30 } } } }} ariaLabel="Appointments by month and type" />
          </div>
        </section>

        {/* Map */}
        <section className="map-card">
          <div className="map-buttons">
            <button className="active">Map</button>
            <button>Satellite</button>
          </div>
          <button className="fullscreen">⛶</button>
          <div id="map"></div>
        </section>

        {/* Previous Appointments */}
        <section className="card previous-card">
          <h2>Previous Appointments</h2>

          <div className="appointment">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Doctor" />
            <div className="doctor-info">
              <h3>
                Dr. Mustafa
              </h3>
              <p>Emergency</p>
            </div>
            <div className="appointment-date">
              <span>Tuesday, April 5</span>
              <b>⋮</b>
            </div>
          </div>

          <div className="appointment">
            <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Doctor" />
            <div className="doctor-info">
              <h3>DR. KHIRULLAH</h3>
              <p>consultant</p>
            </div>
            <div className="appointment-date">
              <span>Friday, November 2</span>
              <b>⋮</b>
            </div>
          </div>

          <div className="appointment">
            <img src="https://randomuser.me/api/portraits/men/68.jpg" alt="Doctor" />
            <div className="doctor-info">
              <h3>Dr. Ahmad</h3>
              <p>Specialist</p>
            </div>
            <div className="appointment-date">
              <span>Monday, January 15</span>
              <b>⋮</b>
            </div>
          </div>
        </section>
      </main>

          {/* Doctors */}
          <div className="card" style={{ gridColumn: "1 / -1" }}>
            <div className="card-header">
              <h3>Top Doctors</h3>
              <span>ⓘ</span>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Doctor</th>
                    <th>Specialty</th>
                    <th>Fee</th>
                    <th>Booking Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="doc-name"><span className="avatar-flag">🇲🇾</span> Dr Affan</td>
                    <td>Cardiologist</td>
                    <td>RM 400</td>
                    <td>40%</td>
                  </tr>
                  <tr>
                    <td className="doc-name"><span className="avatar-flag">🇲🇾</span> Dr Sarah Lim</td>
                    <td>Pediatrician</td>
                    <td>RM 250</td>
                    <td>32%</td>
                  </tr>
                  <tr>
                    <td className="doc-name"><span className="avatar-flag">🇲🇾</span> Dr Kumar</td>
                    <td>Dermatologist</td>
                    <td>RM 300</td>
                    <td>28%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

      <SiteFooter />
    </AppShell>
  );
}
