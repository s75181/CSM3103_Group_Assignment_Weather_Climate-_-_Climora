// ==========================================
// 1. GLOBAL VARIABLES & CORE DATA
// ==========================================
let map;
let allForecasts = [];
let currentUser = null;
let selectedMapLocation = null;

const defaultFeed = [
  { user: "Ahmad", text: "Heavy rain in Shah Alam, drive safe!", time: "1 hr ago", img: "heavy_rain.png" },
  { user: "Sarah", text: "Flood water rising near Kampung Kijal bridge.", time: "3 hrs ago", img: "flood.png" }
];

const malaysiaStates = {
  "Johor": {
    "Johor Bahru": ["Skudai", "Tebrau", "Pasir Gudang"],
    "Kluang": ["Simpang Renggam", "Paloh"],
    "Muar": ["Muar Town", "Pagoh", "Bakri"],
    "Batu Pahat": ["Ayer Hitam", "Yong Peng", "Senggarang"],
    "Pontian": ["Pekan Nenas", "Benut"]
  },
  "Kedah": {
    "Langkawi": ["Kuah", "Pantai Cenang", "Padang Matsirat"],
    "Kubang Pasu": ["Jitra", "Changlun"],
    "Kota Setar": ["Alor Setar", "Anak Bukit"],
    "Padang Terap": ["Kuala Nerang"],
    "Pendang": ["Pendang Town"],
    "Pokok Sena": ["Pokok Sena Town"],
    "Sik": ["Sik Town"],
    "Baling": ["Kupang", "Kuala Ketil"],
    "Yan": ["Guar Chempedak"],
    "Kuala Muda": ["Sungai Petani", "Gurun"]
  },
  "Kelantan": {
    "Kota Bharu": ["Kubang Kerian", "Pengkalan Chepa", "Ketereh"],
    "Pasir Mas": ["Rantau Panjang", "Tendong"],
    "Machang": ["Temangan", "Pulai Chondong"],
    "Tumpat": ["Wakaf Bharu", "Pengkalan Kubor"],
    "Tanah Merah": ["Bukit Bunga", "Kusial"]
  },
  "Melaka": {
    "Melaka Tengah": ["Ayer Keroh", "Bandaraya Melaka", "Batu Berendam"],
    "Alor Gajah": ["Masjid Tanah", "Pulau Sebang"],
    "Jasin": ["Merlimau", "Bemban"]
  },
  "Negeri Sembilan": {
    "Seremban": ["Nilai", "Senawang", "Mantin"],
    "Port Dickson": ["Lukut", "Teluk Kemang"],
    "Jempol": ["Bahau", "Batu Kikir"]
  },
  "Pahang": {
    "Kuantan": ["Indera Mahkota", "Beserah", "Gambang"],
    "Temerloh": ["Mentakab", "Lanchang"],
    "Bentong": ["Genting Highlands", "Karak"],
    "Pekan": ["Kuala Pahang", "Peramu Jaya"]
  },
  "Perak": {
    "Kinta": ["Ipoh", "Batu Gajah", "Tambun"],
    "Manjung": ["Sitiawan", "Lumut", "Ayer Tawar"],
    "Kerian": ["Parit Buntar", "Bagan Serai"],
    "Larut Matang dan Selama": ["Taiping", "Kamunting"],
    "Kuala Kangsar": ["Sungai Siput", "Kuala Kangsar Town"]
  },
  "Perlis": {
    "Perlis": ["Kangar", "Arau", "Padang Besar", "Kuala Perlis"]
  },
  "Pulau Pinang": {
    "Timur Laut": ["George Town", "Batu Ferringhi", "Jelutong"],
    "Barat Daya": ["Bayan Lepas", "Balik Pulau"],
    "Seberang Perai Utara": ["Butterworth", "Kepala Batas"],
    "Seberang Perai Tengah": ["Bukit Mertajam", "Perai"],
    "Seberang Perai Selatan": ["Nibong Tebal", "Batu Kawan"]
  },
  "Sabah": {
    "Kota Kinabalu": ["Inanam", "Sepanggar", "Putatan"],
    "Sandakan": ["Batu Sapi", "Sibuga"],
    "Tawau": ["Balung", "Apas"],
    "Kudat": ["Sikuati", "Matunggong"]
  },
  "Sarawak": {
    "Kuching": ["Petra Jaya", "Batu Kawa", "Santubong"],
    "Miri": ["Senadin", "Pujut"],
    "Sibu": ["Bukit Assek", "Pelawan"],
    "Bintulu": ["Kidurong", "Jepak"]
  },
  "Selangor": {
    "Petaling": ["Subang Jaya", "Petaling Jaya", "Shah Alam"],
    "Klang": ["Klang Utara", "Klang Selatan", "Port Klang"],
    "Gombak": ["Batu Caves", "Rawang", "Selayang"],
    "Sepang": ["Cyberjaya", "Salak Tinggi", "KLIA"],
    "Hulu Langat": ["Kajang", "Bangi", "Ampang"]
  },
  "Terengganu": {
    "Kuala Terengganu": ["Kuala Terengganu City", "Gong Badak", "Kuala Nerus", "Batu Rakit"],
    "Besut": ["Jerteh", "Kuala Besut", "Kampung Raja"],
    "Dungun": ["Paka", "Sura", "Kuala Dungun"],
    "Kemaman": ["Chukai", "Kijal", "Kerteh", "Cukai"],
    "Marang": ["Bukit Payong", "Wakaf Tapai", "Kelulut"],
    "Setiu": ["Permaisuri", "Penarik", "Sungai Tong"]
  }
};

