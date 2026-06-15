# Daltónico - Portfolio

Personal frontend development, UI/UX design, and audiovisual media portfolio. Built with a strict focus on retro-technological aesthetics, physics-based animations, and performance optimization.

## 🚀 Tech Stack

* **Core:** React 19 + Vite
* **Styling:** Tailwind CSS v4 (with native @theme utilities)
* **Routing:** React Router v7
* **Deployment:** Vercel

## ✨ Architecture & Technical Features

* **Performance Optimization:** Implementation of *Code Splitting* and *Lazy Loading* (`React.lazy`) to defer the loading of heavy components and optimize the First Contentful Paint (FCP).
* **Media Management:** Conditional rendering of Thumbnails vs High-Res images to prevent main thread blocking. Broken image prevention using defensive states (`onError` fallbacks).
* **Touch Interactivity:** Use of the `IntersectionObserver` API as a *Scroll Spy* to elegantly replace hover events on mobile devices.
* **3D Math:** Infinite spatial carousel using modular arithmetic to prevent rendering breaks at the array boundaries.
* **Accessibility (A11y):** Rigorous implementation of keyboard navigation, Focus Traps for modals (`Escape` key event listeners), and `aria-live` attributes for screen reader compatibility.
* **Security:** Form endpoints managed through environment variables and silent anti-spam protection (Honeypot).

## 🛠️ Local Installation

If you wish to run this project in your local environment:

1. Clone the repository:
\`\`\`bash
git clone https://github.com/dalttons/daltonico-portfolio.git
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Configure environment variables:
Create a `.env` file in the project root and add your Formspree endpoint:
\`\`\`env
VITE_FORMSPREE_ENDPOINT=your_endpoint_here
\`\`\`

4. Start the development server:
\`\`\`bash
npm run dev
\`\`\`
