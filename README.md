# ⚡ Souvik Kundu — Creative Developer & Engineering Portfolio

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.x-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

A production-grade, full-viewport creative developer portfolio built for **Souvik Kundu** (B.Tech Computer Science & Engineering student at Sister Nivedita University). Designed with a modern, high-contrast dark aesthetic inspired by Mainframe and creative developer showcases.

---

## 🌟 Key Highlights & Features

- **Interactive 3D Mouse-Controlled Head**: Smooth 3D tilt (`rotateX`, `rotateY`) and position tracking (`translate3d`) responding directly to user cursor movement with spring-like physics.
- **Dynamic Spotlight Mask Engine**: Real-time canvas radial gradient spotlight that reveals the illuminated portrait under the mouse pointer.
- **Mainframe & Pixel Typography**: Custom integration of Google Fonts (`Inter`, `Playfair Display`) and pixel monospace bitmap fonts (`basis33`).
- **Interactive Projects Showcase**: Categorized grid filtering with modal detailed view popups and GitHub repository links.
- **Skills Matrix**: Interactive filterable skill chips across Programming, Web Development, Databases, Core CS, AI & Tools.
- **Academic & Experience Timeline**: Academic credentials, CGPA metrics (8.84 / 10), university details, and degree milestones.
- **Interactive Multi-Select Contact Inquiry System**: Custom service selection pills with contingent feedback state and responsive contact form.
- **Responsive Mobile Navigation**: Fullscreen overlay menu with staggered link entrance animations.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 18 (TypeScript) |
| **Build System** | Vite 6 |
| **Styling Engine** | Tailwind CSS 3.4 + Custom Utility Classes |
| **Animation Library** | Framer Motion 11 |
| **Iconography** | Lucide React Icons |
| **Typography** | Inter, Playfair Display, basis33 |

---

## 📂 Project Architecture

```
souvik-portfolio/
├── android/
│   ├── debug-checklist.md
│   └── README.md
├── ios/
│   ├── debug-checklist.md
│   └── README.md
├── public/
│   ├── images/
│   │   ├── profile.png
│   │   ├── logo.png
│   │   ├── project-erp.png
│   │   ├── currency-converter.png
│   │   └── rock-paper-scissors.png
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── Education.tsx
│   │   ├── GitHub.tsx
│   │   ├── Contact.tsx
│   │   ├── ContactForm.tsx
│   │   ├── SpotlightReveal.tsx
│   │   └── Footer.tsx
│   ├── data/
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   └── education.ts
│   ├── hooks/
│   │   ├── useMousePosition.ts
│   │   ├── useTypewriter.ts
│   │   └── useScrollAnimation.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

---

## 🚀 Quick Start & Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/Souvik7661/Portfolio.git
cd Portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 4. Build for production
```bash
npm run build
```

---

## 👨‍💻 About Souvik Kundu

- **Role**: Computer Science & Engineering Student & Creative Developer
- **University**: Sister Nivedita University (Graduating 2028)
- **Location**: Shyamnagar, West Bengal, India
- **GitHub**: [@Souvik7661](https://github.com/Souvik7661)
- **LinkedIn**: [Souvik Kundu](https://linkedin.com/in/souvik-kundu-0277593b1)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
