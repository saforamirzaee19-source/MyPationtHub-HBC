// Auto-wrapped version of the original script.js so it can run inside a React useEffect.
// Logic is unchanged from the original file; only the outer function wrapper was added.
export default function initLegacyScript() {
// Login Form 
const loginForm = document.getElementById("loginForm");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

if (passwordInput && togglePassword) {
  togglePassword.addEventListener("click", function () {
    const isPasswordHidden = passwordInput.type === "password";
    passwordInput.type = isPasswordHidden ? "text" : "password";
    togglePassword.textContent = isPasswordHidden ? "🙈" : "👁";
    togglePassword.setAttribute("aria-label", isPasswordHidden ? "Hide password" : "Show password");
    togglePassword.setAttribute("title", isPasswordHidden ? "Hide password" : "Show password");
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    if (username === "" || password === "") {
      errorMsg.textContent = "Please fill in both fields.";
      errorMsg.classList.add("show");
      return;
    }

    if (password.length < 8) {
      errorMsg.textContent = "Password must be at least 8 characters.";
      errorMsg.classList.add("show");
      return;
    }

    errorMsg.classList.remove("show");
    window.location.href = "/dashboard"; // was "dashboard.html" in the original multi-page site
  });
}

// Dark Mode 
const themeButtons = document.querySelectorAll(
  '.theme-toggle:not([data-react-theme-toggle="true"])'
);

function applyTheme(theme) {
  const selectedTheme = theme === "dark" ? "dark" : "light";

  document.body.classList.toggle("dark-theme", selectedTheme === "dark");
  document.body.classList.toggle("light-theme", selectedTheme === "light");
  localStorage.setItem("theme", selectedTheme);

  themeButtons.forEach((button) => {
    const icon = button.querySelector(".toggle-icon");
    const text = button.querySelector(".toggle-text");

    if (icon) {
      icon.textContent = selectedTheme === "dark" ? "☀️" : "🌙";
    }

    if (text) {
      text.textContent = selectedTheme === "dark" ? "Light" : "Dark";
    }

    button.setAttribute(
      "aria-label",
      selectedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
  });
}

const savedTheme = localStorage.getItem("theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";  //===> CSS Media Featur
applyTheme(savedTheme || preferredTheme);

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");
    document.body.classList.toggle("light-theme", !isDark);
    applyTheme(isDark ? "dark" : "light");
  });
});

// Find doctor search
const doctorSearchForm = document.getElementById("doctorSearchForm");
const doctorSearch = document.getElementById("doctorSearch");
const locationSearch = document.getElementById("locationSearch");
const useLocationButton = document.getElementById("useLocation");
const doctorSearchStatus = document.getElementById("doctorSearchStatus");
const serviceCards = document.querySelectorAll(".service-card");
const serviceCount = document.getElementById("serviceCount");
const emptyServices = document.getElementById("emptyServices");
const doctorResultGrid = document.getElementById("doctorResultGrid");
const doctorResultCount = document.getElementById("doctorResultCount");
const emptyDoctors = document.getElementById("emptyDoctors");
const doctorAvatars = doctorResultGrid?.dataset;

const doctorDirectory = [
  { name: "Dr. Maya Patel", specialty: "Internal Medicine", detail: "Preventive care and wellness", rating: "4.9", reviews: 128, next: "Today, 2:30 PM", initials: "MP", avatar: doctorAvatars?.mayaAvatar, color: "mint" },
  { name: "Dr. Jonathan Reed", specialty: "Dermatology", detail: "Skin health and screenings", rating: "4.8", reviews: 96, next: "Tomorrow, 9:00 AM", initials: "JR", avatar: doctorAvatars?.jonathanAvatar, color: "blue" },
  { name: "Dr. Amina Okafor", specialty: "Neurology", detail: "Headache and sleep care", rating: "4.9", reviews: 84, next: "Thu, 11:15 AM", initials: "AO", avatar: doctorAvatars?.aminaAvatar, color: "coral" },
  { name: "Dr. Elena Torres", specialty: "Emergency Medicine", detail: "Urgent care for all ages", rating: "4.7", reviews: 112, next: "Today, 4:00 PM", initials: "ET", avatar: doctorAvatars?.elenaAvatar, color: "gold" }
];

