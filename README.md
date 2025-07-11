# 🚀 Leeterboard — Your Personalized LeetCode Leaderboard & Interview Companion

**Leeterboard** is a full-stack web application built with the **MERN stack** and **Supabase**, designed for competitive programmers, developers, and college peers who want to track, compare, and grow together.

Whether you're preparing for placements or just want to compete with friends, **Leeterboard** turns coding into a community-powered experience.

---

## ✨ Features

### 🎯 Create Custom Leaderboards
- Build your own leaderboard.
- Add LeetCode handles of your friends, classmates, or college batchmates.
- See who’s on top, and who needs to catch up!

### 🧑‍💻 Download a Profile Snapshot
- Capture beautiful snapshots of your or your friends' profiles.
- Share progress and show off your achievements with ease.
- Uses `html-to-canvas` for clean, downloadable visuals.

## 📢 Real-Time Discord Notifications
Stay updated and motivated with **automatic LeetCode question solve notifications** — delivered straight to your **Discord server every 15 minutes**! 
      
        ## 🔔 How It Works
       - A background job runs every 15 minutes.
       - It checks for any new solved problems by users on your custom leaderboard.
       - Instantly sends a notification to your specified **Discord channel**.

          # 🧪 Example Notification

       >  ✅ **Rushikesh** just solved **"Longest Substring Without Repeating Characters"** on LeetCode!  


### 🎓 College-Centric Boards
- Special focus on college-based communities.
- Compete with your batch, department, or entire campus.

### 🔐 Secure & Scalable
- Powered by **JWT authentication** and **bcrypt** for secure login.
- User data is safely managed with **Supabase** integration.

---

## 🛠️ Tech Stack

| Frontend     | Backend           | Auth         | DB & Services |
|--------------|-------------------|--------------|---------------|
| React.js     | Node.js + Express | JWT + Bcrypt | mongodb       |
| Tailwind CSS | REST API          |              |               |

---

## 📸 Screenshots

> 📷 Coming soon… or paste your Snapshots here using `html2canvas`.

---

## 🌍 Use Cases
- 🤝 Friends who want to keep each other accountable in DSA progress.
- 📚 Anyone who wants structured tracking of their LeetCode journey.

---

## 🚧 Future Scope

- 🔍 Advanced filters for interview experiences.
- 📈 Graph-based progress tracking.
- 🏆 Public & Private leaderboard modes.
- 🗃️ Integration with more platforms like Codeforces, GFG, etc.


## 📦 How to Run Locally

```bash
git clone https://github.com/yourusername/leeterboard.git
cd leeterboard
npm install
# Configure your .env with Supabase keys and JWT secrets
npm run dev
