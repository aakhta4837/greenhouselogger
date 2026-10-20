Greenhouse Sensor Logger

Introduction: The Greenhouse Sensor Logger is an interactive web dashboard to be utilized by greenhouse technicians to monitor and record
environmental conditions within different greenhouse bays.

Section: The Less-than-equal-4-Click User Journey Funnel
● Starting State: Initial viewport when visiting the website, displaying input and output
sections with no recorded information present.
● Action 1: User enters data for metrics such as pH or temperature. The data gets checked
against their set boundaries and will display a visual error when an invalid value is
logged.
● Action 2: User inputs data into the form and clicks record reading button. The JavaScript
then checks the inputted data and determines whether it is Optimal, Warning, or Critical
hazard, it also saves the data into localStorage.
● Action 3: After the user submits the data, it gets uploaded to the output section,
displaying the recorded data with its status classification.
● Action 4: User can remove an individual metric log with its corresponding delete button or
clear all recorded metric readings using the purge button
● Terminal State: The website displays all recorded metric data with their status
classifications. If the data is all deleted, then it displays an empty state message on the
log section.


________________________________________________________________________________________________________

Semantic Component & Layout Tree
● Body
○ <header class= “portal-header”> (CSS: flex on row, space-between, centered)
[STATIC]
■ <h1> (Text: Greenhouse Sensor Logger) [STATIC]
○ <main class = “portal-container”> (CSS: grid, 2 equal columns, gap: 2rem)
[STATIC]
■ <aside class=”form-panel”> ( CSS: flex on column, gap 1rem) [STATIC]
● <h2> (Log Sensor Readings)
● <div id=”form-error-banner”> (CSS: block, hidden) [STATIC]
● < form id=”metric-form”> [STATIC] (Event: submit)
○ <div class=”form-group”> [STATIC]
■ <label for=”bay-id”> (Bay ID) [STATIC]
■ <input id=”bay-id”> ( type=”text”, required)
○ <div class=”form-group”> [STATIC]
■ <label for=”ph”> (pH Level) [STATIC]
■ <input id=”ph”> ( type=”number”, min=”0”, max=”14”
required) [STATIC] (Event:input)
○ <div class=”form-group”> [STATIC]
■ <label for=”ec”> (Elictrical Conductivity (mS/cm))
[STATIC]
■ <input id=”ec”> ( type=”number”, min=”0”, max=”10”
required) [STATIC] (Event:input)
○ <div class=”form-group”> [STATIC]
■ <label for=”temperature”> (Air Temperature (F))
[STATIC]
■ <input id=”temperature”> ( type=”number”,
min=”-10”, max=”200” required) [STATIC]
(Event:input)
○ <div class=”form-group”> [STATIC]
■ <label for=”humidity”> (Relative Humidity (%))
[STATIC]
■ <input id=”humidity”> ( type=”number”, min=”0”,
max=”100” required) [STATIC] (Event:input)
○ <button type=”submit” id=”btn-submit”> (Submit Metrics)
[STATIC]
● <section class=”records-panel”> (CSS: flex on column, gap 1rem)
[STATIC]
○ <div class=”records-header”> ( CSS: flex in row,
space-between, centered) [STATIC]
■ <h2> (Log Queue) [STATIC]
■ <button id=”btn-clear-all” . (Clear Queue) [STATIC]
(Event:click)
○ <div class=”empty-state”> (CSS: block, centered)[STATIC]
■ <p> (No sensor metrics logged) [STATIC]
○ <ul id=”records-list”> (CSS grid, gap 1rem) [STATIC]
■ <li class=”metric-record”[DYNAMIC] created with
java script
● <article> [DYNAMIC]
○ <h3> (Greenhouse Bay ID)
[DYNAMIC]
○ <p> (pH Metric) [DYNAMIC]
○ <p> (Electrical Conductivity Metric)
[DYNAMIC]
○ <p> (Air Temp Metric) [DYNAMIC]
○ <p> (Relative Humidity Metric)
[DYNAMIC]
○ <p> (Air Temp Metric) [DYNAMIC]
○ <span class=”metric-tag”> (optimal,
warning, critical) [DYNAMIC]
○ < button class=”btn-delet”> (delete
log) [DYNAMIC] (Event: click)
○ <footer class=”portal-footer”> (CSS block, centered) [STATIC]
○ <p> (Greenhouse Metric Logger)
________________________________________________________________________________________________________
Section: Data Schema
const greenhouseMetricsSchema = {
id: "String", // Unique identifier for each log
bayID: "String", // greenhouse bay identifier
ph: "Number", // recorded pH level
ec: "Number", // recorded electrical conductivity
temperature: "Number", // recorded air temperature
humidity: "Number", // recorded relative humidity
status: "String", // optimal, warning, or critical hazard rating
};