const renderDoctors = (query = "") => {
  if (!doctorResultGrid) return;

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const matchingDoctors = doctorDirectory.filter((doctor) => {
    const searchableText = `${doctor.name} ${doctor.specialty} ${doctor.detail}`.toLowerCase();
    return terms.every((term) => searchableText.includes(term));
  });

  doctorResultGrid.innerHTML = matchingDoctors.map((doctor) => `
    <article class="doctor-result-card">
      <div class="doctor-card-top">
        <img class="doctor-avatar ${doctor.color}" src="${doctor.avatar}" alt="${doctor.name}" />
        <span class="availability"><i></i> Accepting patients</span>
      </div>
      <h3>${doctor.name}</h3>
      <p class="doctor-specialty-name">${doctor.specialty}</p>
      <p class="doctor-detail">${doctor.detail}</p>
      <div class="doctor-meta"><span>★ ${doctor.rating} <small>(${doctor.reviews})</small></span><span>Next: ${doctor.next}</span></div>
      <button class="doctor-book-button" type="button" data-doctor="${doctor.name}">View profile <span aria-hidden="true">→</span></button>
    </article>
  `).join("");

  if (doctorResultCount) {
    doctorResultCount.textContent = `${matchingDoctors.length} ${matchingDoctors.length === 1 ? "doctor" : "doctors"}`;
  }
  if (emptyDoctors) emptyDoctors.hidden = matchingDoctors.length !== 0;

  doctorResultGrid.querySelectorAll(".doctor-book-button").forEach((button) => {
    button.addEventListener("click", () => {
      if (doctorSearchStatus) doctorSearchStatus.textContent = `${button.dataset.doctor} is ready to help. Profile booking will be available soon.`;
    });
  });
};

renderDoctors();

if (doctorSearchForm && doctorSearch) {
  const filterServices = () => {
    const query = doctorSearch.value.trim().toLowerCase();
    const terms = query.split(/\s+/).filter(Boolean);
    let visibleServices = 0;

    serviceCards.forEach((card) => {
      const matches = !terms.length || terms.every((term) => card.dataset.search.includes(term));
      card.hidden = !matches;
      if (matches) visibleServices += 1;
    });

    renderDoctors(query);

    if (serviceCount) serviceCount.textContent = `${visibleServices} ${visibleServices === 1 ? "service" : "services"}`;
    if (emptyServices) emptyServices.hidden = visibleServices !== 0;
  };

  doctorSearch.addEventListener("input", filterServices);
  doctorSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    filterServices();
    const location = locationSearch ? locationSearch.value.trim() : "";
    const query = doctorSearch.value.trim() || "all services";
    if (doctorSearchStatus) doctorSearchStatus.textContent = `Showing ${query}${location ? ` near ${location}` : ""}.`;
  });
}

document.querySelectorAll(".specialty[data-specialty]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!doctorSearch) return;
    doctorSearch.value = button.dataset.specialty;
    doctorSearch.dispatchEvent(new Event("input", { bubbles: true }));
    doctorSearch.focus();
    document.querySelector(".doctor-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

if (useLocationButton && locationSearch && doctorSearchStatus) {
  useLocationButton.addEventListener("click", () => {
    if (!navigator.geolocation) {
      doctorSearchStatus.textContent = "Location is not available in this browser.";
      return;
    }

    useLocationButton.disabled = true;
    doctorSearchStatus.textContent = "Finding your location...";
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        locationSearch.value = `${coords.latitude.toFixed(3)}, ${coords.longitude.toFixed(3)}`;
        doctorSearchStatus.textContent = "Location added. Search to find nearby care.";
        useLocationButton.disabled = false;
      },
      () => {
        doctorSearchStatus.textContent = "We could not access your location. Enter a neighborhood or zip code instead.";
        useLocationButton.disabled = false;
      }
    );
  });
}

// Chronic Wellness Radar Chart

const wellnessCanvas = document.getElementById("wellnessChart");