const weatherLocations = {
  "Langkawi": [6.35, 99.8],
  "Kuala Terengganu": [5.33, 103.14],
  "Kota Bharu": [6.12, 102.24],
  "Johor Bahru": [1.49, 103.74],
  "Kuantan": [3.82, 103.33],
  "Kuching": [1.55, 110.34],
  "Kota Kinabalu": [5.98, 116.07],
  "Petaling": [3.12, 101.59],
  "Seremban": [2.73, 101.94],
  "Melaka Tengah": [2.19, 102.24],
  "Timur Laut": [5.41, 100.32],
  "Perlis": [6.44, 100.20],
  "Kinta": [4.59, 101.09]
};

// Emergency Shelters
const shelters = [
  // --- TERENGGANU ---
  { name: "Kompleks Sukan UMT, Kuala Nerus", lat: 5.406, lon: 103.086, type: "Pusat Pemindahan Banjir", contact: "09-668 4118" },
  { name: "SK Tok Jembal, Kuala Terengganu", lat: 5.385, lon: 103.098, type: "Dewan Orang Ramai", contact: "09-669 2111" },
  { name: "SK Seri Kemaman", lat: 4.230, lon: 103.420, type: "Flood Shelter", contact: "09-859 1233" },

  // --- SELANGOR ---
  { name: "Dewan Orang Ramai Semenyih", lat: 2.951, lon: 101.843, type: "Pusat Bantuan Bencana", contact: "03-8723 5110" },
  { name: "Dewan MPKj Kajang", lat: 2.993, lon: 101.790, type: "Pusat Pemindahan Sementara", contact: "03-8737 7899" },
  { name: "Stadium Shah Alam", lat: 3.080, lon: 101.540, type: "Emergency Relief Hub", contact: "03-5510 5111" },
  { name: "TBS Transit Kecemasan", lat: 3.076, lon: 101.711, type: "Hab Transit Bencana", contact: "03-9051 2000" },

  // --- KELANTAN ---
  { name: "SK Rantau Panjang, Pasir Mas", lat: 6.022, lon: 101.974, type: "Pusat Pemindahan Banjir Utama", contact: "09-795 0222" },
  { name: "SMK Agama Gelang Mas, Pasir Mas", lat: 6.050, lon: 102.050, type: "Dewan Serbaguna", contact: "09-790 8333" },
  { name: "Kompleks Belia dan Sukan, Kota Bharu", lat: 6.115, lon: 102.246, type: "Pusat Bantuan Bencana", contact: "09-741 8111" }
];

// ==========================================
// 2. DATA PROTECTION & INITIALIZATION
// ==========================================
function getSafeData(key, defaultValue) {
  try {
    const stored = localStorage.getItem(key);
    if (stored !== null) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(defaultValue) && !Array.isArray(parsed)) return defaultValue;
        return parsed;
      } catch (e) {
        return stored; 
      }
    }
  } catch (error) {
    console.warn(`Error reading ${key} from storage. Using default.`);
  }
  return defaultValue;
}

window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    const appContainer = document.getElementById("appContainer");
    
    if(loader) loader.classList.add("hidden");
    if(appContainer) appContainer.classList.add("loaded");
    
    checkAuthStatus();
    applySettings();
    setupEventListeners();
  }, 1200);
});

function initApp() {
  getLocation();
  getMalaysiaWeather();
  getWeatherWarnings();
  renderFeed();
  renderShelterList();
}

// ==========================================
// 3. AUTHENTICATION & EVENTS
// ==========================================
function checkAuthStatus() {
  const savedUser = getSafeData("climoraUser", null);
  if (savedUser) {
    currentUser = savedUser;
    document.getElementById("welcomeMessage").textContent = `Welcome back, ${currentUser}!`;
    document.getElementById("bottomNav").style.display = "flex";
    document.getElementById("mainHeader").style.display = "block";
    showPage("home");
    initApp();
  } else {
    document.getElementById("bottomNav").style.display = "none";
    document.getElementById("mainHeader").style.display = "none";
    showPage("login");
  }
}

