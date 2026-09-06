
# Alveeza Ilyas (Software Engineer)

A modern, responsive, and high-performance developer portfolio website designed to showcase projects, skills, and experience across Web Development, Machine Learning, and UI/UX Design.

<img width="1886" height="792" alt="image" src="https://github.com/user-attachments/assets/21db661d-9c29-47bf-b1ca-4f015d34b282" />


## Features

- **Modern Theme System**: Complete Dark & Light mode toggle with smooth CSS variable transitions and glassmorphism styling.
- **Top Scroll Progress Indicator**: Sleek gradient progress bar tracking reading position.
- **Interactive Hero Constellation**: HTML5 Canvas particle network reacting to cursor interactions.
- **Dynamic Role Typewriter**: Smooth typewriter cycling through core engineering specializations.
- **Interactive Project Category Filters**: Filter projects across Web Dev, ML & AI, Systems & Core, and UI/UX Design.
- **3D Tilt & Spotlight Glow**: Interactive 3D perspective hover effect with dynamic radial cursor glow on project cards.
- **One-Click Email Copy & Toast**: Convenient recruiter email copy action with animated feedback toast.
- **Interactive & Responsive Navigation**: Mobile hamburger menu, smooth anchor scrolling, and sticky header.
- **Dynamic Scroll Animations**: Smooth element reveal effects on scroll using standard `IntersectionObserver`.
- **Interactive Skill Progress Bars**: Animated percentage visualizers for key programming languages.
- **Functional Contact Form**: Client-side validated form connected to a **Vercel Serverless Function** (`/api/contact`), storing messages in **Supabase** database and sending email notifications via **Resend**.

---

## Tech Stack & Dependencies

### **Front-End**
- **HTML5 & CSS3**: Custom properties (CSS variables), Flexbox, CSS Grid, and responsive media queries.
- **JavaScript (Vanilla ES6+)**: Interactive UI controls, scroll observers, and client-side form validation.
- **Fonts & Icons**:
  - [Inter](https://fonts.google.com/specimen/Inter) & [JetBrains Mono](https://fonts.google.com/specimen/JetBrains-Mono)
  - [Font Awesome v6.5.1](https://fontawesome.com/)
  - [Devicon v2](https://devicon.dev/)


### **Back-End & Deployment**
- **Serverless API**: Node.js function on Vercel (`/api/contact`)
- **Database**: Supabase (`contact_messages` REST API)
- **Email Service**: Resend API
- **Hosting**: Vercel
