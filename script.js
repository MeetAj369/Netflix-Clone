/**
 * Netflix Clone — Interactive Engine
 * Engineered by Meet Chauhan
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. Storage & State Management
  // ==========================================
  const STORAGE_KEY = "netflix_clone_my_list";
  const LIKES_KEY = "netflix_clone_likes";

  function getMyList() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (_) {
      return [];
    }
  }

  function saveMyList(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (_) {}
    updateMyListUI();
  }

  function getLikes() {
    try {
      return JSON.parse(localStorage.getItem(LIKES_KEY)) || [];
    } catch (_) {
      return [];
    }
  }

  function toggleLike(id) {
    let likes = getLikes();
    const idx = likes.indexOf(id);
    let liked = false;
    if (idx > -1) {
      likes.splice(idx, 1);
      liked = false;
      showToast("Removed from ratings", "far fa-thumbs-up");
    } else {
      likes.push(id);
      liked = true;
      showToast("Rated: I like this", "fas fa-thumbs-up");
    }
    try {
      localStorage.setItem(LIKES_KEY, JSON.stringify(likes));
    } catch (_) {}
    updateAllCardsVisualState();
    return liked;
  }

  // Toast System
  const toastEl = document.getElementById("netflix-toast");
  let toastTimer = null;

  function showToast(message, icon = "fas fa-check") {
    if (!toastEl) return;
    clearTimeout(toastTimer);
    toastEl.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
    toastEl.classList.add("show");
    toastTimer = setTimeout(() => {
      toastEl.classList.remove("show");
    }, 2500);
  }

  // ==========================================
  // 2. Navbar Scroll & Profile
  // ==========================================
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Profile Link
  const profileIcons = document.querySelectorAll(".profile-icon");
  profileIcons.forEach((p) => {
    p.addEventListener("click", (e) => {
      e.stopPropagation();
      window.location.href = "profile-details.html";
    });
  });

  // ==========================================
  // 3. Modals: Trailer Player & More Info
  // ==========================================
  const trailerModal = document.getElementById("trailer-modal");
  const trailerIframe = document.getElementById("trailer-iframe");
  const trailerTitle = document.getElementById("trailer-title");
  const modalCloseBtn = document.getElementById("modal-close-btn");

  function openTrailer(title, trailerId) {
    if (!trailerModal || !trailerIframe) return;
    trailerTitle.textContent = title ? `${title} — Official Trailer` : "Official Trailer";
    trailerIframe.src = `https://www.youtube.com/embed/${trailerId}?autoplay=1&rel=0&modestbranding=1`;
    trailerModal.classList.add("active");
    trailerModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeTrailer() {
    if (!trailerModal || !trailerIframe) return;
    trailerModal.classList.remove("active");
    trailerModal.setAttribute("aria-hidden", "true");
    trailerIframe.src = ""; // Stop audio/video
    document.body.style.overflow = "";
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeTrailer);
  if (trailerModal) {
    const backdrop = trailerModal.querySelector(".modal-backdrop");
    if (backdrop) backdrop.addEventListener("click", closeTrailer);
  }

  // More Info Modal
  const infoModal = document.getElementById("info-modal");
  const infoCloseBtn = document.getElementById("info-close-btn");
  const infoHero = document.getElementById("info-hero");
  const infoTitle = document.getElementById("info-title");
  const infoPlayBtn = document.getElementById("info-play-btn");
  const infoListBtn = document.getElementById("info-list-btn");
  const infoLikeBtn = document.getElementById("info-like-btn");
  const infoRating = document.getElementById("info-rating");
  const infoYear = document.getElementById("info-year");
  const infoMaturity = document.getElementById("info-maturity");
  const infoDuration = document.getElementById("info-duration");
  const infoDesc = document.getElementById("info-desc");
  const infoGenre = document.getElementById("info-genre");

  let currentInfoData = null;

  function openInfo(data) {
    currentInfoData = data;
    if (!infoModal) return;

    infoTitle.textContent = data.title;
    infoDesc.textContent = data.desc;
    infoRating.textContent = data.rating || "98% Match";
    infoYear.textContent = data.year || "2024";
    infoMaturity.textContent = data.maturity || "TV-MA";
    infoDuration.textContent = data.duration || "Series";
    infoGenre.textContent = data.genre || "Drama • Thriller";

    if (infoHero) {
      infoHero.style.backgroundImage = `url("${data.poster}")`;
    }

    // List button state
    const myList = getMyList();
    const inList = myList.some((m) => m.id === data.id);
    if (infoListBtn) {
      infoListBtn.innerHTML = inList ? '<i class="fas fa-check"></i>' : '<i class="fas fa-plus"></i>';
      infoListBtn.classList.toggle("in-list", inList);
    }

    // Like button state
    const likes = getLikes();
    const isLiked = likes.includes(data.id);
    if (infoLikeBtn) {
      infoLikeBtn.classList.toggle("liked", isLiked);
    }

    infoModal.classList.add("active");
    infoModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeInfo() {
    if (!infoModal) return;
    infoModal.classList.remove("active");
    infoModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (infoCloseBtn) infoCloseBtn.addEventListener("click", closeInfo);
  if (infoModal) {
    const backdrop = infoModal.querySelector(".modal-backdrop");
    if (backdrop) backdrop.addEventListener("click", closeInfo);
  }

  if (infoPlayBtn) {
    infoPlayBtn.addEventListener("click", () => {
      if (currentInfoData && currentInfoData.trailer) {
        closeInfo();
        setTimeout(() => {
          openTrailer(currentInfoData.title, currentInfoData.trailer);
        }, 150);
      }
    });
  }

  if (infoListBtn) {
    infoListBtn.addEventListener("click", () => {
      if (currentInfoData) {
        toggleMyList(currentInfoData);
        const inList = getMyList().some((m) => m.id === currentInfoData.id);
        infoListBtn.innerHTML = inList ? '<i class="fas fa-check"></i>' : '<i class="fas fa-plus"></i>';
        infoListBtn.classList.toggle("in-list", inList);
      }
    });
  }

  if (infoLikeBtn) {
    infoLikeBtn.addEventListener("click", () => {
      if (currentInfoData) {
        const liked = toggleLike(currentInfoData.id);
        infoLikeBtn.classList.toggle("liked", liked);
      }
    });
  }

  // Global Escape Key Listener for Modals
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeTrailer();
      closeInfo();
    }
  });

  // ==========================================
  // 4. Hero Section Interactions
  // ==========================================
  const heroPlayBtn = document.getElementById("hero-play-btn");
  const heroInfoBtn = document.getElementById("hero-info-btn");
  const heroListBtn = document.getElementById("hero-list-btn");

  const moneyHeistData = {
    id: "money-heist",
    title: "Money Heist",
    poster: "Money-Heist.jpg",
    rating: "99% Match",
    maturity: "TV-MA",
    duration: "5 Seasons",
    genre: "Suspense • Heist • Spanish",
    year: "2021",
    trailer: "_InqQJRqGW4",
    desc: "A criminal mastermind who goes by 'The Professor' plans the biggest heist in recorded history: to print billions of euros in the Royal Mint of Spain."
  };

  if (heroPlayBtn) {
    heroPlayBtn.addEventListener("click", () => {
      openTrailer("Money Heist", "_InqQJRqGW4");
    });
  }

  if (heroInfoBtn) {
    heroInfoBtn.addEventListener("click", () => {
      openInfo(moneyHeistData);
    });
  }

  if (heroListBtn) {
    heroListBtn.addEventListener("click", () => {
      toggleMyList(moneyHeistData);
      const inList = getMyList().some((m) => m.id === "money-heist");
      heroListBtn.innerHTML = inList ? '<i class="fas fa-check"></i> In My List' : '<i class="fas fa-plus"></i> My List';
      heroListBtn.classList.toggle("in-list", inList);
    });
  }

  // ==========================================
  // 5. Card Click Delegation & Hover
  // ==========================================
  function parseCardData(card) {
    return {
      id: card.dataset.id,
      title: card.dataset.title,
      poster: card.dataset.poster,
      rating: card.dataset.rating,
      maturity: card.dataset.maturity,
      duration: card.dataset.duration,
      genre: card.dataset.genre,
      year: card.dataset.year,
      trailer: card.dataset.trailer,
      desc: card.dataset.desc
    };
  }

  function handleCardClick(e) {
    const card = e.target.closest(".content-card");
    if (!card) return;

    const data = parseCardData(card);
    const actionBtn = e.target.closest("button");
    const action = actionBtn ? actionBtn.dataset.action : null;

    if (action === "play") {
      e.stopPropagation();
      openTrailer(data.title, data.trailer);
    } else if (action === "mylist") {
      e.stopPropagation();
      toggleMyList(data);
    } else if (action === "like") {
      e.stopPropagation();
      toggleLike(data.id);
    } else if (action === "info") {
      e.stopPropagation();
      openInfo(data);
    } else {
      // Clicking the card itself opens info
      openInfo(data);
    }
  }

  document.querySelector(".main-content").addEventListener("click", handleCardClick);

  // ==========================================
  // 6. My List Functionality
  // ==========================================
  function toggleMyList(item) {
    let list = getMyList();
    const idx = list.findIndex((m) => m.id === item.id);
    if (idx > -1) {
      list.splice(idx, 1);
      showToast(`Removed "${item.title}" from My List`, "fas fa-trash-alt");
    } else {
      list.push(item);
      showToast(`Added "${item.title}" to My List`, "fas fa-check-circle");
    }
    saveMyList(list);
  }

  function updateMyListUI() {
    const list = getMyList();
    const listSection = document.getElementById("my-list-section");
    const listRow = document.getElementById("my-list-row");
    const listBadge = document.getElementById("nav-list-badge");
    const listCount = document.getElementById("my-list-count");

    if (listBadge) listBadge.textContent = list.length;
    if (listCount) listCount.textContent = `(${list.length})`;

    if (listSection && listRow) {
      if (list.length === 0) {
        listSection.style.display = "none";
        listRow.innerHTML = "";
      } else {
        listSection.style.display = "block";
        listRow.innerHTML = list
          .map(
            (m) => `
            <div class="content-card" 
                 data-id="${m.id}" 
                 data-title="${m.title}" 
                 data-poster="${m.poster}" 
                 data-rating="${m.rating}" 
                 data-maturity="${m.maturity}" 
                 data-duration="${m.duration}" 
                 data-genre="${m.genre}" 
                 data-year="${m.year}" 
                 data-trailer="${m.trailer}" 
                 data-desc="${m.desc}">
              <img src="${m.poster}" alt="${m.title} poster" loading="lazy" />
              <div class="netflix-badge">N</div>
              <div class="card-overlay">
                <div class="overlay-top">
                  <div class="netflix-badge">N</div>
                  <span class="overlay-match">${m.rating}</span>
                </div>
                <div class="overlay-bottom">
                  <div class="overlay-title">${m.title}</div>
                  <div class="overlay-controls">
                    <button class="control-btn play-btn" title="Play Trailer" data-action="play">
                      <i class="fas fa-play"></i>
                    </button>
                    <button class="control-btn mylist-btn in-list" title="Remove from My List" data-action="mylist">
                      <i class="fas fa-check"></i>
                    </button>
                    <button class="control-btn like-btn" title="I like this" data-action="like">
                      <i class="fas fa-thumbs-up"></i>
                    </button>
                    <button class="control-btn more-btn" title="More Info" data-action="info">
                      <i class="fas fa-chevron-down"></i>
                    </button>
                  </div>
                  <div class="overlay-info">
                    <span class="info-badge">${m.maturity}</span>
                    <span class="info-badge">${m.duration}</span>
                    <span class="info-badge">HD</span>
                  </div>
                  <div class="overlay-genre">${m.genre}</div>
                </div>
              </div>
            </div>`
          )
          .join("");
      }
    }

    updateAllCardsVisualState();
  }

  function updateAllCardsVisualState() {
    const myList = getMyList();
    const likes = getLikes();
    const allCards = document.querySelectorAll(".content-card");

    allCards.forEach((card) => {
      const id = card.dataset.id;
      const mylistBtn = card.querySelector(".mylist-btn");
      const likeBtn = card.querySelector(".like-btn");

      const inList = myList.some((m) => m.id === id);
      if (mylistBtn) {
        mylistBtn.classList.toggle("in-list", inList);
        mylistBtn.innerHTML = inList ? '<i class="fas fa-check"></i>' : '<i class="fas fa-plus"></i>';
        mylistBtn.title = inList ? "Remove from My List" : "Add to My List";
      }

      const isLiked = likes.includes(id);
      if (likeBtn) {
        likeBtn.classList.toggle("liked", isLiked);
      }
    });

    if (heroListBtn) {
      const inHeroList = myList.some((m) => m.id === "money-heist");
      heroListBtn.classList.toggle("in-list", inHeroList);
      heroListBtn.innerHTML = inHeroList ? '<i class="fas fa-check"></i> In My List' : '<i class="fas fa-plus"></i> My List';
    }
  }

  // ==========================================
  // 7. Instant Search
  // ==========================================
  const searchInput = document.getElementById("search-input");
  const searchClearBtn = document.getElementById("search-clear-btn");
  const searchResultsSection = document.getElementById("search-results-section");
  const searchResultsRow = document.getElementById("search-results-row");
  const searchCount = document.getElementById("search-count");
  const contentSections = document.querySelectorAll(".content-section:not(#search-results-section)");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.trim().toLowerCase();

      if (query.length > 0) {
        searchClearBtn.classList.add("active");
        searchResultsSection.style.display = "block";
        contentSections.forEach((s) => (s.style.display = "none"));

        // Gather all unique cards
        const seen = new Set();
        const matches = [];
        document.querySelectorAll(".content-card").forEach((card) => {
          const id = card.dataset.id;
          if (!id || seen.has(id)) return;
          seen.add(id);

          const title = (card.dataset.title || "").toLowerCase();
          const genre = (card.dataset.genre || "").toLowerCase();
          const desc = (card.dataset.desc || "").toLowerCase();

          if (title.includes(query) || genre.includes(query) || desc.includes(query)) {
            matches.push(parseCardData(card));
          }
        });

        searchCount.textContent = matches.length;

        if (matches.length === 0) {
          searchResultsRow.innerHTML = `
            <div style="padding: 40px 0; color: #888; font-size: 16px;">
              <p>Your search for "<strong>${e.target.value}</strong>" did not match any titles.</p>
              <p style="margin-top: 8px; font-size: 14px; color: #666;">Suggestions: Try different keywords, genres (Sci-Fi, Crime, Drama), or check spelling.</p>
            </div>
          `;
        } else {
          searchResultsRow.innerHTML = matches
            .map(
              (m) => `
              <div class="content-card" 
                   data-id="${m.id}" 
                   data-title="${m.title}" 
                   data-poster="${m.poster}" 
                   data-rating="${m.rating}" 
                   data-maturity="${m.maturity}" 
                   data-duration="${m.duration}" 
                   data-genre="${m.genre}" 
                   data-year="${m.year}" 
                   data-trailer="${m.trailer}" 
                   data-desc="${m.desc}">
                <img src="${m.poster}" alt="${m.title} poster" loading="lazy" />
                <div class="netflix-badge">N</div>
                <div class="card-overlay">
                  <div class="overlay-top">
                    <div class="netflix-badge">N</div>
                    <span class="overlay-match">${m.rating}</span>
                  </div>
                  <div class="overlay-bottom">
                    <div class="overlay-title">${m.title}</div>
                    <div class="overlay-controls">
                      <button class="control-btn play-btn" title="Play Trailer" data-action="play">
                        <i class="fas fa-play"></i>
                      </button>
                      <button class="control-btn mylist-btn" title="Add to My List" data-action="mylist">
                        <i class="fas fa-plus"></i>
                      </button>
                      <button class="control-btn like-btn" title="I like this" data-action="like">
                        <i class="fas fa-thumbs-up"></i>
                      </button>
                      <button class="control-btn more-btn" title="More Info" data-action="info">
                        <i class="fas fa-chevron-down"></i>
                      </button>
                    </div>
                    <div class="overlay-info">
                      <span class="info-badge">${m.maturity}</span>
                      <span class="info-badge">${m.duration}</span>
                      <span class="info-badge">HD</span>
                    </div>
                    <div class="overlay-genre">${m.genre}</div>
                  </div>
                </div>
              </div>`
            )
            .join("");
        }
        updateAllCardsVisualState();
      } else {
        clearSearch();
      }
    });

    if (searchClearBtn) {
      searchClearBtn.addEventListener("click", () => {
        searchInput.value = "";
        clearSearch();
        searchInput.focus();
      });
    }
  }

  function clearSearch() {
    if (searchClearBtn) searchClearBtn.classList.remove("active");
    if (searchResultsSection) searchResultsSection.style.display = "none";
    contentSections.forEach((s) => {
      // Restore my list visibility based on contents
      if (s.id === "my-list-section") {
        s.style.display = getMyList().length > 0 ? "block" : "none";
      } else {
        s.style.display = "block";
      }
    });
  }

  // ==========================================
  // 8. Initial Initialization
  // ==========================================
  updateMyListUI();
});
