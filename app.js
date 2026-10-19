// IIFE
(function () {
    "use strict";

    //local storage to store records
    const STORAGE_KEY = "greenhouse_records"

    // DOM elements
    const metricForm = document.getElementById("metric-form")
    const errorBanner = document.getElementById("form-error-banner");
    const recordsList = document.getElementById("records-list");
    const queueCount = document.getElementById("queue-count");
    const emptyState = document.getElementById("empty-state");
    const btnClearAll = document.getElementById("btn-clear-all");

    //input fields
    const inputBayId = document.getElementById("bay-id");
    const inputPh = document.getElementById("ph");
    const inputEc = document.getElementById("ec");
    const inputTemperature = document.getElementById("temperature");
    const inputHumidity = document.getElementById("humidity");

    // initialize records and display stored data
    let records = loadRecords();
    render();

    // read operation
    function loadRecords() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            const parsed = stored ? JSON.parse(stored) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
        console.error("Failed to load greenhouse records:", error);
        return [];
      }
    }

    //write operation
    function saveRecords() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
      } catch (error) {
        console.error("Failed to save greenhouse records:", error);
      }
    }

    //classify sensor readings
    function evaluateStatus(ph,ec,temperature,humidity){
        // critical evaluation
        if (
        (ph < 5.0 || ph > 7.5) &&
        (temperature < 55 || temperature > 95) &&
        (ec < 0.2 || ec > 4.5) &&
        (humidity < 30 || humidity > 90)
        ) {
            return {level: "critical", label: "Critical"};
        }
        //optimal evaluation
        if (
            (ph >= 5.5 && ph <= 6.5) &&
            (temperature >= 64.4 && temperature <= 71.6) &&
            (ec >= 1.0 && ec <= 2.0) &&
            (humidity >= 50 && humidity <= 70)
        ) {
            return { level: "optimal", label: "Optimal" };
        }

        //warning evaluation
        return {level: "warning", label: "Warning"};
    }

    // Validate greenhouse sensor inputs
    function validateInput(data) {
        const errors = [];

        if (!data.bayID.trim()) {
        errors.push("Greenhouse Bay ID is a required field.");
        }

        if (
        !Number.isFinite(data.ph) ||
        data.ph < 0 ||
        data.ph > 14
        ) {
        errors.push("pH must be between 0 and 14.");
        }

        if (
        !Number.isFinite(data.ec) ||
        data.ec < 0 ||
        data.ec > 10
        ) {
        errors.push("Electrical Conductivity must be between 0 and 10 mS/cm.");
        }

        if (!Number.isFinite(data.temperature) || data.temperature < -10 || data.temperature > 200) {
        errors.push("Temperature must be between -10 and 200 F");
        }

        if (!Number.isFinite(data.humidity) || data.humidity < 0 || data.humidity > 100) {
        errors.push("Relative Humidity must be between 0% and 100%.");
        }
        return errors;
  }

  // Form submission event listener
  metricForm.addEventListener("submit", (event) => {
    event.preventDefault();

    //collect user input
    const formData = {
      id: crypto.randomUUID(),
      bayID: inputBayId.value.trim(),
      ph: inputPh.value.trim() === "" ? NaN : Number(inputPh.value),
      ec: inputEc.value.trim() === "" ? NaN : Number(inputEc.value),
      temperature: inputTemperature.value.trim() === "" ? NaN : Number(inputTemperature.value),
      humidity: inputHumidity.value.trim() === "" ? NaN : Number(inputHumidity.value),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // validate submitted inputs
    const validationErrors = validateInput(formData);

    if (validationErrors.length > 0) {
        displayError(validationErrors.join(" "));
        return;
    }

    hideError();

    // classify the sensor readings
    formData.status = evaluateStatus (
        formData.ph,
        formData.ec,
        formData.temperature,
        formData.humidity
    );

    // add readings to records array
    records.unshift(formData);
    // save to local storage
    saveRecords();

    //update dashboard
    render();

    //reset the form
    metricForm.reset();
    inputBayId.focus();

    });

    // Delete indivisual sensor records
    recordsList.addEventListener("click", function (event){
        const target=event.target;

        if (target.classList.contains("btn-delete")) {
            const recordId = target.dataset.id;

            //remove matching record
            records = records.filter(function (record){
                return record.id !== recordId;
            });
            saveRecords();
            render();
        }
    });

    // Clear all logs
    btnClearAll.addEventListener("click", () =>{
        if (records.length === 0) return;
        if (confirm("Are you aure you want to clear all log data")) {
            records = [];
            saveRecords;
            render();
        }
    });

  function render(){
    //update log count
    queueCount.textContent = records.length;

    //if empty, then empty state
    if (records.length === 0) {
      emptyState.classList.remove("hidden");
      recordsList.innerHTML = "";
      return;
    }

    //hide empty state if records exist
    emptyState.classList.add("hidden");

    // doc fragment for dynamic cards
    const fragment = document.createDocumentFragment();

    records.forEach(function (rec) {
        const li = document.createElement("li");
        li.className = "metric-card status-" +rec.status.level;

        //html for sensor data card
        li.innerHTML = `
          <div class="card-top">
            <div>
              <div class="bay-id-text">${escapeHtml(rec.bayID)}</div>

              <div class="timestamp">Logged at ${rec.timestamp}</div>

              <span class="risk-badge ${rec.status.level}">
                ${rec.status.label}
              </span>
            </div>
          </div>

          <div class="sensor-stats"> 
            <div class="stat-item">
                <span>pH Level</span>
                ${rec.ph}
            </div> 

            <div class="stat-item">
                <span>Electrical Conductivity</span>
                ${rec.ec}
            </div> 

            <div class="stat-item">
                <span>Air Temperature</span>
                ${rec.temperature} F
            </div> 

            <div class="stat-item">
                <span>Relative Humidity</span>
                ${rec.humidity}
            </div> 
          </div>

          <button 
          type="button"
          class="btn btn-outline-danger btn-sm btn-delete"
          data-id="${rec.id}"
          >
          Delete Log
          </button>
          `;

          //add card to fragment
          fragment.appendChild(li);
        });

        //clear existing records and insert new card
        recordsList.innerHTML = "";
        recordsList.appendChild(fragment);
    }

    // Show form validation errors
  function displayError(message) {
    errorBanner.textContent = message;
    errorBanner.classList.remove("hidden");
  }

  // Hide form validation errors
  function hideError() {
    errorBanner.textContent = "";
    errorBanner.classList.add("hidden");
  }


// Escape user input to prevent HTML injection
  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }





})();