import { state } from "./state.js";
import { loadExcelData } from "./dataService.js";
import { renderDirectory } from "./renderer.js";
import { debounce } from "./utils.js";

const container = document.getElementById("employeeTableContainer");
const search = document.getElementById("searchInput");

async function init() {
  await loadExcelData();
  applyFilters();
}

function applyFilters() {
  state.searchTerm = search.value.trim().toLowerCase();
  state.filteredData = state.allData.filter(row =>
    row.join(" ").toLowerCase().includes(state.searchTerm)
  );
  renderDirectory(container);
}

search.addEventListener("input", debounce(applyFilters));
init();