function performLogin() {
  const username = document.getElementById("loginUsername").value.trim();
  if (!username) { alert("Please enter a username."); return; }
  localStorage.setItem("climoraUser", username);
  checkAuthStatus();
}

function performLogout() {
  localStorage.removeItem("climoraUser");
  checkAuthStatus();
}

function setupEventListeners() {
  const loginPass = document.getElementById("loginPassword");
  const loginUser = document.getElementById("loginUsername");
  const reportText = document.getElementById("reportText");

  if (loginPass) loginPass.addEventListener("keypress", e => { if (e.key === "Enter") { e.preventDefault(); performLogin(); }});
  if (loginUser) loginUser.addEventListener("keypress", e => { if (e.key === "Enter") { e.preventDefault(); document.getElementById("loginPassword").focus(); }});
  if (reportText) reportText.addEventListener("keypress", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submitReport(); }});
}

function showPage(pageId) {
  const pages = document.querySelectorAll(".page");
  pages.forEach(page => page.classList.remove("active"));
  
  const targetPage = document.getElementById(pageId);
  if (targetPage) targetPage.classList.add("active");

  if (pageId === "map") {
    setTimeout(() => initOrRefreshMap('weather'), 200);
  } else if (pageId === "locations") {
    displaySavedLocations();
  } else if (pageId === "shelterList") {
    //document.getElementById("shelterViewSelect").value = "all"; 
    //renderShelterView(); 
  } else if (pageId === "tips") {
    //Auto-generate tips based on weather when opening this page!
    updateSmartTips();
  }
}

// ==========================================
// 4. MAPS & LOCATION
// ==========================================
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        localStorage.setItem("latitude", pos.coords.latitude);
        localStorage.setItem("longitude", pos.coords.longitude);
      },
      () => console.log("Using default coordinates.")
    );
  }
}

function initOrRefreshMap(layerType = 'weather') {
  const lat = parseFloat(localStorage.getItem("latitude")) || 4.2105;
  const lon = parseFloat(localStorage.getItem("longitude")) || 101.9758;

  if (!map) {
    map = L.map("mapArea").setView([lat, lon], 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OpenStreetMap" }).addTo(map);
  } else {
    map.invalidateSize();
  }
  
  if (map) {
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) map.removeLayer(layer);
    });
  }

  selectedMapLocation = null; 

  if (layerType === 'weather') addWeatherMarkers();
  else if (layerType === 'shelters') addShelterMarkers();
}

function addWeatherMarkers() {
  allForecasts.forEach(weather => {
    const name = weather.location?.location_name;
    if (name && weatherLocations[name]) {
      const marker = L.marker(weatherLocations[name]).addTo(map);
      marker.bindPopup(`<b>${name}</b><br>${weather.summary_forecast || "Fine Weather"}`);
      marker.on('click', () => { selectedMapLocation = name; });
    }
  });
}

function addShelterMarkers() {
  shelters.forEach(shelter => {
    const marker = L.marker([shelter.lat, shelter.lon]).addTo(map);
    marker.bindPopup(`<b>⛺ ${shelter.name}</b><br>${shelter.type}`);
    marker.on('click', () => { selectedMapLocation = shelter.name; });
  });
}

function renderShelterList() {
  const list = document.getElementById("shelterDirectoryList");
  if(!list) return;
  list.innerHTML = "";
  shelters.forEach(s => {
    list.innerHTML += `<p><strong>${s.name}</strong><br><small>${s.type}</small></p>`;
  });
}

// ==========================================
// 5. WEATHER API & DROPDOWNS
// ==========================================
async function getMalaysiaWeather() {
  try {
    const response = await fetch("https://api.data.gov.my/weather/forecast?limit=1000");
    const data = await response.json();
    const rawForecasts = data.data ? data.data : data;

    allForecasts = [];

    if (getSavedThemePreferences().themeMode === "dynamic") {
      applyWeatherTheme();
    }

    rawForecasts.forEach(f => {
      const name = f.location?.location_name;
      if (name && !allForecasts.find(i => i.location?.location_name === name)) allForecasts.push(f);
    });

    loadStateDropdown();
    displayForecastList();
  } catch (error) {
    console.error("API Error", error);
  }
}

function loadStateDropdown() {
  const stateSelect = document.getElementById("stateSelect");
  stateSelect.innerHTML = '<option value="">Select State</option>';
  Object.keys(malaysiaStates).forEach(state => {
    stateSelect.innerHTML += `<option value="${state}">${state}</option>`;
  });
  loadDistrictDropdown();
}

