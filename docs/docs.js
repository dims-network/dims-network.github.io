/* Renders the docs sidebar from one array and highlights the current page.
   Single source of nav — edit here, every docs page updates. */
const DOCS_NAV = [
  { group: "Getting started", items: [
    { title: "Overview",            href: "index.html" },
    { title: "Architecture",        href: "architecture.html" },
  ]},
  { group: "Reference", items: [
    { title: "Repositories",        href: "repositories.html" },
    { title: "Data & config model", href: "data-model.html" },
    { title: "Analyses",            href: "analyses.html" },
  ]},
  { group: "Development", items: [
    { title: "Integration workflow", href: "workflow.html" },
    { title: "Contributing",         href: "contributing.html" },
  ]},
];

(function renderSidebar() {
  const here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const side = document.querySelector(".docs-side");
  if (!side) return;
  side.innerHTML =
    '<div class="docs-side-title">Documentation</div>' +
    DOCS_NAV.map(g =>
      `<div class="docs-group"><div class="docs-group-h">${g.group}</div>` +
      g.items.map(it => {
        const active = it.href.toLowerCase() === here ? ' class="active"' : "";
        return `<a href="${it.href}"${active}>${it.title}</a>`;
      }).join("") +
      `</div>`
    ).join("");
})();