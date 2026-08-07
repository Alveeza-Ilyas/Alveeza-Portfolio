---
name: portfolio-content-editor
description: >
  Use this skill whenever the user wants to add a new project, add a new skill/technology,
  update existing project details, or add a new skill group to the Alveeza Ilyas portfolio website.
  Activate when the user says things like "add a project", "add a skill", "update my portfolio",
  "add React to my skills", "I built a new project", etc.
---

# Portfolio Content Editor — Alveeza Ilyas Portfolio

This skill gives you the exact HTML templates and rules needed to safely add or update
content in `index.html` without breaking layout, accessibility, or animations.

---

## Project File Map

| File | Role |
|------|------|
| `index.html` | All portfolio content lives here (512 lines) |
| `styles.css` | All visual styling — do NOT add inline styles |
| `script.js` | Handles animations, nav, and contact form |
| `api/contact.js` | Contact form backend — rarely needs editing |

---

## How to Add a NEW PROJECT

Projects live inside `index.html` between lines ~260-406, inside:
```html
<div class="projects__grid">
  <!-- insert new <article> blocks here -->
</div>
```

### Project Card Template (copy exactly):
```html
<article class="project-card reveal">
  <div class="project-card__icon" aria-hidden="true">
    <i class="fa-solid fa-[ICON-NAME]"></i>
  </div>
  <h3 class="project-card__title">[Project Title]</h3>
  <p class="project-card__desc">
    [2-3 sentence description of what the project does, what technologies were used,
    and what problem it solves.]
  </p>
  <div class="project-card__tags">
    <span class="tag">[Tech 1]</span>
    <span class="tag">[Tech 2]</span>
  </div>
  <a href="[GITHUB-REPO-URL]"
     class="project-card__link"
     target="_blank"
     rel="noopener noreferrer"
     aria-label="View [Project Title] on GitHub">
    <i class="fa-brands fa-github" aria-hidden="true"></i> View on GitHub
  </a>
</article>
```

### Rules for Project Cards:
- Always include the `reveal` class on article — this triggers the scroll animation.
- Always include aria-hidden="true" on decorative icons.
- Always include a descriptive aria-label on the GitHub link.
- Use target="_blank" rel="noopener noreferrer" on all external links.
- Keep project-card__desc to 2-3 sentences max for visual consistency.
- Use Font Awesome 6 icons for project-card__icon.
- Use &amp; instead of & inside HTML text content.
- Max 4 tags per project card.

### Recommended Font Awesome Icons by Project Type:
| Project Type | Icon Class |
|---|---|
| Web App | fa-globe or fa-laptop-code |
| ML / AI | fa-brain or fa-robot |
| Database | fa-database |
| Security / Network | fa-shield-halved or fa-network-wired |
| Game | fa-gamepad |
| Mobile App | fa-mobile-screen |
| API / Backend | fa-server |
| Chat / Messaging | fa-comments |
| E-commerce | fa-cart-shopping |
| UI/UX Design | fa-pen-ruler |

---

## How to Add a NEW SKILL (Technology)

Skills live inside `index.html` between lines ~146-248, inside `<div class="skills__grid">`.

There are 4 existing skill groups:
1. Languages — programming languages with animated progress bars (HTML 95%, CSS 95%, Python 90%, MySQL 90%, JS 85%, PHP 85%, C++ 90%, Assembly 80%)
2. ML & Data — ML tools (Python/Colab, Kaggle)
3. Design Tools — design software (Figma, Canva)
4. Tools & Platforms — dev tools (GitHub, Git, Vercel, Supabase, Cisco Packet Tracer, XAMPP)

### Skill Card Template (add inside the correct ul.skills__list):
```html
<li class="skill-card">
  <i class="devicon-[TECHNOLOGY]-plain colored" aria-hidden="true"></i>
  <span>[Technology Name]</span>
</li>
```

### If Devicon does not have the icon, use Font Awesome:
```html
<li class="skill-card">
  <i class="fa-brands fa-[ICON] skill-card__icon" aria-hidden="true"></i>
  <span>[Technology Name]</span>
</li>
```

### Rules for Skill Cards:
- Always use devicon icons when the technology is available at https://devicon.dev
- Add `colored` class to devicon icons for brand colors.
- Use fa-brands for company/brand icons (React, Node, Docker, etc.).
- Use fa-solid for generic concept icons.
- Always include aria-hidden="true" on icons.
- Place the new skill inside the most relevant existing group.

### Common Devicon Classes:
| Technology | Devicon Class |
|---|---|
| React | devicon-react-original colored |
| Node.js | devicon-nodejs-plain colored |
| MongoDB | devicon-mongodb-plain colored |
| Docker | devicon-docker-plain colored |
| TypeScript | devicon-typescript-plain colored |
| Git | devicon-git-plain colored |
| Vue.js | devicon-vuejs-plain colored |
| TensorFlow | devicon-tensorflow-original colored |
| Firebase | devicon-firebase-plain colored |
| Django | devicon-django-plain colored |

---

## How to Add a NEW SKILL GROUP

If the new technology does not fit any existing group, add a new group inside the skills__grid:

```html
<article class="skills__group reveal">
  <h3 class="skills__group-title">
    <i class="fa-solid fa-[ICON]" aria-hidden="true"></i>
    [Group Name]
  </h3>
  <ul class="skills__list" role="list">
    <!-- skill cards go here -->
  </ul>
</article>
```

### Rules for Skill Groups:
- Always add `reveal` class on article for scroll animation.
- Always add role="list" on ul.
- Use a relevant Font Awesome fa-solid icon for the group title.
- Minimum 2 skills per group.

---

## Critical DOs and DON'Ts

### DO:
- Always keep the `reveal` class on new cards/sections — it is required for scroll animations.
- Always add aria-hidden="true" to decorative icons.
- Always use &amp; for & in text content inside HTML tags.
- Always add rel="noopener noreferrer" on external links with target="_blank".
- Keep project descriptions concise (2-3 sentences).

### DON'T:
- Do not add inline style="" attributes — all styling is in styles.css.
- Do not remove existing id attributes from sections (nav scroll relies on them).
- Do not add a 5th+ tag to a project card — max 4 tags for layout consistency.
- Do not create a new skill group with only 1 skill.
- Do not forget aria-label on GitHub project links.
- Do not use bare & in HTML — always escape as &amp;.

---

## Quick Location Reference in index.html

| Content | Line Range |
|---|---|
| Navigation links | ~46-52 |
| Hero section | ~59-83 |
| About section | ~86-136 |
| Skills section start | ~139 |
| Languages group | ~149-188 |
| ML & Data group | ~191-206 |
| Design Tools group | ~209-224 |
| Tools & Platforms group | ~227-246 |
| Projects section start | ~253 |
| Project cards | ~262-404 |
| Contact section | ~411-495 |
| Footer | ~500-507 |
