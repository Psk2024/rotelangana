// js/renderer.js
import { CONFIG } from "./config.js";
import { state } from "./state.js";
import { highlight } from "./utils.js";

export function renderDirectory(container) {
  const grouped = {};

  state.filteredData.forEach(row => {
    const place = row[CONFIG.HEADERS.PLACE] || "Unknown";
    (grouped[place] ||= []).push(row);
  });

  let html = "";
  let colorIndex = 0;

  for (const place in grouped) {
    const color = CONFIG.HEADER_COLORS[colorIndex++ % CONFIG.HEADER_COLORS.length];
    html += `
      <div class="place-section">
        <h2 style="color:${color}">
          ${place} (${grouped[place].length})
        </h2>
        <table class="employee-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Branch</th>
            </tr>
          </thead>
          <tbody>
    `;

    grouped[place].forEach(row => {
      html += `
        <tr class="clickable-row" data-id="${row[0]}">
          <td>${highlight(row[0], state.searchTerm)}</td>
          <td>${highlight(row[1], state.searchTerm)}</td>
          <td>${row[2] || "-"}</td>
          <td>${highlight(row[4], state.searchTerm)}</td>
        </tr>
      `;
    });

    html += `</tbody></table></div>`;
  }

  container.innerHTML = html;
}