function loadDistrictDropdown() {
  const state = document.getElementById("stateSelect").value;
  const districtSelect = document.getElementById("districtSelect");
  districtSelect.innerHTML = '<option value="">Select District</option>';
  if (malaysiaStates[state]) {
    Object.keys(malaysiaStates[state]).forEach(district => {
      districtSelect.innerHTML += `<option value="${district}">${district}</option>`;
    });
  }
  loadSubDistrictDropdown();
}

function loadSubDistrictDropdown() {
  const state = document.getElementById("stateSelect").value;
  const district = document.getElementById("districtSelect").value;
  const subSelect = document.getElementById("subDistrictSelect");
  subSelect.innerHTML = '<option value="">Select Area</option>';

  if (state && district && malaysiaStates[state][district]) {
    malaysiaStates[state][district].forEach(sub => {
      subSelect.innerHTML += `<option value="${sub}">${sub}</option>`;
    });
  }
  changeWeatherLocation();
}

function changeWeatherLocation() {
  selectedMapLocation = null; 
  const district = document.getElementById("districtSelect").value;
  const subDistrict = document.getElementById("subDistrictSelect").value;
  const weather = allForecasts.find(f => f.location?.location_name === district);
  
  if (weather) {
    document.getElementById("location").textContent = subDistrict || district || "Malaysia";
    document.getElementById("temperature").textContent = weather.max_temp ? `${weather.max_temp}°C` : "31°C";
    document.getElementById("weather").textContent = weather.summary_forecast || "Clear Conditions";
    document.getElementById("morning").textContent = weather.morning_forecast || "No Rain";
    document.getElementById("afternoon").textContent = weather.afternoon_forecast || "Rain/Thunder";
    document.getElementById("night").textContent = weather.night_forecast || "Clear";
    document.getElementById("summary").textContent = weather.min_temp ? `${weather.min_temp}°C` : "24°C";
  }
}

function displayForecastList() {
  const list = document.getElementById("forecastList");
  if(!list) return;
  list.innerHTML = "";
  
  allForecasts.slice(0, 10).forEach(f => {
    const locName = f.location?.location_name;
    if (!locName) return;

    list.innerHTML += `
      <div onclick="viewForecastDetails('${locName}')" style="cursor: pointer; position: relative; padding: 15px; padding-right: 40px; margin-bottom: 12px; background: var(--box-bg); border: 1px solid var(--border-color); border-radius: 16px;">
        <strong style="font-size: 15px; color: var(--text-main);">📍 ${locName}</strong><br>
        <span style="font-size: 13px; color: var(--text-muted);">${f.summary_forecast}</span>
        <span style="position: absolute; right: 15px; top: 50%; transform: translateY(-50%); color: var(--btn-bg); font-size: 18px;">➡️</span>
      </div>
    `;
  });
}

/* // 🔴 KOD DUMMY UNTUK TESTING NOTIFICATION
async function getWeatherWarnings() {
  try {
    const warnings = [
      { 
        warning_issue: { 
          ms: "Amaran Hujan Lebat (Peringkat Waspada) melibatkan seluruh negeri Terengganu, Kelantan, dan beberapa kawasan di Selangor.", 
          en: "Heavy rain warning for Terengganu, Kelantan, and parts of Selangor." 
        }, 
        valid_from: "2026-06-11 Tuntunan MET" 
      }
    ];
    // ----------------------------------------------------------------------------------

    const alertList = document.getElementById("alertList");
    
    if (!warnings || warnings.length === 0) {
      alertList.innerHTML = `<div class="alert" style="border-left-color: #10b981;">✅ No active weather warnings.</div>`;
      return;
    }

    alertList.innerHTML = "";
    warnings.forEach(w => {
      let warningText = "Severe Weather Alert";
      
      if (w.warning_issue) {
        if (typeof w.warning_issue === 'object') {
          warningText = w.warning_issue.ms || w.warning_issue.en || "Weather Warning";
        } else {
          warningText = w.warning_issue;
        }
      }

      alertList.innerHTML += `
        <div class="alert">
          <strong>⚠️ MET Warning</strong><br>
          ${warningText}<br>
          <small>${w.valid_from || ""}</small>
        </div>`;
      
      if(!sessionStorage.getItem("alertShown")) {
        alert(`🚨 EMERGENCY ALERT: ${warningText}`);
        sessionStorage.setItem("alertShown", "true");
      }
    });
  } catch (error) {
    console.error("Alert Error:", error);
    document.getElementById("alertList").innerHTML = `<div class="alert">✅ System clear.</div>`;
  }
} //end of code dummy */