if (wellnessCanvas) {
  const wellnessCtx = wellnessCanvas.getContext("2d");

  new Chart(wellnessCtx, {

      type: "radar",

      data: {

          labels: [
              "2017",
              "2018",
              "2019",
              "2020",
              "2021",
              "2022"
          ],

          datasets: [

              {
                  label: "Malaria",
                  data: [85, 55, 30, 25, 110, 20],

                  backgroundColor: "rgba(0, 139, 255, 0.15)",
                  borderColor: "#008df5",
                  pointBackgroundColor: "#008df5",

                  borderWidth: 2
              },

              {
                  label: "Cold",
                  data: [65, 45, 35, 75, 15, 90],

                  backgroundColor: "rgba(165, 21, 103, 0.15)",
                  borderColor: "#a51567",
                  pointBackgroundColor: "#a51567",

                  borderWidth: 2
              },

              {
                  label: "Typhoid",
                  data: [45, 75, 90, 15, 35, 25],

                  backgroundColor: "rgba(255, 166, 0, 0.12)",
                  borderColor: "#ffa600",
                  pointBackgroundColor: "#ffa600",

                  borderWidth: 2
              },

              {
                  label: "Cough",
                  data: [80, 20, 90, 30, 55, 25],

                  backgroundColor: "rgba(255, 64, 91, 0.10)",
                  borderColor: "#ff405b",
                  pointBackgroundColor: "#ff405b",

                  borderWidth: 2
              }

          ]
      },

      options: {

          responsive: true,
          maintainAspectRatio: false,

          scales: {

              r: {

                  min: 0,
                  max: 120,

                  ticks: {
                      stepSize: 30,
                      color: "#555",
                      backdropColor: "transparent"
                  },

                  grid: {
                      color: "#ddd"
                  },

                  angleLines: {
                      color: "#ddd"
                  },

                  pointLabels: {
                      color: "#999",
                      font: {
                          size: 13
                      }
                  }

              }

          },

          plugins: {

              legend: {
                  position: "bottom",

                  labels: {
                      usePointStyle: true,
                      padding: 15,
                      font: {
                          size: 14
                      }
                  }
              }

          }

      }

  });
}


// Appointment Bar Chart

const appointmentCanvas = document.getElementById("appointmentChart");

if (appointmentCanvas) {
  const appointmentCtx = appointmentCanvas.getContext("2d");

  new Chart(appointmentCtx, {

      type: "bar",

      data: {

          labels: [
              "Jan",
              "Feb.",
              "Mar.",
              "Apr.",
              "May",
              "Jun"
          ],

          datasets: [

              {
                  label: "Emergency",

                  data: [44, 55, 41, 67, 22, 43],

                  backgroundColor: "#078cf0",

                  borderRadius: {
                      topLeft: 0,
                      topRight: 0
                  },

                  stack: "appointments"
              },

              {
                  label: "Examination",

                  data: [13, 23, 20, 8, 13, 27],

                  backgroundColor: "#a51567",

                  stack: "appointments"
              },

              {
                  label: "Consultation",

                  data: [11, 17, 15, 15, 21, 14],

                  backgroundColor: "#ffa914",

                  stack: "appointments"
              },

              {
                  label: "Routine Checkup",

                  data: [21, 7, 25, 13, 22, 8],

                  backgroundColor: "#ff405d",

                  borderRadius: 10,

                  stack: "appointments"
              }

          ]

      },

      options: {

          responsive: true,
          maintainAspectRatio: false,

          scales: {

              x: {

                  stacked: true,

                  grid: {
                      display: false
                  }

              },

              y: {

                  stacked: true,

                  beginAtZero: true,

                  max: 120,

                  ticks: {
                      stepSize: 30
                  },

                  grid: {
                      color: "#ddd"
                  }

              }

          },

          plugins: {

              legend: {
                  position: "bottom",

                  labels: {
                      usePointStyle: true,
                      padding: 15
                  }
              }

          }

      },

      plugins: [

          {

              id: "barLabels",

              afterDatasetsDraw(chart) {

                  const {
                      ctx
                  } = chart;

                  chart.data.datasets.forEach((dataset, datasetIndex) => {

                      const meta = chart.getDatasetMeta(datasetIndex);

                      meta.data.forEach((bar, index) => {

                          const value = dataset.data[index];

                          if (!value) return;

                          ctx.save();

                          ctx.fillStyle = "white";
                          ctx.font = "bold 14px Arial";
                          ctx.textAlign = "center";
                          ctx.textBaseline = "middle";

                          ctx.fillText(
                              value,
                              bar.x,
                              bar.y + bar.height / 2
                          );

                          ctx.restore();

                      });

                  });

              }

          }

      ]

  });
}


