# 📚 Course Builder Application – Toddle Frontend Task

A responsive React.js application that allows users to **create, manage, and organize course content** using **modules and resources** (links or files). Built using **React**, **Vite**, and custom CSS.

---

## 🚀 Features Implemented

- ✅ Add, edit, and delete course modules
- 🔗 Add resource links to each module
- 📤 Upload and preview files (with size & name)
- 🔍 Live search by module name or resource title
- 🧭 Sidebar outline navigation (scroll to module)
- 📱 Fully responsive UI

---

## 🛠️ Tech Stack

- **React 18** with functional components
- **Vite** for fast dev/build workflow
- **JavaScript**, **HTML**, and **CSS**
- No backend; data handled entirely in frontend state

---

## 📦 Installation & Running

### Prerequisites

- Node.js `v18+`
- npm `v9+`

### Local Setup

# 1. Clone the repository
git clone https://github.com/niharika-2510/course-builder-app.git

# 2. Navigate to the project folder
cd course-builder-app

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev

## 📁 Folder Structure

src/
├── components/
│   ├── modules/
│   │   ├── CourseBuilder.jsx      # Main layout & logic
│   │   ├── ModuleCard.jsx         # Module box
│   │   ├── ModuleModal.jsx        # Modal to add/edit modules
│   │   ├── UploadModal.jsx        # File upload modal
│   │   ├── LinkModal.jsx          # Link input modal
│   │   └── ModuleItem.jsx         # Individual file/link display
│   └── ui/
│       ├── Header.jsx             # Top bar with search & add
│       ├── EmptyState.jsx         # Empty screen fallback
│       └── OutlineSidebar.jsx     # Scrollable module list
├── assets/                        # Static assets (SVGs, images)
├── App.jsx                        # Main app wrapper
├── main.jsx                       # Entry point
├── App.css, index.css             # Styling

## 🧩 Application Architecture

App
└── CourseBuilder
    ├── Header
    ├── OutlineSidebar
    ├── EmptyState (if no modules)
    ├── ModuleCard (for each module)
    │   └── ModuleItem (files/links)
    ├── ModuleModal
    ├── UploadModal
    └── LinkModal
## 📝 Notes for Reviewers
All components are modular and reusable.

No external state manager is used; everything is handled via local React state.

File uploads are virtual — they generate local preview links without a backend.

Live search supports filtering both module names and resource titles.

Component names, folder structure, and state logic follow clean conventions.

## 🔗 GitHub Repository
Submitted by: Niharika Dhingra
Repo Link: https://github.com/niharika-2510/course-builder-app

## 🧪 Optional Commands

# Format with Prettier
npm run format

# Lint check
npm run lint