async function getWeatherWarnings() {
  try {
    const response = await fetch("https://api.data.gov.my/weather/warning?limit=5");
    const data = await response.json();
    const warnings = data.data ? data.data : data;
    const alertList = document.getElementById("alertList");
    
    if (!warnings || warnings.length === 0) {
      alertList.innerHTML = `<div class="alert" style="border-left-color: #10b981;">✅ No active weather warnings.</div>`;
      return;
    }

    alertList.innerHTML = "";
    warnings.forEach(w => {
      let warningText = "Severe Weather Alert";
      
      if (w.warning_issue) {
        if (typeof w.warning_issue === 'object') {
          // Take Bahasa Melayu Text, if not available take English (.en)
          warningText = w.warning_issue.ms || w.warning_issue.en || "Weather Warning";
        } else {
          warningText = w.warning_issue;
        }
      }

      alertList.innerHTML += `
        <div class="alert">
          <strong>⚠️ MET Warning</strong><br>
          ${warningText}<br>
          <small>${w.valid_from || ""}</small>
        </div>`;
      
      if(!sessionStorage.getItem("alertShown")) {
        alert(`🚨 EMERGENCY ALERT: ${warningText}`);
        sessionStorage.setItem("alertShown", "true");
      }
    });
  } catch {
    document.getElementById("alertList").innerHTML = `<div class="alert">✅ System clear.</div>`;
  }
}

// ==========================================
// 6. SOCIAL FEED
// ==========================================
function renderFeed() {
  const feedDiv = document.getElementById("socialFeed");
  if (!feedDiv) return;

  const localFeed = getSafeData("climoraFeed", defaultFeed); 
  feedDiv.innerHTML = "";

  localFeed.forEach((post, index) => {
    const imgHtml = post.img ? `<img src="${post.img}" class="feed-img" style="width: 100%; border-radius: 12px; margin-top: 10px;">` : "";
    const deleteButton = (post.user === currentUser)
      ? `<span onclick="deleteReport(${index})" style="color: #ef4444; font-size: 12px; cursor: pointer; float: right; margin-left: 10px;">❌ Delete</span>`
      : "";

    feedDiv.innerHTML += `
      <div class="feed-item" style="background: var(--box-bg); padding: 15px; border-radius: 16px; border: 1px solid var(--border-color); margin-bottom: 15px;">
        <div class="feed-header" style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); margin-bottom: 8px;">
          <span class="feed-user" style="font-weight: bold; color: var(--text-main);">${post.user}</span>
          <span>${post.time} ${deleteButton}</span>
        </div>
        <div class="feed-text">${post.text}</div>
        ${imgHtml}
      </div>
    `;
  });
}

let pendingPhotoBase64 = null;
function previewPhoto() {
  const file = document.getElementById("photoInput").files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      pendingPhotoBase64 = e.target.result;
      document.getElementById("photoPreview").src = pendingPhotoBase64;
      document.getElementById("photoPreview").style.display = "block";
    };
    reader.readAsDataURL(file);
  }
}

function submitReport() {
  const text = document.getElementById("reportText").value;
  if (!text) { alert("Write something first!"); return; }

  const currentFeed = getSafeData("climoraFeed", defaultFeed); 
  const newPost = { user: currentUser || "User", text: text, time: "Just now", img: pendingPhotoBase64 };

  currentFeed.unshift(newPost);
  
  try {
    localStorage.setItem("climoraFeed", JSON.stringify(currentFeed));
  } catch (error) {
    if (error.name === 'QuotaExceededError' || error.code === 22) {
      alert("⚠️ Image file size is too large! Try uploading a smaller screenshot.");
      return; 
    }
  }

  document.getElementById("reportText").value = "";
  document.getElementById("photoPreview").style.display = "none";
  const fileInput = document.getElementById("photoInput");
  if (fileInput) fileInput.value = ""; 
  pendingPhotoBase64 = null;

  renderFeed();
}

function deleteReport(index) {
  if (confirm("Are you sure you want to delete this report? This cannot be undone.")) {
    let currentFeed = getSafeData("climoraFeed", defaultFeed);
    currentFeed.splice(index, 1); 
    localStorage.setItem("climoraFeed", JSON.stringify(currentFeed));
    renderFeed();
  }
}

// ==========================================
// 7. USER SETTINGS & SAVED LOCATIONS
// ==========================================
function toggleDarkMode() {
  const toggle = document.getElementById("darkModeToggle");
  if (toggle) {
    localStorage.setItem("darkMode", toggle.checked ? "enabled" : "disabled");
  }
  updateTheme();
}

function applySettings() {
  applyThemeSelection();
}

function saveProfile() {
  alert("Profile saved locally!");
}

