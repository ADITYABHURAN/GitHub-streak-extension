# 🔥 GitHub Streak Extension

A browser extension that displays your GitHub contribution streak with a dynamic fire icon — similar to Snapchat or LeetCode streaks. Keep the fire burning by pushing code daily!

---

## 📖 Overview

This extension tracks your daily GitHub contributions and displays a streak counter on your GitHub profile. The concept is simple:

- **Push code daily** → Fire keeps burning 🔥
- **Miss a day** → Streak resets to 0 ❄️

The visual fire indicator grows more intense as your streak increases, motivating you to maintain consistent coding habits.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Streak Counter** | Shows consecutive days of contributions |
| **Dynamic Fire Icon** | Visual indicator that intensifies with longer streaks |
| **Profile Badge** | Embeddable badge for your GitHub profile README |
| **Streak Milestones** | Special animations at 7, 30, 100, 365 days |
| **Timezone Support** | Accurate tracking based on your local timezone |

---

## 🎯 How It Works

1. **Fetch Contribution Data** — Uses GitHub's contribution graph/API to get your activity
2. **Calculate Streak** — Counts consecutive days with at least 1 contribution
3. **Display Badge** — Renders a fire icon with streak count
4. **Update Daily** — Automatically refreshes to show current streak

### Streak Rules
- A "contribution" counts as: commits, PRs, issues, or code reviews
- The streak resets if you miss a full calendar day (in your timezone)
- Today doesn't count until you've made a contribution

---

## 🛠️ Tech Stack (Planned)

| Component | Technology |
|-----------|------------|
| Extension | JavaScript / Chrome Extension API |
| Badge Generator | SVG + Canvas API |
| Data Fetching | GitHub GraphQL API / Scraping contribution graph |
| Hosting (for badge) | Vercel / Cloudflare Workers (optional) |

---

## 📐 Architecture

```
┌─────────────────────────────────────────────────────┐
│                  GitHub Profile                      │
│  ┌───────────────────────────────────────────────┐  │
│  │  ![Streak Badge](streak-badge-url)            │  │
│  │                                               │  │
│  │         🔥 42 Day Streak                      │  │
│  │                                               │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────┐
│              Streak Calculator Service              │
│  • Fetches GitHub contribution data                 │
│  • Calculates current streak                        │
│  • Generates SVG badge with fire animation          │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 Planned Components

### 1. Browser Extension
- Injects streak badge into GitHub profile page
- Shows popup with streak stats
- Sends notifications for streak reminders

### 2. Embeddable Badge (Optional)
- SVG badge you can add to your profile README
- Auto-updates without needing the extension
- Example: `![GitHub Streak](https://your-service.com/streak/username)`

### 3. Fire Intensity Levels

| Days | Fire Level | Visual |
|------|------------|--------|
| 1-6 | Spark | 🔸 Small flame |
| 7-29 | Flame | 🔥 Regular fire |
| 30-99 | Blaze | 🔥🔥 Double fire |
| 100-364 | Inferno | 🔥🔥🔥 Triple fire |
| 365+ | Legendary | ⭐🔥⭐ Special animation |

---

## 📋 Development Roadmap

### Phase 1: Core Functionality
- [ ] Set up Chrome extension boilerplate
- [ ] Fetch GitHub contribution data
- [ ] Calculate streak from contribution graph
- [ ] Display basic streak counter

### Phase 2: Visual Design
- [ ] Design fire icon/animation
- [ ] Create streak badge SVG
- [ ] Add intensity levels
- [ ] Style popup UI

### Phase 3: Advanced Features
- [ ] Streak reminders/notifications
- [ ] Timezone configuration
- [ ] Historical streak data
- [ ] Embeddable badge service

### Phase 4: Polish & Release
- [ ] Chrome Web Store submission
- [ ] Firefox add-on support
- [ ] Documentation
- [ ] Landing page

---

## 🔧 Installation (Coming Soon)

```bash
# Clone the repository
git clone https://github.com/yourusername/github-streak-extension.git

# Navigate to project
cd github-streak-extension

# Install dependencies
npm install

# Build extension
npm run build

# Load in Chrome: chrome://extensions → Load unpacked → select /dist
```

---

## 📝 Usage (Coming Soon)

1. Install the extension
2. Navigate to any GitHub profile
3. See the streak badge appear on the profile
4. Click the extension icon to see detailed stats

---

## 🤝 Contributing

Contributions welcome! Feel free to submit issues and pull requests.

---

## 📄 License

MIT License - Feel free to use and modify!

---

## 💡 Inspiration

- Snapchat Streaks 👻
- LeetCode Daily Challenges 💻
- Duolingo Streaks 🦉
- GitHub Contribution Graph 📊

---

**Let's keep the fire burning! 🔥**
