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

})();