function saveLocation() {
  // 1. Choose name from the map pin that was clicked OR from the weather dropdown
  const loc = selectedMapLocation || document.getElementById("subDistrictSelect").value || document.getElementById("districtSelect").value;
  
  if (!loc) { 
    alert("Please select a location or shelter first."); 
    return; 
  }

  // 2. System will check: Does this name exist in the emergency list ?
  const isShelter = shelters.find(s => s.name === loc);

  if (isShelter) {
    // --- IF IT IS A SHELTER ---
    let savedShelterList = getSafeData("savedSheltersData", []);
    if (!savedShelterList.includes(loc)) {
      savedShelterList.push(loc);
      localStorage.setItem("savedSheltersData", JSON.stringify(savedShelterList)); // Enter Shelter Location
      alert(`⛺ Shelter Saved: ${loc}`);
    } else {
      alert(`⚠️ ${loc} is already in your saved shelters.`);
    }
  } else {
    // --- IF IT IS A REGULAR WEATHER LOCATION ---
    let savedList = getSafeData("savedLocationsList", []);
    if (!savedList.includes(loc)) {
      savedList.push(loc);
      localStorage.setItem("savedLocationsList", JSON.stringify(savedList)); // Enter Weather Location
      alert(`✅ Weather Location Saved: ${loc}`);
    } else {
      alert(`⚠️ ${loc} is already in your saved weather locations.`);
    }
  }
}

function displaySavedLocations() {
  const savedList = getSafeData("savedLocationsList", []);
  const listContainer = document.getElementById("savedLocationsList");

  if (savedList.length === 0) {
    if (listContainer) listContainer.innerHTML = '<p style="text-align: center;">No locations saved yet.</p>';
    return;
  }

  if (listContainer) listContainer.innerHTML = ""; 

  savedList.forEach(storedLoc => {
    let weather = allForecasts.find(f => f.location?.location_name === storedLoc);

    if (!weather) {
      let parentDistrict = null;
      for (const state in malaysiaStates) {
        for (const district in malaysiaStates[state]) {
          if (malaysiaStates[state][district].includes(storedLoc)) {
            parentDistrict = district; break;
          }
        }
        if (parentDistrict) break;
      }
      if (parentDistrict) weather = allForecasts.find(f => f.location?.location_name === parentDistrict);
    }

    const temp = weather && weather.max_temp ? `${weather.max_temp}°C` : "--°C";
    const summary = weather && weather.summary_forecast ? weather.summary_forecast : "Forecast unavailable";

    listContainer.innerHTML += `
      <div style="background: var(--box-bg); padding: 15px; border-radius: 16px; margin-bottom: 15px; border: 1px solid var(--border-color); text-align: center; position: relative;">
        <span onclick="deleteSingleLocation('${storedLoc}')" style="position: absolute; top: 12px; right: 15px; cursor: pointer; font-size: 16px; font-weight: bold; opacity: 0.7;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.7;">❌</span>
        <h3 style="margin-top: 0; padding-right: 25px;">📍 ${storedLoc}</h3>
        <h2 style="font-size: 36px; margin: 10px 0; color: var(--btn-bg);">${temp}</h2>
        <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 0;">${summary}</p>
      </div>
    `;
  });
}

function deleteSingleLocation(locationToDelete) {
  let savedList = getSafeData("savedLocationsList", []);
  savedList = savedList.filter(loc => loc !== locationToDelete);
  localStorage.setItem("savedLocationsList", JSON.stringify(savedList));
  displaySavedLocations();
}

function clearSavedLocation() {
  localStorage.removeItem("savedLocationsList"); 
  displaySavedLocations();
}

// ==========================================
// 8. DYNAMIC SHELTER VIEW LOGIC
// ==========================================
let currentShelterView = 'all'; // Tracker for opened page

function navigateToShelter() {
  const select = document.getElementById("moreShelterSelect");
  const view = select.value;
  
  if (view === "") return; // if user selects the placeholder option, do nothing

  // 1. Open shelter page
  showPage('shelterList');
  
  // 2. Render data by choices
  renderShelterView(view);
  
  // 3. Reset dropdown again for a clean look if user navigates back
  select.value = ""; 
}

