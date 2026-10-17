/**
 * AES SC-05-05 Landmark Papers & Working Group Master Archive Filter Engine
 * Canonical research dossier posted October 3, 2025 by Richard Cabot, Chair
 * (c) 2026 Audio Engineering Society SC-05-05 Standards Working Group
 */

document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".paper-filter-btn");
  const searchInput = document.getElementById("paper-search-input");
  const cards = document.querySelectorAll(".paper-card");
  const countDisplay = document.getElementById("paper-filter-count");

  function filterCards() {
    const activeBtn = document.querySelector(".paper-filter-btn.active");
    const activeCategory = activeBtn ? activeBtn.dataset.filter : "all";
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";

    let visibleCount = 0;

    cards.forEach((card) => {
      const cardCategory = card.dataset.category || "";
      const cardAuthor = (card.dataset.author || "").toLowerCase();
      const cardText = card.textContent.toLowerCase();

      let matchesCat = false;
      if (activeCategory === "all") {
        matchesCat = true;
      } else if (activeCategory === "whitlock") {
        matchesCat = cardAuthor.includes("whitlock");
      } else if (activeCategory === "brown") {
        matchesCat = cardAuthor.includes("brown");
      } else if (activeCategory === "hebert") {
        matchesCat = cardAuthor.includes("hebert");
      } else if (activeCategory === "phantom") {
        matchesCat = cardCategory.includes("phantom") || cardText.includes("phantom");
      } else if (activeCategory === "rfi") {
        matchesCat = cardCategory.includes("rfi") || cardText.includes("rfi") || cardText.includes("pin 1") || cardText.includes("ferrite");
      } else if (activeCategory === "cabot") {
        matchesCat = cardAuthor.includes("cabot") || cardCategory.includes("x152");
      }

      const matchesSearch = !query || cardText.includes(query);

      if (matchesCat && matchesSearch) {
        card.style.display = "flex";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    if (countDisplay) {
      countDisplay.textContent = `Showing ${visibleCount} of ${cards.length} canonical papers and working drafts.`;
    }
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      filterCards();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", filterCards);
  }

  filterCards();
});
