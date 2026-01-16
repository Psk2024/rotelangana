// js/modal.js
import { CONFIG } from "./config.js";

export function openEmployeeModal(row) {
  const empId = row[CONFIG.HEADERS.EMP_ID];
  const name = row[CONFIG.HEADERS.NAME];

  document.getElementById("modalBody").innerHTML = `
    <h3>${name}</h3>
    <p><strong>Employee ID:</strong> ${empId}</p>
    <p><strong>Branch:</strong> ${row[4]}</p>
    <p><strong>Contact:</strong> ${row[10] || "N/A"}</p>
  `;

  document.getElementById("employeeModal").style.display = "block";
}