// Leaflet Map

const mapElement = document.getElementById("map");

if (mapElement && window.L) {
  const map = L.map("map").setView(
      [3.4300, 101.5700],
      10
  );

  L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
          attribution: "&copy; OpenStreetMap contributors"
      }
  ).addTo(map);

  const locations = [
      [3.432, 101.570],
      [3.315, 101.680],
      [3.250, 101.690]
  ];

  locations.forEach((location) => {
      L.marker(location).addTo(map);
  });

  const mapButton = document.querySelector(".map-buttons button:first-child");
  const satelliteButton = document.querySelector(".map-buttons button:last-child");

  const streetLayer = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
          attribution: "&copy; OpenStreetMap contributors"
      }
  );

  const satelliteLayer = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
          attribution: "Tiles &copy; Esri"
      }
  );

  if (mapButton && satelliteButton) {
    mapButton.addEventListener("click", () => {
      map.removeLayer(satelliteLayer);
      streetLayer.addTo(map);
      mapButton.classList.add("active");
      satelliteButton.classList.remove("active");
    });

    satelliteButton.addEventListener("click", () => {
      map.removeLayer(streetLayer);
      satelliteLayer.addTo(map);
      satelliteButton.classList.add("active");
      mapButton.classList.remove("active");
    });
  }

  const fullscreenButton = document.querySelector(".fullscreen");

  if (fullscreenButton) {
    fullscreenButton.addEventListener("click", () => {
      if (mapElement.requestFullscreen) {
        mapElement.requestFullscreen();
      }
    });
  }
}


// Find clinic page
const clinicMapElement = document.getElementById("clinicMap");

