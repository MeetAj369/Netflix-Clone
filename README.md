# Netflix Streaming UI & Interactive Web App

> **Live Demo:** [https://meetaj369.github.io/Netflix-Clone/](https://meetaj369.github.io/Netflix-Clone/)  
> **Author:** Meet Chauhan ([@MeetAj369](https://github.com/MeetAj369))

A feature-rich, high-performance web recreation of the official **Netflix Web Experience**, built with semantic HTML5, modern CSS3, and vanilla JavaScript. Includes interactive video trailers, detailed movie synopsis modals, real-time live search, dynamic category rows, and persistent **My List** and rating state using `localStorage`.

---

## 🌟 Key Features

- **Cinematic Billboard Hero**:
  - Highlights *Money Heist* with metadata (99% Match, 4K Ultra HD, TV-MA).
  - One-click **Play** trailer modal and **More Info** popup.
  - "My List" bookmark toggle with state persistence.

- **Categorized Streaming Rows**:
  - **Trending Now**: *Money Heist*, *Stranger Things*, *Interstellar*, *Squid Game*, *Inception*.
  - **Netflix Originals**: *Peaky Blinders*, *Dark*, *The Witcher*, *Wednesday*, *The Queen's Gambit*.
  - **Critically Acclaimed TV Shows**: *Breaking Bad*, *Better Call Saul*, *Arcane*, *Cyberpunk: Edgerunners*, *Black Mirror*.
  - **Action Thrillers & Drama**: *Oppenheimer*, *Narcos*, *Mindhunter*, *Cobra Kai*, *The Crown*.

- **Interactive YouTube Trailer Player**:
  - Embedded 16:9 YouTube video player with autoplay for official Netflix trailers.
  - Full keyboard accessibility (`Escape` key to close).

- **Dynamic "My List" Experience**:
  - Real-time bookmarking system saved to browser `localStorage`.
  - Dedicated "My List" row dynamically renders all saved titles with instant removal capability.
  - Live navbar count badge updates in real time.

- **Instant Live Search**:
  - Type-ahead search bar filtering across all 20+ titles by name, genre (*Sci-Fi, Crime, Anime, Thriller*), and keywords.
  - Instant results count with clean "clear search" toggle.

- **User Profile & Account Suite**:
  - Interactive profile management page (`profile-details.html`) with membership status, streaming tiers (4K HDR), and security settings.

- **Fully Responsive & Touch-Friendly**:
  - Smooth horizontal scrolling on mobile/tablet devices.
  - Fluid typography and responsive modal views.

---

## 🛠️ Tech Stack

- **Markup & Layout:** HTML5 Semantic Architecture
- **Styling:** CSS3 (Flexbox, CSS Grid, Custom Properties, Backdrop Filters, Glassmorphism)
- **Scripting:** Vanilla JavaScript (ES6+), DOM Manipulation, Event Delegation, HTML5 Web Storage API (`localStorage`)
- **Assets:** Custom high-resolution movie posters, FontAwesome 6 icons, Official SVG branding

---

## 🚀 Getting Started

Clone the repository and launch the app in any browser:

```bash
git clone https://github.com/MeetAj369/Netflix-Clone.git
cd Netflix-Clone
# Simply open index.html in your browser or run:
npx serve .
```

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details. Built for educational and portfolio demonstration purposes.
