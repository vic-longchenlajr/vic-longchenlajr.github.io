# Portfolio & Engineering Presentations

**Chenla Long, Jr.** | *Scalable Engineering Systems | Fire Protection R&D | Software Innovation*

This project serves as both a professional portfolio and an interactive presentation platform. It showcases the intersection of hardware R&D and scalable software architecture at Victaulic, specifically identifying how configuration-driven platforms reduce operational risk and accelerate engineering decision-making.

## Project Overview

The application is built to demonstrate:
1.  **Complex Engineering Workflows:** Visualizing the friction in traditional hardware design processes.
2.  **Software Solutions:** presenting the "Vortex Project Builder" and other tools that automate validation and systematize tribal knowledge.
3.  **Professional Growth:** A timeline of key contributions and technical milestones.

## Key Features

### 🎥 Interactive Lunch & Learn Deck (`/lunchandlearn`)
A custom-built presentation engine designed to replace static PowerPoint slides with dynamic, code-driven storytelling.
-   **Workflow Friction Visualization:** Animates the compounding risk across Design, Validation, Quoting, and Delivery phases.
-   **Process Loop:** Interactive circular navigation showing the software development lifecycle (Discovery → Immersion → Architecture → etc.).
-   **System Architecture Comparisons:** Visual diffs between "Independent System Calculations" and "Project-Level Hierarchy" models.
-   **Live Demo Mode:** A dedicated view for transitioning from slides to live software demonstration.

### 📄 Professional Summary (`/summary`)
An interactive curriculum vitae and project timeline.
-   **Project Roadmap:** Expandable timeline detailing projects like Vortex Configurator (V1 & V2), VicFlex Bracket Filter, and Scalable DAQ.
-   **Executive Summary:** High-level overview of cross-functional impact between R&D, Lab Ops, and Sales.
-   **Impact Metrics:** Quantifiable results of engineering automation (e.g., 400h+ saved annually).

## Tech Stack

Built with modern web technologies to ensure performance, type safety, and maintainability:

-   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
-   **UI Library:** [React 19](https://react.dev/)
-   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + CSS Modules (for complex, high-performance animations)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)

## Getting Started

To run the portfolio locally:

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the portfolio.

## Navigation

-   **Home:** `/` - Welcome screen and navigation hub.
-   **Summary:** `/summary` - Detailed professional timeline and impact analysis.
-   **Presentation:** `/lunchandlearn` - The interactive slide deck.
