# AI Interview Coach 🎙️📹

An intelligent, full-stack 1-on-1 Voice & Video Mock Interview Studio powered by Google Gemini. Evaluates not only what candidates say (STAR structure, technical accuracy, conciseness) but also how they present themselves (posture, eye contact, facial composure, speech pace, and filler words) with dynamic cross-turn adaptive learning.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/mallmridul3/ai-interview-coach)

---

## 🚀 Key Features

* **1-on-1 Voice & Video Call Studio**: Direct camera and microphone feed, live audio waveform visualizer, interactive posture silhouette HUD, and 5 distinct interviewer personas with natural pre-synthesized speech.
* **Multimodal Body Language & Posture Analysis**: Real-time vision evaluation detecting camera eye contact, spinal alignment, facial composure, and fidgeting.
* **Adaptive AI Learning Engine**: Dynamically adapts subsequent interview questions to probe previous gaps, references past projects, and tracks cross-turn score progression.
* **Executive Hiring Debrief**: Comprehensive multi-turn scorecard with radar charts, STAR breakdown, executive presence metrics, and 1-click export to PDF or Google Workspace (Drive, Sheets, Gmail).

---

## 🛠️ Deploy to Render (Free 24/7 Hosting)

Click the button above or visit:
👉 **[Deploy on Render](https://render.com/deploy?repo=https://github.com/mallmridul3/ai-interview-coach)**

1. Sign in to [Render](https://dashboard.render.com).
2. Enter your `GEMINI_API_KEY` under Environment Variables.
3. Click **Apply** — Render automatically builds and hosts your app on a free `*.onrender.com` domain with automated SSL.

---

## 💻 Run Locally

1. **Clone the repo:**
   ```bash
   git clone https://github.com/mallmridul3/ai-interview-coach.git
   cd ai-interview-coach
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment:**
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY="your-google-gemini-api-key"
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.