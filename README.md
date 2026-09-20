# Databox - Interactive Analytics Dashboard

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)
![Vite](https://img.shields.io/badge/Vite-Fast-yellow)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-cyan)

**Databox** is a high-performance, interactive Business Intelligence (BI) dashboard designed to visualize complex business metrics with zero-latency rendering. 

## ✨ Key Features

* **Customizable Workspace:** Engineered a modular, drag-and-drop widget layout system using `@dnd-kit`. Users can fully customize their dashboard layout, and the state is persisted across sessions via `localStorage`.
* **Deep-Linkable State Synchronization:** Replaced heavy client-state managers with URL-based state sync (`useSearchParams`). Complex data filtering (by category, date, or status) is instantly shareable and bookmark-able.
* **Simulated AI Assistant:** Integrated a context-aware floating AI Assistant featuring a real-time text-streaming UI to summarize data trends, leveraging modern generative-AI application UX patterns.
* **Zero-Latency Rendering:** Built on Vite and React 18, utilizing optimized Recharts SVG rendering to ensure smooth animations and transitions even with dense datasets.

## 🛠️ Tech Stack

* **Frontend Framework:** React 18
* **Language:** TypeScript
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **Components:** Radix UI / shadcn/ui
* **Data Visualization:** Recharts
* **Drag-and-Drop:** @dnd-kit

## 🚀 Quick Start

To run this project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/shreygupta15/Databox.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` (or the port specified by Vite).

## 💡 Architecture Decisions

* **Headless UI:** Relies on Radix UI primitives to ensure full WAI-ARIA accessibility without sacrificing custom Tailwind styling.
* **Stateless Filters:** By pushing filter state to the URL rather than React Context or Redux, the application guarantees that any URL copied by a user perfectly recreates their exact view when opened by a colleague.

---
*Designed and built by Shrey Gupta.*