function renderShelterView(view) {
  currentShelterView = view;
  const listContainer = document.getElementById("shelterDynamicList");
  const pageTitle = document.getElementById("shelterPageTitle");
  
  if (!listContainer) return;
  listContainer.innerHTML = ""; 

  // IF "ALL SHELTERS" IS CHOSEN
  if (view === "all") {
    pageTitle.textContent = "📋 All Shelters";
    shelters.forEach(s => {
      listContainer.innerHTML += `
        <div style="background: var(--box-bg); padding: 15px; border-radius: 16px; margin-bottom: 15px; border: 1px solid var(--border-color);">
          <h3 style="margin-top: 0; font-size: 16px;">⛺ ${s.name}</h3>
          <p style="font-size: 14px; color: var(--btn-bg); margin: 5px 0;"><strong>📞 ${s.contact}</strong></p>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 0;">${s.type}</p>
        </div>
      `;
    });
  } 
  // IF "SAVED SHELTERS" IS CHOSEN
  else if (view === "saved") {
    pageTitle.textContent = "📌 Saved Shelters";
    const savedShelterList = getSafeData("savedSheltersData", []);
    
    if (savedShelterList.length === 0) {
      listContainer.innerHTML = '<p style="text-align: center; margin-top: 20px;">No shelters saved yet.</p>';
      return;
    }

    savedShelterList.forEach(storedName => {
      const shelter = shelters.find(s => s.name === storedName);
      if (shelter) {
        listContainer.innerHTML += `
          <div style="background: var(--box-bg); padding: 15px; border-radius: 16px; margin-bottom: 15px; border: 1px solid var(--border-color); position: relative;">
            <span onclick="deleteSavedShelter('${storedName}')" style="position: absolute; top: 12px; right: 15px; cursor: pointer; font-size: 16px; opacity: 0.7;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.7;">❌</span>
            <h3 style="margin-top: 0; font-size: 16px; padding-right: 25px;">⛺ ${shelter.name}</h3>
            <p style="font-size: 14px; color: var(--btn-bg); margin: 5px 0;"><strong>📞 ${shelter.contact}</strong></p>
            <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 0;">${shelter.type}</p>
          </div>
        `;
      }
    });
  }
}

function deleteSavedShelter(nameToDelete) {
  let savedShelterList = getSafeData("savedSheltersData", []);
  savedShelterList = savedShelterList.filter(name => name !== nameToDelete);
  localStorage.setItem("savedSheltersData", JSON.stringify(savedShelterList));
  
  // Auto-refresh list opened
  renderShelterView(currentShelterView); 
}

// ==========================================
// 9. CLICK FORECAST TO HOME DETAILS
// ==========================================
function viewForecastDetails(districtName) {
  // 1. Find the district (district) this is located under which state (state)
  let foundState = "";
  for (const state in malaysiaStates) {
    if (malaysiaStates[state][districtName]) {
      foundState = state;
      break;
    }
  }

  // 2. If the state is found in our data system
  if (foundState) {
    // Set dropdown State at Home page
    const stateSelect = document.getElementById("stateSelect");
    if (stateSelect) stateSelect.value = foundState;
    
    // Force the system to load districts for that state
    loadDistrictDropdown();
    
    // Set dropdown District at the Home page as well
    const districtSelect = document.getElementById("districtSelect");
    if (districtSelect) districtSelect.value = districtName;
    
    // Force the system to update sub-districts and display the full weather card
    loadSubDistrictDropdown();
    
    // 3. Switch page to 'home' automatically to display the full weather grid!
    showPage('home');
  } else {
    console.log(`State mapping missing for: ${districtName}`);
  }
}

// ==========================================
// 10. SMART ECO TIPS LOGIC
// ==========================================
const smartTipsData = {
  "Rain": {
    icon: "🌧️",
    context: "It looks like rain! Here's a tip:",
    tips: [
      "Rainwater is free! Place a bucket outside to collect water for your indoor plants. 🪣",
      "Storms coming? Unplug sensitive electronics to avoid power surge damage. ⚡",
      "Skip the car wash today, let nature do it for you! 🚗💧"
    ]
  },
  "Sunny": {
    icon: "☀️",
    context: "It's scorching outside! Try this:",
    tips: [
      "Perfect day to sun-dry your laundry and save electricity instead of using a dryer. 👕☀️",
      "Close your curtains or blinds during the hottest part of the day to keep your room cool without AC. 🪟",
      "Switch your AC to 24°C. It's the optimal temperature for both comfort and energy saving! ❄️"
    ]
  },
  "Cloudy": {
    icon: "☁️",
    context: "Cloudy weather ahead. Did you know?",
    tips: [
      "Nice and cool outside! Open your windows for natural ventilation instead of using the fan. 🌬️",
      "Cloudy days are great for planting! The lack of intense sun reduces transplant shock for new plants. 🌱",
      "Turn off unnecessary lights. Let whatever natural light available illuminate your room. 💡"
    ]
  },
  "Default": {
    icon: "🌍",
    context: "Everyday Eco Habit",
    tips: [
      "Turn off the tap while brushing your teeth to save up to 15 liters of water a minute! 🚰",
      "Switching to LED bulbs uses 75% less energy and lasts 25 times longer. 💡",
      "Bring a reusable bag when you go shopping to reduce plastic waste. 🛍️"
    ]
  }
};

