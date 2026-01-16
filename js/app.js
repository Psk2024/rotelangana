import { state } from "./state.js";
import { loadExcelData } from "./dataService.js";
import { renderDirectory } from "./renderer.js";
import { debounce } from "./utils.js";

const container = document.getElementById("employeeTableContainer");
const searchInput = document.getElementById("searchInput");

async function init() {
  try {
    await loadExcelData();
    applyFilters();
  } catch (e) {
    container.innerHTML = `<p style="padding:20px;color:red;">
      Unable to load employee data.
    </p>`;
  }
}

function applyFilters() {
  const term = searchInput.value.trim().toLowerCase();
  state.filteredData = state.allData.filter(row =>
    row.join(" ").toLowerCase().includes(term)
  );

  document.getElementById("totalCount").textContent = state.totalCount;
  document.getElementById("filteredCount").textContent =
    new Set(state.filteredData.map(r => r[0])).size;

  renderDirectory(container);
}

searchInput.addEventListener("input", debounce(applyFilters, 300));
init();
