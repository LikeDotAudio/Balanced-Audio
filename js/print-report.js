/**
 * print-report.js — "Print PDF" button, document version, and committee-only watermark
 *
 * - The version comes from <meta name="doc-version">, stamped by build.py at build time.
 * - Printing always uses the paper view; the instruments, wires and navigation are hidden.
 * - Every printed page carries a diagonal "COMMITTEE USE ONLY · AES SC-05-05" watermark and a
 *   header/footer with the version, the reader's name and page numbers.
 * - The PDF is titled "standards.aes — … — NAME — version", which browsers use as the file name.
 *   Browsers cannot read the Windows or Gmail account name, so NAME is the reviewer sign-in
 *   (review-comments.js), asked for once if missing.
 */

const PRINT_NOTICE = "FOR COMMITTEE USE ONLY — NOT FOR PUBLICATION";
const PRINT_ORG = "AES · Audio Engineering Society · SC-05-05";
const PRINT_NAME_KEY = "ba-review-name"; // shared with the reviewer sign-in

function docVersion() {
  const meta = document.querySelector('meta[name="doc-version"]');
  const v = meta ? meta.content : "dev";
  return v === "dev" ? `dev ${new Date(document.lastModified).toISOString().slice(0, 16).replace("T", " ")}` : v;
}

function storedReaderName() {
  try {
    return JSON.parse(localStorage.getItem(PRINT_NAME_KEY) || '""');
  } catch (e) {
    return "";
  }
}

function askReaderName() {
  let name = storedReaderName();
  if (name) return name;
  name = (prompt("Your name or initials for this PDF (e.g. APK):", "") || "").trim().slice(0, 40);
  if (name) {
    try {
      localStorage.setItem(PRINT_NAME_KEY, JSON.stringify(name));
    } catch (e) { /* private window: used for this print only */ }
  }
  return name;
}

document.addEventListener("DOMContentLoaded", () => {
  const version = docVersion();
  const baseTitle = document.title;
  document.querySelectorAll("[data-doc-version]").forEach(el => (el.textContent = `Version ${version}`));

  // Watermark: a fixed element repeats on every printed page
  const mark = document.createElement("div");
  mark.className = "print-watermark";
  mark.setAttribute("aria-hidden", "true");
  mark.innerHTML = `<span>COMMITTEE USE ONLY<br><small>Not for publishing</small><br><small class="print-watermark-org">${PRINT_ORG}</small></span>`;
  document.body.appendChild(mark);

  // First-page title block
  const cover = document.createElement("div");
  cover.className = "print-cover";
  document.body.prepend(cover);

  // Page margin boxes carry the notice, version, reader and page numbers
  const pageStyle = document.createElement("style");
  document.head.appendChild(pageStyle);

  const stamp = (name, label) => {
    const who = name ? ` · ${name}` : "";
    document.title = `standards.aes — ${label} — ${baseTitle}${who} — ${version}`;
    cover.innerHTML = `
      <div class="print-cover-notice">${PRINT_NOTICE}</div>
      <div class="print-cover-org">standards.aes &bull; ${PRINT_ORG}</div>
      <div class="print-cover-title">${baseTitle}</div>
      <div class="print-cover-meta">Internal Report &amp; Interactive Toolset &bull; Version ${version} &bull; Printed ${new Date().toLocaleDateString()}${name ? ` for ${name}` : ""}</div>`;
    pageStyle.textContent = `
      @page {
        margin: 16mm 12mm;
        @top-left { content: "standards.aes"; font: 700 8pt sans-serif; color: #555; }
        @top-center { content: "${PRINT_NOTICE}"; font: 700 8pt sans-serif; color: #b91c1c; }
        @top-right { content: "AES SC-05-05"; font: 700 8pt sans-serif; color: #555; }
        @bottom-left { content: "Version ${version}${who}"; font: 8pt sans-serif; color: #555; }
        @bottom-right { content: "Page " counter(page) " of " counter(pages); font: 8pt sans-serif; color: #555; }
      }`;
  };
  stamp(storedReaderName(), "Report");
  document.title = baseTitle; // the tab keeps its normal title until something is printed

  // Buttons ask for the reader's name once; Ctrl+P uses whatever is stored
  window.printReport = (label = "Report", run = () => window.print()) => {
    stamp(askReaderName(), label);
    run();
  };

  // Print in the paper view, then put the reader's view and the page title back
  let themeBeforePrint = null;
  window.addEventListener("beforeprint", () => {
    if (document.title === baseTitle) stamp(storedReaderName(), "Report"); // Ctrl+P
    themeBeforePrint = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", "paper");
  });
  window.addEventListener("afterprint", () => {
    if (themeBeforePrint) document.documentElement.setAttribute("data-theme", themeBeforePrint);
    themeBeforePrint = null;
    document.title = baseTitle;
  });

  document.getElementById("print-pdf-btn")?.addEventListener("click", () => window.printReport("Report"));
});
