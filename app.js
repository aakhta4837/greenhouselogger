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
    


})();