# 📊 Attendance Calculator - Your Study Attendance Tracker

A modern, blazing-fast attendance calculator web app built with React, Vite, and Tailwind CSS. Calculate your attendance percentage, plan your future attendance, and share results on social media!

## ✨ Features

### 📈 Core Features
- **Attendance Calculator**: Calculate your current attendance percentage
- **Reverse Calculator**: Find out how many classes you need to attend to reach a target %
- **Visual Charts**: Beautiful graphs showing attendance trends
- **Social Sharing**: Share results on Twitter, WhatsApp, and Facebook
- **Offline Support**: Works offline with PWA (Progressive Web App)
- **Dark Mode**: Easy on the eyes, designed for students
- **Mobile Responsive**: Works perfectly on all devices

### 🎯 Why Students Love It
- **Lightning Fast**: Instant calculations
- **Shareable**: Pre-filled social media messages
- **Free Forever**: No ads, no premium version
- **Installable**: Add to home screen like an app
- **Funny Alerts**: "You're about to get detained!" notifications

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd attendance-calc

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Build for Production

```bash
npm run build
```

The optimized build will be in the `dist` folder.

Preview production build:
```bash
npm run preview
```

## 📁 Project Structure

```
attendance-calc/
├── src/
│   ├── components/
│   │   ├── AttendanceCalculator.jsx    # Main calculator
│   │   ├── ReverseCalculator.jsx       # Reverse planning tool
│   │   ├── ShareButtons.jsx            # Social sharing
│   │   ├── Header.jsx                  # App header
│   │   └── Footer.jsx                  # App footer
│   ├── App.jsx                         # Main app component
│   ├── App.css                         # App styles
│   ├── main.jsx                        # Entry point
│   └── index.css                       # Tailwind imports
├── public/
│   ├── manifest.json                   # PWA manifest
│   └── sw.js                           # Service worker
├── index.html                          # HTML template
├── vite.config.js                      # Vite configuration
├── tailwind.config.js                  # Tailwind configuration
├── postcss.config.js                   # PostCSS configuration
└── package.json                        # Dependencies
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.2+
- **Build Tool**: Vite 5.0+
- **Styling**: Tailwind CSS 3.3+
- **Charts**: Recharts 2.10+
- **PWA Support**: Service Workers, Web Manifest
- **Deployment**: Vercel, Netlify, or any static host

## 🎨 Features Breakdown

### 1. **Attendance Calculator Tab**
- Input total classes held and classes attended
- Get percentage instantly
- Visual status indicator (green/yellow/red)
- Chart showing attendance trend
- Share results button

### 2. **Reverse Calculator Tab**
- Find how many classes needed for target %
- Plan ahead for the semester
- See breakdown of attended/needed/can-skip classes
- Bar chart visualization
- Quick goal buttons (65%, 75%, 80%, 90%)

### 3. **Social Sharing**
- **Twitter**: Share with custom message
- **WhatsApp**: Send to friends
- **Facebook**: Post to feed
- **Copy to Clipboard**: Share text format

### 4. **PWA Features**
- Install as app on mobile/desktop
- Offline functionality
- App shortcuts
- Splash screen support

## 📊 How It Works

### Attendance %
```
Attendance % = (Classes Attended / Total Classes Held) × 100
```

### Classes Needed (Reverse)
```
Classes Needed = ⌈(Target % × Total Classes) / 100⌉ - Already Attended
```

## 🌍 Deployment

### Deploy to Vercel (Recommended - Free)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Build first
npm run build

# Then drag-and-drop the 'dist' folder to Netlify
```

### Deploy to GitHub Pages

```bash
# Build
npm run build

# Deploy dist folder to GitHub Pages
```

## 💡 Marketing Ideas

### SEO Optimization
- Rank for "attendance calculator", "how many classes can I skip"
- Blog posts about attendance management
- Student forums (Reddit r/students, etc.)

### Viral Growth Strategies
1. **Make it shareable**: Pre-filled messages encourage sharing
2. **Social media blitz**: Post on Instagram, TikTok with results
3. **Meme-able**: Funny alerts ("You're about to get detained!")
4. **Student communities**: WhatsApp groups, college Discord servers
5. **Influencer collab**: Share with student YouTubers/TikTokers

### Ad Monetization
1. Google AdSense (easy setup)
2. AdThrive or Mediavine (higher RPM)
3. Sponsored "tips" section
4. Affiliate links (study apps, note-taking tools)

## 📈 Target Improvements

- [ ] Student profiles (save history)
- [ ] Multi-semester support
- [ ] PDF report generation
- [ ] Attendance alerts/reminders
- [ ] GPA calculator integration
- [ ] Dark/light mode toggle
- [ ] Multi-language support
- [ ] Analytics dashboard

## 🤝 Contributing

Want to add features? Fork and submit a PR!

## 📄 License

MIT License - Free to use and modify

## 🙏 Support

Having issues? Create an issue on GitHub or check the FAQ.

---

**Made with ❤️ for students** | Help your friends track attendance too! 🎓
