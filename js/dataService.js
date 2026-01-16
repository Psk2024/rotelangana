// js/dataService.js
import { CONFIG } from "./config.js";
import { state } from "./state.js";

export async function loadExcelData() {
  const { API_KEY, ID, RANGE } = CONFIG.SHEET;

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${ID}/values/${RANGE}?key=${API_KEY}`;
  const res = await fetch(url);
  const json = await res.json();

  if (!json.values?.length) throw new Error("No data");

  state.allData = json.values.slice(1);
  state.totalCount = new Set(state.allData.map(r => r[0])).size;
}

