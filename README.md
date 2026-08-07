
# Alveeza Ilyas (Software Engineering Portfolio)

A modern, responsive, and high-performance developer portfolio website designed to showcase projects, skills, and experience across Web Development, Machine Learning, UI/UX Design, and Networking.

---

## Features

- **Modern Dark Theme Aesthetic**: Built with deep obsidian/navy background colors, subtle glassmorphism card layouts, and vibrant accent gradients.
- **Interactive & Responsive Navigation**: Mobile hamburger menu, smooth anchor scrolling, and scroll-activated sticky header.
- **Dynamic Scroll Animations**: Smooth element reveal effects on scroll using standard `IntersectionObserver`.
- **Interactive Skill Progress Bars**: Animated percentage visualizers for key programming languages.
- **Featured Projects Showcase**: Grid layout displaying projects across ML, Web Dev, C++, Assembly, Logisim, and Figma UI/UX designs.
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