if (clinicMapElement && window.L) {
  const clinicData = [
  { name: "Klinik Pakar Kesihatan USIM", type: "Primary Care", address: "Bandar Baru Nilai, Negeri Sembilan", phone: "+60 12 650 4921", coordinates: [2.818, 101.797], tags: ["Online scheduling", "Open today", "All ages"] },
  { name: "Nilai Dialysis Centre", type: "Specialty Care", address: "Persiaran Pusat Bandar, Nilai", phone: "+60 6 850 1200", coordinates: [2.804, 101.797], tags: ["Open today", "Adults"] },
  { name: "Nilai Urgent Care", type: "Urgent Care", address: "Jalan Nilai Square 6, Nilai", phone: "+60 6 850 2211", coordinates: [2.815, 101.789], tags: ["Online scheduling", "Open today", "All ages"] }
  ];
  const clinicMap = L.map(clinicMapElement).setView([2.812, 101.795], 14);
  const streetLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "&copy; OpenStreetMap contributors" }).addTo(clinicMap);
  const satelliteLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", { attribution: "Tiles &copy; Esri" });
  const markerLayer = L.layerGroup().addTo(clinicMap);
  const clinicListElement = document.getElementById("clinicList");
  const clinicSearchInput = document.getElementById("clinicSearch");
  const clinicLocationInput = document.getElementById("clinicLocation");
  const clinicType = document.getElementById("clinicType");
  const clinicCount = document.getElementById("clinicResultCount");
  const clinicEmpty = document.getElementById("clinicEmpty");
  const clinicStatus = document.getElementById("clinicStatus");
  const checkedClinicFilters = () => [...document.querySelectorAll("[data-clinic-filter]:checked")].map((input) => input.dataset.clinicFilter);

  const renderClinics = () => {
  const terms = `${clinicSearchInput.value} ${clinicLocationInput.value}`.toLowerCase().split(/\s+/).filter(Boolean);
  const selectedType = clinicType.value;
  const selectedFilters = checkedClinicFilters();
  const matches = clinicData.filter((clinic) => {
    const searchable = `${clinic.name} ${clinic.type} ${clinic.address} ${clinic.tags.join(" ")}`.toLowerCase();
    return (!selectedType || clinic.type === selectedType) && terms.every((term) => searchable.includes(term)) && selectedFilters.every((filter) => clinic.tags.includes(filter));
  });

  clinicListElement.innerHTML = matches.map((clinic) => `<article class="clinic-card"><div class="clinic-card-icon">✚</div><div class="clinic-info"><h3>${clinic.name}</h3><span class="clinic-type">${clinic.type}</span><p>${clinic.address}</p><p>${clinic.phone}</p><div class="clinic-tags">${clinic.tags.map((tag) => `<span>${tag}</span>`).join("")}</div></div><button class="clinic-directions" type="button" data-lat="${clinic.coordinates[0]}" data-lng="${clinic.coordinates[1]}">View on map <span>↗</span></button></article>`).join("");
  clinicCount.textContent = `${matches.length} ${matches.length === 1 ? "location" : "locations"}`;
  clinicEmpty.hidden = matches.length !== 0;
  markerLayer.clearLayers();
  matches.forEach((clinic) => L.marker(clinic.coordinates).addTo(markerLayer).bindPopup(`<strong>${clinic.name}</strong><br>${clinic.type}<br>${clinic.address}`));
  clinicListElement.querySelectorAll(".clinic-directions").forEach((button) => button.addEventListener("click", () => { clinicMap.setView([Number(button.dataset.lat), Number(button.dataset.lng)], 16); document.getElementById("clinicMapTab").click(); }));
  };

  renderClinics();
  [clinicSearchInput, clinicLocationInput].forEach((input) => input.addEventListener("input", renderClinics));
  clinicType.addEventListener("change", renderClinics);
  document.querySelectorAll("[data-clinic-filter]").forEach((input) => input.addEventListener("change", renderClinics));
  document.getElementById("clinicSearchButton").addEventListener("click", () => { renderClinics(); clinicStatus.textContent = "Clinic results updated."; });
  document.getElementById("clearClinicFilters").addEventListener("click", () => { clinicSearchInput.value = ""; clinicLocationInput.value = ""; clinicType.value = ""; document.querySelectorAll("[data-clinic-filter]").forEach((input) => { input.checked = false; }); renderClinics(); clinicStatus.textContent = "Filters cleared."; });
  document.getElementById("clinicUseLocation").addEventListener("click", () => { if (!navigator.geolocation) { clinicStatus.textContent = "Location is not available in this browser."; return; } clinicStatus.textContent = "Finding your location..."; navigator.geolocation.getCurrentPosition(({ coords }) => { clinicLocationInput.value = `${coords.latitude.toFixed(3)}, ${coords.longitude.toFixed(3)}`; clinicMap.setView([coords.latitude, coords.longitude], 13); clinicStatus.textContent = "Your location is shown on the map."; }, () => { clinicStatus.textContent = "We could not access your location. Enter a city or zip code instead."; }); });

  const mapTab = document.getElementById("clinicMapTab");
  const listTab = document.getElementById("clinicListTab");
  const mapView = document.getElementById("clinicMapView");
  const setView = (showMap) => { mapView.hidden = !showMap; clinicListElement.hidden = showMap; mapTab.classList.toggle("active", showMap); listTab.classList.toggle("active", !showMap); mapTab.setAttribute("aria-selected", String(showMap)); listTab.setAttribute("aria-selected", String(!showMap)); if (showMap) setTimeout(() => clinicMap.invalidateSize(), 50); };
  mapTab.addEventListener("click", () => setView(true));
  listTab.addEventListener("click", () => setView(false));
  setView(true);
  document.getElementById("streetMapButton").addEventListener("click", () => { clinicMap.removeLayer(satelliteLayer); streetLayer.addTo(clinicMap); document.getElementById("streetMapButton").classList.add("active"); document.getElementById("satelliteMapButton").classList.remove("active"); });
  document.getElementById("satelliteMapButton").addEventListener("click", () => { clinicMap.removeLayer(streetLayer); satelliteLayer.addTo(clinicMap); document.getElementById("satelliteMapButton").classList.add("active"); document.getElementById("streetMapButton").classList.remove("active"); });
  document.getElementById("clinicFullscreen").addEventListener("click", () => clinicMapElement.requestFullscreen?.());
}
}