function updateSmartTips() {
  // 1. Get the first weather condition from the government data list as the current reference
  let conditionText = "";
  if (typeof allForecasts !== 'undefined' && allForecasts.length > 0) {
    conditionText = allForecasts[0].summary_forecast.toLowerCase();
  }

  // 2. Determine the weather category based on keywords
  let currentCategory = "Default";
  
  if (conditionText.includes("hujan") || conditionText.includes("ribut") || conditionText.includes("rain")) {
    currentCategory = "Rain";
  } else if (conditionText.includes("cerah") || conditionText.includes("panas") || conditionText.includes("sun")) {
    currentCategory = "Sunny";
  } else if (conditionText.includes("mendung") || conditionText.includes("awan") || conditionText.includes("cloud")) {
    currentCategory = "Cloudy";
  }

  // 3. Retrieve data for the determined category and select a random tip
  const categoryData = smartTipsData[currentCategory];
  const randomTip = categoryData.tips[Math.floor(Math.random() * categoryData.tips.length)];

  // 4. Display the tip on the user interface
  const iconEl = document.getElementById("smartTipIcon");
  const contextEl = document.getElementById("smartTipContext");
  const tipTextEl = document.getElementById("smartTipText");

  if (iconEl) iconEl.innerText = categoryData.icon;
  if (contextEl) contextEl.innerText = categoryData.context;
  if (tipTextEl) tipTextEl.innerText = randomTip;
}

// ==========================================
// 11. THEME LOGIC
// ==========================================

function getSavedThemePreferences() {
  const savedDarkMode = getSafeData("darkMode", false);
  const savedThemeMode = getSafeData("themeMode", "default");

  return {
    darkModeEnabled: savedDarkMode === true || savedDarkMode === "enabled",
    themeMode: savedThemeMode === "dynamic" ? "dynamic" : "default"
  };
}

function applyThemeSelection() {
  const { darkModeEnabled, themeMode } = getSavedThemePreferences();

  const toggleCheckbox = document.getElementById("darkModeToggle");
  if (toggleCheckbox) {
    toggleCheckbox.checked = darkModeEnabled;
  }

  const selectDropdown = document.getElementById("themeModeSelect");
  if (selectDropdown) {
    selectDropdown.value = themeMode;
  }

  if (themeMode === "dynamic") {
    applyWeatherTheme();
  } else {
    document.body.removeAttribute("data-weather");
    document.body.classList.toggle("dark-theme", darkModeEnabled);
  }
}

function updateTheme() {
  const isDark = document.getElementById("darkModeToggle").checked;
  const mode = document.getElementById("themeModeSelect").value || "default";

  localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
  localStorage.setItem("themeMode", mode);

  if (mode === "dynamic") {
    applyWeatherTheme();
  } else {
    document.body.removeAttribute("data-weather");
    document.body.classList.toggle("dark-theme", isDark);
  }
}

function applyWeatherTheme() {
  const condition = (typeof allForecasts !== "undefined" && allForecasts.length > 0)
    ? allForecasts[0].summary_forecast.toLowerCase()
    : "clear";

  const isDark = document.getElementById("darkModeToggle")?.checked || false;

  let weatherKey = "sunny";
  if (condition.includes("rain") || condition.includes("hujan") || condition.includes("storm") || condition.includes("ribut")) {
    weatherKey = "rain";
  } else if (condition.includes("cloud") || condition.includes("mendung") || condition.includes("awan")) {
    weatherKey = "cloudy";
  }

  document.body.setAttribute("data-weather", weatherKey);
  document.body.classList.toggle("dark-theme", isDark);
}

function initializeAppTheme() {
  if (!localStorage.getItem("themeMode")) {
    localStorage.setItem("themeMode", "default");
  }
  if (!localStorage.getItem("darkMode")) {
    localStorage.setItem("darkMode", "disabled");
  }
  applyThemeSelection();
}

window.addEventListener("DOMContentLoaded", initializeAppTheme);

function submitFeedback() {
  const feedbackText = document.getElementById("feedbackText").value;
  
  if (feedbackText.trim() === "") {
    alert("Please type something before sending!");
    return;
  }

  // Hide form, show thank you message
  document.getElementById("feedbackFormArea").style.display = "none";
  document.getElementById("thankYouMessage").style.display = "block";

  console.log("Feedback received:", feedbackText);
}

function resetFeedbackForm() {
  // Reset form again
  document.getElementById("feedbackText").value = "";
  document.getElementById("feedbackFormArea").style.display = "block";
  document.getElementById("thankYouMessage").style.display = "none";
}

// Variable to track where the user just scrolled from
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const header = document.getElementById("mainHeader");
  
  // If header doesn't exist or we are on the login page (display: none), do nothing
  if (!header || header.style.display === "none") return;

  const currentScrollY = window.scrollY;

  // If scrolling down AND past the top 80px (so it doesn't glitch at the very top)
  if (currentScrollY > lastScrollY && currentScrollY > 80) {
    header.classList.add("hide-up"); // Hide it
  } else {
    // If scrolling up
    header.classList.remove("hide-up"); // Show it
  }

  // Save current position for the next check
  lastScrollY = currentScrollY;
});

// Service Worker Registration
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}