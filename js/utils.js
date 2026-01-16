// js/utils.js
export function debounce(fn, delay = 300) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

export function highlight(text, term) {
  if (!term) return text;
  const safe = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(
    new RegExp(`(${safe})`, "gi"),
    `<mark>$1</mark>`
  );
}
