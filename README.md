# 🎬 CineVault — Movie Rating & Discovery App

A professional movie discovery app built with React + Vite + Tailwind CSS, powered by The Movie Database (TMDB) API.

---

## ✨ Features

- **🔍 Advanced Search** — Search movies with genre, year, and rating filters
- **🌟 Discovery** — Browse Trending, Popular, Top Rated, Now Playing & Upcoming
- **⭐ 5-Star Rating System** — Rate any movie, view all your ratings
- **🔖 Watchlist** — Save movies to watch later
- **❤️ Favorites** — Curate your favorites collection
- **👁️ Watch Tracking** — Mark movies as watched
- **🎬 Movie Details** — Full details: cast, trailers, reviews, similar films
- **🎠 Hero Banner** — Auto-rotating featured films
- **💾 Persistent Storage** — All data saved to localStorage

---

## 🚀 Quick Start

### 1. Get a TMDB API Key

1. Go to [https://www.themoviedb.org/](https://www.themoviedb.org/) and create a free account
2. Navigate to **Settings → API**
3. Request an API key (select "Developer" and fill in the form)
4. Copy your **API Key (v3 auth)**

### 2. Setup Environment

```bash
# Copy the example env file
cp .env.example .env

# Open .env and paste your TMDB API key
VITE_TMDB_API_KEY=your_actual_api_key_here
```

### 3. Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── FilterBar.jsx      # Advanced filter controls
│   ├── HeroBanner.jsx     # Auto-rotating hero section
│   ├── MovieCard.jsx      # Movie card with actions
│   ├── MovieGrid.jsx      # Responsive grid layout
│   ├── MovieRow.jsx       # Horizontal scrollable row
│   ├── Navbar.jsx         # Navigation with search
│   ├── Skeleton.jsx       # Loading skeleton screens
│   ├── StarRating.jsx     # Interactive 5-star rating
│   └── Toast.jsx          # Toast notifications
├── context/
│   └── AppContext.jsx     # Global state (watchlist, favorites, ratings)
├── hooks/
│   └── useMovies.js       # Data fetching hooks
├── pages/
│   ├── HomePage.jsx       # Hero + movie rows
│   ├── DiscoverPage.jsx   # Paginated discovery with filters
│   ├── SearchPage.jsx     # Search with infinite results
│   ├── MovieDetailPage.jsx # Full movie detail view
│   ├── WatchlistPage.jsx  # Saved watchlist
│   ├── FavoritesPage.jsx  # Favorites collection
│   ├── RatedPage.jsx      # Personal ratings dashboard
│   └── NotFoundPage.jsx   # 404 page
├── utils/
│   └── tmdb.js            # TMDB API client (axios)
├── App.jsx                # Root with React Router
├── main.jsx               # Entry point
└── index.css              # Tailwind + custom styles
```

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI Framework |
| Vite | Build tool |
| React Router v6 | Client-side routing |
| Tailwind CSS v3 | Styling |
| Axios | API requests |
| Lucide React | Icons |
| TMDB API | Movie data |

---

## 🎨 Design System

The app uses a cinema-inspired dark theme with CSS custom colors:

- `cinema-black` — Page background
- `cinema-card` — Card surfaces
- `cinema-gold` — Primary accent (ratings, highlights)
- `cinema-red` — Favorites / danger
- `cinema-teal` — Watched indicator
- `cinema-muted` — Secondary text

Fonts: **Playfair Display** (display) + **DM Sans** (body) + **DM Mono** (numbers)

---

## 📝 Notes

- All user data (watchlist, favorites, ratings) is stored in `localStorage`
- The app is fully client-side — no backend required
- TMDB API is free for non-commercial use
- Images are served from TMDB's CDN

---

## 📄 License

MIT — Free to use and modify.
